import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import {
  CONCEPTOS_APROBACION_HUMANA_PATH,
  DocsContentPage,
} from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(CONCEPTOS_APROBACION_HUMANA_PATH);

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/conceptos/aprobacion-humana">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;

  return pageMetadata(parent, {
    lang,
    path: "/docs/conceptos/aprobacion-humana",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsContentPage path={CONCEPTOS_APROBACION_HUMANA_PATH} />;
}
