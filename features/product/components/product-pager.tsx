import { LocaleLink } from "@/components/ui/locale-link";
import { Container } from "@/components/ui/container";
import { PRODUCT_PAGES } from "@/content/site";
import { getCurrentProductCopy } from "@/features/product/copy/server";
import { cn } from "@/lib/cn";
import { fillTemplate } from "@/lib/template";

type ProductPagerProps = {
  path: string;
};

/** Índice encuadernado: hoja anterior y siguiente dentro del dossier. */
export async function ProductPager({ path }: ProductPagerProps) {
  const { chrome, pages } = await getCurrentProductCopy();
  const index = PRODUCT_PAGES.findIndex((page) => page.path === path);
  const previous = index > 0 ? PRODUCT_PAGES[index - 1] : undefined;
  const next =
    index >= 0 && index < PRODUCT_PAGES.length - 1
      ? PRODUCT_PAGES[index + 1]
      : undefined;

  if (!previous && !next) {
    return null;
  }

  const folio = (position: number) => String(position + 1).padStart(2, "0");

  return (
    <Container className="mt-14 pb-10 lg:pb-14">
      <nav
        aria-label={chrome.pagerLabel}
        className={cn(
          "grid gap-px border border-hairline-strong bg-hairline-strong",
          previous && next ? "sm:grid-cols-2" : "sm:grid-cols-1",
        )}
      >
        {previous ? (
          <LocaleLink
            className="group flex min-h-24 flex-col justify-between gap-4 bg-canvas p-5 transition-colors duration-(--duration-fast) hover:bg-surface"
            href={previous.path}
          >
            <span className="type-meta-sm text-muted-strong">
              {fillTemplate(chrome.pagerPrevious, { folio: folio(index - 1) })}
            </span>
            <span className="flex items-baseline gap-3 type-docs-heading text-foreground">
              <span aria-hidden="true" className="type-code text-muted-strong">
                ←
              </span>
              {pages[previous.slug].label}
            </span>
          </LocaleLink>
        ) : null}

        {next ? (
          <LocaleLink
            className={cn(
              "group flex min-h-24 flex-col justify-between gap-4 bg-canvas p-5 transition-colors duration-(--duration-fast) hover:bg-surface",
              previous ? "sm:items-end sm:text-right" : "sm:flex-row sm:items-end",
            )}
            href={next.path}
          >
            <span className="type-meta-sm text-muted-strong">
              {fillTemplate(chrome.pagerNext, { folio: folio(index + 1) })}
            </span>
            <span className="flex items-baseline gap-3 type-docs-heading text-foreground">
              {pages[next.slug].label}
              <span aria-hidden="true" className="type-code text-muted-strong">
                →
              </span>
            </span>
          </LocaleLink>
        ) : null}
      </nav>
    </Container>
  );
}
