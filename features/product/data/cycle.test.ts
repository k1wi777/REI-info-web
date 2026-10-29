import {
  AGENT_ROLES,
  APPROVAL_GATE,
  BRANCH_STATES,
  CYCLE_STATES,
  STATE_TRANSITIONS,
} from "@/content/rei";
import {
  CYCLE_BRANCHES,
  CYCLE_STOPS,
  branchTransitions,
  nextStop,
  previousStop,
  stopTransitions,
} from "@/features/product/data/cycle";

const ORDER = ["pending", "ready", "gate", "in_progress", "review", "done"];

describe("datos del ciclo", () => {
  it("ordena las seis paradas con la puerta entre ready e in_progress", () => {
    expect(CYCLE_STOPS.map((stop) => stop.id)).toEqual(ORDER);

    const gateIndex = CYCLE_STOPS.findIndex((stop) => stop.gate);
    expect(gateIndex).toBe(2);
    expect(CYCLE_STOPS.filter((stop) => stop.gate)).toHaveLength(1);
    expect(CYCLE_STOPS[gateIndex - 1]?.state).toBe("ready");
    expect(CYCLE_STOPS[gateIndex + 1]?.state).toBe("in_progress");
  });

  it("deriva etiqueta y significado de CYCLE_STATES y APPROVAL_GATE", () => {
    for (const stop of CYCLE_STOPS) {
      expect(stop.label.trim()).not.toBe("");
      expect(stop.detail.trim()).not.toBe("");
    }

    for (const stop of CYCLE_STOPS.filter((candidate) => !candidate.gate)) {
      const state = CYCLE_STATES.find((candidate) => candidate.id === stop.state);
      expect(state).toBeDefined();
      expect(stop.label).toBe(state?.label);
      expect(stop.detail).toBe(state?.meaning);
    }

    const gate = CYCLE_STOPS.find((stop) => stop.gate);
    expect(gate?.label).toBe(APPROVAL_GATE.label);
    expect(gate?.detail).toBe(APPROVAL_GATE.detail);
    expect(gate?.state).toBeUndefined();
  });

  it("asocia a cada parada un rol existente y deja la puerta sin rol", () => {
    const roleIds = new Set(AGENT_ROLES.map((role) => role.id));

    for (const stop of CYCLE_STOPS) {
      if (stop.gate || stop.id === "done") {
        expect(stop.roleId).toBeUndefined();
        continue;
      }
      expect(stop.roleId).toBeDefined();
      expect(stop.roleId ? roleIds.has(stop.roleId) : false).toBe(true);
    }
  });

  it("nextStop avanza exactamente una parada y no salta la puerta", () => {
    for (let index = 0; index < CYCLE_STOPS.length - 1; index += 1) {
      const target = nextStop(CYCLE_STOPS, CYCLE_STOPS[index].id);
      expect(target).toBe(index + 1);
    }

    expect(CYCLE_STOPS[nextStop(CYCLE_STOPS, "ready")].id).toBe("gate");
    expect(CYCLE_STOPS[nextStop(CYCLE_STOPS, "gate")].id).toBe("in_progress");
    expect(nextStop(CYCLE_STOPS, "done")).toBe(CYCLE_STOPS.length - 1);
  });

  it("previousStop retrocede una parada y se detiene en la primera", () => {
    for (let index = 1; index < CYCLE_STOPS.length; index += 1) {
      const target = previousStop(CYCLE_STOPS, CYCLE_STOPS[index].id);
      expect(target).toBe(index - 1);
    }

    expect(previousStop(CYCLE_STOPS, "pending")).toBe(0);
  });

  it("deriva las transiciones de cada parada desde STATE_TRANSITIONS", () => {
    const ready = stopTransitions(CYCLE_STOPS[1]);
    expect(ready.outgoing).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ from: "ready", to: "in_progress" }),
      ]),
    );

    const gate = stopTransitions(CYCLE_STOPS[2]);
    expect(gate.incoming).toHaveLength(1);
    expect(gate.outgoing).toHaveLength(1);
    expect(gate.incoming[0].from).toBe("ready");
    expect(gate.outgoing[0].to).toBe("in_progress");
    expect(gate.incoming[0]).toBe(gate.outgoing[0]);

    const review = stopTransitions(CYCLE_STOPS[4]);
    expect(review.incoming).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ from: "in_progress", to: "review" }),
      ]),
    );
    expect(review.outgoing).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ from: "review", to: "done" }),
      ]),
    );

    for (const transition of [...ready.incoming, ...ready.outgoing]) {
      expect(STATE_TRANSITIONS).toContain(transition);
    }
  });

  it("declara las ramas con sus aristas reales de entrada y salida", () => {
    expect(CYCLE_BRANCHES.map((branch) => branch.state.id)).toEqual(
      BRANCH_STATES.map((state) => state.id),
    );

    for (const branch of CYCLE_BRANCHES) {
      expect(branch.incoming.length).toBeGreaterThan(0);
      for (const transition of [...branch.incoming, ...branch.outgoing]) {
        expect(STATE_TRANSITIONS).toContain(transition);
      }
      expect(branch.incoming.every((transition) => transition.to === branch.state.id)).toBe(true);
      expect(branch.outgoing.every((transition) => transition.from === branch.state.id)).toBe(true);
    }

    const changes = CYCLE_BRANCHES.find(
      (branch) => branch.state.id === "changes_requested",
    );
    expect(changes?.outgoing).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ from: "changes_requested", to: "in_progress" }),
      ]),
    );

    const blocked = CYCLE_BRANCHES.find((branch) => branch.state.id === "blocked");
    expect(blocked?.outgoing).toEqual([]);
  });

  it("branchTransitions no inventa aristas fuera del dato canónico", () => {
    const blocked = branchTransitions("blocked");
    expect(blocked.outgoing).toEqual([]);
    expect(blocked.incoming.every((transition) => transition.to === "blocked")).toBe(true);
  });
});
