import type { Metadata, ResolvingMetadata } from "next";
import { getProductPageOrThrow } from "@/content/site";
import { ProductPage } from "@/features/product";
import { pageMetadata } from "@/lib/seo";

const page = getProductPageOrThrow("/producto/visor");

export async function generateMetadata(
  _props: PageProps<"/producto/visor">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/producto/visor",
    title: page.title,
    description: page.description,
  });
}

export default function Page() {
  return <ProductPage page={page} />;
}
