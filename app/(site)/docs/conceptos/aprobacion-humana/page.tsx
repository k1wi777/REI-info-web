import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import {
  CONCEPTOS_APROBACION_HUMANA_PATH,
  DocsContentPage,
} from "@/features/docs";

const docsPage = getDocsPageOrThrow(CONCEPTOS_APROBACION_HUMANA_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <DocsContentPage path={CONCEPTOS_APROBACION_HUMANA_PATH} />;
}
