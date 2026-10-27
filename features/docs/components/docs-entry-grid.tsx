import Link from "next/link";
import type { DocsEntry } from "@/features/docs/types";

type DocsEntryGridProps = {
  entries: DocsEntry[];
};

/** Rejilla de tarjetas de documentación; no conoce rutas fuera de las recibidas. */
export function DocsEntryGrid({ entries }: DocsEntryGridProps) {
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
      {entries.map((entry) => (
        <li key={entry.href}>
          <Link
            href={entry.href}
            className="flex h-full flex-col border border-hairline p-5 transition-colors duration-(--duration-fast) hover:border-border-strong"
          >
            <span className="type-meta-sm text-muted-strong">
              {entry.mode}
            </span>
            <h2 className="mt-3 type-docs-heading text-foreground">
              {entry.title}
            </h2>
            <span className="mt-2 type-docs text-secondary">
              {entry.description}
            </span>
            <span className="mt-5 type-meta text-foreground">
              Abrir <span aria-hidden="true">→</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
