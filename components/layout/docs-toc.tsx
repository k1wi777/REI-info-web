import type { TocItem } from "@/content/docs";

type DocsTocProps = {
  items: TocItem[];
};

/** Tabla de contenidos de la página, derivada de los datos de la feature. */
export function DocsToc({ items }: DocsTocProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="En esta página"
      className="hidden self-start lg:sticky lg:top-24 lg:block"
    >
      <p className="type-meta text-muted-strong">En esta página</p>
      <ul className="mt-3 flex flex-col gap-2 border-l border-hairline pl-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              className="inline-flex min-h-6 items-center type-meta-sm text-secondary transition-colors duration-(--duration-fast) hover:text-foreground"
              href={`#${item.id}`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
