import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { CONCEPTOS_SDD_PATH, DocsContentPage } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(CONCEPTOS_SDD_PATH);

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/conceptos/sdd">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;

  return pageMetadata(parent, {
    lang,
    path: "/docs/conceptos/sdd",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsContentPage path={CONCEPTOS_SDD_PATH} />;
}
