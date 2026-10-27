import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import {
  DocsContentPage,
  REFERENCIA_CONFIGURACION_PATH,
} from "@/features/docs";

const docsPage = getDocsPageOrThrow(REFERENCIA_CONFIGURACION_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <DocsContentPage path={REFERENCIA_CONFIGURACION_PATH} />;
}
