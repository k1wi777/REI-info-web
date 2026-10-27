import type { MetadataRoute } from "next";
import { getSiteUrl, hasDeployedSiteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(hasDeployedSiteUrl()
      ? { sitemap: `${base}/sitemap.xml`, host: base }
      : {}),
  };
}
