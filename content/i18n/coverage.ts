import { ROUTES } from "@/content/site";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/i18n";

/**
 * Rutas con contenido de página realmente traducido, por idioma. El shell
 * (navbar, pie, 404) ya está traducido en todas; esto solo cubre el contenido.
 * El idioma por defecto cubre todas las rutas. Cada Work Item de traducción
 * añade aquí sus rutas.
 */
export const TRANSLATED_ROUTES: Record<Locale, readonly string[]> = {
  es: ROUTES,
  en: [],
};

export function isTranslated(lang: Locale, path: string): boolean {
  return TRANSLATED_ROUTES[lang].includes(path);
}

export function translatedLocales(path: string): Locale[] {
  return LOCALES.filter((lang) => isTranslated(lang, path));
}

/** Idioma en el que está realmente el contenido de `path` cuando se pide `lang`. */
export function getContentLocale(lang: Locale, path: string): Locale {
  return isTranslated(lang, path) ? lang : DEFAULT_LOCALE;
}
