import { getCurrentProductCopy } from "@/features/product/copy/server";
import { EVIDENCE } from "@/features/product/data/evidence";
import type { EvidenceSource, EvidenceSourceId } from "@/features/product/types";

type EvidenceTableProps = {
  ids: EvidenceSourceId[];
};

/**
 * Evidencia externa como dossier: fuente y fecha, lo que muestra el caso y la
 * implicación para REI. Cada fuente enlaza a su origen; nada se resume sin
 * enlace.
 */
export async function EvidenceTable({ ids }: EvidenceTableProps) {
  const copy = await getCurrentProductCopy();
  const sources = ids
    .map((id) => EVIDENCE.find((source) => source.id === id))
    .filter((source): source is EvidenceSource => Boolean(source));

  return (
    <div>
      <p className="type-meta-sm text-muted-strong">
        {copy.evidence.intro}
      </p>

      <ol className="mt-3 border-t border-hairline-strong">
        {sources.map((source, index) => (
          <li
            key={source.id}
            className="grid gap-4 border-b border-hairline py-5 lg:grid-cols-[16rem_1fr] lg:gap-10"
          >
            <div className="min-w-0">
              <p className="type-meta-sm text-muted-strong tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </p>
              <a
                className="mt-1.5 inline-flex border-b border-border-strong pb-0.5 type-docs font-medium text-foreground transition-colors duration-(--duration-fast) hover:border-foreground"
                href={source.url}
                target="_blank"
                rel="noreferrer"
              >
                {copy.evidence.sources[source.id].title}
                <span aria-hidden="true" className="ml-1.5 text-muted-strong">
                  ↗
                </span>
              </a>
              <p className="mt-1.5 type-meta-sm text-muted-strong">
                {copy.evidence.sources[source.id].date}
              </p>
            </div>

            <div className="min-w-0">
              <p className="max-w-[64ch] type-body text-secondary">
                {copy.evidence.sources[source.id].finding}
              </p>

              <div className="mt-3 border-l border-border-strong pl-4">
                <p className="type-meta-sm text-muted-strong">{copy.evidence.implication}</p>
                <p className="mt-1 max-w-[58ch] type-body text-foreground">
                  {copy.evidence.sources[source.id].implication}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
