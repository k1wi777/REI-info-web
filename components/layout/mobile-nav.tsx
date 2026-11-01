import type { ReactNode } from "react";
import { NavLinks } from "@/components/layout/nav-links";
import type { NavItem } from "@/content/site";

type MobileNavProps = {
  items: NavItem[];
  menuLabel: string;
  navLabel: string;
  /** Contenido extra bajo los enlaces (selector de idioma). */
  children?: ReactNode;
};

/**
 * Navegación móvil sin JavaScript: `<details>` nativo, accesible por teclado y
 * sin bloqueo de scroll. La marca y el CTA quedan siempre visibles.
 */
export function MobileNav({
  items,
  menuLabel,
  navLabel,
  children,
}: MobileNavProps) {
  return (
    <details className="md:hidden">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-xs border border-muted px-2.5 py-2 type-meta text-secondary transition-colors duration-(--duration-fast) hover:border-muted-strong hover:text-foreground [&::-webkit-details-marker]:hidden">
        {menuLabel}
        <span aria-hidden="true" className="text-micro">
          ▾
        </span>
      </summary>
      <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-56 rounded-xs border border-hairline-strong bg-surface-deep p-2 shadow-none">
        <nav aria-label={navLabel}>
          <NavLinks
            items={items}
            className="flex-col items-stretch gap-1"
            itemClassName="px-3 py-2.5"
          />
        </nav>
        {children ? (
          <div className="mt-2 border-t border-hairline px-3 pt-3 pb-1">
            {children}
          </div>
        ) : null}
      </div>
    </details>
  );
}
