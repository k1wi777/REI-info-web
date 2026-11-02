import {
  INSTALL_PATH,
  PRODUCT_PAGES,
  ROUTES,
  type DocsSection,
} from "@/content/site";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/i18n";

/**
 * Modos de documentación con todas sus páginas traducidas. Junto con
 * `TRANSLATED_DOCS_PATHS` es la única declaración de qué docs están en inglés:
 * cada Work Item de traducción de un modo añade aquí su modo y sus páginas.
 */
export const TRANSLATED_DOCS_MODES = ["empezar", "conceptos", "guias", "referencia", "operacion"] as const satisfies readonly DocsSection["id"][];

export const TRANSLATED_DOCS_PATHS = [
  "/docs/empezar/instalacion",
  "/docs/empezar/primer-work-item",
  "/docs/conceptos",
  "/docs/conceptos/sdd",
  "/docs/conceptos/aprobacion-humana",
  "/docs/conceptos/work-items-y-estados",
  "/docs/conceptos/modo-directo",
  "/docs/guias",
  "/docs/guias/github-issues",
  "/docs/guias/visor",
  "/docs/guias/checks",
  "/docs/guias/actualizar",
  "/docs/referencia",
  "/docs/referencia/comandos",
  "/docs/referencia/configuracion",
  "/docs/referencia/meta",
  "/docs/referencia/estados",
  "/docs/referencia/plantillas",
  "/docs/referencia/adaptadores",
  "/docs/operacion",
  "/docs/operacion/troubleshooting",
  "/docs/operacion/changelog",
  "/docs/operacion/faq",
] as const;

/**
 * Páginas de un modo traducido que siguen en español. Hoy vacía: una página
 * nueva de un modo ya traducido se declara aquí hasta traducirla. Cada ruta de
 * `DOCS_SECTIONS` está en exactamente una de las dos listas.
 */
export const UNTRANSLATED_DOCS_PATHS = [] as const;

export type TranslatedDocsMode = (typeof TRANSLATED_DOCS_MODES)[number];
export type TranslatedDocsPath = (typeof TRANSLATED_DOCS_PATHS)[number];

/** Landing de documentación: no pertenece a ningún modo. */
export const DOCS_LANDING_PATH = "/docs";

/**
 * Rutas con contenido de página realmente traducido, por idioma. El shell
 * (navbar, pie, 404) ya está traducido en todas; esto solo cubre el contenido.
 * El idioma por defecto cubre todas las rutas. Cada Work Item de traducción
 * añade aquí sus rutas.
 */
export const TRANSLATED_ROUTES: Record<Locale, readonly string[]> = {
  es: ROUTES,
  en: [
    "/",
    INSTALL_PATH,
    ...PRODUCT_PAGES.map((page) => page.path),
    DOCS_LANDING_PATH,
    ...TRANSLATED_DOCS_PATHS,
  ],
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
