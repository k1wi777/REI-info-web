import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { CONCEPTOS_MODE_PATH, DocsModeLandingPage } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(CONCEPTOS_MODE_PATH);

export async function generateMetadata(
  _props: PageProps<"/docs/conceptos">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/docs/conceptos",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsModeLandingPage mode="conceptos" />;
}
