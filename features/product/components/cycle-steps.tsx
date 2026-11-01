import { getCurrentProductCopy } from "@/features/product/copy/server";
import { CyclePlayer } from "@/features/product/components/cycle-player";
import { resolveCycleStops } from "@/features/product/data/cycle";

/**
 * Simulación del ciclo. El servidor resuelve el texto del idioma y entrega al
 * componente cliente solo datos serializables, de modo que el navegador recibe
 * un único idioma.
 */
export async function CycleSteps() {
  const { cycle, states, gate } = await getCurrentProductCopy();
  const stops = resolveCycleStops({
    states,
    gateLabel: gate.label,
    gateDetail: gate.detail,
  });

  return <CyclePlayer stops={stops} copy={cycle} gateStatus={gate.status} />;
}
