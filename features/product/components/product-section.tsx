import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import type {
  ProductSection as ProductSectionData,
  ProductSectionWeight,
} from "@/features/product/types";
import { getCurrentProductCopy } from "@/features/product/copy/server";
import { cn } from "@/lib/cn";

const WEIGHTS: Record<
  ProductSectionWeight,
  {
    section: string;
    body: string;
    heading: string;
    blocks: string;
  }
> = {
  lead: {
    section: "border-y border-hairline-strong bg-surface-deep",
    body: "py-10 lg:py-14",
    heading: "type-title",
    blocks: "mt-8 gap-6",
  },
  body: {
    section: "border-t border-hairline",
    body: "pt-9 lg:pt-10",
    heading: "type-docs-title",
    blocks: "mt-6 gap-5",
  },
  fine: {
    section: "border-t border-hairline",
    body: "pt-8",
    heading: "type-docs-heading",
    blocks: "mt-5 gap-4",
  },
};

type ProductSectionProps = {
  section: ProductSectionData;
  folio: string;
  children: ReactNode;
};

/**
 * Hoja del dossier. El peso decide la escala y el trato del fondo: `lead` es
 * la hoja a sangre con retícula de plano, `body` la entrada estándar y `fine`
 * una nota al pie del capítulo. El folio y la etiqueta viven en el margen.
 */
export async function ProductSection({
  section,
  folio,
  children,
}: ProductSectionProps) {
  const { chrome } = await getCurrentProductCopy();
  const weight = section.weight ?? "body";
  const styles = WEIGHTS[weight];
  const headingId = `${section.id}-heading`;

  if (weight === "lead") {
    return (
      <section
        id={section.id}
        aria-labelledby={headingId}
        className={cn("relative overflow-hidden", styles.section)}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 sheet-grid opacity-20"
        />

        <Container className={cn("relative", styles.body)}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <p className="flex items-baseline gap-3 type-meta">
              <span className="text-muted-strong tabular-nums">{folio}</span>
              <span className="text-foreground">{section.label}</span>
            </p>
            <p className="type-meta-sm text-muted-strong">{chrome.featuredSheet}</p>
          </div>

          <h2
            id={headingId}
            className={cn("mt-5 max-w-[26ch] text-balance text-foreground", styles.heading)}
          >
            {section.title}
          </h2>

          <div className={cn("flex flex-col", styles.blocks)}>{children}</div>
        </Container>
      </section>
    );
  }

  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      className={styles.section}
    >
      <Container className={styles.body}>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <p className="flex items-baseline gap-3 type-meta">
              <span className="text-muted-strong tabular-nums">{folio}</span>
              <span className="text-foreground">{section.label}</span>
            </p>
          </div>

          <div className="min-w-0 lg:col-span-9">
            <h2
              id={headingId}
              className={cn(
                "max-w-[26ch] text-balance text-foreground",
                styles.heading,
              )}
            >
              {section.title}
            </h2>

            <div className={cn("flex flex-col", styles.blocks)}>{children}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
