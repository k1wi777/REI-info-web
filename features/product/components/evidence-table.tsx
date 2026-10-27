import { EVIDENCE } from "@/features/product/data/evidence";
import type { EvidenceSource, EvidenceSourceId } from "@/features/product/types";

type EvidenceTableProps = {
  ids: EvidenceSourceId[];
};

const COLUMNS = ["Caso", "Qué muestra", "Qué implica"];

/** Tabla de evidencia externa: cada caso enlaza a su fuente en una pestaña nueva. */
export function EvidenceTable({ ids }: EvidenceTableProps) {
  const sources = ids
    .map((id) => EVIDENCE.find((source) => source.id === id))
    .filter((source): source is EvidenceSource => Boolean(source));

  return (
    <div className="min-w-0 max-w-full overflow-x-auto border border-hairline">
      <table className="w-full min-w-[44rem] border-collapse text-left">
        <caption className="border-b border-hairline px-3 py-2 text-left type-meta-sm text-muted-strong">
          Evidencia externa citada; cada caso enlaza a su fuente.
        </caption>
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th
                key={column}
                scope="col"
                className="border-b border-hairline-strong px-3 py-2 type-meta text-muted-strong"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => (
            <tr
              key={source.id}
              className="border-b border-hairline last:border-b-0"
            >
              <td className="px-3 py-3 align-top">
                <a
                  className="type-docs text-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-(--duration-fast) hover:text-accent-text"
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {source.title}
                </a>
                <span className="mt-1 block type-meta-sm text-muted-strong">
                  {source.date}
                </span>
              </td>
              <td className="px-3 py-3 align-top type-docs text-secondary">
                {source.finding}
              </td>
              <td className="px-3 py-3 align-top type-docs text-secondary">
                {source.implication}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
