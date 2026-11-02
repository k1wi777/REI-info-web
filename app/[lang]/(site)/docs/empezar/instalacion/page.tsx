import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageText } from "@/content/i18n/docs-nav";
import {
  InstallationPage,
  INSTALLATION_PATH,
} from "@/features/installation";
import { toLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/empezar/instalacion">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const docsPage = getDocsPageText(toLocale(lang), INSTALLATION_PATH);

  return pageMetadata(parent, {
    lang,
    path: "/docs/empezar/instalacion",
    title: docsPage.title.text,
    description: docsPage.description.text,
  });
}

export default function Page() {
  return <InstallationPage />;
}
