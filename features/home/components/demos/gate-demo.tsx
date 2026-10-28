import { StatusTag } from "@/components/ui/status-tag";
import { AGENT_ROLES, APPROVAL_GATE } from "@/content/rei";
import { DemoSection } from "@/features/home/components/demo-section";
import { GATE_BRANCHES, GATE_DEMO } from "@/features/home/data/demos";
import type { GateStage } from "@/features/home/types";

const ROLE_NAMES = new Map(AGENT_ROLES.map((role) => [role.id, role.name]));

type StageProps = {
  stage: GateStage;
  index: number;
};

/** Etapa del ciclo: regla superior, número, estado y rol responsable. */
function Stage({ stage, index }: StageProps) {
  return (
    <li className="flex min-w-0 flex-col border-t border-hairline-strong pt-4">
      <div className="flex items-baseline justify-between gap-2">
        <p className="type-meta-sm text-muted-strong tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </p>
        {stage.state === "done" ? (
          <StatusTag tone="success">done</StatusTag>
        ) : null}
      </div>

      <p className="mt-2 break-words type-code text-foreground">
        {stage.label}
      </p>

      {stage.roleId ? (
        <p className="mt-1 type-meta-sm text-muted-strong">
          {ROLE_NAMES.get(stage.roleId)}
        </p>
      ) : null}

      <p className="mt-3 type-docs text-secondary">{stage.detail}</p>
    </li>
  );
}

/** Ciclo completo: planificación, puerta y entrega, con la firma en el centro. */
export function GateDemo() {
  const stages = GATE_DEMO.filter((stage) => !stage.gate);
  const gate = GATE_DEMO.find((stage) => stage.gate);
  const planning = stages.slice(0, 2);
  const delivery = stages.slice(2);
  const artifacts =
    GATE_DEMO.find((stage) => stage.artifacts)?.artifacts ?? [];

  return (
    <DemoSection
      id="puerta"
      eyebrow="Ciclo y puerta"
      title="La aprobación no es un trámite"
      intro="Un Work Item recorre cinco estados. La puerta no está antes ni después del trabajo: está entre la planificación y el código. Ningún control de esta página aprueba; la firma se registra desde el CLI."
      note="Los artefactos de la puerta son legibles sin JavaScript; el ciclo se lee de arriba abajo en móvil."
      example
    >
      <div className="grid gap-8">
        <ol className="demo-reveal grid gap-6 sm:grid-cols-2">
          {planning.map((stage, index) => (
            <Stage key={stage.id} stage={stage} index={index} />
          ))}
        </ol>

        {gate ? (
          <div className="border-y border-accent/40 bg-accent/10 px-5 py-5 sm:px-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="type-meta text-accent-text">{gate.label}</h3>
              <StatusTag tone="accent">{APPROVAL_GATE.status}</StatusTag>
            </div>

            <p className="mt-3 max-w-[62ch] type-docs text-secondary">
              {gate.detail}
            </p>

            <ul className="mt-5 grid gap-x-8 gap-y-3 border-t border-accent/20 pt-4 sm:grid-cols-3">
              {artifacts.map((artifact) => (
                <li key={artifact.name} className="min-w-0">
                  <p className="break-words type-code text-accent-text">
                    {artifact.name}
                  </p>
                  <p className="mt-1 type-caption text-secondary">
                    {artifact.note}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-4 type-caption text-muted-strong">
              La firma se registra desde el CLI; esta página no aprueba.
            </p>
          </div>
        ) : null}

        <ol className="demo-reveal grid gap-6 sm:grid-cols-3">
          {delivery.map((stage, index) => (
            <Stage
              key={stage.id}
              stage={stage}
              index={index + planning.length}
            />
          ))}
        </ol>

        <div className="grid gap-3 border-t border-hairline pt-5 sm:grid-cols-2 sm:gap-8">
          {GATE_BRANCHES.map((branch) => (
            <p key={branch.id} className="type-caption text-muted-strong">
              <span className="mr-2 type-code text-foreground">
                {branch.id}
              </span>
              {branch.meaning}
            </p>
          ))}
        </div>

        <p className="type-caption text-muted-strong">
          Ramas, no atajos. Solo un Work Item puede estar in_progress a la vez.
        </p>
      </div>
    </DemoSection>
  );
}
