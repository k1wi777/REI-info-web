import { CYCLE_STOPS } from "@/features/product/data/cycle";
import type { CycleStopId } from "@/features/product/data/cycle";

/** Qué ocurre al final de una parada de la simulación. */
export type CycleCue = "advance" | "gate-signature" | "restart";

/** Una parada con su duración y la escena que dispara al agotarse. */
export type CycleSimulationStep = {
  stopId: CycleStopId;
  durationMs: number;
  cue: CycleCue;
};

type StepTiming = {
  durationMs: number;
  cue: CycleCue;
};

/**
 * Ritmo de cada parada. La puerta es la más larga porque escenifica la firma;
 * el resto avanza sin narración. Un estado nuevo rompe el tipo antes que la UI.
 */
const STEP_TIMINGS: Record<CycleStopId, StepTiming> = {
  pending: { durationMs: 1800, cue: "advance" },
  ready: { durationMs: 1800, cue: "advance" },
  gate: { durationMs: 3000, cue: "gate-signature" },
  in_progress: { durationMs: 2400, cue: "advance" },
  review: { durationMs: 2400, cue: "advance" },
  done: { durationMs: 2600, cue: "restart" },
};

/**
 * Secuencia completa derivada de `CYCLE_STOPS`: el orden y los ids de las
 * paradas se declaran una sola vez. El último paso vuelve a `pending`.
 */
export const CYCLE_SIMULATION: readonly CycleSimulationStep[] = CYCLE_STOPS.map(
  (stop) => ({ stopId: stop.id, ...STEP_TIMINGS[stop.id] }),
);

/** Índice de una parada en la simulación; `-1` si no participa. */
export function simulationIndexFor(stopId: CycleStopId): number {
  return CYCLE_SIMULATION.findIndex((step) => step.stopId === stopId);
}

/** Paso de una parada; falla si la secuencia no la contempla. */
export function simulationStepFor(stopId: CycleStopId): CycleSimulationStep {
  const step = CYCLE_SIMULATION[simulationIndexFor(stopId)];
  if (!step) {
    throw new Error(`La parada ${stopId} no pertenece a la simulación.`);
  }
  return step;
}

/** Índice siguiente con loop; tras `done` vuelve a la primera parada. */
export function nextSimulationIndex(index: number): number {
  return (index + 1) % CYCLE_SIMULATION.length;
}

/** Duración de la parada antes de avanzar o reiniciar. */
export function simulationDurationMs(stopId: CycleStopId): number {
  return simulationStepFor(stopId).durationMs;
}
