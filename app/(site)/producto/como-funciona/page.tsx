import type { Metadata, ResolvingMetadata } from "next";
import { getProductPageOrThrow } from "@/content/site";
import { ProductPage } from "@/features/product";
import { pageMetadata } from "@/lib/seo";

const page = getProductPageOrThrow("/producto/como-funciona");

export async function generateMetadata(
  _props: PageProps<"/producto/como-funciona">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/producto/como-funciona",
    title: page.title,
    description: page.description,
  });
}

export default function Page() {
  return <ProductPage page={page} />;
}
