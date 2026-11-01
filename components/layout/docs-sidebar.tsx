"use client";

import { LocaleLink } from "@/components/ui/locale-link";
import { useUnlocalizedPathname } from "@/components/ui/use-unlocalized-pathname";
import { DOCS_SECTIONS } from "@/content/site";

/**
 * Sidebar de la sección activa. En móvil se sustituye por un disclosure
 * nativo: sin JavaScript obligatorio y accesible por teclado.
 */
export function DocsSidebar() {
  const pathname = useUnlocalizedPathname();
  const section =
    DOCS_SECTIONS.find((candidate) =>
      candidate.pages.some(
        (page) =>
          pathname === page.path || pathname.startsWith(`${page.path}/`),
      ),
    ) ?? DOCS_SECTIONS[0];

  const items = (
    <ul className="flex flex-col gap-1">
      {section.pages.map((page) => {
        const active = pathname === page.path;
        return (
          <li key={page.path}>
            <LocaleLink
              href={page.path}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "block border-l-2 border-foreground py-1.5 pl-3 type-docs text-foreground"
                  : "block border-l-2 border-transparent py-1.5 pl-3 type-docs text-secondary transition-colors duration-(--duration-fast) hover:border-border-strong hover:text-foreground"
              }
            >
              {page.title}
            </LocaleLink>
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
      <div className="hidden lg:block">
        <p className="type-meta text-muted-strong">{section.label}</p>
        <div className="mt-4">{items}</div>
      </div>

      <details className="group lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 border border-muted px-3 py-2.5 type-meta text-secondary transition-colors duration-(--duration-fast) hover:text-foreground [&::-webkit-details-marker]:hidden">
          Secciones de documentación
          <span aria-hidden="true" className="text-micro">
            ▾
          </span>
        </summary>
        <div className="mt-2 border border-hairline p-4">
          <p className="type-meta text-muted-strong">{section.label}</p>
          <div className="mt-3">{items}</div>
        </div>
      </details>
    </aside>
  );
}
