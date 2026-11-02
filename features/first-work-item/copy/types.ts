import type { DocSection } from "@/content/docs";

/** Textos de `/docs/empezar/primer-work-item`; los comandos viven en `data/`. */
export type FirstWorkItemCopy = {
  eyebrow: string;
  description: string;
  /** Línea bajo la descripción del artículo. */
  articleMeta: string;
  sections: DocSection[];
};
