import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsContentPage, GUIAS_ACTUALIZAR_PATH } from "@/features/docs";

const docsPage = getDocsPageOrThrow(GUIAS_ACTUALIZAR_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <DocsContentPage path={GUIAS_ACTUALIZAR_PATH} />;
}
