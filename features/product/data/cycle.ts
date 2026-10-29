import {
  APPROVAL_GATE,
  BRANCH_STATES,
  CYCLE_STATES,
  STATE_TRANSITIONS,
} from "@/content/rei";
import type {
  AgentRoleId,
  StateTransition,
  WorkItemState,
  WorkItemStateId,
} from "@/content/rei";

export type CycleStopId =
  | "pending"
  | "ready"
  | "gate"
  | "in_progress"
  | "review"
  | "done";

/**
 * Una parada del recorrido. La etiqueta y el significado se derivan de
 * `CYCLE_STATES` y `APPROVAL_GATE`; solo el rol se declara aquí porque el
 * modelo canónico de estados no lo asocia.
 */
export type CycleStop = {
  id: CycleStopId;
  state?: WorkItemStateId;
  roleId?: AgentRoleId;
  label: string;
  detail: string;
  gate?: boolean;
};

/** Estados que forman el recorrido lineal; las ramas quedan fuera. */
type CycleStateId = Extract<
  WorkItemStateId,
  "pending" | "ready" | "in_progress" | "review" | "done"
>;

/** Quién actúa en cada estado del ciclo. La puerta no tiene rol: es humana. */
const STOP_ROLES: Partial<Record<CycleStateId, AgentRoleId>> = {
  pending: "leader",
  ready: "spec-author",
  in_progress: "implementer",
  review: "reviewer",
};

function cycleState(id: CycleStateId): WorkItemState {
  const state = CYCLE_STATES.find((candidate) => candidate.id === id);
  if (!state) {
    throw new Error(`El estado ${id} no pertenece a CYCLE_STATES.`);
  }
  return state;
}

function stopFromState(id: CycleStateId): CycleStop {
  const state = cycleState(id);
  return {
    id,
    state: id,
    roleId: STOP_ROLES[id],
    label: state.label,
    detail: state.meaning,
  };
}

/** Seis paradas: los cinco estados del ciclo con la puerta entre ready e in_progress. */
export const CYCLE_STOPS: CycleStop[] = [
  stopFromState("pending"),
  stopFromState("ready"),
  {
    id: "gate",
    label: APPROVAL_GATE.label,
    detail: APPROVAL_GATE.detail,
    gate: true,
  },
  stopFromState("in_progress"),
  stopFromState("review"),
  stopFromState("done"),
];

/** Aristas de entrada y salida de una parada o rama, sin declarar ninguna a mano. */
export type StopTransitions = {
  incoming: StateTransition[];
  outgoing: StateTransition[];
};

/** La puerta se cruza con la arista ready → in_progress; no es una arista propia. */
function gateTransition(): StateTransition | undefined {
  return STATE_TRANSITIONS.find(
    (transition) => transition.from === "ready" && transition.to === "in_progress",
  );
}

export function stopTransitions(stop: CycleStop): StopTransitions {
  if (stop.gate) {
    const crossing = gateTransition();
    return crossing
      ? { incoming: [crossing], outgoing: [crossing] }
      : { incoming: [], outgoing: [] };
  }

  if (!stop.state) {
    return { incoming: [], outgoing: [] };
  }

  return branchTransitions(stop.state);
}

export function branchTransitions(id: WorkItemStateId): StopTransitions {
  return {
    incoming: STATE_TRANSITIONS.filter((transition) => transition.to === id),
    outgoing: STATE_TRANSITIONS.filter((transition) => transition.from === id),
  };
}

export type CycleBranch = {
  state: WorkItemState;
  incoming: StateTransition[];
  outgoing: StateTransition[];
};

/** Las ramas fuera del ciclo, con sus aristas reales de entrada y salida. */
export const CYCLE_BRANCHES: CycleBranch[] = BRANCH_STATES.map((state) => ({
  state,
  ...branchTransitions(state.id),
}));

/**
 * Índice de la parada siguiente. En la última parada devuelve la misma, para
 * que el recorrido se detenga; nunca salta la puerta porque solo suma uno.
 */
export function nextStop(
  stops: readonly CycleStop[],
  id: CycleStopId,
): number {
  const index = stops.findIndex((stop) => stop.id === id);
  if (index < 0) {
    return -1;
  }
  return Math.min(index + 1, stops.length - 1);
}

/** Índice de la parada anterior, detenido en la primera. */
export function previousStop(
  stops: readonly CycleStop[],
  id: CycleStopId,
): number {
  const index = stops.findIndex((stop) => stop.id === id);
  if (index < 0) {
    return -1;
  }
  return Math.max(index - 1, 0);
}
