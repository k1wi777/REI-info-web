import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageText } from "@/content/i18n/docs-nav";
import { DocsContentPage, OPERACION_TROUBLESHOOTING_PATH } from "@/features/docs";
import { toLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/operacion/troubleshooting">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const docsPage = getDocsPageText(toLocale(lang), OPERACION_TROUBLESHOOTING_PATH);

  return pageMetadata(parent, {
    lang,
    path: "/docs/operacion/troubleshooting",
    title: docsPage.title.text,
    description: docsPage.description.text,
  });
}

export default function Page() {
  return <DocsContentPage path={OPERACION_TROUBLESHOOTING_PATH} />;
}
