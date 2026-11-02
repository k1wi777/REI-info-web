import { getCurrentLocale } from "@/content/i18n/server";
import { getFirstWorkItemCopy } from "@/features/first-work-item/copy";

/** Textos del tutorial del idioma de la ruta actual; solo en Server Components. */
export async function getCurrentFirstWorkItemCopy() {
  return getFirstWorkItemCopy(await getCurrentLocale());
}
