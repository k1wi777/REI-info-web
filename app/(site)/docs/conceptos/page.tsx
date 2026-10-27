import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { CONCEPTOS_MODE_PATH, DocsModeLandingPage } from "@/features/docs";

const docsPage = getDocsPageOrThrow(CONCEPTOS_MODE_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <DocsModeLandingPage mode="conceptos" />;
}
