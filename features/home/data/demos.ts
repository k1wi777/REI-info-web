import {
  BRANCH_STATES,
  CYCLE_STATES,
  WORK_ITEM_ROLES,
} from "@/content/rei";
import type { AgentRoleId, WorkItemStateId } from "@/content/rei";
import type {
  ArtifactId,
  GateArtifactName,
  HomeCopy,
  ProblemStepId,
} from "@/features/home/copy/types";
import type {
  AgentNode,
  ArtifactEntry,
  DemoAlert,
  GateArtifact,
  GateStage,
  ProblemCase,
  ProblemCaseId,
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

type ProblemStepBase = { id: ProblemStepId; alert: DemoAlert };

/**
 * El problema y su reverso sobre el mismo caso. Los pasos son un ejemplo de
 * mecanismo, no una conversación real; los estados y roles sí son los del
 * arnés y se importan de `content/rei`. Aquí solo viven ids y marcas; el texto
 * sale de la copy.
 */
const PROBLEM_BASES: { id: ProblemCaseId; steps: ProblemStepBase[] }[] = [
  {
    id: "sin-rei",
    steps: [
      { id: "sin-rei-1", alert: "warning" },
      { id: "sin-rei-2", alert: "error" },
      { id: "sin-rei-3", alert: "error" },
      { id: "sin-rei-4", alert: "error" },
      { id: "sin-rei-5", alert: "error" },
    ],
  },
  {
    id: "con-rei",
    steps: [
      { id: "con-rei-1", alert: "neutral" },
      { id: "con-rei-2", alert: "neutral" },
      { id: "con-rei-3", alert: "accent" },
      { id: "con-rei-4", alert: "neutral" },
      { id: "con-rei-5", alert: "success" },
    ],
  },
];

export function buildProblemDemo(copy: HomeCopy["problem"]): ProblemCase[] {
  return PROBLEM_BASES.map(({ id, steps }) => ({
    id,
    ...copy.cases[id],
    steps: steps.map((step) => ({
      id: step.id,
      alert: step.alert,
      ...copy.steps[step.id],
    })),
  }));
}

/** Artefactos que la persona firma al abrir la puerta. */
export const GATE_ARTIFACT_NAMES: GateArtifactName[] = [
  "requirements.md",
  "design.md",
  "tasks.md",
];

/** Etapas del ciclo con la puerta insertada entre `ready` e `in_progress`. */
export function buildGateDemo(copy: HomeCopy["gate"]): GateStage[] {
  const artifacts: GateArtifact[] = GATE_ARTIFACT_NAMES.map((name) => ({
    name,
    note: copy.artifacts[name],
  }));

  return [
    {
      id: "pending",
      label: cycleLabel("pending"),
      state: "pending",
      roleId: "leader",
      detail: copy.stages.pending,
    },
    {
      id: "ready",
      label: cycleLabel("ready"),
      state: "ready",
      roleId: "spec-author",
      detail: copy.stages.ready,
      artifacts,
    },
    {
      id: "gate",
      label: copy.gateLabel,
      gate: true,
      detail: copy.stages.gate,
    },
    {
      id: "in_progress",
      label: cycleLabel("in_progress"),
      state: "in_progress",
      roleId: "implementer",
      detail: copy.stages.in_progress,
    },
    {
      id: "review",
      label: cycleLabel("review"),
      state: "review",
      roleId: "reviewer",
      detail: copy.stages.review,
    },
    {
      id: "done",
      label: cycleLabel("done"),
      state: "done",
      detail: copy.stages.done,
    },
  ];
}

/** Ramas del ciclo: no son atajos ni etapas del camino lineal. */
export const GATE_BRANCHES = BRANCH_STATES;

/** Los cuatro roles del ciclo y el Initializer como rama lateral. */
export function buildAgentNodes(
  handoffs: Record<AgentRoleId, string>,
): AgentNode[] {
  return [
    ...WORK_ITEM_ROLES.map(
      (role): AgentNode => ({ roleId: role.id, handoff: handoffs[role.id] }),
    ),
    {
      roleId: "initializer",
      branch: true,
      handoff: handoffs.initializer,
    },
  ];
}

/**
 * Instantánea real de `rei items status` en este repositorio. Es una
 * fotografía con fecha, no una salida en vivo; el estado cambia con el tiempo.
 */
export const TERMINAL_COMMAND = "rei items status";
export const TERMINAL_CAPTURED_AT = "2026-10-27";

/**
 * Líneas de la salida del CLI: no se traducen y no dependen del idioma.
 * La nota final y el pie son prosa y salen de la copy.
 */
export const TERMINAL_OUTPUT_LINES: TerminalSnapshot["lines"] = [
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
];

export function buildTerminalSnapshot(
  copy: HomeCopy["terminal"],
): TerminalSnapshot {
  return {
    command: TERMINAL_COMMAND,
    capturedAt: TERMINAL_CAPTURED_AT,
    caption: copy.caption,
    lines: [
      ...TERMINAL_OUTPUT_LINES,
      { kind: "note", text: copy.snapshotNote },
    ],
  };
}

/**
 * Árbol de `.rei/specs/<id>/`: el componente, no una captura. Las rutas son
 * el patrón documentado del arnés, no un Work Item concreto; las notas salen
 * de la copy.
 */
const ARTIFACT_BASES: Omit<ArtifactEntry, "note">[] = [
  { id: "root", path: ARTIFACT_ROOT, depth: 0 },
  { id: "requirements", path: `${ARTIFACT_ROOT}requirements.md`, depth: 1 },
  { id: "design", path: `${ARTIFACT_ROOT}design.md`, depth: 1 },
  { id: "tasks", path: `${ARTIFACT_ROOT}tasks.md`, depth: 1 },
  { id: "meta", path: `${ARTIFACT_ROOT}meta.json`, depth: 1 },
];

export function buildArtifactTree(
  notes: Record<ArtifactId, string>,
): ArtifactEntry[] {
  return ARTIFACT_BASES.map((entry) => ({
    ...entry,
    note: notes[entry.id as ArtifactId],
  }));
}
