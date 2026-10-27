import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsContentPage, REFERENCIA_ADAPTADORES_PATH } from "@/features/docs";

const docsPage = getDocsPageOrThrow(REFERENCIA_ADAPTADORES_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <DocsContentPage path={REFERENCIA_ADAPTADORES_PATH} />;
}
