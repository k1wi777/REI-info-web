import Link from "next/link";
import type { ReactNode } from "react";
import { InlineText } from "@/components/ui/inline-text";
import { cn } from "@/lib/cn";

type DemoSectionLink = {
  label: string;
  href: string;
};

type DemoSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  note?: string;
  /** Marca las simulaciones que podrían confundirse con producto real. */
  example?: boolean;
  link?: DemoSectionLink;
  children: ReactNode;
  className?: string;
};

/**
 * Cabecera editorial compartida por las demos de la home: el titular ocupa la
 * izquierda y la explicación la derecha, para que la sección no empiece con un
 * hueco muerto bajo la etiqueta.
 */
export function DemoSection({
  id,
  eyebrow,
  title,
  intro,
  note,
  example = false,
  link,
  children,
  className,
}: DemoSectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn(
        "border-t border-hairline py-12 first:border-t-0 first:pt-0 lg:py-16",
        className,
      )}
    >
      <header className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p className="type-meta text-muted-strong">{eyebrow}</p>
            {example ? (
              <p className="type-meta-sm text-warning">Ejemplo de mecanismo</p>
            ) : null}
          </div>

          <h2
            id={titleId}
            className="mt-5 max-w-[24ch] text-balance type-title text-foreground"
          >
            {title}
          </h2>
        </div>

        <div className="lg:col-span-5 lg:pt-1">
          {intro ? (
            <p className="max-w-[48ch] type-body text-secondary">
              <InlineText text={intro} />
            </p>
          ) : null}

          {note ? (
            <p className="mt-4 max-w-[52ch] type-caption text-muted-strong">
              <InlineText text={note} />
            </p>
          ) : null}

          {link ? (
            <Link
              className="mt-5 inline-flex border-b border-border-strong pb-0.5 type-meta text-foreground transition-colors duration-(--duration-fast) hover:border-foreground"
              href={link.href}
            >
              {link.label}
            </Link>
          ) : null}
        </div>
      </header>

      <div className="mt-10 lg:mt-14">{children}</div>
    </section>
  );
}
