"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_SECTIONS } from "@/content/site";
import { cn } from "@/lib/cn";

function isSectionActive(
  pathname: string,
  section: (typeof DOCS_SECTIONS)[number],
): boolean {
  return section.pages.some(
    (page) =>
      pathname === page.path || pathname.startsWith(`${page.path}/`),
  );
}

/** Tabs de modo: rutas reales, nunca estado de cliente ni `?tab=`. */
export function DocsTabs() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Modos de documentación"
      className="flex flex-wrap gap-x-1 border-b border-hairline"
    >
      {DOCS_SECTIONS.map((section) => {
        const active = isSectionActive(pathname, section);

        return (
          <Link
            key={section.id}
            href={section.path}
            aria-current={active ? "page" : undefined}
            className={cn(
              "-mb-px border-b-2 px-3 py-2.5 type-meta transition-colors duration-(--duration-fast)",
              active
                ? "border-foreground text-foreground"
                : "border-transparent text-secondary hover:border-border-strong hover:text-foreground",
            )}
          >
            {section.label}
          </Link>
        );
      })}
    </nav>
  );
}
