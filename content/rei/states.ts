import type { StateTransition, WorkItemState } from "./types";

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

/**
 * Aristas del workflow. Las salidas a `blocked` se derivan de los estados no
 * terminales para que un estado nuevo herede la rama sin duplicar listas.
 */
export const STATE_TRANSITIONS: StateTransition[] = [
  {
    from: "pending",
    to: "ready",
    kind: "cycle",
    note: "El Spec Author termina la planificación.",
  },
  {
    from: "ready",
    to: "in_progress",
    kind: "cycle",
    note: "Exige aprobación humana explícita.",
  },
  {
    from: "in_progress",
    to: "review",
    kind: "cycle",
    note: "El Implementer cierra con su reporte.",
  },
  {
    from: "review",
    to: "done",
    kind: "cycle",
    note: "Veredicto favorable del Reviewer.",
  },
  {
    from: "review",
    to: "changes_requested",
    kind: "branch",
    note: "El Reviewer rechaza la implementación.",
  },
  {
    from: "changes_requested",
    to: "in_progress",
    kind: "branch",
    note: "El Implementer aplica las correcciones.",
  },
  ...WORK_ITEM_STATES.filter(
    (state) => state.id !== "blocked" && !state.terminal,
  ).map(
    (state): StateTransition => ({
      from: state.id,
      to: "blocked",
      kind: "branch",
      note: "El trabajo no puede continuar.",
    }),
  ),
  {
    from: "done",
    to: "blocked",
    kind: "force",
    note: "Transición no estándar: exige --force y una orden explícita.",
  },
];
