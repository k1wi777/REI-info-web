import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { CommandsPage, COMMANDS_PATH } from "@/features/commands";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(COMMANDS_PATH);

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/referencia/comandos">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;

  return pageMetadata(parent, {
    lang,
    path: "/docs/referencia/comandos",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <CommandsPage />;
}
