import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { CONCEPTOS_SDD_PATH, DocsContentPage } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(CONCEPTOS_SDD_PATH);

export async function generateMetadata(
  _props: PageProps<"/docs/conceptos/sdd">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/docs/conceptos/sdd",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsContentPage path={CONCEPTOS_SDD_PATH} />;
}
