import type { WorkItemState } from "./types";

/** Los cinco estados del ciclo, en orden. */
export const CYCLE_STATES: WorkItemState[] = [
  {
    id: "pending",
    label: "pending",
    meaning: "Work Item creado, pendiente de planificación.",
    kind: "cycle",
  },
  {
    id: "ready",
    label: "ready",
    meaning: "Planificación terminada, esperando aprobación humana.",
    kind: "cycle",
  },
  {
    id: "in_progress",
    label: "in_progress",
    meaning: "Implementación en curso. Solo puede haber uno a la vez.",
    kind: "cycle",
  },
  {
    id: "review",
    label: "review",
    meaning: "Implementación finalizada, pendiente de revisión.",
    kind: "cycle",
  },
  {
    id: "done",
    label: "done",
    meaning: "Completado y aprobado; estado terminal.",
    kind: "cycle",
    terminal: true,
  },
];

/** Ramas fuera del ciclo lineal. */
export const BRANCH_STATES: WorkItemState[] = [
  {
    id: "blocked",
    label: "blocked",
    meaning: "El trabajo no puede continuar.",
    kind: "branch",
  },
  {
    id: "changes_requested",
    label: "changes_requested",
    meaning: "La revisión rechazó la implementación y pide cambios.",
    kind: "branch",
  },
];

export const WORK_ITEM_STATES: WorkItemState[] = [
  ...CYCLE_STATES,
  ...BRANCH_STATES,
];
