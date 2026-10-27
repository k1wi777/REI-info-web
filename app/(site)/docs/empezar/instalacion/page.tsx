import type { Metadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import {
  InstallationPage,
  INSTALLATION_PATH,
} from "@/features/installation";

const docsPage = getDocsPageOrThrow(INSTALLATION_PATH);

export const metadata: Metadata = {
  title: docsPage.title,
  description: docsPage.description,
};

export default function Page() {
  return <InstallationPage />;
}
