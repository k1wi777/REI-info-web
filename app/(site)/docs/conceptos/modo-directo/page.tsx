import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { CONCEPTOS_MODO_DIRECTO_PATH, DocsContentPage } from "@/features/docs";

const docsPage = getDocsPageOrThrow(CONCEPTOS_MODO_DIRECTO_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <DocsContentPage path={CONCEPTOS_MODO_DIRECTO_PATH} />;
}
