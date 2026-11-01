import type { Metadata, ResolvingMetadata } from "next";
import { getContentLocale, translatedLocales } from "@/content/i18n/coverage";
import { PRODUCT_NAME, getSiteUrl } from "@/content/site";
import {
  DEFAULT_LOCALE,
  OG_LOCALES,
  localizePath,
  toLocale,
} from "@/lib/i18n";

export type PageMetadataTitle = string | { absolute: string };

export type PageMetadataInput = {
  /** Idioma de la ruta; obligatorio para que ninguna página olvide el idioma. */
  lang: string;
  /** Path sin prefijo de idioma, tal y como figura en `ROUTES`. */
  path: string;
  title: PageMetadataTitle;
  description: string;
};

type MetadataImages = NonNullable<NonNullable<Metadata["openGraph"]>["images"]>;

/**
 * Compone una URL absoluta a partir de una base y un path.
 * Es la única pieza que construye URLs canónicas: la base pierde sus barras
 * finales y el path se normaliza a una sola barra inicial.
 */
export function buildCanonicalUrl(base: string, path: string): string {
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = path.replace(/^\/+/, "").replace(/\/+$/, "");

  return normalizedPath ? `${normalizedBase}/${normalizedPath}` : normalizedBase;
}

/** URL canónica de una ruta del sitio, resuelta contra `NEXT_PUBLIC_SITE_URL`. */
export function getCanonicalUrl(path: string): string {
  return buildCanonicalUrl(getSiteUrl(), path);
}

/**
 * Hreflang de una ruta (`es`, `en` y `x-default` → idioma por defecto) solo si
 * existe traducción real a más de un idioma; si no, `undefined`.
 */
export function buildAlternateLanguages(
  base: string,
  path: string,
): Record<string, string> | undefined {
  const locales = translatedLocales(path);

  if (locales.length < 2) {
    return undefined;
  }

  const languages: Record<string, string> = {};
  for (const lang of locales) {
    languages[lang] = buildCanonicalUrl(base, localizePath(lang, path));
  }
  languages["x-default"] = buildCanonicalUrl(
    base,
    localizePath(DEFAULT_LOCALE, path),
  );

  return languages;
}

function plainTitle(title: PageMetadataTitle): string {
  return typeof title === "string" ? title : title.absolute;
}

/**
 * Metadata de una página pública: canonical absoluto propio del idioma del
 * contenido y Open Graph/Twitter. Una ruta sin traducir en `/en` apunta su
 * canonical al español y no declara alternates, para no promocionar contenido
 * en español como inglés. Las imágenes se reciben ya resueltas porque la
 * convención de archivo las sirve con hash y no se pueden escribir a mano.
 */
export function buildPageMetadata(
  { lang, path, title, description }: PageMetadataInput,
  images?: MetadataImages,
): Metadata {
  const socialTitle = plainTitle(title);
  const contentLang = getContentLocale(toLocale(lang), path);
  const localizedPath = localizePath(contentLang, path);
  const base = getSiteUrl();

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(base, localizedPath),
      languages: buildAlternateLanguages(base, path),
    },
    openGraph: {
      type: "website",
      siteName: PRODUCT_NAME,
      locale: OG_LOCALES[contentLang],
      title: socialTitle,
      description,
      url: localizedPath,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images,
    },
  };
}

/**
 * Variante para `generateMetadata`: hereda del layout raíz las imágenes que
 * resolvió la convención de archivo y evita hardcodear su URL con hash.
 */
export async function pageMetadata(
  parent: ResolvingMetadata,
  input: PageMetadataInput,
): Promise<Metadata> {
  const resolved = await parent;
  const images = resolved.openGraph?.images ?? resolved.twitter?.images;

  return buildPageMetadata(input, images);
}
