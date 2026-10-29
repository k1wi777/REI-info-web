import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsModeLandingPage, REFERENCIA_MODE_PATH } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(REFERENCIA_MODE_PATH);

export async function generateMetadata(
  _props: PageProps<"/docs/referencia">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/docs/referencia",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsModeLandingPage mode="referencia" />;
}
