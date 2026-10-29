import type { Metadata, ResolvingMetadata } from "next";
import { PRODUCT_NAME, getSiteUrl } from "@/content/site";

export type PageMetadataTitle = string | { absolute: string };

export type PageMetadataInput = {
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

function plainTitle(title: PageMetadataTitle): string {
  return typeof title === "string" ? title : title.absolute;
}

/**
 * Metadata de una página pública: canonical absoluto y Open Graph/Twitter
 * propios. Las imágenes se reciben ya resueltas porque la convención de archivo
 * las sirve con hash y no se pueden escribir a mano.
 */
export function buildPageMetadata(
  { path, title, description }: PageMetadataInput,
  images?: MetadataImages,
): Metadata {
  const socialTitle = plainTitle(title);

  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(path),
    },
    openGraph: {
      type: "website",
      siteName: PRODUCT_NAME,
      locale: "es_ES",
      title: socialTitle,
      description,
      url: path,
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
