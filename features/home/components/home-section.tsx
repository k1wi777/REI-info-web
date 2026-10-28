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
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <p className="type-meta text-muted-strong lg:col-span-3">
          {block.eyebrow}
        </p>

        <div className="lg:col-span-9">
          <h2 id={titleId} className="type-title max-w-[22ch] text-foreground">
            {block.title}
          </h2>

          {block.intro ? (
            <p className="type-body mt-5 max-w-(--container-reading) text-secondary">
              <InlineText text={block.intro} />
            </p>
          ) : null}

          {block.items ? (
            <ul
              className={cn(
                "mt-8 grid gap-x-8",
                columns === 4
                  ? "sm:grid-cols-2 lg:grid-cols-4"
                  : "sm:grid-cols-2",
              )}
            >
              {block.items.map((item, index) => (
                <li
                  key={item.title}
                  className="border-t border-hairline py-4"
                >
                  <p className="type-meta-sm text-muted-strong">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 type-docs font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 type-docs text-secondary">
                    <InlineText text={item.description} />
                  </p>
                </li>
              ))}
            </ul>
          ) : null}

          {block.note ? (
            <p className="mt-6 max-w-(--container-reading) border-l border-border-strong pl-4 type-meta-sm text-muted-strong">
              <InlineText text={block.note} />
            </p>
          ) : null}

          {block.link ? (
            <Link
              className="mt-6 inline-flex border-b border-border-strong pb-0.5 type-meta text-foreground transition-colors duration-(--duration-fast) hover:border-foreground"
              href={block.link.href}
            >
              {block.link.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
