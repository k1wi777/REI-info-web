import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsContentPage, REFERENCIA_META_PATH } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(REFERENCIA_META_PATH);

export async function generateMetadata(
  _props: PageProps<"/docs/referencia/meta">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/docs/referencia/meta",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsContentPage path={REFERENCIA_META_PATH} />;
}
