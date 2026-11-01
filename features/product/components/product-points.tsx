import { InlineText } from "@/components/ui/inline-text";
import { getCurrentProductCopy } from "@/features/product/copy/server";
import type { ProductPoint } from "@/features/product/types";
import { cn } from "@/lib/cn";

type ProductPointsProps = {
  points: ProductPoint[];
  variant?: "ledger" | "manifesto" | "columns" | "limits";
};

function PointTitle({ point, className }: { point: ProductPoint; className?: string }) {
  return (
    <h3 className={cn("text-balance font-medium text-foreground", className)}>
      <InlineText text={point.title} />
    </h3>
  );
}

/**
 * Listas con estructura propia según lo que pesan: el problema y el mecanismo
 * se leen como ledger, los principios como manifiesto y los límites como
 * espacio negativo con marca textual, nunca con color.
 */
export async function ProductPoints({
  points,
  variant = "ledger",
}: ProductPointsProps) {
  const { gate } = await getCurrentProductCopy();
  if (variant === "manifesto") {
    return (
      <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {points.map((point, index) => (
          <li
            key={point.title}
            className="border-t border-hairline-strong pt-4"
          >
            <p className="type-meta-sm text-muted-strong tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </p>
            <PointTitle
              point={point}
              className="mt-2 type-docs-heading"
            />
            <p className="mt-2 type-body text-secondary">
              <InlineText text={point.detail} />
            </p>
          </li>
        ))}
      </ol>
    );
  }

  if (variant === "columns") {
    return (
      <ol className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {points.map((point) => (
          <li key={point.title} className="border-t border-hairline-strong pt-3.5">
            <PointTitle point={point} className="type-docs" />
            <p className="mt-1.5 type-docs text-secondary">
              <InlineText text={point.detail} />
            </p>
          </li>
        ))}
      </ol>
    );
  }

  if (variant === "limits") {
    return (
      <ol className="border-t border-hairline-strong">
        {points.map((point) => (
          <li
            key={point.title}
            className="grid grid-cols-[1.5rem_1fr] gap-x-3 gap-y-1 border-b border-hairline py-4 sm:grid-cols-[1.5rem_15rem_1fr] sm:items-baseline sm:gap-6"
          >
            <span
              aria-hidden="true"
              className="type-code text-muted-strong"
            >
              ×
            </span>
            <PointTitle point={point} className="type-docs" />
            <p className="col-start-2 type-body text-secondary sm:col-start-3">
              <InlineText text={point.detail} />
            </p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="border-t border-hairline-strong">
      {points.map((point, index) =>
        point.gate ? (
          <li
            key={point.title}
            className="grid grid-cols-[1.5rem_1fr] gap-x-3 gap-y-2 border-b border-accent/40 bg-accent/10 px-4 py-4 sm:grid-cols-[1.5rem_15rem_1fr] sm:items-baseline sm:gap-6 sm:px-5"
          >
            <span className="type-meta-sm text-accent-text tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="type-meta text-accent-text">
              {gate.label}
            </p>
            <p className="col-start-2 type-body text-secondary sm:col-start-3">
              <InlineText text={point.detail} />
            </p>
          </li>
        ) : (
          <li
            key={point.title}
            className="grid grid-cols-[1.5rem_1fr] gap-x-3 gap-y-1 border-b border-hairline py-4 sm:grid-cols-[1.5rem_15rem_1fr] sm:items-baseline sm:gap-6"
          >
            <span className="type-meta-sm text-muted-strong tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <PointTitle point={point} className="type-docs" />
            <p className="col-start-2 type-body text-secondary sm:col-start-3">
              <InlineText text={point.detail} />
            </p>
          </li>
        ),
      )}
    </ol>
  );
}
