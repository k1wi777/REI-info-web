import type { ProductPage } from "@/content/site";
import { DOCUMENTED_VERSION, PRODUCT_PAGES } from "@/content/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { InlineText } from "@/components/ui/inline-text";
import { getCurrentProductCopy } from "@/features/product/copy/server";
import { fillTemplate } from "@/lib/template";
import type { ProductDocument } from "@/features/product/types";

type ProductHeroProps = {
  page: ProductPage;
  document: ProductDocument;
};

/**
 * Portada de hoja del dossier de producto: barra técnica, tesis, deck y una
 * ficha con datos verificables del arnés. La retícula de plano solo aparece
 * aquí y en las secciones `lead`; el resto del artículo queda en canvas.
 */
export async function ProductHero({ page, document }: ProductHeroProps) {
  const { chrome, pages } = await getCurrentProductCopy();
  const index = PRODUCT_PAGES.findIndex((item) => item.slug === page.slug);
  const folio = String(index + 1).padStart(2, "0");
  const total = String(PRODUCT_PAGES.length).padStart(2, "0");

  return (
    <header
      aria-labelledby="product-title"
      className="relative overflow-hidden border-y border-hairline-strong bg-surface-deep"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 sheet-grid opacity-30"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-hairline py-3 type-meta text-muted-strong sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-baseline">
          <p className="w-full sm:w-auto">{chrome.bar}</p>
          <p>{fillTemplate(chrome.sheetOf, { folio, total })}</p>
          <p className="sm:text-right">
            {DOCUMENTED_VERSION} · {chrome.langTag}
          </p>
        </div>

        <div className="grid lg:grid-cols-12">
          <div className="min-w-0 py-10 lg:col-span-7 lg:py-14 lg:pr-12">
            <p className="type-meta text-muted-strong">{document.eyebrow}</p>

            <h1
              id="product-title"
              className="mt-5 max-w-[18ch] text-balance type-display text-foreground"
            >
              {pages[page.slug].title}
            </h1>

            <p className="mt-5 max-w-[52ch] type-body text-secondary">
              {pages[page.slug].description}
            </p>

            {document.actions && document.actions.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {document.actions.map((action, actionIndex) => (
                  <ButtonLink
                    key={action.href}
                    href={action.href}
                    variant={actionIndex === 0 ? "primary" : "secondary"}
                  >
                    {action.label}
                  </ButtonLink>
                ))}
              </div>
            ) : null}

            {document.meta ? (
              <p className="mt-6 border-t border-hairline pt-4 type-caption text-muted-strong">
                <InlineText text={document.meta} />
              </p>
            ) : null}
          </div>

          <aside className="min-w-0 border-t border-hairline py-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:py-12 lg:pl-8">
            <p className="type-meta text-muted-strong">{chrome.factsTitle}</p>

            <dl className="mt-4 border-t border-hairline-strong">
              {document.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 border-b border-hairline py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                >
                  <dt className="type-meta-sm text-muted-strong">
                    {fact.label}
                  </dt>
                  <dd className="type-docs text-foreground sm:text-right">
                    <InlineText text={fact.value} />
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 type-meta-sm text-muted-strong">
              {chrome.factsNote}
            </p>
          </aside>
        </div>
      </Container>
    </header>
  );
}
