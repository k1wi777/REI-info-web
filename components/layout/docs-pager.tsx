import { LocaleLink } from "@/components/ui/locale-link";
import { getDictionary } from "@/content/i18n";
import { getContentLocale } from "@/content/i18n/coverage";
import { getDocsPageText } from "@/content/i18n/docs-nav";
import { getCurrentLocale } from "@/content/i18n/server";
import { getDocsPager } from "@/content/site";

type DocsPagerProps = {
  path: string;
};

/**
 * Navegación anterior/siguiente calculada del árbol de documentación. Las
 * etiquetas siguen el idioma del contenido de `path`; cada título, el de su
 * página de destino.
 */
export async function DocsPager({ path }: DocsPagerProps) {
  const { previous, next } = getDocsPager(path);

  if (!previous && !next) {
    return null;
  }

  const lang = await getCurrentLocale();
  const contentLang = getContentLocale(lang, path);
  const { docs } = getDictionary(contentLang);
  const titleOf = (target: string) => {
    const { title } = getDocsPageText(lang, target);
    return {
      text: title.text,
      lang: title.lang === contentLang ? undefined : title.lang,
    };
  };
  const previousTitle = previous ? titleOf(previous.path) : undefined;
  const nextTitle = next ? titleOf(next.path) : undefined;

  return (
    <nav
      aria-label={docs.pagerLabel}
      className="mt-10 grid gap-3 border-t border-hairline pt-6 sm:grid-cols-2"
    >
      {previous && previousTitle ? (
        <LocaleLink
          className="group flex flex-col gap-1 border border-hairline p-4 transition-colors duration-(--duration-fast) hover:border-border-strong"
          href={previous.path}
        >
          <span className="type-meta-sm text-muted-strong">
            {docs.previous}
          </span>
          <span lang={previousTitle.lang} className="type-docs text-foreground">
            {previousTitle.text}
          </span>
        </LocaleLink>
      ) : (
        <span aria-hidden="true" />
      )}

      {next && nextTitle ? (
        <LocaleLink
          className="group flex flex-col gap-1 border border-hairline p-4 transition-colors duration-(--duration-fast) hover:border-border-strong sm:text-right"
          href={next.path}
        >
          <span className="type-meta-sm text-muted-strong">{docs.next}</span>
          <span lang={nextTitle.lang} className="type-docs text-foreground">
            {nextTitle.text}
          </span>
        </LocaleLink>
      ) : null}
    </nav>
  );
}
