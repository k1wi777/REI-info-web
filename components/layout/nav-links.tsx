"use client";

import { LocaleLink } from "@/components/ui/locale-link";
import { useUnlocalizedPathname } from "@/components/ui/use-unlocalized-pathname";
import type { NavItem } from "@/content/site";
import { cn } from "@/lib/cn";

type NavLinksProps = {
  items: NavItem[];
  className?: string;
  itemClassName?: string;
  /** Marca solo la ruta exacta; sin `exact` se conserva el prefijo actual. */
  exact?: boolean;
};

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Enlaces de navegación con `aria-current`. Es el único punto que necesita
 * conocer la ruta activa en cliente; el resto del shell sigue en servidor.
 */
export function NavLinks({
  items,
  className,
  itemClassName,
  exact = false,
}: NavLinksProps) {
  const pathname = useUnlocalizedPathname();

  return (
    <ul className={cn("flex items-center", className)}>
      {items.map((item) => {
        const active =
          !item.external &&
          (exact ? pathname === item.href : isActive(pathname, item.href));
        const classes = cn(
          "relative inline-flex min-h-6 items-center py-1.5 text-nav font-mono uppercase tracking-[0.08em] transition-colors duration-(--duration-fast)",
          "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-(--duration-fast) after:content-['']",
          "hover:after:scale-x-100 focus-visible:after:scale-x-100",
          active
            ? "text-foreground after:scale-x-100"
            : "text-secondary hover:text-foreground",
          itemClassName,
        );

        return (
          <li key={item.href}>
            {item.external ? (
              <a
                className={classes}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            ) : (
              <LocaleLink
                className={classes}
                href={item.href}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </LocaleLink>
            )}
          </li>
        );
      })}
    </ul>
  );
}
