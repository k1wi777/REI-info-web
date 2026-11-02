import type { DocBlock } from "@/content/docs";
import type { DocContent, DocsEntry } from "@/features/docs/types";

/** Texto de una tarjeta de la landing; el `href` vive en `data/entries.ts`. */
export type DocsEntryText = Pick<DocsEntry, "title" | "mode" | "description">;

/** Ids de las tarjetas, definidos una vez en `data/entries.ts`. */
export type DocsEntryId =
  | "install"
  | "first-work-item"
  | "commands"
  | "faq";

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

/** Todas las tarjetas existen en español y en inglés. */
export type DocsLandingCopyEs = DocsLandingCopyBase & {
  entries: Record<DocsEntryId, DocsEntryText>;
};

export type DocsLandingCopyEn = DocsLandingCopyBase & {
  entries: Record<DocsEntryId, DocsEntryText>;
};

export type DocsLandingCopy = DocsLandingCopyBase & {
  entries: Partial<Record<DocsEntryId, DocsEntryText>>;
};

/** Texto de un documento de contenido; el `path` lo aporta el registro. */
export type DocCopy = Pick<DocContent, "eyebrow" | "meta" | "sections">;

/** Texto de la landing de un modo; título y tarjetas salen del árbol. */
export type DocsModeLandingCopy = { intro: string; outro?: DocBlock[] };
