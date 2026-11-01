export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

/** Valor de `openGraph.locale` por idioma. */
export const OG_LOCALES: Record<Locale, string> = {
  es: "es_ES",
  en: "en_US",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return LOCALES.some((locale) => locale === value);
}

/** Idioma válido o el idioma por defecto; para metadata, que no debe fallar. */
export function toLocale(value: string): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Primer segmento del path si es un idioma soportado. */
export function getLocaleFromPathname(pathname: string): Locale | undefined {
  const segment = pathname.split(/[?#]/, 1)[0].split("/")[1];
  return isLocale(segment) ? segment : undefined;
}

/** Quita el prefijo de idioma: `/es/docs` → `/docs`, `/en` → `/`. */
export function stripLocale(pathname: string): string {
  if (!getLocaleFromPathname(pathname)) {
    return pathname;
  }
  const rest = pathname.replace(/^\/[^/?#]+/, "");
  return rest.startsWith("/") ? rest : `/${rest}`;
}

/**
 * Antepone el idioma a un path interno. Es idempotente: un path que ya lleva
 * prefijo se re-prefija con el idioma pedido. Conserva `?query` y `#hash`.
 */
export function localizePath(lang: Locale, path: string): string {
  const stripped = stripLocale(path);
  const match = /^([^?#]*)(.*)$/.exec(stripped);
  const pathname = (match?.[1] ?? "").replace(/^\/+/, "").replace(/\/+$/, "");
  const suffix = match?.[2] ?? "";

  return `/${lang}${pathname ? `/${pathname}` : ""}${suffix}`;
}

/** Misma página en otro idioma: `/es/docs` + `en` → `/en/docs`. */
export function swapLocale(pathname: string, target: Locale): string {
  return localizePath(target, stripLocale(pathname));
}

/** `true` para hrefs internos que deben recibir prefijo de idioma. */
export function isLocalizableHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}
