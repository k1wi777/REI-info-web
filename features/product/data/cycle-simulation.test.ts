import { CYCLE_STOPS } from "@/features/product/data/cycle";
import type { CycleStopId } from "@/features/product/data/cycle";
import {
  CYCLE_SIMULATION,
  nextSimulationIndex,
  simulationDurationMs,
  simulationIndexFor,
  simulationStepFor,
} from "@/features/product/data/cycle-simulation";

describe("secuencia de simulación del ciclo", () => {
  it("recorre las mismas paradas, en el mismo orden, que CYCLE_STOPS", () => {
    expect(CYCLE_SIMULATION.map((step) => step.stopId)).toEqual(
      CYCLE_STOPS.map((stop) => stop.id),
    );
  });

  it("firma una sola vez, en la puerta, entre ready e in_progress", () => {
    const signature = CYCLE_SIMULATION.filter(
      (step) => step.cue === "gate-signature",
    );

    expect(signature).toHaveLength(1);
    expect(signature[0]?.stopId).toBe("gate");

    const gateIndex = simulationIndexFor("gate");
    expect(gateIndex).toBe(simulationIndexFor("ready") + 1);
    expect(gateIndex).toBe(simulationIndexFor("in_progress") - 1);
  });

  it("vuelve a pending tras done sin saltarse la puerta", () => {
    const order: CycleStopId[] = [];
    let index = simulationIndexFor("done");

    for (let step = 0; step < CYCLE_SIMULATION.length; step += 1) {
      index = nextSimulationIndex(index);
      order.push(CYCLE_SIMULATION[index].stopId);
    }

    expect(order).toEqual([
      "pending",
      "ready",
      "gate",
      "in_progress",
      "review",
      "done",
    ]);
    expect(nextSimulationIndex(simulationIndexFor("done"))).toBe(0);
  });

  it("usa duraciones enteras y positivas, y la puerta es la más larga", () => {
    for (const step of CYCLE_SIMULATION) {
      expect(Number.isInteger(step.durationMs)).toBe(true);
      expect(step.durationMs).toBeGreaterThan(0);
    }

    const gate = simulationDurationMs("gate");
    for (const step of CYCLE_SIMULATION) {
      if (step.stopId !== "gate") {
        expect(gate).toBeGreaterThan(step.durationMs);
      }
    }
  });

  it("resuelve helpers puros y deterministas", () => {
    const gate = simulationStepFor("gate");

    expect(gate).toEqual(simulationStepFor("gate"));
    expect(gate.stopId).toBe("gate");
    expect(gate.cue).toBe("gate-signature");
    expect(gate.durationMs).toBe(simulationDurationMs("gate"));
    expect(simulationIndexFor("pending")).toBe(0);
    expect(nextSimulationIndex(-1)).toBe(0);
  });
});
