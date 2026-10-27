import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsContentPage, OPERACION_CHANGELOG_PATH } from "@/features/docs";

const docsPage = getDocsPageOrThrow(OPERACION_CHANGELOG_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <DocsContentPage path={OPERACION_CHANGELOG_PATH} />;
}
