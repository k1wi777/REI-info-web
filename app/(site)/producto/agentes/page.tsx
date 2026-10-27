import type { Metadata } from "next";
import { getProductPageOrThrow } from "@/content/site";
import { ProductPage } from "@/features/product";

const page = getProductPageOrThrow("/producto/agentes");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <ProductPage page={page} />;
}
