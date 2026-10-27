import { DocArticle } from "@/components/layout/doc-article";
import { DocBlocks } from "@/components/layout/doc-blocks";
import { sectionsToToc } from "@/content/docs";
import { getDocsPageOrThrow } from "@/content/site";
import { DOCS_DOCUMENTS } from "@/features/docs/data/pages";
import type { DocsContentPath } from "@/features/docs/types";

type DocsContentPageProps = {
  path: DocsContentPath;
};

/** Página de contenido: título del árbol, prosa del registro y TOC derivado. */
export function DocsContentPage({ path }: DocsContentPageProps) {
  const page = getDocsPageOrThrow(path);
  const document = DOCS_DOCUMENTS[path];

  return (
    <DocArticle
      path={path}
      eyebrow={document.eyebrow}
      title={page.title}
      description={page.description}
      meta={document.meta}
      toc={sectionsToToc(document.sections)}
    >
      <DocBlocks sections={document.sections} />
    </DocArticle>
  );
}
