import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import {
  CONCEPTOS_WORK_ITEMS_Y_ESTADOS_PATH,
  DocsContentPage,
} from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(CONCEPTOS_WORK_ITEMS_Y_ESTADOS_PATH);

export async function generateMetadata(
  _props: PageProps<"/docs/conceptos/work-items-y-estados">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/docs/conceptos/work-items-y-estados",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsContentPage path={CONCEPTOS_WORK_ITEMS_Y_ESTADOS_PATH} />;
}
