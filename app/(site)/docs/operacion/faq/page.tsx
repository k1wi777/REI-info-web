import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { FaqPage, FAQ_PATH } from "@/features/faq";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(FAQ_PATH);

export async function generateMetadata(
  _props: PageProps<"/docs/operacion/faq">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/docs/operacion/faq",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <FaqPage />;
}
