import type { AgentRole, ApprovalGate } from "./types";

/** Los cinco roles canónicos del arnés. */
export const AGENT_ROLES: AgentRole[] = [
  {
    id: "leader",
    name: "Leader",
    responsibility:
      "Comprende la solicitud, elige el workflow y coordina a los demás roles.",
    when: "Al recibir cada solicitud y durante la coordinación del workflow.",
    limit: "No implementa salvo en el modo directo autorizado.",
  },
  {
    id: "spec-author",
    name: "Spec Author",
    responsibility:
      "Convierte un Work Item pendiente en una planificación técnica revisable.",
    when: "Cuando el Work Item está en pending y toca planificarlo.",
    limit: "Nunca implementa.",
  },
  {
    id: "implementer",
    name: "Implementer",
    responsibility:
      "Implementa únicamente la planificación aprobada y deja evidencia de verificación.",
    when: "Cuando el Work Item está en in_progress con una planificación aprobada.",
    limit: "No cambia el alcance ni la planificación.",
  },
  {
    id: "reviewer",
    name: "Reviewer",
    responsibility:
      "Valida el trabajo contra la planificación y los checkpoints del proyecto.",
    when: "Cuando el Work Item está en review.",
    limit: "No implementa: aprueba o solicita cambios.",
  },
  {
    id: "initializer",
    name: "Initializer",
    responsibility:
      "Conduce la personalización guiada de la documentación del proyecto tras rei init.",
    when: "Tras rei init, cuando quedan marcadores pendientes de personalización.",
    limit:
      "No implementa código ni escribe fuera de los documentos de personalización.",
  },
];

/** Los cuatro roles que recorren el ciclo de un Work Item. */
export const WORK_ITEM_ROLES: AgentRole[] = AGENT_ROLES.filter(
  (role) => role.id !== "initializer",
);

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
