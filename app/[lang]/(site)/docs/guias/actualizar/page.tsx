import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsContentPage, GUIAS_ACTUALIZAR_PATH } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(GUIAS_ACTUALIZAR_PATH);

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/guias/actualizar">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;

  return pageMetadata(parent, {
    lang,
    path: "/docs/guias/actualizar",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsContentPage path={GUIAS_ACTUALIZAR_PATH} />;
}
