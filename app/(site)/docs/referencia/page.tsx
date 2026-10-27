import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsModeLandingPage, REFERENCIA_MODE_PATH } from "@/features/docs";

const docsPage = getDocsPageOrThrow(REFERENCIA_MODE_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <DocsModeLandingPage mode="referencia" />;
}
