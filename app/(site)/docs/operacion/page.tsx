import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsModeLandingPage, OPERACION_MODE_PATH } from "@/features/docs";

const docsPage = getDocsPageOrThrow(OPERACION_MODE_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <DocsModeLandingPage mode="operacion" />;
}
