import { getCurrentLocale } from "@/content/i18n/server";
import { getInstallCopy } from "@/features/installation/copy";

/** Textos de `/instalar` del idioma de la ruta actual; solo en Server Components. */
export async function getCurrentInstallCopy() {
  return getInstallCopy(await getCurrentLocale());
}
