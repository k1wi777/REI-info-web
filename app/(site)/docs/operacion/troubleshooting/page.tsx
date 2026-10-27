import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsContentPage, OPERACION_TROUBLESHOOTING_PATH } from "@/features/docs";

const docsPage = getDocsPageOrThrow(OPERACION_TROUBLESHOOTING_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <DocsContentPage path={OPERACION_TROUBLESHOOTING_PATH} />;
}
