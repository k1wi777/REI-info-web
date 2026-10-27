import type { DocSection } from "@/content/docs";

export type DocsEntry = {
  title: string;
  mode: string;
  description: string;
  href: string;
};

export type DocsContentPath =
  | "/docs/conceptos/sdd"
  | "/docs/conceptos/aprobacion-humana"
  | "/docs/conceptos/work-items-y-estados"
  | "/docs/conceptos/modo-directo"
  | "/docs/guias/github"
  | "/docs/guias/visor"
  | "/docs/guias/checks"
  | "/docs/guias/actualizar";

export type DocContent = {
  path: DocsContentPath;
  eyebrow: string;
  meta?: string;
  sections: DocSection[];
};

export type DocsModeId = "conceptos" | "guias";
