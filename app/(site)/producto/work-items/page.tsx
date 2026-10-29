import type { Metadata, ResolvingMetadata } from "next";
import { getProductPageOrThrow } from "@/content/site";
import { ProductPage } from "@/features/product";
import { pageMetadata } from "@/lib/seo";

const page = getProductPageOrThrow("/producto/work-items");

export async function generateMetadata(
  _props: PageProps<"/producto/work-items">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/producto/work-items",
    title: page.title,
    description: page.description,
  });
}

export default function Page() {
  return <ProductPage page={page} />;
}
