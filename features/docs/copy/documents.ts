import {
  isTranslated,
  type TranslatedDocsPath,
} from "@/content/i18n/coverage";
import { DOCS_DOCUMENTS } from "@/features/docs/data/pages";
import type { DocCopy } from "@/features/docs/copy/types";
import type { DocContent, DocsContentPath } from "@/features/docs/types";
import { DOCUMENTS_EN } from "@/features/docs/copy/pages";
import type { Locale } from "@/lib/i18n";

/** Rutas de contenido con documento en inglés: salen de la cobertura. */
export type TranslatedDocsContentPath = Extract<
  DocsContentPath,
  TranslatedDocsPath
>;

/**
 * Documento de `path` en el idioma pedido. El español es el registro de
 * `data/pages`; el inglés, la copy de `copy/pages`, solo si la ruta está
 * registrada en la cobertura.
 */
export function getDocsDocument(path: DocsContentPath, lang: Locale): DocContent {
  if (lang === "en" && isTranslated("en", path)) {
    const copy: DocCopy = DOCUMENTS_EN[path as TranslatedDocsContentPath];

    return { path, ...copy };
  }

  return DOCS_DOCUMENTS[path];
}
