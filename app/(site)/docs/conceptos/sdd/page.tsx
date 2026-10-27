import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { CONCEPTOS_SDD_PATH, DocsContentPage } from "@/features/docs";

const docsPage = getDocsPageOrThrow(CONCEPTOS_SDD_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <DocsContentPage path={CONCEPTOS_SDD_PATH} />;
}
