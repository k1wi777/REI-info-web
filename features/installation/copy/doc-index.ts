import { installationDocEn } from "@/features/installation/copy/doc.en";
import { installationDocEs } from "@/features/installation/copy/doc.es";
import type { InstallationDocCopy } from "@/features/installation/copy/types";
import type { Locale } from "@/lib/i18n";

const DOCS: Record<Locale, InstallationDocCopy> = {
  es: installationDocEs,
  en: installationDocEn,
};

/** Textos de la instalación de la documentación en el idioma pedido. */
export function getInstallationDocCopy(lang: Locale): InstallationDocCopy {
  return DOCS[lang];
}
