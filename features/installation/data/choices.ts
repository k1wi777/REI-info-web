import type { ArchId, OsId } from "@/lib/release";

export type OsChoice = {
  id: OsId;
  label: string;
  /** Monograma tipográfico: sin logotipos de terceros. */
  mark: string;
  format: string;
};

export const OS_CHOICES: OsChoice[] = [
  { id: "linux", label: "Linux", mark: "LNX", format: ".tar.gz" },
  { id: "macos", label: "macOS", mark: "MAC", format: ".tar.gz" },
  { id: "windows", label: "Windows", mark: "WIN", format: ".zip" },
];

export const ARCH_CHOICES: { id: ArchId; label: string }[] = [
  { id: "amd64", label: "amd64" },
  { id: "arm64", label: "arm64" },
];

export const OS_LABELS: Record<OsId, string> = {
  linux: "Linux",
  macos: "macOS",
  windows: "Windows",
};

/** Cómo comprobar la arquitectura; solo donde es un comando estándar del sistema. */
export const ARCH_HINTS: Record<OsId, string> = {
  linux: "Comprueba la tuya con `uname -m`: x86_64 es amd64; aarch64 es arm64.",
  macos: "Comprueba la tuya con `uname -m`: x86_64 es amd64; arm64 es arm64.",
  windows: "Elige la arquitectura de tu equipo; no se pudo detectar.",
};
