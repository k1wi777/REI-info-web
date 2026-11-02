import type { DocsEntry } from "@/features/docs/types";

/** Texto de una tarjeta de la landing; el `href` vive en `data/entries.ts`. */
export type DocsEntryText = Pick<DocsEntry, "title" | "mode" | "description">;

/** Ids de las tarjetas, definidos una vez en `data/entries.ts`. */
export type DocsEntryId =
  | "install"
  | "first-work-item"
  | "commands"
  | "faq";

/** Tarjetas cuyo destino está traducido: las únicas que existen en inglés. */
export type TranslatedEntryId = Extract<
  DocsEntryId,
  "install" | "first-work-item"
>;

export type DocsLandingCopyBase = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  recommended: {
    heading: string;
    text: string;
    install: string;
    firstWorkItem: string;
  };
};

/** Español: todas las tarjetas. Inglés: solo las de destino traducido. */
export type DocsLandingCopyEs = DocsLandingCopyBase & {
  entries: Record<DocsEntryId, DocsEntryText>;
};

export type DocsLandingCopyEn = DocsLandingCopyBase & {
  entries: Record<TranslatedEntryId, DocsEntryText>;
};

export type DocsLandingCopy = DocsLandingCopyBase & {
  entries: Partial<Record<DocsEntryId, DocsEntryText>>;
};
