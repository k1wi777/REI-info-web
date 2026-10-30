export type OsId = "linux" | "macos" | "windows";
export type ArchId = "amd64" | "arm64";

export type ReleaseAsset = {
  name: string;
  url: string;
};

export type Release = {
  tag: string;
  version: string;
  publishedAt: string;
  assets: ReleaseAsset[];
};

export type ReleaseResult =
  | { ok: true; release: Release }
  | { ok: false; error: string };

export const OS_IDS: readonly OsId[] = ["linux", "macos", "windows"];
export const ARCH_IDS: readonly ArchId[] = ["amd64", "arm64"];

export const CHECKSUMS_ASSET_NAME = "checksums.txt";

/** Prefijo de descarga permitido: evita enlaces arbitrarios devueltos por la API. */
const ALLOWED_DOWNLOAD_PREFIX =
  "https://github.com/k1wi777/REI-Harness/releases/download/";

/** Token de SO que usa el nombre del asset publicado (macOS es `darwin`). */
const OS_ASSET_TOKEN: Record<OsId, string> = {
  linux: "linux",
  macos: "darwin",
  windows: "windows",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseAsset(value: unknown): ReleaseAsset | undefined {
  if (!isRecord(value)) return undefined;

  const { name, browser_download_url: url } = value;
  if (typeof name !== "string" || typeof url !== "string") return undefined;
  if (name === "" || !url.startsWith(ALLOWED_DOWNLOAD_PREFIX)) return undefined;

  return { name, url };
}

/**
 * Valida la respuesta de `releases/latest`. Acepta `unknown` porque viene de
 * fuera; los assets con forma inválida o de otro host se descartan.
 */
export function parseRelease(value: unknown): ReleaseResult {
  if (!isRecord(value)) {
    return { ok: false, error: "Respuesta de release inesperada." };
  }

  const { tag_name: tag, published_at: publishedAt, assets } = value;

  if (typeof tag !== "string" || tag === "") {
    return { ok: false, error: "La release no indica su versión." };
  }
  if (typeof publishedAt !== "string" || Number.isNaN(Date.parse(publishedAt))) {
    return { ok: false, error: "La release no indica su fecha." };
  }
  if (!Array.isArray(assets)) {
    return { ok: false, error: "La release no incluye assets." };
  }

  const parsed = assets
    .map(parseAsset)
    .filter((asset): asset is ReleaseAsset => asset !== undefined);

  return {
    ok: true,
    release: {
      tag,
      version: tag.replace(/^v/, ""),
      publishedAt,
      assets: parsed,
    },
  };
}

export function assetExtension(os: OsId): "tar.gz" | "zip" {
  return os === "windows" ? "zip" : "tar.gz";
}

/** Nombre esperado: `rei_<versión>_<os>_<arch>.<ext>`. */
export function assetName(version: string, os: OsId, arch: ArchId): string {
  return `rei_${version}_${OS_ASSET_TOKEN[os]}_${arch}.${assetExtension(os)}`;
}

export function findAsset(
  release: Release,
  os: OsId,
  arch: ArchId,
): ReleaseAsset | undefined {
  const name = assetName(release.version, os, arch);
  return release.assets.find((asset) => asset.name === name);
}

export function checksumsAsset(release: Release): ReleaseAsset | undefined {
  return release.assets.find((asset) => asset.name === CHECKSUMS_ASSET_NAME);
}

/** Fecha de publicación legible en español, fijada a UTC para no variar entre servidor y cliente. */
export function formatReleaseDate(publishedAt: string): string {
  return new Intl.DateTimeFormat("es", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(publishedAt));
}
