import { ActSection } from "@/features/home/components/act-section";
import { AgentsDemo } from "@/features/home/components/demos/agents-demo";
import { GateDemo } from "@/features/home/components/demos/gate-demo";
import { GithubIssuesDemo } from "@/features/home/components/demos/github-issues-demo";
import { ProblemDemo } from "@/features/home/components/demos/problem-demo";
import { TerminalDemo } from "@/features/home/components/demos/terminal-demo";
import { ViewerDemo } from "@/features/home/components/demos/viewer-demo";
import { FinalCta } from "@/features/home/components/final-cta";
import { HeroSheet } from "@/features/home/components/hero-sheet";
import { HomeSection } from "@/features/home/components/home-section";
import { RevealController } from "@/features/home/components/reveal-controller";
import { HOME_ACTS } from "@/features/home/data/acts";
import { LIMITS_BLOCK, PROCESS_INTRO } from "@/features/home/data/home";
import { REVEAL_BOOTSTRAP_SCRIPT } from "@/features/home/data/motion";

const [PROBLEM_ACT, PROCESS_ACT, EVIDENCE_ACT, CLOSE_ACT] = HOME_ACTS;

export function HomePage() {
  return (
    <>
      {/* Bootstrap estático: oculta el contenido antes del paint solo con JS válido. */}
      <script
        dangerouslySetInnerHTML={{ __html: REVEAL_BOOTSTRAP_SCRIPT }}
      />
      <RevealController />

      <div className="mx-2 sm:mx-3 lg:mx-4">
        <HeroSheet />
      </div>

      <ActSection act={PROBLEM_ACT}>
        <ProblemDemo />
      </ActSection>

      <ActSection act={PROCESS_ACT}>
        <HomeSection block={PROCESS_INTRO} columns={4} />
        <GateDemo />
        <AgentsDemo />
        <TerminalDemo />
      </ActSection>

      <ActSection act={EVIDENCE_ACT}>
        <ViewerDemo />
        <GithubIssuesDemo />
        <HomeSection block={LIMITS_BLOCK} />
      </ActSection>

      <ActSection act={CLOSE_ACT}>
        <FinalCta />
      </ActSection>
    </>
  );
}
