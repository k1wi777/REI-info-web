import type { FlowStep } from "@/features/product/types";

/**
 * Siete pasos desde la solicitud hasta done. La puerta no duplica su texto:
 * FlowSteps toma label, status y detail de APPROVAL_GATE.
 */
export const PRODUCT_FLOW: FlowStep[] = [
  {
    id: "usuario",
    actor: "Usuario",
    description:
      "Acuerda con el Leader qué se construye, por qué y con qué alcance antes de abrir el Work Item.",
  },
  {
    id: "leader",
    actor: "Leader",
    description:
      "Comprende la solicitud, elige Feature, Task o modo directo y crea el Work Item en pending.",
  },
  {
    id: "spec-author",
    actor: "Spec Author",
    description:
      "Redacta requirements, design y tasks (o plan.md) y deja el Work Item en ready.",
  },
  {
    id: "aprobacion",
    actor: "Aprobación humana",
    description: "",
    gate: true,
  },
  {
    id: "implementer",
    actor: "Implementer",
    description:
      "Ejecuta solo la planificación aprobada, marca cada tarea y deja evidencia; pasa el Work Item a review.",
  },
  {
    id: "reviewer",
    actor: "Reviewer",
    description:
      "Verifica contra la planificación y los checkpoints: aprueba o solicita changes_requested.",
  },
  {
    id: "done",
    actor: "done",
    description:
      "El Work Item queda cerrado y su resumen se archiva en history.md.",
  },
];
