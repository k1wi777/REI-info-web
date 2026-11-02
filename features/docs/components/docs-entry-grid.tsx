import { LocaleLink } from "@/components/ui/locale-link";
import { getDictionary } from "@/content/i18n";
import type { DocsEntry } from "@/features/docs/types";
import type { Locale } from "@/lib/i18n";

type DocsEntryGridProps = {
  entries: DocsEntry[];
  /** Idioma del contenedor; las tarjetas con otro idioma lo declaran. */
  lang: Locale;
};

/** Rejilla de tarjetas de documentación; no conoce rutas fuera de las recibidas. */
export function DocsEntryGrid({ entries, lang }: DocsEntryGridProps) {
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
      {entries.map((entry) => {
        const entryLang = entry.lang ?? lang;

        return (
          <li key={entry.href}>
            <LocaleLink
              href={entry.href}
              lang={entryLang === lang ? undefined : entryLang}
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
                {getDictionary(entryLang).docs.open}{" "}
                <span aria-hidden="true">→</span>
              </span>
            </LocaleLink>
          </li>
        );
      })}
    </ul>
  );
}
