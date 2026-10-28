import Link from "next/link";
import { PRODUCT_PAGES } from "@/content/site";
import { cn } from "@/lib/cn";

type ProductPagerProps = {
  path: string;
};

/** Índice encuadernado: hoja anterior y siguiente dentro del dossier. */
export function ProductPager({ path }: ProductPagerProps) {
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
    <nav
      aria-label="Hojas del dossier de producto"
      className={cn(
        "mt-14 grid gap-px border border-hairline-strong bg-hairline-strong",
        previous && next ? "sm:grid-cols-2" : "sm:grid-cols-1",
      )}
    >
      {previous ? (
        <Link
          className="group flex min-h-24 flex-col justify-between gap-4 bg-canvas p-5 transition-colors duration-(--duration-fast) hover:bg-surface"
          href={previous.path}
        >
          <span className="type-meta-sm text-muted-strong">
            Hoja anterior · {folio(index - 1)}
          </span>
          <span className="flex items-baseline gap-3 type-docs-heading text-foreground">
            <span aria-hidden="true" className="type-code text-muted-strong">
              ←
            </span>
            {previous.label}
          </span>
        </Link>
      ) : null}

      {next ? (
        <Link
          className={cn(
            "group flex min-h-24 flex-col justify-between gap-4 bg-canvas p-5 transition-colors duration-(--duration-fast) hover:bg-surface",
            previous ? "sm:items-end sm:text-right" : "sm:flex-row sm:items-end",
          )}
          href={next.path}
        >
          <span className="type-meta-sm text-muted-strong">
            Hoja siguiente · {folio(index + 1)}
          </span>
          <span className="flex items-baseline gap-3 type-docs-heading text-foreground">
            {next.label}
            <span aria-hidden="true" className="type-code text-muted-strong">
              →
            </span>
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
