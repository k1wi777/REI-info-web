import type { ProductPage } from "@/content/site";
import { ProductBlocks } from "@/features/product/components/product-blocks";
import { ProductHero } from "@/features/product/components/product-hero";
import { ProductPager } from "@/features/product/components/product-pager";
import type { ProductDocument } from "@/features/product/types";

type ProductArticleProps = {
  page: ProductPage;
  document: ProductDocument;
};

/** Hoja de producto: portada con ficha, secciones con peso e índice final. */
export function ProductArticle({ page, document }: ProductArticleProps) {
  return (
    <article aria-labelledby="product-title" className="min-w-0">
      <ProductHero page={page} document={document} />
      <ProductBlocks sections={document.sections} />
      <ProductPager path={page.path} />
    </article>
  );
}
