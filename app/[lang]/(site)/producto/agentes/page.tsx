import type { Metadata, ResolvingMetadata } from "next";
import { getProductPageOrThrow } from "@/content/site";
import { ProductPage } from "@/features/product";
import { getProductCopy } from "@/features/product/copy";
import { toLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const page = getProductPageOrThrow("/producto/agentes");

export async function generateMetadata(
  { params }: PageProps<"/[lang]/producto/agentes">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const { title, description } = getProductCopy(toLocale(lang)).pages[
    page.slug
  ];

  return pageMetadata(parent, {
    lang,
    path: page.path,
    title,
    description,
  });
}

export default function Page() {
  return <ProductPage page={page} />;
}
