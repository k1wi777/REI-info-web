import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsContentPage, GUIAS_CHECKS_PATH } from "@/features/docs";

const docsPage = getDocsPageOrThrow(GUIAS_CHECKS_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <DocsContentPage path={GUIAS_CHECKS_PATH} />;
}
