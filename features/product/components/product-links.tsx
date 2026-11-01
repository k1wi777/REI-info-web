import { LocaleLink } from "@/components/ui/locale-link";
import type { ProductLink } from "@/features/product/types";

type ProductLinksProps = {
  links: ProductLink[];
};

/**
 * Cierre de una sección: enlaces reales a la siguiente lectura, con la marca
 * textual del destino en el margen derecho. Sin botones falsos ni chips.
 */
export function ProductLinks({ links }: ProductLinksProps) {
  return (
    <ul className="max-w-[52rem] border-t border-hairline-strong">
      {links.map((link) => {
        const external = link.external ?? /^https?:\/\//.test(link.href);
        const className =
          "flex min-h-11 items-center justify-between gap-4 border-b border-hairline py-3 type-docs text-foreground transition-colors duration-(--duration-fast) hover:text-accent-text";

        return (
          <li key={link.href}>
            {external ? (
              <a
                className={className}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <span aria-hidden="true" className="type-code text-muted-strong">
                  ↗
                </span>
              </a>
            ) : (
              <LocaleLink className={className} href={link.href}>
                {link.label}
                <span aria-hidden="true" className="type-code text-muted-strong">
                  →
                </span>
              </LocaleLink>
            )}
          </li>
        );
      })}
    </ul>
  );
}
