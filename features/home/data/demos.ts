import {
  APPROVAL_GATE,
  BRANCH_STATES,
  CYCLE_STATES,
  WORK_ITEM_ROLES,
} from "@/content/rei";
import type { WorkItemStateId } from "@/content/rei";
import type {
  AgentNode,
  ArtifactEntry,
  GateArtifact,
  GateStage,
  ProblemCase,
  TerminalSnapshot,
} from "@/features/home/types";

const ARTIFACT_ROOT = ".rei/specs/<id>/";

const CYCLE_LABELS = new Map(
  CYCLE_STATES.map((state) => [state.id, state.label]),
);

function cycleLabel(id: WorkItemStateId): string {
  const label = CYCLE_LABELS.get(id);
  if (!label) throw new Error(`Estado de ciclo desconocido: ${id}`);
  return label;
}

/**
 * El problema y su reverso sobre el mismo caso. Los pasos son un ejemplo de
 * mecanismo, no una conversación real; los estados y roles sí son los del
 * arnés y se importan de `content/rei`.
 */
export const PROBLEM_DEMO: ProblemCase[] = [
  {
    id: "sin-rei",
    label: "Sin REI",
    title: "La conversación decide por ti",
    intro:
      "Mismo caso: «añade un filtro por estado al listado». Sin alcance escrito, el agente empieza por el código.",
    steps: [
      {
        id: "sin-rei-1",
        title: "Alcance tardío",
        detail:
          "El LLM escribe el filtro antes de que el alcance esté claro: nadie acordó dónde entra ni qué estados cubre.",
        alert: "warning",
        alertLabel: "Riesgo",
      },
      {
        id: "sin-rei-2",
        title: "Alucinaciones",
        detail:
          "Inventa una API o un dato y lo presenta como cierto.",
        alert: "error",
        alertLabel: "Fallo",
      },
      {
        id: "sin-rei-3",
        title: "Decisiones no autorizadas",
        detail:
          "Cambia la arquitectura o el alcance sin una aprobación que lo respalde.",
        alert: "error",
        alertLabel: "Fallo",
      },
      {
        id: "sin-rei-4",
        title: "Acciones fuera de límite",
        detail:
          "Toca datos o entornos que no le corresponden para probar el cambio.",
        alert: "error",
        alertLabel: "Fallo",
      },
      {
        id: "sin-rei-5",
        title: "Retrabajo",
        detail:
          "El código rápido es caro de corregir; la decisión solo existió en el chat.",
        alert: "error",
        alertLabel: "Coste",
      },
    ],
    note: "Ejemplo de mecanismo; no reproduce una conversación real.",
  },
  {
    id: "con-rei",
    label: "Con REI",
    title: "La hoja decide antes del código",
    intro:
      "El mismo caso entra en un Work Item: planificación revisable, firma humana y evidencia en el repositorio.",
    steps: [
      {
        id: "con-rei-1",
        title: "Work Item",
        detail:
          "El Leader registra el alcance, el tipo y el estado pending antes de escribir código.",
        alert: "neutral",
        alertLabel: "Paso",
      },
      {
        id: "con-rei-2",
        title: "Planificación",
        detail:
          "El Spec Author entrega requirements, design y tasks revisables.",
        alert: "neutral",
        alertLabel: "Artefactos",
      },
      {
        id: "con-rei-3",
        title: "Aprobación",
        detail:
          "La persona revisa y firma; el CLI registra el paso a in_progress. El silencio no aprueba.",
        alert: "accent",
        alertLabel: "Puerta",
      },
      {
        id: "con-rei-4",
        title: "Implementación",
        detail:
          "El Implementer ejecuta solo la planificación aprobada y deja evidencia de verificación.",
        alert: "neutral",
        alertLabel: "Límite",
      },
      {
        id: "con-rei-5",
        title: "Revisión",
        detail:
          "El Reviewer verifica contra la planificación; done exige un veredicto favorable.",
        alert: "success",
        alertLabel: "Hecho",
      },
    ],
    note: "Ejemplo de mecanismo construido con los estados y roles reales del arnés.",
  },
];

/** Artefactos que la persona firma al abrir la puerta. */
export const GATE_ARTIFACTS: GateArtifact[] = [
  {
    name: "requirements.md",
    note: "Qué debe cumplirse y cómo se verifica.",
  },
  {
    name: "design.md",
    note: "Cómo se resuelve y qué alternativas se descartaron.",
  },
  {
    name: "tasks.md",
    note: "Orden de ejecución con tareas marcables.",
  },
];

/** Etapas del ciclo con la puerta insertada entre `ready` e `in_progress`. */
export const GATE_DEMO: GateStage[] = [
  {
    id: "pending",
    label: cycleLabel("pending"),
    state: "pending",
    roleId: "leader",
    detail: "El Leader registra el Work Item y acuerda el alcance.",
  },
  {
    id: "ready",
    label: cycleLabel("ready"),
    state: "ready",
    roleId: "spec-author",
    detail: "El Spec Author entrega requisitos, diseño y tareas revisables.",
    artifacts: GATE_ARTIFACTS,
  },
  {
    id: "gate",
    label: APPROVAL_GATE.label,
    gate: true,
    detail: APPROVAL_GATE.detail,
  },
  {
    id: "in_progress",
    label: cycleLabel("in_progress"),
    state: "in_progress",
    roleId: "implementer",
    detail: "El Implementer ejecuta solo la planificación aprobada.",
  },
  {
    id: "review",
    label: cycleLabel("review"),
    state: "review",
    roleId: "reviewer",
    detail: "El Reviewer verifica contra la planificación y los checkpoints.",
  },
  {
    id: "done",
    label: cycleLabel("done"),
    state: "done",
    detail: "Estado terminal: trabajo aprobado y evidencia en el repositorio.",
  },
];

/** Ramas del ciclo: no son atajos ni etapas del camino lineal. */
export const GATE_BRANCHES = BRANCH_STATES;

const ROLE_NODES: Record<string, string> = {
  leader: "Recibe la solicitud",
  "spec-author": "Recibe el Work Item",
  implementer: "Recibe la planificación aprobada",
  reviewer: "Recibe la implementación",
  initializer: "Rama lateral tras rei init",
};

/** Los cuatro roles del ciclo y el Initializer como rama lateral. */
export const AGENT_NODES: AgentNode[] = [
  ...WORK_ITEM_ROLES.map(
    (role): AgentNode => ({ roleId: role.id, handoff: ROLE_NODES[role.id] }),
  ),
  {
    roleId: "initializer",
    branch: true,
    handoff: ROLE_NODES.initializer,
  },
];

/**
 * Instantánea real de `rei items status` en este repositorio. Es una
 * fotografía con fecha, no una salida en vivo; el estado cambia con el tiempo.
 */
export const TERMINAL_SNAPSHOT: TerminalSnapshot = {
  command: "rei items status",
  capturedAt: "2026-10-27",
  caption:
    "Instantánea real de `rei items status` en este repositorio. El estado de los Work Items cambia con el tiempo.",
  lines: [
    { kind: "prompt", text: "$ rei items status" },
    { kind: "output", text: "Work Items:" },
    {
      kind: "output",
      text: "  - 2026-10-27_00-31__estrategia-producto-web          [done] (type: task)",
    },
    {
      kind: "output",
      text: "  - 2026-10-27_01-54__fundaciones-visuales-shell-docs  [done] (type: feature)",
    },
    {
      kind: "output",
      text: "  - 2026-10-27_02-59__tests-logica-jest                [done] (type: task)",
    },
    {
      kind: "output",
      text: "  - 2026-10-27_03-17__contenido-producto-flujo         [done] (type: feature)",
    },
    {
      kind: "output",
      text: "  - 2026-10-27_11-04__pulido-home-copy-aprobacion      [done] (type: task)",
    },
    {
      kind: "output",
      text: "  - 2026-10-27_11-36__conceptos-guias-docs             [done] (type: feature)",
    },
    {
      kind: "output",
      text: "  - 2026-10-27_12-08__referencia-operacion-docs        [done] (type: feature)",
    },
    {
      kind: "output",
      text: "  - 2026-10-27_20-34__pulido-hero-inline-github-issues [done] (type: task)",
    },
    {
      kind: "output",
      text: "  - 2026-10-27_22-04__home-demostrativa-playwright     [in_progress] (type: feature)   << ACTIVO",
      emphasis: true,
    },
    {
      kind: "note",
      text: "Solo un Work Item puede estar in_progress a la vez.",
    },
  ],
};

/**
 * Árbol de `.rei/specs/<id>/`: el componente, no una captura. Las rutas son
 * el patrón documentado del arnés, no un Work Item concreto.
 */
export const ARTIFACT_TREE: ArtifactEntry[] = [
  {
    id: "root",
    path: ARTIFACT_ROOT,
    note: "Un directorio por Work Item; el id es fecha y slug.",
    depth: 0,
  },
  {
    id: "requirements",
    path: `${ARTIFACT_ROOT}requirements.md`,
    note: "Qué debe cumplirse y cómo se verifica.",
    depth: 1,
  },
  {
    id: "design",
    path: `${ARTIFACT_ROOT}design.md`,
    note: "Cómo se resuelve; alternativas descartadas.",
    depth: 1,
  },
  {
    id: "tasks",
    path: `${ARTIFACT_ROOT}tasks.md`,
    note: "Orden de ejecución con tareas marcables.",
    depth: 1,
  },
  {
    id: "meta",
    path: `${ARTIFACT_ROOT}meta.json`,
    note: "id, tipo, estado, commit base y revisión.",
    depth: 1,
  },
];
