import { InlineText } from "@/components/ui/inline-text";
import { APPROVAL_GATE } from "@/content/rei";
import { PRODUCT_FLOW } from "@/features/product/data/flow";

/**
 * Flujo ordenado de un Work Item. La banda en alfa es la puerta de aprobación
 * y toma su texto del dato canónico, sin animación ni botones falsos.
 */
export function FlowSteps() {
  return (
    <ol className="border-t border-hairline-strong">
      {PRODUCT_FLOW.map((step, index) =>
        step.gate ? (
          <li
            key={step.id}
            className="my-3 border border-accent/40 bg-accent/10 px-4 py-3.5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="type-meta text-accent-text">
                {APPROVAL_GATE.label}
              </p>
              <p className="type-meta text-accent-text">
                {APPROVAL_GATE.status}
              </p>
            </div>
            <p className="mt-2 type-docs text-secondary">
              {APPROVAL_GATE.detail}
            </p>
          </li>
        ) : (
          <li
            key={step.id}
            className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-hairline py-3 sm:grid-cols-[2.5rem_10rem_1fr] sm:items-baseline"
          >
            <span className="type-meta-sm text-muted-strong">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="type-meta text-foreground">{step.actor}</span>
            <span className="col-span-2 mt-1 type-docs text-secondary sm:col-span-1 sm:mt-0">
              <InlineText text={step.description} />
            </span>
          </li>
        ),
      )}
    </ol>
  );
}
