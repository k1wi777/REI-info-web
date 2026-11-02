import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageText } from "@/content/i18n/docs-nav";
import {
  CONCEPTOS_WORK_ITEMS_Y_ESTADOS_PATH,
  DocsContentPage,
} from "@/features/docs";
import { toLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/conceptos/work-items-y-estados">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const docsPage = getDocsPageText(toLocale(lang), CONCEPTOS_WORK_ITEMS_Y_ESTADOS_PATH);

  return pageMetadata(parent, {
    lang,
    path: "/docs/conceptos/work-items-y-estados",
    title: docsPage.title.text,
    description: docsPage.description.text,
  });
}

export default function Page() {
  return <DocsContentPage path={CONCEPTOS_WORK_ITEMS_Y_ESTADOS_PATH} />;
}
