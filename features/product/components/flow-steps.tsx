import { InlineText } from "@/components/ui/inline-text";
import { StatusTag } from "@/components/ui/status-tag";
import { APPROVAL_GATE } from "@/content/rei";
import { PRODUCT_FLOW } from "@/features/product/data/flow";

/**
 * Flujo ordenado de un Work Item. La puerta conserva su número en la serie y
 * ocupa el ancho completo; es la única banda violeta de la página.
 */
export function FlowSteps() {
  return (
    <ol className="border-t border-hairline-strong">
      {PRODUCT_FLOW.map((step, index) =>
        step.gate ? (
          <li
            key={step.id}
            className="grid grid-cols-[1.5rem_1fr] gap-x-3 gap-y-2 border-b border-accent/40 bg-accent/10 px-4 py-4 sm:grid-cols-[1.75rem_14rem_1fr] sm:items-baseline sm:gap-6 sm:px-5 sm:py-5"
          >
            <span className="type-meta-sm text-accent-text tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex flex-col items-start gap-2">
              <p className="type-meta text-accent-text">
                {APPROVAL_GATE.label}
              </p>
              <StatusTag tone="accent">{APPROVAL_GATE.status}</StatusTag>
            </div>

            <p className="col-start-2 max-w-[58ch] type-body text-secondary sm:col-start-3">
              {APPROVAL_GATE.detail}
            </p>
          </li>
        ) : (
          <li
            key={step.id}
            className="grid grid-cols-[1.5rem_1fr] gap-x-3 gap-y-1.5 border-b border-hairline py-4 sm:grid-cols-[1.75rem_14rem_1fr] sm:items-baseline sm:gap-6"
          >
            <span className="type-meta-sm text-muted-strong tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="type-meta text-foreground">{step.actor}</p>
            <p className="col-start-2 max-w-[58ch] type-body text-secondary sm:col-start-3">
              <InlineText text={step.description} />
            </p>
          </li>
        ),
      )}
    </ol>
  );
}
