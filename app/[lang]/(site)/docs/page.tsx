import type { Metadata, ResolvingMetadata } from "next";
import { DocsLandingPage } from "@/features/docs";
import { getDocsLandingCopy } from "@/features/docs/copy";
import { toLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const { meta } = getDocsLandingCopy(toLocale(lang));

  return pageMetadata(parent, {
    lang,
    path: "/docs",
    title: meta.title,
    description: meta.description,
  });
}

export default function Page() {
  return <DocsLandingPage />;
}
