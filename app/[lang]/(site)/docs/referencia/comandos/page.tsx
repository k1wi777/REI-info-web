import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageText } from "@/content/i18n/docs-nav";
import { CommandsPage, COMMANDS_PATH } from "@/features/commands";
import { toLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/referencia/comandos">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const docsPage = getDocsPageText(toLocale(lang), COMMANDS_PATH);

  return pageMetadata(parent, {
    lang,
    path: "/docs/referencia/comandos",
    title: docsPage.title.text,
    description: docsPage.description.text,
  });
}

export default function Page() {
  return <CommandsPage />;
}
