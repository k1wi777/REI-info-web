import { en } from "@/features/installation/copy/en";
import { es } from "@/features/installation/copy/es";
import type { InstallCopy } from "@/features/installation/copy/types";
import type { Locale } from "@/lib/i18n";

const COPIES: Record<Locale, InstallCopy> = { es, en };

/** Textos de la página de instalación en el idioma pedido. */
export function getInstallCopy(lang: Locale): InstallCopy {
  return COPIES[lang];
}
