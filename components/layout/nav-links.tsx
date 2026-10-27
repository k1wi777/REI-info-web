"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <ul className={cn("flex items-center", className)}>
      {items.map((item) => {
        const active =
          !item.external &&
          (exact ? pathname === item.href : isActive(pathname, item.href));
        const classes = cn(
          "inline-flex items-center text-nav font-mono uppercase tracking-[0.08em] transition-colors duration-(--duration-fast)",
          active
            ? "text-foreground"
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
              <Link
                className={classes}
                href={item.href}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
