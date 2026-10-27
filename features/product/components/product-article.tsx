import type { ProductPage } from "@/content/site";
import { ProductBlocks } from "@/features/product/components/product-blocks";
import type { ProductDocument } from "@/features/product/types";

type ProductArticleProps = {
  page: ProductPage;
  document: ProductDocument;
};

/** Artículo de producto: cabecera de hoja y secciones, sin TOC ni pager. */
export function ProductArticle({ page, document }: ProductArticleProps) {
  return (
    <article aria-labelledby="product-title" className="min-w-0">
      <header className="border-b border-hairline pb-6">
        <p className="type-meta text-muted-strong">{document.eyebrow}</p>
        <h1 id="product-title" className="type-docs-title mt-3 text-foreground">
          {page.title}
        </h1>
        <p className="mt-3 max-w-(--container-reading) type-docs text-secondary">
          {page.description}
        </p>
        {document.meta ? (
          <p className="mt-4 type-meta-sm text-muted-strong">{document.meta}</p>
        ) : null}
      </header>

      <ProductBlocks sections={document.sections} />
    </article>
  );
}
