import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsContentPage, REFERENCIA_ADAPTADORES_PATH } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(REFERENCIA_ADAPTADORES_PATH);

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/referencia/adaptadores">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;

  return pageMetadata(parent, {
    lang,
    path: "/docs/referencia/adaptadores",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsContentPage path={REFERENCIA_ADAPTADORES_PATH} />;
}
