import { DocBlockView } from "@/components/layout/doc-blocks";
import { DocsPager } from "@/components/layout/docs-pager";
import { DOCS_SECTIONS, getDocsPageOrThrow } from "@/content/site";
import { DocsEntryGrid } from "@/features/docs/components/docs-entry-grid";
import { DOCS_MODE_LANDINGS } from "@/features/docs/data/modes";
import {
  DOCS_DOCUMENTS,
  isDocsContentPath,
} from "@/features/docs/data/pages";
import type { DocsEntry, DocsModeId } from "@/features/docs/types";

type DocsModeLandingPageProps = {
  mode: DocsModeId;
};

/** Landing de un modo: intro, tarjetas derivadas del árbol y pager. */
export function DocsModeLandingPage({ mode }: DocsModeLandingPageProps) {
  const section = DOCS_SECTIONS.find((candidate) => candidate.id === mode);

  if (!section) {
    throw new Error(`El modo de documentación no existe: ${mode}`);
  }

  const page = getDocsPageOrThrow(section.path);
  const landing = DOCS_MODE_LANDINGS[mode];

  const entries: DocsEntry[] = section.pages
    .filter((candidate) => candidate.path !== section.path)
    .map((candidate) => ({
      title: candidate.title,
      mode: isDocsContentPath(candidate.path)
        ? DOCS_DOCUMENTS[candidate.path].eyebrow
        : section.label,
      description: candidate.description,
      href: candidate.path,
    }));

  return (
    <div>
      <header className="border-b border-hairline pb-6">
        <p className="type-meta text-muted-strong">{section.label}</p>
        <h1 className="type-docs-title mt-3 text-foreground">{page.title}</h1>
        <p className="mt-3 max-w-(--container-reading) type-docs text-secondary">
          {page.description}
        </p>
        <p className="mt-4 max-w-(--container-reading) type-docs text-secondary">
          {landing.intro}
        </p>
      </header>

      <DocsEntryGrid entries={entries} lang="es" />

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
