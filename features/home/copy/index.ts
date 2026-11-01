import { en } from "@/features/home/copy/en";
import { es } from "@/features/home/copy/es";
import type { HomeCopy } from "@/features/home/copy/types";
import type { Locale } from "@/lib/i18n";

const COPIES: Record<Locale, HomeCopy> = { es, en };

/** Textos de la home en el idioma pedido. */
export function getHomeCopy(lang: Locale): HomeCopy {
  return COPIES[lang];
}
