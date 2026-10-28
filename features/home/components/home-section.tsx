import Link from "next/link";
import { InlineText } from "@/components/ui/inline-text";
import type { HomeBlock } from "@/features/home/types";
import { cn } from "@/lib/cn";

type HomeSectionProps = {
  block: HomeBlock;
  /** Los principios del proceso usan una fila compacta de cuatro. */
  columns?: 2 | 4;
};

/** Bloque editorial de la home: etiqueta, tesis y filas sin tarjetas. */
export function HomeSection({ block, columns = 2 }: HomeSectionProps) {
  const titleId = `${block.id}-title`;

  return (
    <section
      id={block.id}
      aria-labelledby={titleId}
      className="border-t border-hairline py-12 first:border-t-0 first:pt-0 lg:py-16"
    >
      <header className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="type-meta text-muted-strong">{block.eyebrow}</p>
          <h2
            id={titleId}
            className="mt-5 max-w-[22ch] text-balance type-title text-foreground"
          >
            {block.title}
          </h2>
        </div>

        <div className="lg:col-span-5 lg:pt-1">
          {block.intro ? (
            <p className="max-w-[48ch] type-body text-secondary">
              <InlineText text={block.intro} />
            </p>
          ) : null}

          {block.link ? (
            <Link
              className="mt-5 inline-flex border-b border-border-strong pb-0.5 type-meta text-foreground transition-colors duration-(--duration-fast) hover:border-foreground"
              href={block.link.href}
            >
              {block.link.label}
            </Link>
          ) : null}
        </div>
      </header>

      {block.items ? (
        <ul
          className={cn(
            "mt-10 grid gap-x-10 gap-y-6 lg:mt-12",
            columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2",
          )}
        >
          {block.items.map((item, index) => (
            <li
              key={item.title}
              className="border-t border-hairline-strong pt-4"
            >
              <p className="type-meta-sm text-muted-strong tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 type-docs font-medium text-foreground">
                {item.title}
              </h3>
              <p className="mt-1.5 type-docs text-secondary">
                <InlineText text={item.description} />
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      {block.note ? (
        <p className="mt-8 max-w-(--container-reading) border-l border-border-strong pl-4 type-caption text-muted-strong">
          <InlineText text={block.note} />
        </p>
      ) : null}
    </section>
  );
}
