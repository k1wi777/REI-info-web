import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { CONCEPTOS_MODO_DIRECTO_PATH, DocsContentPage } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(CONCEPTOS_MODO_DIRECTO_PATH);

export async function generateMetadata(
  _props: PageProps<"/docs/conceptos/modo-directo">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/docs/conceptos/modo-directo",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsContentPage path={CONCEPTOS_MODO_DIRECTO_PATH} />;
}
