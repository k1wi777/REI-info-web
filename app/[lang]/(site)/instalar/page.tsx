import type { Metadata, ResolvingMetadata } from "next";
import { INSTALL_PAGE } from "@/content/site";
import { InstallPage } from "@/features/installation";
import { getInstallCopy } from "@/features/installation/copy";
import { toLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: PageProps<"/[lang]/instalar">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const { title, description } = getInstallCopy(toLocale(lang)).meta;

  return pageMetadata(parent, {
    lang,
    path: INSTALL_PAGE.path,
    title,
    description,
  });
}

export default function Page() {
  return <InstallPage />;
}
