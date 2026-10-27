import { ButtonLink } from "@/components/ui/button-link";
import { ResponsibilityMatrix } from "@/features/home/components/responsibility-matrix";
import { StateScale } from "@/features/home/components/state-scale";
import { WorkItemMeta } from "@/features/home/components/work-item-meta";
import { INSTALL_PATH } from "@/content/site";

/**
 * Primer viewport: hoja única con tesis, deck y CTAs a la izquierda y la
 * matriz con la puerta de aprobación a la derecha.
 */
export function HeroSheet() {
  return (
    <section
      aria-labelledby="home-tesis"
      className="relative overflow-hidden border border-hairline-strong bg-surface-deep"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 sheet-grid opacity-40"
      />

      <div className="relative grid lg:grid-cols-12">
        <div className="border-b border-hairline px-5 py-10 sm:px-8 lg:col-span-7 lg:border-b-0 lg:border-r lg:px-10 lg:py-14">
          <p className="type-meta text-muted-strong">
            Spec Driven Development · Arnés de agentes de IA
          </p>

          <h1
            id="home-tesis"
            className="type-display mt-6 max-w-[22ch] text-balance text-foreground"
          >
            <span className="block">Tu agente escribe código.</span>{" "}
            <span className="block">
              REI decide{" "}
              <span className="underline decoration-accent decoration-2 underline-offset-4">
                qué código
              </span>
              .
            </span>
          </h1>

          <p className="type-body mt-6 max-w-[46ch] text-secondary">
            REI Harness convierte el trabajo con agentes de IA en un proceso con
            especificación, aprobación humana y evidencia, dentro de tu propio
            repositorio.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={INSTALL_PATH}>Instalar REI</ButtonLink>
            <ButtonLink href="#como-funciona" variant="secondary">
              Ver el flujo
            </ButtonLink>
          </div>

          <p className="mt-6 type-meta-sm text-muted-strong">
            La aprobación se registra desde el CLI. El silencio no aprueba.
          </p>
        </div>

        <div className="px-5 py-8 sm:px-8 lg:col-span-5 lg:py-10">
          <ResponsibilityMatrix />
        </div>
      </div>

      <div className="relative grid border-t border-hairline lg:grid-cols-12">
        <div className="border-b border-hairline px-5 py-6 sm:px-8 lg:col-span-7 lg:border-b-0 lg:border-r lg:px-10">
          <WorkItemMeta />
        </div>
        <div className="px-5 py-6 sm:px-8 lg:col-span-5">
          <StateScale />
        </div>
      </div>
    </section>
  );
}
