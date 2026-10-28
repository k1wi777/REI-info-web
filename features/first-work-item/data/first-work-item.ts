import type { DocSection, TocItem } from "@/content/docs";

export const FIRST_WORK_ITEM_PATH = "/docs/empezar/primer-work-item";

export const FIRST_WORK_ITEM_SECTIONS: DocSection[] = [
  {
    id: "init",
    title: "1. Inicializa el arnés",
    blocks: [
      {
        kind: "paragraph",
        text: "En la raíz de tu proyecto, `rei init` despliega `AGENTS.md` y la carpeta `.rei/`, prepara la estructura de estado e inicializa `git` si falta. No sobrescribe archivos existentes.",
      },
      {
        kind: "code",
        language: "Shell",
        code: "rei init",
      },
      {
        kind: "note",
        tone: "info",
        title: "Comprueba el estado",
        text: "`rei init status` indica qué documentación falta por personalizar; `rei doctor` hace un diagnóstico de solo lectura.",
      },
    ],
  },
  {
    id: "personalizacion",
    title: "2. Personaliza el proyecto",
    blocks: [
      {
        kind: "paragraph",
        text: "El arnés necesita conocer tu proyecto. En OpenCode o Claude Code puedes ejecutar `/personalize`; en cualquier runtime, pide al agente «personaliza mi proyecto» y el rol Initializer conducirá la entrevista.",
      },
      {
        kind: "list",
        items: [
          "Propósito del producto, usuarios y principios.",
          "Stack técnico y comandos del proyecto.",
          "Decisiones de arquitectura y convenciones.",
          "Checkpoints de verificación y checks rápidos.",
        ],
      },
      {
        kind: "note",
        tone: "info",
        title: "El Initializer no implementa",
        text: "Su trabajo es completar la documentación del proyecto, no escribir código.",
      },
    ],
  },
  {
    id: "crear-work-item",
    title: "3. Crea el Work Item",
    blocks: [
      {
        kind: "paragraph",
        text: "Describe lo que necesitas al agente. Cuando el alcance esté acordado, el Leader crea el Work Item en estado pending con un identificador y un tipo.",
      },
      {
        kind: "code",
        language: "Shell",
        title: "Ejemplo",
        code: 'rei new 2026-10-27_01-54__mi-feature feature "Mi primera feature"',
      },
      {
        kind: "paragraph",
        text: "Una Feature exige `requirements.md`, `design.md` y `tasks.md`; una Task se planifica con un único `plan.md` para cambios pequeños y localizados.",
      },
    ],
  },
  {
    id: "planificacion",
    title: "4. Planifica",
    blocks: [
      {
        kind: "paragraph",
        text: "El Spec Author convierte el Work Item en una planificación técnica revisable. No implementa: su entregable son los documentos de decisión.",
      },
      {
        kind: "list",
        items: [
          "Requisitos observables y verificables.",
          "Decisiones de diseño y alternativas descartadas.",
          "Tareas ordenadas con su verificación.",
        ],
      },
      {
        kind: "code",
        language: "Shell",
        code: "rei status set 2026-10-27_01-54__mi-feature ready",
      },
    ],
  },
  {
    id: "aprobacion",
    title: "5. Aprueba la planificación",
    blocks: [
      {
        kind: "paragraph",
        text: "Revisa la planificación antes de que se escriba código. Si estás de acuerdo, la aprobación se registra desde el CLI; si algo no refleja lo acordado, se pide al Spec Author que la actualice.",
      },
      {
        kind: "code",
        language: "Shell",
        code: "rei status set 2026-10-27_01-54__mi-feature in_progress",
      },
      {
        kind: "note",
        tone: "warning",
        title: "El silencio no aprueba",
        text: "Ningún Work Item pasa a implementación sin una aprobación explícita. El visor `rei view` es de solo lectura y no tiene botón de aprobación.",
      },
    ],
  },
  {
    id: "implementacion",
    title: "6. Implementa",
    blocks: [
      {
        kind: "paragraph",
        text: "El Implementer ejecuta solo la planificación aprobada, marca cada tarea al completarla y deja evidencia de verificación en `.rei/progress/work-items/`.",
      },
      {
        kind: "code",
        language: "Shell",
        code: "rei check",
      },
      {
        kind: "paragraph",
        text: "`rei check` verifica el arnés y ejecuta los checks declarados en `.rei/config.json`. Los checkpoints lentos, como el build de producción, se ejecutan al cerrar el Work Item.",
      },
    ],
  },
  {
    id: "revision",
    title: "7. Revisa y cierra",
    blocks: [
      {
        kind: "paragraph",
        text: "El Reviewer compara el trabajo con la planificación y los checkpoints. Si falta algo, el Work Item pasa a changes_requested y el Implementer corrige; si todo pasa, queda done.",
      },
      {
        kind: "code",
        language: "Shell",
        code: "rei status set 2026-10-27_01-54__mi-feature review\nrei review-diff 2026-10-27_01-54__mi-feature\nrei validate 2026-10-27_01-54__mi-feature",
      },
      {
        kind: "note",
        tone: "info",
        title: "Un Work Item activo",
        text: "Solo puede haber un Work Item en in_progress a la vez. Los demás esperan en pending o ready.",
      },
    ],
  },
];

export const FIRST_WORK_ITEM_TOC: TocItem[] = FIRST_WORK_ITEM_SECTIONS.map(
  (section) => ({ id: section.id, title: section.title }),
);
