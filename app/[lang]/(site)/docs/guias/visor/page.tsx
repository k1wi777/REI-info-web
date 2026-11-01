import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsContentPage, GUIAS_VISOR_PATH } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(GUIAS_VISOR_PATH);

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/guias/visor">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;

  return pageMetadata(parent, {
    lang,
    path: "/docs/guias/visor",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsContentPage path={GUIAS_VISOR_PATH} />;
}
