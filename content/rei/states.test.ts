import {
  BRANCH_STATES,
  CYCLE_STATES,
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
