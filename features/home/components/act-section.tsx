import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import type { HomeAct } from "@/features/home/types";
import { cn } from "@/lib/cn";

const TONES: Record<HomeAct["tone"], string> = {
  canvas: "bg-canvas",
  deep: "bg-surface-deep",
  surface: "bg-surface",
};

/** Veladuras en alfa: el acento y el verde no se usan como bloques. */
const TINTS: Record<string, string> = {
  proceso: "bg-accent/5",
  evidencia: "bg-success/5",
};

type ActSectionProps = {
  act: HomeAct;
  children: ReactNode;
};

/** Acto de fondo completo: borde superior, etiqueta de acto y `Container`. */
export function ActSection({ act, children }: ActSectionProps) {
  const labelId = `${act.id}-act`;
  const tint = TINTS[act.id];

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

      {tint ? (
        <div
          aria-hidden="true"
          className={cn("pointer-events-none absolute inset-0", tint)}
        />
      ) : null}

      <Container className="relative py-10 lg:py-14">
        <header className="grid gap-2 border-b border-hairline pb-5 lg:grid-cols-12 lg:items-baseline lg:gap-10">
          <p id={labelId} className="type-meta text-muted-strong lg:col-span-3">
            {act.number} · {act.label}
          </p>
          <p className="type-meta text-secondary lg:col-span-9">
            {act.thesis}
          </p>
        </header>

        <div className="pt-8 lg:pt-10">{children}</div>
      </Container>
    </section>
  );
}
