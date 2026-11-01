import type { NextConfig } from "next";
import { buildLegacyRedirects } from "./content/i18n/redirects";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: false,
    // 404 sin idioma: el layout raíz vive bajo `app/[lang]`.
    globalNotFound: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return buildLegacyRedirects();
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
