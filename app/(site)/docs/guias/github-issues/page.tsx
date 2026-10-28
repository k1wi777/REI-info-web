import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsContentPage, GUIAS_GITHUB_ISSUES_PATH } from "@/features/docs";

const docsPage = getDocsPageOrThrow(GUIAS_GITHUB_ISSUES_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <DocsContentPage path={GUIAS_GITHUB_ISSUES_PATH} />;
}
