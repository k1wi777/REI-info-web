import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/i18n";
import { isLocale, type Locale } from "@/lib/i18n";

/** Idioma de la ruta actual; solo en Server Components (`next/root-params`). */
export async function getCurrentLocale(): Promise<Locale> {
  const current = await lang();
  if (!isLocale(current)) {
    notFound();
  }
  return current;
}

export async function getCurrentDictionary() {
  return getDictionary(await getCurrentLocale());
}
