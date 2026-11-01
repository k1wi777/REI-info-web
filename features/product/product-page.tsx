import { getCurrentLocale } from "@/content/i18n/server";
import type { ProductPage as ProductPageMeta } from "@/content/site";
import { ProductArticle } from "@/features/product/components/product-article";
import { getProductDocument } from "@/features/product/copy";

type ProductPageProps = {
  page: ProductPageMeta;
};

/** Compone la página de producto a partir del registro y su documento. */
export async function ProductPage({ page }: ProductPageProps) {
  const lang = await getCurrentLocale();

  return (
    <ProductArticle
      page={page}
      document={getProductDocument(page.slug, lang)}
    />
  );
}
