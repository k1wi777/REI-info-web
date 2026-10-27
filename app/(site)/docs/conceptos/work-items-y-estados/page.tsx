import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import {
  CONCEPTOS_WORK_ITEMS_Y_ESTADOS_PATH,
  DocsContentPage,
} from "@/features/docs";

const docsPage = getDocsPageOrThrow(CONCEPTOS_WORK_ITEMS_Y_ESTADOS_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <DocsContentPage path={CONCEPTOS_WORK_ITEMS_Y_ESTADOS_PATH} />;
}
