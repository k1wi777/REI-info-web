import type { DocBlock } from "@/content/docs";
import type {
  AgentRoleId,
  WorkItemStateId,
} from "@/content/rei";
import type { ProductPageSlug } from "@/content/site";

export type ProductLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type EvidenceSourceId =
  | "replit"
  | "metr"
  | "gitclear"
  | "veracode"
  | "dora-2025"
  | "stack-overflow-2025"
  | "github-copilot-2023";

export type EvidenceSource = {
  id: EvidenceSourceId;
  title: string;
  date: string;
  finding: string;
  implication: string;
  url: string;
};

export type FlowStep = {
  id: string;
  actor: string;
  description: string;
  gate?: boolean;
};

export type ProductDomainBlock =
  | { kind: "links"; links: ProductLink[] }
  | { kind: "roles"; roles: AgentRoleId[] }
  | { kind: "states"; states: WorkItemStateId[] }
  | { kind: "evidence"; ids: EvidenceSourceId[] }
  | { kind: "flow" }
  | { kind: "commands"; ids: string[] };

/** Prosa compartida con docs más los bloques propios del dominio producto. */
export type ProductBlock = DocBlock | ProductDomainBlock;

export type ProductSection = {
  id: string;
  title: string;
  blocks: ProductBlock[];
};

export type ProductDocument = {
  id: ProductPageSlug;
  eyebrow: string;
  meta?: string;
  sections: ProductSection[];
};
