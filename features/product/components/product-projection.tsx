import { InlineText } from "@/components/ui/inline-text";
import { getCurrentProductCopy } from "@/features/product/copy/server";

const TARGET_IDS = ["issue", "branch", "pr"] as const;

/**
 * Diagrama de proyección: la fuente a la izquierda y los tres destinos de
 * GitHub a la derecha. Sin capturas simuladas ni estado inventado.
 */
export async function ProductProjection() {
  const copy = (await getCurrentProductCopy()).projection;
  return (
    <div className="min-w-0 border border-hairline-strong bg-surface-deep p-5 sm:p-6">
      <p className="type-meta text-muted-strong">{copy.title}</p>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="break-words type-code text-foreground">
          .rei/specs/&lt;id&gt;/
        </p>
        <span className="type-meta-sm text-muted-strong">
          {copy.source}
        </span>
      </div>

      <p className="mt-2 max-w-[52ch] type-body text-secondary">
        {copy.sourceNote}
      </p>

      <svg
        aria-hidden="true"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        className="mt-4 hidden h-5 w-full text-border-strong sm:block"
      >
        <path
          d="M50 0v8M16 8h68M16 8v12M50 8v12M84 8v12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ul className="mt-2 grid border-t border-hairline sm:grid-cols-3 sm:divide-x sm:divide-hairline">
        {TARGET_IDS.map((id) => (
          <li key={id} className="min-w-0 py-3 sm:px-3 sm:first:pl-0">
            <p className="type-meta text-foreground">{copy.targets[id].title}</p>
            <p className="mt-1.5 type-caption text-secondary">
              <InlineText text={copy.targets[id].text} />
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-4 border-t border-hairline pt-3 type-caption text-muted-strong">
        {copy.optionalBefore}{" "}
        <code className="type-code text-foreground">rei github enable</code> {copy.optionalAfter}
      </p>
    </div>
  );
}
