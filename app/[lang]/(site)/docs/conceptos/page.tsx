import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { CONCEPTOS_MODE_PATH, DocsModeLandingPage } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(CONCEPTOS_MODE_PATH);

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/conceptos">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;

  return pageMetadata(parent, {
    lang,
    path: "/docs/conceptos",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsModeLandingPage mode="conceptos" />;
}
