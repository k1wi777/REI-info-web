import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import {
  InstallationPage,
  INSTALLATION_PATH,
} from "@/features/installation";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(INSTALLATION_PATH);

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/empezar/instalacion">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;

  return pageMetadata(parent, {
    lang,
    path: "/docs/empezar/instalacion",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <InstallationPage />;
}
