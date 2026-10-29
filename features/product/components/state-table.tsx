import { Fragment } from "react";
import { APPROVAL_GATE, WORK_ITEM_STATES } from "@/content/rei";
import type { WorkItemState, WorkItemStateId } from "@/content/rei";
import { cn } from "@/lib/cn";

type StateTableProps = {
  stateIds: WorkItemStateId[];
};

type MapNode =
  | { type: "state"; state: WorkItemState }
  | { type: "gate" };

/**
 * Mapa compacto del recorrido: los cinco estados y la puerta en su sitio. Es
 * una síntesis visual del registro que viene debajo, por eso no repite texto
 * para lectores de pantalla.
 */
function CycleMap({ cycle }: { cycle: WorkItemState[] }) {
  const gateIndex = cycle.findIndex((state) => state.id === "ready");
  const showGate =
    gateIndex >= 0 && cycle[gateIndex + 1]?.id === "in_progress";

  const nodes: MapNode[] = [];

  cycle.forEach((state, index) => {
    nodes.push({ type: "state", state });
    if (showGate && index === gateIndex) {
      nodes.push({ type: "gate" });
    }
  });

  const inset = 100 / (nodes.length * 2);

  return (
    <div aria-hidden="true" className="hidden sm:block">
      <div className="flex items-baseline justify-between gap-4">
        <p className="type-meta-sm text-muted-strong">Ciclo · recorrido</p>
        <p className="type-meta-sm text-muted-strong">
          Puerta entre ready e in_progress
        </p>
      </div>

      <div className="relative mt-4">
        <span
          className="absolute top-[5px] h-px bg-hairline-strong"
          style={{ left: `${inset}%`, right: `${inset}%` }}
        />

        <ol
          className="relative grid"
          style={{
            gridTemplateColumns: `repeat(${nodes.length}, minmax(0, 1fr))`,
          }}
        >
          {nodes.map((node) => {
            if (node.type === "gate") {
              return (
                <li
                  key="gate"
                  className="flex min-w-0 flex-col items-center gap-2.5 text-center"
                >
                  <span className="h-4 w-[3px] bg-accent/70" />
                  <span className="type-meta-sm text-accent-text">
                    Aprobación
                  </span>
                </li>
              );
            }

            const { state } = node;

            return (
              <li
                key={state.id}
                className="flex min-w-0 flex-col items-center gap-2.5 text-center"
              >
                <span
                  className={cn(
                    "size-[11px] rounded-full border",
                    state.id === "done"
                      ? "border-success bg-success"
                      : "border-border-strong bg-canvas",
                  )}
                />
                <span
                  className={cn(
                    "type-meta-sm",
                    state.id === "done"
                      ? "text-success"
                      : "text-muted-strong",
                  )}
                >
                  {state.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/**
 * Ciclo de vida como registro: los cinco estados del ciclo en orden con la
 * puerta entre ready e in_progress, luego las ramas aparte. `done` va en verde
 * y lo dice el texto «terminal»; el color nunca es el único portador.
 */
export function StateTable({ stateIds }: StateTableProps) {
  const states = stateIds
    .map((id) => WORK_ITEM_STATES.find((state) => state.id === id))
    .filter((state): state is WorkItemState => Boolean(state));

  const cycle = states.filter((state) => state.kind === "cycle");
  const branches = states.filter((state) => state.kind === "branch");
  const gateIndex = cycle.findIndex((state) => state.id === "ready");
  const showGate =
    gateIndex >= 0 && cycle[gateIndex + 1]?.id === "in_progress";

  return (
    <div>
      <CycleMap cycle={cycle} />

      <ol className="mt-6 border-t border-hairline-strong sm:mt-7">
        {cycle.map((state, index) => (
          <Fragment key={state.id}>
            <li className="grid grid-cols-[1.5rem_1fr] gap-x-3 gap-y-1.5 border-b border-hairline py-3 sm:grid-cols-[1.75rem_11rem_1fr] sm:items-baseline">
              <span className="type-meta-sm text-muted-strong tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span
                  className={cn(
                    "type-code",
                    state.id === "done" ? "text-success" : "text-foreground",
                  )}
                >
                  {state.label}
                </span>
                {state.terminal ? (
                  <span className="type-meta-sm text-success">terminal</span>
                ) : null}
              </span>
              <span className="col-start-2 type-body text-secondary sm:col-start-3">
                {state.meaning}
              </span>
            </li>

            {showGate && index === gateIndex ? (
              <li className="grid grid-cols-[1.5rem_1fr] gap-x-3 gap-y-1.5 border-b border-accent/40 bg-accent/10 py-3 sm:grid-cols-[1.75rem_11rem_1fr] sm:items-baseline">
                <span aria-hidden="true" className="flex h-4 items-center">
                  <span className="h-4 w-[3px] bg-accent/70" />
                </span>
                <span className="min-w-0">
                  <span className="block type-code text-accent-text">
                    {APPROVAL_GATE.label}
                  </span>
                  <span className="mt-0.5 block type-meta-sm text-accent-text">
                    firma humana
                  </span>
                </span>
                <span className="col-start-2 max-w-[58ch] type-body text-secondary sm:col-start-3">
                  {APPROVAL_GATE.detail}
                </span>
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>

      {branches.length > 0 ? (
        <>
          <p className="mt-7 type-meta-sm text-muted-strong">
            Ramas · fuera del ciclo
          </p>

          <ul className="mt-3 border-t border-dashed border-border-strong">
            {branches.map((state) => (
              <li
                key={state.id}
                className="grid grid-cols-[1.5rem_1fr] gap-x-3 gap-y-1.5 border-b border-hairline py-3 sm:grid-cols-[1.75rem_11rem_1fr] sm:items-baseline"
              >
                <span aria-hidden="true" className="type-code text-muted-strong">
                  ↳
                </span>
                <span className="type-code text-foreground">{state.label}</span>
                <span className="col-start-2 type-body text-secondary sm:col-start-3">
                  {state.meaning}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-3 type-caption text-muted-strong">
            Ramas, no atajos: describen trabajo detenido o una revisión que exige
            correcciones.
          </p>
        </>
      ) : null}
    </div>
  );
}
