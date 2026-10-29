import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import {
  FirstWorkItemPage,
  FIRST_WORK_ITEM_PATH,
} from "@/features/first-work-item";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(FIRST_WORK_ITEM_PATH);

export async function generateMetadata(
  _props: PageProps<"/docs/empezar/primer-work-item">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/docs/empezar/primer-work-item",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <FirstWorkItemPage />;
}
