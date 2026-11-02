import type { FaqThemeId } from "@/features/faq/data/faq";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqTheme = {
  id: FaqThemeId;
  title: string;
  items: FaqItem[];
};

/** Textos de `/docs/operacion/faq`; los ids de tema (anclas) no cambian. */
export type FaqCopy = {
  eyebrow: string;
  description: string;
  /** Usa `{questions}` y `{topics}`. */
  metaTemplate: string;
  themes: Record<FaqThemeId, { title: string; items: FaqItem[] }>;
};
