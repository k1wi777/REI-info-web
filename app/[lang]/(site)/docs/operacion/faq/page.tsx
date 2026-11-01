import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { FaqPage, FAQ_PATH } from "@/features/faq";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(FAQ_PATH);

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/operacion/faq">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;

  return pageMetadata(parent, {
    lang,
    path: "/docs/operacion/faq",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <FaqPage />;
}
