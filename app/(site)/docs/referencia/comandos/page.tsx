import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { CommandsPage, COMMANDS_PATH } from "@/features/commands";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(COMMANDS_PATH);

export async function generateMetadata(
  _props: PageProps<"/docs/referencia/comandos">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/docs/referencia/comandos",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <CommandsPage />;
}
