import { DocArticle } from "@/components/layout/doc-article";
import { DocBlocks } from "@/components/layout/doc-blocks";
import { sectionsToToc } from "@/content/docs";
import { getDocsPageText } from "@/content/i18n/docs-nav";
import { getCurrentLocale } from "@/content/i18n/server";
import { getDocsDocument } from "@/features/docs/copy/documents";
import type { DocsContentPath } from "@/features/docs/types";

type DocsContentPageProps = {
  path: DocsContentPath;
};

/** Página de contenido: título del árbol, prosa del idioma y TOC derivado. */
export async function DocsContentPage({ path }: DocsContentPageProps) {
  const lang = await getCurrentLocale();
  const page = getDocsPageText(lang, path);
  const document = getDocsDocument(path, lang);

  return (
    <DocArticle
      path={path}
      eyebrow={document.eyebrow}
      title={page.title.text}
      description={page.description.text}
      meta={document.meta}
      toc={sectionsToToc(document.sections)}
    >
      <DocBlocks sections={document.sections} />
    </DocArticle>
  );
}
