import { StatusTag, type StatusTone } from "@/components/ui/status-tag";
import { DemoSection } from "@/features/home/components/demo-section";
import { PROBLEM_DEMO } from "@/features/home/data/demos";
import type { DemoAlert } from "@/features/home/types";
import { cn } from "@/lib/cn";

const TONES: Record<DemoAlert, StatusTone> = {
  neutral: "neutral",
  warning: "warning",
  error: "error",
  accent: "accent",
  success: "success",
};

/** El mismo caso sin proceso y con el arnés: dos columnas, pasos numerados. */
export function ProblemDemo() {
  return (
    <DemoSection
      id="problema-demo"
      eyebrow="Sin REI / Con REI"
      title="El mismo caso, dos resultados"
      intro="Los agentes de IA y los LLM escriben código a partir de una conversación. Cuando decidir, planificar y ejecutar viven en la misma conversación, nada queda registrado y nadie puede revisar la decisión. El arnés separa esas tres cosas y deja la decisión por escrito."
      example
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {PROBLEM_DEMO.map((column) => (
          <div
            key={column.id}
            className={cn(
              "flex min-w-0 flex-col border bg-surface-deep",
              column.id === "con-rei"
                ? "border-border-strong"
                : "border-hairline-strong",
            )}
          >
            <header className="border-b border-hairline px-4 py-4 sm:px-5">
              <p className="type-meta text-muted-strong">{column.label}</p>
              <h3 className="mt-2 type-docs-heading text-foreground">
                {column.title}
              </h3>
              <p className="mt-2 type-docs text-secondary">{column.intro}</p>
            </header>

            <ol className="demo-reveal divide-y divide-hairline">
              {column.steps.map((step, index) => (
                <li
                  key={step.id}
                  className="grid grid-cols-[auto_1fr] gap-4 px-4 py-4 sm:px-5"
                >
                  <span className="type-meta-sm text-muted-strong">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <StatusTag tone={TONES[step.alert]}>
                        {step.alertLabel}
                      </StatusTag>
                      <h4 className="type-docs font-medium text-foreground">
                        {step.title}
                      </h4>
                    </div>
                    <p className="mt-1 type-docs text-secondary">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-auto border-t border-hairline px-4 py-3 type-meta-sm text-muted-strong sm:px-5">
              {column.note}
            </p>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}
