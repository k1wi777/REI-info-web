import { BRANCH_STATES, CYCLE_STATES } from "@/content/rei";
import { REPOSITORY_URL } from "@/content/site";
import type { ProductDocument } from "@/features/product/types";

/** Artefactos por tipo; la ficha y la comparación leen de aquí. */
const FEATURE_PLANNING = ["requirements.md", "design.md", "tasks.md"];
const TASK_PLANNING = ["plan.md"];

export const WORK_ITEMS_DOCUMENT: ProductDocument = {
  id: "work-items",
  eyebrow: "Producto · Work Items",
  meta: "Feature frente a Task · evidencia versionada",
  facts: [
    { label: "Tipos", value: "Feature · Task" },
    {
      label: "Planificación",
      value: `${FEATURE_PLANNING.length} documentos / ${TASK_PLANNING.length} documento`,
    },
    {
      label: "Estados",
      value: `${CYCLE_STATES.length} + ${BRANCH_STATES.length} ramas`,
    },
    { label: "En curso", value: "Uno a la vez" },
    { label: "Revisión", value: "Por diff" },
  ],
  sections: [
    {
      id: "tipos",
      label: "Tipos",
      title: "Feature o Task",
      weight: "lead",
      blocks: [
        {
          kind: "paragraph",
          text: "Todo trabajo nace como Work Item con un identificador y un tipo. El tipo decide qué planificación se genera y si la integración con GitHub Issues abre issue y rama.",
        },
        {
          kind: "choices",
          choices: [
            {
              id: "feature",
              name: "Feature",
              planning: FEATURE_PLANNING,
              when: "El trabajo necesita especificación, hay varias decisiones de diseño o cambia el comportamiento o la arquitectura.",
            },
            {
              id: "task",
              name: "Task",
              planning: TASK_PLANNING,
              when: "Documentación, contratos o un cambio pequeño y localizado, sin cambio de comportamiento ni de arquitectura.",
            },
          ],
        },
        {
          kind: "note",
          tone: "info",
          title: "Regla de desempate",
          text: "Si existe cualquier duda sobre el tipo, se elige Feature. Una Task no debe convertirse en una Feature encubierta.",
        },
      ],
    },
    {
      id: "ciclo",
      label: "Ciclo",
      title: "Ciclo de vida y aprobación previa",
      blocks: [
        {
          kind: "paragraph",
          text: "Features y Tasks comparten los mismos estados. Ningún Work Item puede implementarse sin una planificación aprobada, y ninguno finaliza sin pasar por el Reviewer.",
        },
        {
          kind: "states",
          states: [
            "pending",
            "ready",
            "in_progress",
            "review",
            "done",
            "blocked",
            "changes_requested",
          ],
        },
        {
          kind: "paragraph",
          text: "La aprobación previa es un punto de control, no un trámite: la persona revisa requisitos, diseño y tareas antes de que se escriba código. Si el Reviewer rechaza la implementación, el Work Item vuelve a in_progress con cambios solicitados.",
        },
      ],
    },
    {
      id: "evidencia",
      label: "Evidencia",
      title: "Evidencia versionada",
      blocks: [
        {
          kind: "paragraph",
          text: "El repositorio guarda la evidencia del trabajo; el chat no es el registro. Cada documento tiene un responsable y un momento.",
        },
        { kind: "terminal" },
        {
          kind: "note",
          tone: "info",
          title: "Instantánea fechada",
          text: "Las salidas de la terminal se capturaron el 2026-10-28; el estado puede cambiar. El árbol muestra la ruta real de cada documento y quién lo escribe.",
        },
      ],
    },
    {
      id: "revision",
      label: "Revisión",
      title: "Revisión por diff",
      blocks: [
        {
          kind: "paragraph",
          text: "Con `git`, la revisión se acota a los cambios reales del Work Item. `base_commit` marca el inicio de la implementación y `last_review_commit` el punto ya revisado; `rei review-diff` genera el paquete de revisión. Sin `git`, el flujo sigue funcionando en modo lectura.",
        },
        {
          kind: "note",
          tone: "warning",
          title: "Cuándo se niega el modo directo",
          text: "Si el cambio afecta comportamiento, seguridad, datos, dependencias, API pública, arquitectura, más de un archivo o necesita especificación o revisión, el Leader se niega y ofrece una Task o una Feature. La insistencia no es autorización.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Recorrer el primer Work Item",
              href: "/docs/empezar/primer-work-item",
            },
            {
              label: "Referencia de comandos",
              href: "/docs/referencia/comandos",
            },
            { label: "Preguntas frecuentes", href: "/docs/operacion/faq" },
            {
              label: "Cómo funciona el flujo",
              href: "/producto/como-funciona",
            },
            { label: "Conocer los roles", href: "/producto/agentes" },
            {
              label: "Repositorio de REI Harness",
              href: REPOSITORY_URL,
              external: true,
            },
          ],
        },
      ],
    },
  ],
};
