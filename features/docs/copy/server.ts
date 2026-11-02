import { getCurrentLocale } from "@/content/i18n/server";
import { getDocsLandingCopy } from "@/features/docs/copy";

/** Textos de `/docs` del idioma de la ruta actual; solo en Server Components. */
export async function getCurrentDocsLandingCopy() {
  return getDocsLandingCopy(await getCurrentLocale());
}
