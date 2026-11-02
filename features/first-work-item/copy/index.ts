import { en } from "@/features/first-work-item/copy/en";
import { es } from "@/features/first-work-item/copy/es";
import type { FirstWorkItemCopy } from "@/features/first-work-item/copy/types";
import type { Locale } from "@/lib/i18n";

const COPIES: Record<Locale, FirstWorkItemCopy> = { es, en };

/** Textos del primer Work Item en el idioma pedido. */
export function getFirstWorkItemCopy(lang: Locale): FirstWorkItemCopy {
  return COPIES[lang];
}
