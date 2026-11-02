import { en } from "@/features/faq/copy/en";
import { es } from "@/features/faq/copy/es";
import type { FaqCopy } from "@/features/faq/types";
import type { Locale } from "@/lib/i18n";

const COPIES: Record<Locale, FaqCopy> = { es, en };

/** Textos de la FAQ en el idioma pedido. */
export function getFaqCopy(lang: Locale): FaqCopy {
  return COPIES[lang];
}
