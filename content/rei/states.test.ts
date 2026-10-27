import {
  BRANCH_STATES,
  CYCLE_STATES,
  STATE_TRANSITIONS,
  WORK_ITEM_STATES,
} from "@/content/rei/states";

describe("estados de un Work Item", () => {
  it("define el ciclo en el orden pending → ready → in_progress → review → done", () => {
    expect(CYCLE_STATES.map((state) => state.id)).toEqual([
      "pending",
      "ready",
      "in_progress",
      "review",
      "done",
    ]);
    expect(CYCLE_STATES).toHaveLength(5);
    for (const state of CYCLE_STATES) {
      expect(state.kind).toBe("cycle");
    }
  });

  it("define las ramas blocked y changes_requested", () => {
    expect(BRANCH_STATES.map((state) => state.id)).toEqual([
      "blocked",
      "changes_requested",
    ]);
    for (const state of BRANCH_STATES) {
      expect(state.kind).toBe("branch");
    }
  });

  it("reúne los siete estados sin identificadores duplicados", () => {
    const ids = WORK_ITEM_STATES.map((state) => state.id);
    expect(ids).toHaveLength(7);
    expect(new Set(ids).size).toBe(ids.length);
    expect([...CYCLE_STATES, ...BRANCH_STATES].map((state) => state.id)).toEqual(
      ids,
    );
  });

  it("marca done como el único estado terminal", () => {
    const terminal = WORK_ITEM_STATES.filter((state) => state.terminal);
    expect(terminal.map((state) => state.id)).toEqual(["done"]);
  });

  it("rellena etiqueta y significado de cada estado", () => {
    for (const state of WORK_ITEM_STATES) {
      expect(state.label.trim()).not.toBe("");
      expect(state.meaning.trim()).not.toBe("");
    }
  });
});

describe("transiciones de estado", () => {
  const STATE_IDS = WORK_ITEM_STATES.map((state) => state.id);

  it("conecta estados declarados sin aristas duplicadas ni bucles", () => {
    const edges = STATE_TRANSITIONS.map(
      (transition) => `${transition.from}->${transition.to}`,
    );

    expect(new Set(edges).size).toBe(edges.length);
    for (const transition of STATE_TRANSITIONS) {
      expect(STATE_IDS).toContain(transition.from);
      expect(STATE_IDS).toContain(transition.to);
      expect(transition.from).not.toBe(transition.to);
    }
  });

  it("recorre el ciclo estándar en orden", () => {
    const cycle = STATE_TRANSITIONS.filter(
      (transition) => transition.kind === "cycle",
    ).map((transition) => `${transition.from}->${transition.to}`);

    expect(cycle).toEqual([
      "pending->ready",
      "ready->in_progress",
      "in_progress->review",
      "review->done",
    ]);
  });

  it("no deja ninguna salida estándar desde done", () => {
    const exits = STATE_TRANSITIONS.filter(
      (transition) => transition.from === "done" && transition.kind !== "force",
    );

    expect(exits).toHaveLength(0);
  });

  it("reserva --force a la transición done -> blocked", () => {
    const forced = STATE_TRANSITIONS.filter(
      (transition) => transition.kind === "force",
    ).map((transition) => `${transition.from}->${transition.to}`);

    expect(forced).toEqual(["done->blocked"]);
  });

  it("conecta cada estado no terminal con blocked", () => {
    const sources = STATE_TRANSITIONS.filter(
      (transition) => transition.to === "blocked",
    ).map((transition) => transition.from);
    const expected = WORK_ITEM_STATES.filter(
      (state) => state.id !== "blocked" && !state.terminal,
    ).map((state) => state.id);

    for (const id of expected) {
      expect(sources).toContain(id);
    }
  });
});
