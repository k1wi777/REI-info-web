import Link from "next/link";
import { InlineText } from "@/components/ui/inline-text";
import { isExternal } from "@/content/site";
import type { ProductAudience, ProductLink } from "@/features/product/types";

type ProductAudiencesProps = {
  items: ProductAudience[];
};

function AudienceLink({ link }: { link: ProductLink }) {
  const external = link.external ?? isExternal(link.href);
  const className =
    "inline-flex min-h-6 items-center gap-2 py-1 type-docs text-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-(--duration-fast) hover:text-accent-text hover:decoration-accent-text";

  if (external) {
    return (
      <a className={className} href={link.href} target="_blank" rel="noreferrer">
        {link.label}
        <span aria-hidden="true" className="type-code text-muted-strong">
          ↗
        </span>
      </a>
    );
  }

  return (
    <Link className={className} href={link.href}>
      {link.label}
      <span aria-hidden="true" className="type-code text-muted-strong">
        →
      </span>
    </Link>
  );
}

/**
 * Cinco lectores con su necesidad y sus rutas reales. La columna «Dónde
 * seguir» deja de ser texto y se convierte en la navegación que promete.
 */
export function ProductAudiences({ items }: ProductAudiencesProps) {
  return (
    <ul className="border-t border-hairline-strong">
      {items.map((item) => (
        <li
          key={item.id}
          className="grid gap-3 border-b border-hairline py-5 lg:grid-cols-[15rem_1fr_16rem] lg:gap-8"
        >
          <h3 className="type-docs font-medium text-foreground">{item.who}</h3>

          <p className="max-w-[46ch] type-body text-secondary">
            <InlineText text={item.seeks} />
          </p>

          <ul className="flex flex-col gap-1">
            {item.next.map((link) => (
              <li key={link.href}>
                <AudienceLink link={link} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
