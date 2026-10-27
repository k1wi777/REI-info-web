import Link from "next/link";
import type { HomeBlock } from "@/features/home/types";

type HomeSectionProps = {
  block: HomeBlock;
};

/** Bloque editorial de la home: etiqueta, tesis y filas sin tarjetas. */
export function HomeSection({ block }: HomeSectionProps) {
  const titleId = `${block.id}-title`;

  return (
    <section
      id={block.id}
      aria-labelledby={titleId}
      className="border-t border-hairline py-12 lg:py-16"
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
              {block.intro}
            </p>
          ) : null}

          {block.items ? (
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
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
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}

          {block.note ? (
            <p className="mt-6 max-w-(--container-reading) border-l border-border-strong pl-4 type-meta-sm text-muted-strong">
              {block.note}
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
