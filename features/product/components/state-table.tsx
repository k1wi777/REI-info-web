import { WORK_ITEM_STATES } from "@/content/rei";
import type { WorkItemState, WorkItemStateId } from "@/content/rei";
import { cn } from "@/lib/cn";

type StateTableProps = {
  stateIds: WorkItemStateId[];
};

/**
 * Ciclo de vida como registro: los cinco estados del ciclo en orden, luego
 * las ramas aparte. `done` va en verde y lo dice el texto «terminal»; el color
 * nunca es el único portador de significado.
 */
export function StateTable({ stateIds }: StateTableProps) {
  const states = stateIds
    .map((id) => WORK_ITEM_STATES.find((state) => state.id === id))
    .filter((state): state is WorkItemState => Boolean(state));

  const cycle = states.filter((state) => state.kind === "cycle");
  const branches = states.filter((state) => state.kind === "branch");

  return (
    <div>
      <p className="type-meta-sm text-muted-strong">Ciclo · cinco estados</p>

      <ol className="mt-3 border-t border-hairline-strong">
        {cycle.map((state, index) => (
          <li
            key={state.id}
            className="grid grid-cols-[1.5rem_1fr] gap-x-3 gap-y-1.5 border-b border-hairline py-3 sm:grid-cols-[1.75rem_11rem_1fr] sm:items-baseline"
          >
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
