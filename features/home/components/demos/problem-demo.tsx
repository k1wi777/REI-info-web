import { DemoSection } from "@/features/home/components/demo-section";
import { PROBLEM_DEMO } from "@/features/home/data/demos";
import type { DemoAlert } from "@/features/home/types";
import { cn } from "@/lib/cn";

const DOTS: Record<DemoAlert, string> = {
  neutral: "bg-muted",
  warning: "bg-warning",
  error: "bg-error",
  accent: "bg-accent-text",
  success: "bg-success",
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
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-0">
        {PROBLEM_DEMO.map((column, columnIndex) => (
          <div
            key={column.id}
            className={cn(
              "flex min-w-0 flex-col",
              columnIndex === 0
                ? "border-t border-hairline-strong pt-6"
                : "border-t border-hairline-strong pt-6 lg:border-l lg:border-t-0 lg:pl-12",
            )}
          >
            <header>
              <p className="flex items-baseline gap-2 type-meta text-muted-strong">
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-1.5 rounded-full",
                    column.id === "con-rei" ? "bg-accent-text" : "bg-error",
                  )}
                />
                {column.label}
              </p>
              <h3 className="mt-4 type-docs-heading text-balance text-foreground">
                {column.title}
              </h3>
              <p className="mt-2 max-w-[46ch] type-docs text-secondary">
                {column.intro}
              </p>
            </header>

            <ol className="mt-6 divide-y divide-hairline">
              {column.steps.map((step, index) => (
                <li
                  key={step.id}
                  className="grid grid-cols-[1.75rem_1fr] gap-4 py-4"
                >
                  <span className="type-meta-sm text-muted-strong tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="inline-flex items-center gap-1.5 type-meta-sm text-muted-strong">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "size-1 rounded-full",
                            DOTS[step.alert],
                          )}
                        />
                        {step.alertLabel}
                      </span>
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

            <p className="mt-auto border-t border-hairline pt-4 type-caption text-muted-strong">
              {column.note}
            </p>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}
