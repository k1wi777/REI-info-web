import type { Metadata, ResolvingMetadata } from "next";
import { getProductPageOrThrow } from "@/content/site";
import { ProductPage } from "@/features/product";
import { pageMetadata } from "@/lib/seo";

const page = getProductPageOrThrow("/producto/agentes");

export async function generateMetadata(
  _props: PageProps<"/producto/agentes">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/producto/agentes",
    title: page.title,
    description: page.description,
  });
}

export default function Page() {
  return <ProductPage page={page} />;
}
