import type { InstallerCopy } from "@/features/installation/copy/types";
import type { ArchId, OsId } from "@/lib/release";

export type OsChoice = {
  id: OsId;
  label: string;
  /** Clave del icono propio (SVG inline): sin logotipos de terceros. */
  icon: OsId;
  format: string;
};

/** Los nombres de sistema operativo y el formato del archive no se traducen. */
export const OS_CHOICES: OsChoice[] = [
  { id: "linux", label: "Linux", icon: "linux", format: ".tar.gz" },
  { id: "macos", label: "macOS", icon: "macos", format: ".tar.gz" },
  { id: "windows", label: "Windows", icon: "windows", format: ".zip" },
];

export type ArchChoice = {
  id: ArchId;
  label: string;
};

/** Las arquitecturas son identificadores; su descriptor de equipo sale de la copy. */
export const ARCH_CHOICES: ArchChoice[] = [
  { id: "amd64", label: "amd64" },
  { id: "arm64", label: "arm64" },
];

/**
 * Descriptor de equipo de una arquitectura en el sistema elegido: arm64 se
 * llama distinto en cada sistema para que no suene a otro equipo.
 */
export function archDescription(
  descriptions: InstallerCopy["archDescriptions"],
  os: OsId,
  arch: ArchId,
): string {
  return arch === "arm64" ? descriptions.arm64[os] : descriptions.amd64;
}

export const OS_LABELS: Record<OsId, string> = {
  linux: "Linux",
  macos: "macOS",
  windows: "Windows",
};

/**
 * Sistemas donde hay un comando estándar para comprobar la arquitectura
 * (`uname -m`) aunque se haya detectado; en Windows no se afirma ninguno.
 */
export const ARCH_CHECKABLE: Record<OsId, boolean> = {
  linux: true,
  macos: true,
  windows: false,
};
