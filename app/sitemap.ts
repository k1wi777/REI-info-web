import type { MetadataRoute } from "next";
import { ROUTES, getSiteUrl } from "@/content/site";
import { buildCanonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  return ROUTES.map((path) => ({
    url: buildCanonicalUrl(base, path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
