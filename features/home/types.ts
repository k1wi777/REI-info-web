import type { AgentRoleId, WorkItemStateId } from "@/content/rei";

export type SheetMeta = {
  code: string;
  revision: string;
  title: string;
  type: string;
  state: string;
  checkpoints: string;
  approval: string;
};

export type SheetPhase = {
  id: string;
  label: string;
  roleId: AgentRoleId;
};

export type HomeItem = {
  title: string;
  description: string;
};

export type HomeBlock = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  items?: HomeItem[];
  note?: string;
  link?: {
    label: string;
    href: string;
  };
};

export type FinalCta = {
  eyebrow: string;
  title: string;
  intro: string;
  primary: {
    label: string;
    href: string;
  };
  secondary: {
    label: string;
    href: string;
  };
};

/** Fondo de un acto: solo tokens existentes del sistema. */
export type HomeActTone = "canvas" | "deep" | "surface";

export type HomeAct = {
  id: string;
  anchor: string;
  number: string;
  label: string;
  thesis: string;
  tone: HomeActTone;
};

export type DemoAlert = "neutral" | "warning" | "error" | "accent" | "success";

export type DemoStep = {
  id: string;
  title: string;
  detail: string;
  alert: DemoAlert;
  /** Etiqueta textual de la marca: el color nunca va solo. */
  alertLabel: string;
};

export type ProblemCase = {
  id: "sin-rei" | "con-rei";
  label: string;
  title: string;
  intro: string;
  steps: DemoStep[];
  note: string;
};

export type GateArtifact = {
  name: string;
  note: string;
};

export type GateStage = {
  id: string;
  label: string;
  detail: string;
  roleId?: AgentRoleId;
  state?: WorkItemStateId;
  gate?: boolean;
  artifacts?: GateArtifact[];
};

export type AgentNode = {
  roleId: AgentRoleId;
  /** El Initializer es una rama lateral, no una etapa del ciclo. */
  branch?: boolean;
  handoff: string;
};

export type TerminalLine = {
  kind: "prompt" | "output" | "note";
  text: string;
};

export type TerminalSnapshot = {
  command: string;
  lines: TerminalLine[];
  capturedAt: string;
  caption: string;
};

export type ArtifactEntry = {
  id: string;
  path: string;
  note: string;
  depth: number;
};

export type EvidenceKind = "issue" | "viewer";

export type EvidenceView = "desktop" | "ficha" | "mobile" | "diff";

/** Captura del manifiesto generado por `pnpm capture:evidence`. */
export type EvidenceCapture = {
  id: string;
  kind: EvidenceKind;
  file: string;
  width: number;
  height: number;
  source: string;
  capturedAt: string;
  description: string;
  alt: string;
  issue?: number;
  labels?: string[];
  state?: "open" | "closed";
  workItem?: string;
  view?: EvidenceView;
};

export type EvidenceManifest = {
  generatedAt: string;
  repository: string;
  viewerWorkItem: string;
  captures: EvidenceCapture[];
};
