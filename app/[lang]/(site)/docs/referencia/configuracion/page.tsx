import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageText } from "@/content/i18n/docs-nav";
import {
  DocsContentPage,
  REFERENCIA_CONFIGURACION_PATH,
} from "@/features/docs";
import { toLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/referencia/configuracion">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const docsPage = getDocsPageText(toLocale(lang), REFERENCIA_CONFIGURACION_PATH);

  return pageMetadata(parent, {
    lang,
    path: "/docs/referencia/configuracion",
    title: docsPage.title.text,
    description: docsPage.description.text,
  });
}

export default function Page() {
  return <DocsContentPage path={REFERENCIA_CONFIGURACION_PATH} />;
}
