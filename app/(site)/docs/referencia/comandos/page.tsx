import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { CommandsPage, COMMANDS_PATH } from "@/features/commands";

const docsPage = getDocsPageOrThrow(COMMANDS_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <CommandsPage />;
}
