import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import {
  FirstWorkItemPage,
  FIRST_WORK_ITEM_PATH,
} from "@/features/first-work-item";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(FIRST_WORK_ITEM_PATH);

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/empezar/primer-work-item">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;

  return pageMetadata(parent, {
    lang,
    path: "/docs/empezar/primer-work-item",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <FirstWorkItemPage />;
}
