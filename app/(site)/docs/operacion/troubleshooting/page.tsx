import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsContentPage, OPERACION_TROUBLESHOOTING_PATH } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(OPERACION_TROUBLESHOOTING_PATH);

export async function generateMetadata(
  _props: PageProps<"/docs/operacion/troubleshooting">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/docs/operacion/troubleshooting",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsContentPage path={OPERACION_TROUBLESHOOTING_PATH} />;
}
