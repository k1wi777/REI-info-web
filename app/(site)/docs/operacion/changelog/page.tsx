import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsContentPage, OPERACION_CHANGELOG_PATH } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(OPERACION_CHANGELOG_PATH);

export async function generateMetadata(
  _props: PageProps<"/docs/operacion/changelog">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/docs/operacion/changelog",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsContentPage path={OPERACION_CHANGELOG_PATH} />;
}
