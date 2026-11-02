"use client";

import { LocaleLink } from "@/components/ui/locale-link";
import { useUnlocalizedPathname } from "@/components/ui/use-unlocalized-pathname";
import type { DocsNavModeProps } from "@/components/layout/docs-nav-types";
import { cn } from "@/lib/cn";

function isSectionActive(pathname: string, section: DocsNavModeProps): boolean {
  return section.pages.some(
    (page) =>
      pathname === page.path || pathname.startsWith(`${page.path}/`),
  );
}

/** Tabs de modo: rutas reales, nunca estado de cliente ni `?tab=`. */
export function DocsTabs({
  label,
  modes,
}: {
  label: string;
  modes: DocsNavModeProps[];
}) {
  const pathname = useUnlocalizedPathname();

  return (
    <nav
      aria-label={label}
      className="flex flex-wrap gap-x-1 border-b border-hairline"
    >
      {modes.map((section) => {
        const active = isSectionActive(pathname, section);

        return (
          <LocaleLink
            key={section.id}
            href={section.path}
            lang={section.labelLang}
            aria-current={active ? "page" : undefined}
            className={cn(
              "-mb-px border-b-2 px-3 py-2.5 type-meta transition-colors duration-(--duration-fast)",
              active
                ? "border-foreground text-foreground"
                : "border-transparent text-secondary hover:border-border-strong hover:text-foreground",
            )}
          >
            {section.label}
          </LocaleLink>
        );
      })}
    </nav>
  );
}
