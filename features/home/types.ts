import type { AgentRoleId } from "@/content/rei";

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
