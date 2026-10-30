import type { ArchId, OsId } from "@/lib/release";

export type OsChoice = {
  id: OsId;
  label: string;
  /** Clave del icono propio (SVG inline): sin logotipos de terceros. */
  icon: OsId;
  format: string;
};

export const OS_CHOICES: OsChoice[] = [
  { id: "linux", label: "Linux", icon: "linux", format: ".tar.gz" },
  { id: "macos", label: "macOS", icon: "macos", format: ".tar.gz" },
  { id: "windows", label: "Windows", icon: "windows", format: ".zip" },
];

export type ArchChoice = {
  id: ArchId;
  label: string;
  /** Descriptor de equipo para quien no recuerda el nombre de su arquitectura. */
  description: string;
};

export const ARCH_CHOICES: ArchChoice[] = [
  { id: "amd64", label: "amd64", description: "Intel y AMD (x86_64)" },
  { id: "arm64", label: "arm64", description: "Procesadores ARM (aarch64)" },
];

/** Cómo se llama arm64 en cada sistema, para que no suene a otro equipo. */
const ARM64_DESCRIPTIONS: Record<OsId, string> = {
  linux: "Servidores y equipos ARM (aarch64)",
  macos: "Apple Silicon (aarch64)",
  windows: "Equipos Windows con procesador ARM",
};

/** Descriptor de equipo de una arquitectura en el sistema elegido. */
export function archDescription(os: OsId, arch: ArchId): string {
  if (arch === "arm64") return ARM64_DESCRIPTIONS[os];
  return ARCH_CHOICES.find((choice) => choice.id === arch)?.description ?? "";
}

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

/**
 * Cómo comprobar la arquitectura aunque se haya detectado. Solo donde hay un
 * comando estándar documentado; en Windows no se afirma ninguno.
 */
export const ARCH_CHECKS: Record<OsId, string | null> = {
  linux: ARCH_HINTS.linux,
  macos: ARCH_HINTS.macos,
  windows: null,
};
