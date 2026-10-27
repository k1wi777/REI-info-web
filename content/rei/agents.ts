import type { AgentRole, ApprovalGate } from "./types";

/** Los cuatro roles del ciclo de un Work Item. */
export const AGENT_ROLES: AgentRole[] = [
  {
    id: "leader",
    name: "Leader",
    responsibility:
      "Comprende la solicitud, elige el workflow y coordina a los demás roles.",
    limit: "No implementa salvo en el modo directo autorizado.",
  },
  {
    id: "spec-author",
    name: "Spec Author",
    responsibility:
      "Convierte un Work Item pendiente en una planificación técnica revisable.",
    limit: "Nunca implementa.",
  },
  {
    id: "implementer",
    name: "Implementer",
    responsibility:
      "Implementa únicamente la planificación aprobada y deja evidencia de verificación.",
    limit: "No cambia el alcance ni la planificación.",
  },
  {
    id: "reviewer",
    name: "Reviewer",
    responsibility:
      "Valida el trabajo contra la planificación y los checkpoints del proyecto.",
    limit: "No implementa: aprueba o solicita cambios.",
  },
];

/**
 * La puerta de aprobación es un dato único: la home la dibuja y las páginas de
 * documentación la repiten sin inventar el texto.
 */
export const APPROVAL_GATE: ApprovalGate = {
  id: "aprobacion",
  label: "Aprobación de la planificación",
  status: "Pendiente",
  detail: "La firma humana libera la hoja. El silencio no aprueba.",
};
