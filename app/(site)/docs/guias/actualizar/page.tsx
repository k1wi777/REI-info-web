import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsContentPage, GUIAS_ACTUALIZAR_PATH } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(GUIAS_ACTUALIZAR_PATH);

export async function generateMetadata(
  _props: PageProps<"/docs/guias/actualizar">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/docs/guias/actualizar",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsContentPage path={GUIAS_ACTUALIZAR_PATH} />;
}
