import type { Metadata, ResolvingMetadata } from "next";
import { INSTALL_PAGE } from "@/content/site";
import { InstallPage } from "@/features/installation";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  _props: PageProps<"/instalar">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: INSTALL_PAGE.path,
    title: INSTALL_PAGE.title,
    description: INSTALL_PAGE.description,
  });
}

export default function Page() {
  return <InstallPage />;
}
