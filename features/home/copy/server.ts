import { getCurrentLocale } from "@/content/i18n/server";
import { getHomeCopy } from "@/features/home/copy";

/** Textos de la home del idioma de la ruta actual; solo en Server Components. */
export async function getCurrentHomeCopy() {
  return getHomeCopy(await getCurrentLocale());
}
