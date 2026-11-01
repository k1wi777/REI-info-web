import type { Metadata, ResolvingMetadata } from "next";
import { getProductPageOrThrow } from "@/content/site";
import { ProductPage } from "@/features/product";
import { pageMetadata } from "@/lib/seo";

const page = getProductPageOrThrow("/producto/visor");

export async function generateMetadata(
  { params }: PageProps<"/[lang]/producto/visor">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;

  return pageMetadata(parent, {
    lang,
    path: "/producto/visor",
    title: page.title,
    description: page.description,
  });
}

export default function Page() {
  return <ProductPage page={page} />;
}
