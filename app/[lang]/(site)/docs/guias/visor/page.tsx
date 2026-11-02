import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageText } from "@/content/i18n/docs-nav";
import { DocsContentPage, GUIAS_VISOR_PATH } from "@/features/docs";
import { toLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/guias/visor">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const docsPage = getDocsPageText(toLocale(lang), GUIAS_VISOR_PATH);

  return pageMetadata(parent, {
    lang,
    path: "/docs/guias/visor",
    title: docsPage.title.text,
    description: docsPage.description.text,
  });
}

export default function Page() {
  return <DocsContentPage path={GUIAS_VISOR_PATH} />;
}
