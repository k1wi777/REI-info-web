import type { AgentRoleId } from "@/content/rei";
import type {
  DemoStep,
  HomeActId,
  HomeItem,
  ProblemCaseId,
} from "@/features/home/types";

/** Fases de la matriz de la cabecera; el rol de cada una vive en `data/sheet.ts`. */
export type SheetPhaseId = "01" | "02" | "04" | "05";

export type ProblemStepId =
  | "sin-rei-1"
  | "sin-rei-2"
  | "sin-rei-3"
  | "sin-rei-4"
  | "sin-rei-5"
  | "con-rei-1"
  | "con-rei-2"
  | "con-rei-3"
  | "con-rei-4"
  | "con-rei-5";

export type GateStageId =
  | "pending"
  | "ready"
  | "gate"
  | "in_progress"
  | "review"
  | "done";

export type GateArtifactName = "requirements.md" | "design.md" | "tasks.md";

export type BranchStateId = "blocked" | "changes_requested";

export type ArtifactId = "root" | "requirements" | "design" | "tasks" | "meta";

/** Bloque editorial sin ids ni destinos: esos son datos y no cambian por idioma. */
export type HomeBlockCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  items: HomeItem[];
  linkLabel: string;
};

export type DemoHeaderCopy = {
  eyebrow: string;
  title: string;
  intro: string;
};

export type CaptureText = {
  alt: string;
  description: string;
};

/**
 * Todos los textos de la home. Una única forma: una clave ausente en `es` o
 * `en` rompe `pnpm typecheck`. Comandos, estados, nombres de rol y salidas
 * simuladas de terminal no están aquí: viven en `data/` o en `content/rei`.
 */
export type HomeCopy = {
  /** Texto fijo de primitivas compartidas que la home reutiliza. */
  ui: {
    exampleTag: string;
    captureLink: string;
  };
  acts: Record<HomeActId, { label: string; thesis: string }>;
  hero: {
    brand: string;
    kicker: string;
    titleLine: string;
    titleEmphasis: string;
    lede: string;
    install: string;
    flow: string;
    approvalNote: string;
  };
  sheet: {
    title: string;
    summary: string;
    exampleTag: string;
    matrixLabel: (title: string) => string;
    caption: string;
    phaseColumn: string;
    responsible: string;
    notInvolved: string;
    phases: Record<SheetPhaseId, string>;
    meta: {
      state: string;
      checkpoints: string;
      approval: string;
      type: string;
    };
    gate: { label: string; status: string; detail: string };
  };
  states: {
    heading: string;
    current: (state: string) => string;
    currentSr: string;
    oneAtATime: string;
  };
  process: HomeBlockCopy;
  limits: HomeBlockCopy;
  problem: DemoHeaderCopy & {
    cases: Record<
      ProblemCaseId,
      { label: string; title: string; intro: string; note: string }
    >;
    steps: Record<ProblemStepId, Pick<DemoStep, "title" | "detail" | "alertLabel">>;
  };
  gate: DemoHeaderCopy & {
    note: string;
    stages: Record<GateStageId, string>;
    gateLabel: string;
    artifacts: Record<GateArtifactName, string>;
    signNote: string;
    branches: Record<BranchStateId, string>;
    footnote: string;
  };
  agents: DemoHeaderCopy & {
    note: string;
    gateTag: string;
    gateSigned: string;
    openLabel: string;
    detailHeading: (role: string) => string;
    responsibility: string;
    limit: string;
    initializerNote: string;
    handoffs: Record<AgentRoleId, string>;
    roles: Record<AgentRoleId, { responsibility: string; limit: string }>;
    summaryLabel: (role: string, handoff: string) => string;
  };
  terminal: DemoHeaderCopy & {
    note: (date: string) => string;
    caption: string;
    snapshotMeta: (date: string) => string;
    scrollHint: string;
    outputLabel: (command: string) => string;
    treeLabel: (root: string) => string;
    treeMeta: (count: number) => string;
    snapshotNote: string;
    artifacts: Record<ArtifactId, string>;
  };
  viewer: DemoHeaderCopy & {
    note: (date: string) => string;
    linkLabel: string;
    frameMeta: string;
    caption: (date: string) => string;
    annotations: { id: string; title: string; text: string }[];
    diff: { title: string; text: string; crop: string };
    missingPre: string;
    missingPost: string;
  };
  github: DemoHeaderCopy & {
    note: string;
    linkLabel: string;
    openIssue: (issue: number) => string;
    targets: { id: string; title: string; text: string }[];
    projection: {
      label: string;
      truth: string;
      body: string;
      optionalPre: string;
      optionalPost: string;
    };
    bodyFrame: string;
    bodyCaption: string;
  };
  /** Texto alternativo y descripción por captura del manifiesto. */
  captures: Record<string, CaptureText>;
  cta: {
    eyebrow: string;
    title: string;
    intro: string;
    primary: string;
    secondary: string;
  };
};
