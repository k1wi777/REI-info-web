import { en } from "@/features/docs/copy/en";
import { es } from "@/features/docs/copy/es";
import type { DocsLandingCopy } from "@/features/docs/copy/types";
import type { Locale } from "@/lib/i18n";

const COPIES: Record<Locale, DocsLandingCopy> = { es, en };

/** Textos de la landing de documentación en el idioma pedido. */
export function getDocsLandingCopy(lang: Locale): DocsLandingCopy {
  return COPIES[lang];
}
