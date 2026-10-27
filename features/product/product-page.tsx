import type { ProductPage as ProductPageMeta } from "@/content/site";
import { ProductArticle } from "@/features/product/components/product-article";
import { PRODUCT_DOCUMENTS } from "@/features/product/data/pages";

type ProductPageProps = {
  page: ProductPageMeta;
};

/** Compone la página de producto a partir del registro y su documento. */
export function ProductPage({ page }: ProductPageProps) {
  return (
    <ProductArticle page={page} document={PRODUCT_DOCUMENTS[page.slug]} />
  );
}
