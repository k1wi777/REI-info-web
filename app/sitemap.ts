import type { MetadataRoute } from "next";
import { ROUTES, getSiteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  return ROUTES.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
