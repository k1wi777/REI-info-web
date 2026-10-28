import { ButtonLink } from "@/components/ui/button-link";
import { FINAL_CTA } from "@/features/home/data/home";

/** Cierre de la home: una última hoja con los dos caminos reales. */
export function FinalCta() {
  return (
    <section
      aria-labelledby="siguiente-paso-title"
      className="relative overflow-hidden border border-hairline-strong bg-surface px-5 py-12 sm:px-8 lg:px-12 lg:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 stage-light opacity-70"
      />

      <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8">
          <p className="type-meta text-muted-strong">{FINAL_CTA.eyebrow}</p>
          <h2
            id="siguiente-paso-title"
            className="mt-4 max-w-[20ch] text-balance type-title text-foreground"
          >
            {FINAL_CTA.title}
          </h2>
          <p className="mt-4 max-w-[52ch] type-body text-secondary">
            {FINAL_CTA.intro}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          <ButtonLink href={FINAL_CTA.primary.href}>
            {FINAL_CTA.primary.label}
          </ButtonLink>
          <ButtonLink href={FINAL_CTA.secondary.href} variant="secondary">
            {FINAL_CTA.secondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
