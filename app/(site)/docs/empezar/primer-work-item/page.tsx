import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import {
  FirstWorkItemPage,
  FIRST_WORK_ITEM_PATH,
} from "@/features/first-work-item";

const docsPage = getDocsPageOrThrow(FIRST_WORK_ITEM_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <FirstWorkItemPage />;
}
