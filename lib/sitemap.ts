import type { MetadataRoute } from "next";
import { isTranslated } from "@/content/i18n/coverage";
import { ROUTES } from "@/content/site";
import { LOCALES, localizePath } from "@/lib/i18n";
import { buildAlternateLanguages, buildCanonicalUrl } from "@/lib/seo";

/**
 * Entradas del sitemap: cada ruta en cada idioma en que esté realmente
 * traducida, con sus alternates. Una ruta sin traducir en `/en` no se lista.
 */
export function buildSitemap(base: string): MetadataRoute.Sitemap {
  return ROUTES.flatMap((path) =>
    LOCALES.filter((lang) => isTranslated(lang, path)).map((lang) => {
      const languages = buildAlternateLanguages(base, path);

      return {
        url: buildCanonicalUrl(base, localizePath(lang, path)),
        changeFrequency: "monthly" as const,
        priority: path === "/" ? 1 : 0.7,
        ...(languages ? { alternates: { languages } } : {}),
      };
    }),
  );
}
