import { getCurrentLocale } from "@/content/i18n/server";
import { getProductCopy } from "@/features/product/copy";

/** Textos de `/producto` del idioma de la ruta actual; solo en Server Components. */
export async function getCurrentProductCopy() {
  return getProductCopy(await getCurrentLocale());
}
