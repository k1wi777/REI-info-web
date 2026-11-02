import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageText } from "@/content/i18n/docs-nav";
import {
  FirstWorkItemPage,
  FIRST_WORK_ITEM_PATH,
} from "@/features/first-work-item";
import { toLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/empezar/primer-work-item">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const docsPage = getDocsPageText(toLocale(lang), FIRST_WORK_ITEM_PATH);

  return pageMetadata(parent, {
    lang,
    path: "/docs/empezar/primer-work-item",
    title: docsPage.title.text,
    description: docsPage.description.text,
  });
}

export default function Page() {
  return <FirstWorkItemPage />;
}
