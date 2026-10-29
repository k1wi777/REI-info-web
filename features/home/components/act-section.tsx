import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import type { HomeAct } from "@/features/home/types";
import { cn } from "@/lib/cn";

const TONES: Record<HomeAct["tone"], string> = {
  canvas: "bg-canvas",
  deep: "bg-surface-deep",
  surface: "bg-surface",
};

type ActSectionProps = {
  act: HomeAct;
  children: ReactNode;
};

/**
 * Acto de fondo completo: borde superior, cabecera de capítulo y `Container`.
 * El tono separa un acto del siguiente sin veladuras: el violeta queda
 * reservado a la puerta de aprobación.
 */
export function ActSection({ act, children }: ActSectionProps) {
  const labelId = `${act.id}-act`;

  return (
    <section
      id={act.anchor}
      aria-labelledby={labelId}
      className={cn(
        "relative overflow-hidden border-t border-hairline-strong",
        TONES[act.tone],
      )}
    >
      {act.id === "problema" ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 sheet-grid opacity-20"
        />
      ) : null}

      <Container className="relative pt-14 pb-10 lg:pt-20 lg:pb-14">
        <header className="grid gap-3 border-b border-hairline pb-6 lg:grid-cols-12 lg:items-baseline lg:gap-10">
          <p
            id={labelId}
            data-reveal="up"
            className="flex items-baseline gap-3 type-meta lg:col-span-3"
          >
            <span className="text-muted-strong tabular-nums">{act.number}</span>
            <span className="text-foreground">{act.label}</span>
          </p>
          <p
            data-reveal="fade"
            data-reveal-delay="1"
            className="type-meta text-muted-strong lg:col-span-9"
          >
            {act.thesis}
          </p>
        </header>

        <div className="mt-12 lg:mt-16">{children}</div>
      </Container>
    </section>
  );
}
