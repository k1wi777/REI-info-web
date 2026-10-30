import type { ArchId, OsId } from "@/lib/release";

export type PlatformHints = {
  /** `navigator.userAgentData.platform`, si existe. */
  platform?: string;
  /** Valor de `getHighEntropyValues(["architecture"])`: `arm` o `x86`. */
  architecture?: string;
  /** Valor de `getHighEntropyValues(["bitness"])`: `32` o `64`. */
  bitness?: string;
};

export type DetectedPlatform = {
  os?: OsId;
  arch?: ArchId;
};

const UNSUPPORTED = /android|iphone|ipad|ipod|cros/i;

function detectOs(text: string): OsId | undefined {
  if (/windows|win32|win64/i.test(text)) return "windows";
  if (/mac ?os|macintosh|darwin/i.test(text)) return "macos";
  if (/linux|x11/i.test(text)) return "linux";
  return undefined;
}

function detectArch(userAgent: string, hints: PlatformHints): ArchId | undefined {
  const architecture = hints.architecture?.toLowerCase();

  if (architecture === "arm") return hints.bitness === "32" ? undefined : "arm64";
  if (architecture === "x86") return hints.bitness === "32" ? undefined : "amd64";

  // Sin pista de alta entropía solo cuenta evidencia explícita. Safari en
  // Apple Silicon declara "Intel Mac OS X": no se deduce nada.
  if (/arm64|aarch64/i.test(userAgent)) return "arm64";
  if (/x86_64|x64|win64|amd64/i.test(userAgent)) return "amd64";
  return undefined;
}

/**
 * Detecta SO y arquitectura del visitante. Devuelve solo lo que tiene
 * evidencia; los móviles y los sistemas no soportados no preseleccionan nada.
 */
export function detectPlatform(
  userAgent: string,
  hints: PlatformHints = {},
): DetectedPlatform {
  if (UNSUPPORTED.test(userAgent)) return {};

  const os = detectOs(hints.platform ?? "") ?? detectOs(userAgent);
  if (!os) return {};

  return { os, arch: detectArch(userAgent, hints) };
}
