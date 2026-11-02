import { DocBlockView } from "@/components/layout/doc-blocks";
import { DocsPager } from "@/components/layout/docs-pager";
import { getContentLocale } from "@/content/i18n/coverage";
import { getDocsNav } from "@/content/i18n/docs-nav";
import { getCurrentLocale } from "@/content/i18n/server";
import { DocsEntryGrid } from "@/features/docs/components/docs-entry-grid";
import { getDocsDocument } from "@/features/docs/copy/documents";
import { getDocsModeLandingCopy } from "@/features/docs/copy/modes";
import { isDocsContentPath } from "@/features/docs/data/pages";
import type { DocsEntry, DocsModeId } from "@/features/docs/types";

type DocsModeLandingPageProps = {
  mode: DocsModeId;
};

/** Landing de un modo: intro, tarjetas derivadas del árbol y pager. */
export async function DocsModeLandingPage({ mode }: DocsModeLandingPageProps) {
  const lang = await getCurrentLocale();
  const section = getDocsNav(lang).find((candidate) => candidate.id === mode);

  if (!section) {
    throw new Error(`El modo de documentación no existe: ${mode}`);
  }

  const page = section.pages.find((candidate) => candidate.path === section.path);

  if (!page) {
    throw new Error(`El modo de documentación no tiene landing: ${mode}`);
  }

  const landing = getDocsModeLandingCopy(
    mode,
    getContentLocale(lang, section.path),
  );

  const entries: DocsEntry[] = section.pages
    .filter((candidate) => candidate.path !== section.path)
    .map((candidate) => ({
      title: candidate.title.text,
      mode: isDocsContentPath(candidate.path)
        ? getDocsDocument(candidate.path, candidate.title.lang).eyebrow
        : section.label.text,
      description: candidate.description.text,
      href: candidate.path,
      lang: candidate.title.lang,
    }));

  return (
    <div>
      <header className="border-b border-hairline pb-6">
        <p className="type-meta text-muted-strong">{section.label.text}</p>
        <h1 className="type-docs-title mt-3 text-foreground">
          {page.title.text}
        </h1>
        <p className="mt-3 max-w-(--container-reading) type-docs text-secondary">
          {page.description.text}
        </p>
        <p className="mt-4 max-w-(--container-reading) type-docs text-secondary">
          {landing.intro}
        </p>
      </header>

      <DocsEntryGrid entries={entries} lang={lang} />

      {landing.outro ? (
        <div className="mt-10 flex flex-col gap-4 border-t border-hairline pt-6">
          {landing.outro.map((block, index) => (
            <DocBlockView key={`${mode}-outro-${index}`} block={block} />
          ))}
        </div>
      ) : null}

      <DocsPager path={section.path} />
    </div>
  );
}
