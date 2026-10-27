import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { FaqPage, FAQ_PATH } from "@/features/faq";

const docsPage = getDocsPageOrThrow(FAQ_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <FaqPage />;
}
