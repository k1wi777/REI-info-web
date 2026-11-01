import type { Metadata, ResolvingMetadata } from "next";
import { getDictionary } from "@/content/i18n";
import { toLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { HomePage } from "@/features/home";

export async function generateMetadata(
  { params }: PageProps<"/[lang]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const { title, description } = getDictionary(toLocale(lang)).meta;

  return pageMetadata(parent, {
    lang,
    path: "/",
    title: { absolute: title },
    description,
  });
}

export default function Page() {
  return <HomePage />;
}
