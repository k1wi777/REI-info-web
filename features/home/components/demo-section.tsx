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

/** Cabecera editorial compartida por las demos de la home. */
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
        "border-t border-hairline py-10 first:border-t-0 first:pt-0 lg:py-14",
        className,
      )}
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <p className="type-meta text-muted-strong">{eyebrow}</p>
          {example ? (
            <p className="mt-3 type-meta-sm text-warning">
              Ejemplo de mecanismo
            </p>
          ) : null}
        </div>

        <div className="lg:col-span-9">
          <h2
            id={titleId}
            className="type-title max-w-[26ch] text-balance text-foreground"
          >
            {title}
          </h2>

          {intro ? (
            <p className="type-body mt-5 max-w-(--container-reading) text-secondary">
              <InlineText text={intro} />
            </p>
          ) : null}

          {note ? (
            <p className="mt-4 max-w-(--container-reading) type-meta-sm text-muted-strong">
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
      </div>

      <div className="mt-8 lg:mt-10">{children}</div>
    </section>
  );
}
