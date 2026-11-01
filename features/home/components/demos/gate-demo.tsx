import { StatusTag } from "@/components/ui/status-tag";
import { AGENT_ROLES } from "@/content/rei";
import { DemoSection } from "@/features/home/components/demo-section";
import { getCurrentHomeCopy } from "@/features/home/copy/server";
import { GATE_BRANCHES, buildGateDemo } from "@/features/home/data/demos";
import type { BranchStateId } from "@/features/home/copy/types";
import type { GateStage } from "@/features/home/types";

const ROLE_NAMES = new Map(AGENT_ROLES.map((role) => [role.id, role.name]));

type StageProps = {
  stage: GateStage;
  index: number;
};

/** Etapa del ciclo: regla superior, número, estado y rol responsable. */
function Stage({ stage, index }: StageProps) {
  return (
    <li
      data-reveal="up"
      data-reveal-delay={String(Math.min(index + 1, 5))}
      className="flex min-w-0 flex-col border-t border-hairline-strong pt-4"
    >
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

      <p className="mt-3 type-body text-secondary">{stage.detail}</p>
    </li>
  );
}

/** Ciclo completo: planificación, puerta y entrega, con la firma en el centro. */
export async function GateDemo() {
  const { gate: copy, sheet } = await getCurrentHomeCopy();
  const GATE_DEMO = buildGateDemo(copy);
  const stages = GATE_DEMO.filter((stage) => !stage.gate);
  const gate = GATE_DEMO.find((stage) => stage.gate);
  const planning = stages.slice(0, 2);
  const delivery = stages.slice(2);
  const artifacts =
    GATE_DEMO.find((stage) => stage.artifacts)?.artifacts ?? [];

  return (
    <DemoSection
      id="puerta"
      eyebrow={copy.eyebrow}
      title={copy.title}
      intro={copy.intro}
      note={copy.note}
      example
    >
      <div className="grid gap-8">
        <ol className="grid gap-6 sm:grid-cols-2">
          {planning.map((stage, index) => (
            <Stage key={stage.id} stage={stage} index={index} />
          ))}
        </ol>

        {gate ? (
          <div
            data-reveal="up"
            className="border border-accent/40 bg-accent/10 px-5 py-5 sm:px-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <p className="type-meta text-accent-text">{gate.label}</p>
              <StatusTag tone="accent">{sheet.gate.status}</StatusTag>
            </div>

            <p className="mt-3 max-w-[62ch] type-body text-secondary">
              {gate.detail}
            </p>

            <ul className="mt-5 grid gap-x-8 gap-y-3 border-t border-accent/20 pt-4 sm:grid-cols-3">
              {artifacts.map((artifact, index) => (
                <li
                  key={artifact.name}
                  data-reveal="fade"
                  data-reveal-delay={String(index + 1)}
                  className="min-w-0"
                >
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
              {copy.signNote}
            </p>
          </div>
        ) : null}

        <ol className="grid gap-6 sm:grid-cols-3">
          {delivery.map((stage, index) => (
            <Stage
              key={stage.id}
              stage={stage}
              index={index + planning.length}
            />
          ))}
        </ol>

        <div className="grid gap-3 border-t border-hairline pt-5 sm:grid-cols-2 sm:gap-8">
          {GATE_BRANCHES.map((branch, index) => (
            <p
              key={branch.id}
              data-reveal="fade"
              data-reveal-delay={String(index + 1)}
              className="type-caption text-muted-strong"
            >
              <span className="mr-2 type-code text-foreground">
                {branch.id}
              </span>
              {copy.branches[branch.id as BranchStateId]}
            </p>
          ))}
        </div>

        <p className="type-caption text-muted-strong">
          {copy.footnote}
        </p>
      </div>
    </DemoSection>
  );
}
