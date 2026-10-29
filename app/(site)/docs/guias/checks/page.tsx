import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsContentPage, GUIAS_CHECKS_PATH } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(GUIAS_CHECKS_PATH);

export async function generateMetadata(
  _props: PageProps<"/docs/guias/checks">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/docs/guias/checks",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsContentPage path={GUIAS_CHECKS_PATH} />;
}
