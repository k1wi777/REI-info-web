/**
 * Redirecciones permanentes de las URLs anteriores a i18n (sin prefijo de
 * idioma) a su equivalente bajo `/es`. Archivo sin imports: lo consume
 * `next.config.ts`, que no resuelve el alias `@/`.
 */
export const LEGACY_REDIRECT_PREFIXES = [
  "/instalar",
  "/producto",
  "/docs",
] as const;

export const LEGACY_REDIRECT_FILES = ["/llms.txt"] as const;

export const REDIRECT_TARGET_LOCALE = "es";

export type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: true;
};

export function buildLegacyRedirects(): LegacyRedirect[] {
  const base = `/${REDIRECT_TARGET_LOCALE}`;

  return [
    { source: "/", destination: base, permanent: true },
    ...LEGACY_REDIRECT_PREFIXES.map((prefix) => ({
      source: `${prefix}/:path*`,
      destination: `${base}${prefix}/:path*`,
      permanent: true as const,
    })),
    ...LEGACY_REDIRECT_FILES.map((file) => ({
      source: file,
      destination: `${base}${file}`,
      permanent: true as const,
    })),
  ];
}
