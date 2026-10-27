import { CYCLE_STATES } from "@/content/rei";
import { cn } from "@/lib/cn";

/**
 * Línea de cotas con los cinco estados del ciclo. `done` se distingue en verde
 * y el estado actual se anuncia con texto, nunca solo con color.
 */
export function StateScale() {
  const currentState = "ready";

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="type-meta text-muted-strong">Estados del ciclo</h2>
        <p className="type-meta-sm text-muted-strong">actual: {currentState}</p>
      </div>

      <div className="relative mt-5">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-[0.3125rem] h-px bg-hairline-strong"
        />
        <ol className="relative grid grid-cols-5 gap-1">
          {CYCLE_STATES.map((state) => {
            const isCurrent = state.id === currentState;
            const isDone = state.id === "done";

            return (
              <li key={state.id} className="flex flex-col gap-2">
                <span
                  aria-hidden="true"
                  className={cn(
                    "block size-2.5 rounded-full border",
                    isDone
                      ? "border-success bg-success"
                      : isCurrent
                        ? "border-foreground bg-canvas"
                        : "border-muted-strong bg-canvas",
                  )}
                />
                <span
                  className={cn(
                    "type-meta-sm",
                    isDone
                      ? "text-success"
                      : isCurrent
                        ? "text-foreground"
                        : "text-muted-strong",
                  )}
                >
                  {state.label}
                  {isCurrent ? (
                    <span className="sr-only"> (estado actual)</span>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="mt-4 type-meta-sm text-muted-strong">
        Solo un Work Item puede estar en in_progress a la vez.
      </p>
    </div>
  );
}
