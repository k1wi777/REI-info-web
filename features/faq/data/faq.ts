import type { TocItem } from "@/content/docs";
import type { FaqCopy, FaqTheme } from "@/features/faq/types";

export const FAQ_PATH = "/docs/operacion/faq";

/** Ids de tema en orden de presentación; son las anclas (`faq-<id>`) y no se traducen. */
export const FAQ_THEME_IDS = [
  "work-items",
  "cambios-directos",
  "verificacion",
  "git",
] as const;

export type FaqThemeId = (typeof FAQ_THEME_IDS)[number];

/** Temas de la copy en orden de presentación. */
export function buildFaqThemes(copy: FaqCopy): FaqTheme[] {
  return FAQ_THEME_IDS.map((id) => ({ id, ...copy.themes[id] }));
}

export function buildFaqToc(copy: FaqCopy): TocItem[] {
  return FAQ_THEME_IDS.map((id) => ({
    id: `faq-${id}`,
    title: copy.themes[id].title,
  }));
}
