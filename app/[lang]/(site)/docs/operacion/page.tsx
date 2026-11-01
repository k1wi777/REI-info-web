import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsModeLandingPage, OPERACION_MODE_PATH } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(OPERACION_MODE_PATH);

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/operacion">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;

  return pageMetadata(parent, {
    lang,
    path: "/docs/operacion",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsModeLandingPage mode="operacion" />;
}
