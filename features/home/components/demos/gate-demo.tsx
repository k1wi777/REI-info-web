import { StatusTag } from "@/components/ui/status-tag";
import { AGENT_ROLES, APPROVAL_GATE } from "@/content/rei";
import { DemoSection } from "@/features/home/components/demo-section";
import { GATE_BRANCHES, GATE_DEMO } from "@/features/home/data/demos";
import { cn } from "@/lib/cn";

const ROLE_NAMES = new Map(AGENT_ROLES.map((role) => [role.id, role.name]));

/** Ciclo completo con la puerta entre `ready` e `in_progress`. */
export function GateDemo() {
  return (
    <DemoSection
      id="puerta"
      eyebrow="Ciclo y puerta"
      title="La aprobación no es un trámite"
      intro="Un Work Item recorre cinco estados. La puerta no está antes ni después del trabajo: está entre la planificación y el código. Ningún control de esta página aprueba; la firma se registra desde el CLI."
      note="Los artefactos se despliegan con un disclosure nativo y el estado final del ciclo es legible sin JavaScript."
      example
    >
      <ol className="demo-reveal grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {GATE_DEMO.map((stage, index) => (
          <li
            key={stage.id}
            className={cn(
              "flex min-w-0 flex-col border p-4",
              stage.gate
                ? "border-accent/40 bg-accent/10"
                : "border-hairline bg-surface-deep",
            )}
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="type-meta-sm text-muted-strong">
                {String(index + 1).padStart(2, "0")}
              </p>
              {stage.state === "done" ? (
                <StatusTag tone="success">done</StatusTag>
              ) : null}
            </div>

            <h3
              className={cn(
                "mt-3 break-words type-code",
                stage.gate ? "text-accent-text" : "text-foreground",
              )}
            >
              {stage.label}
            </h3>

            {stage.gate ? (
              <div className="mt-3">
                <StatusTag tone="accent">{APPROVAL_GATE.status}</StatusTag>
                <p className="mt-2 type-meta-sm text-accent-text">
                  La firma de la persona
                </p>
              </div>
            ) : (
              <p className="mt-2 type-docs text-secondary">{stage.detail}</p>
            )}

            {stage.artifacts ? (
              <details className="mt-3 border-t border-hairline pt-2">
                <summary className="cursor-pointer type-meta-sm text-muted-strong">
                  Artefactos de planificación
                </summary>
                <ul className="mt-2 space-y-2">
                  {stage.artifacts.map((artifact) => (
                    <li key={artifact.name} className="type-meta-sm">
                      <span className="type-code text-foreground">
                        {artifact.name}
                      </span>
                      <span className="block text-muted-strong">
                        {artifact.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}

            {stage.roleId ? (
              <p className="mt-auto pt-3 type-meta-sm text-muted-strong">
                {ROLE_NAMES.get(stage.roleId)}
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-5 border border-accent/40 bg-accent/10 px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="type-meta text-accent-text">
            {APPROVAL_GATE.label}
          </h3>
          <StatusTag tone="accent">{APPROVAL_GATE.status}</StatusTag>
        </div>
        <p className="mt-2 type-docs text-secondary">{APPROVAL_GATE.detail}</p>
        <p className="mt-2 type-meta-sm text-muted-strong">
          La firma se registra desde el CLI; esta página no aprueba.
        </p>
      </div>

      <ul className="mt-5 grid gap-3 border-t border-hairline pt-4 sm:grid-cols-2">
        {GATE_BRANCHES.map((branch) => (
          <li key={branch.id} className="type-meta-sm text-muted-strong">
            <span className="type-code text-foreground">{branch.id}</span> —{" "}
            {branch.meaning}
          </li>
        ))}
      </ul>
      <p className="mt-3 type-meta-sm text-muted-strong">
        Ramas, no atajos. Solo un Work Item puede estar in_progress a la vez.
      </p>
    </DemoSection>
  );
}
