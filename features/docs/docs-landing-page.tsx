import { LocaleLink } from "@/components/ui/locale-link";
import { getCurrentLocale } from "@/content/i18n/server";
import { DocsEntryGrid } from "@/features/docs/components/docs-entry-grid";
import { getDocsLandingCopy } from "@/features/docs/copy";
import { buildDocsEntries } from "@/features/docs/data/entries";

const LINK_CLASS =
  "-mt-1.5 border-b border-border-strong pb-0.5 pt-1.5 type-meta text-foreground transition-colors duration-(--duration-fast) hover:border-foreground";

/** Landing de documentación: orienta por intención, sin UI falsa. */
export async function DocsLandingPage() {
  const lang = await getCurrentLocale();
  const copy = getDocsLandingCopy(lang);

  return (
    <div>
      <header className="border-b border-hairline pb-6">
        <p className="type-meta text-muted-strong">{copy.eyebrow}</p>
        <h1 className="type-docs-title mt-3 text-foreground">{copy.title}</h1>
        <p className="mt-3 max-w-(--container-reading) type-docs text-secondary">
          {copy.intro}
        </p>
      </header>

      <DocsEntryGrid entries={buildDocsEntries(lang)} lang={lang} />

      <section
        aria-labelledby="ruta-recomendada"
        className="mt-10 border-t border-hairline pt-6"
      >
        <h2 id="ruta-recomendada" className="type-meta text-muted-strong">
          {copy.recommended.heading}
        </h2>
        <p className="mt-3 max-w-(--container-reading) type-docs text-secondary">
          {copy.recommended.text}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <LocaleLink className={LINK_CLASS} href="/docs/empezar/instalacion">
            {copy.recommended.install}
          </LocaleLink>
          <LocaleLink
            className={LINK_CLASS}
            href="/docs/empezar/primer-work-item"
          >
            {copy.recommended.firstWorkItem}
          </LocaleLink>
        </div>
      </section>
    </div>
  );
}
