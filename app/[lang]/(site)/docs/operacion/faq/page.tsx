import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageText } from "@/content/i18n/docs-nav";
import { FaqPage, FAQ_PATH } from "@/features/faq";
import { toLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/operacion/faq">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const docsPage = getDocsPageText(toLocale(lang), FAQ_PATH);

  return pageMetadata(parent, {
    lang,
    path: "/docs/operacion/faq",
    title: docsPage.title.text,
    description: docsPage.description.text,
  });
}

export default function Page() {
  return <FaqPage />;
}
