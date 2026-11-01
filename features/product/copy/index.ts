import { en } from "@/features/product/copy/en";
import { es } from "@/features/product/copy/es";
import type { ProductCopy } from "@/features/product/copy/types";
import type { ProductPageSlug } from "@/content/site";
import type { ProductDocument } from "@/features/product/types";
import type { Locale } from "@/lib/i18n";

const COPIES: Record<Locale, ProductCopy> = { es, en };

/** Textos de `/producto` en el idioma pedido. */
export function getProductCopy(lang: Locale): ProductCopy {
  return COPIES[lang];
}

/** Documento de una página de producto en el idioma pedido. */
export function getProductDocument(
  slug: ProductPageSlug,
  lang: Locale,
): ProductDocument {
  return COPIES[lang].documents[slug];
}
