import { getCurrentLocale } from "@/content/i18n/server";
import {
  getInstallCopy,
  getInstallationDocCopy,
} from "@/features/installation/copy";

/** Textos de `/instalar` del idioma de la ruta actual; solo en Server Components. */
export async function getCurrentInstallCopy() {
  return getInstallCopy(await getCurrentLocale());
}

/** Textos de la instalación (docs) del idioma de la ruta actual. */
export async function getCurrentInstallationDocCopy() {
  return getInstallationDocCopy(await getCurrentLocale());
}
