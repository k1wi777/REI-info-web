import type { InstallerCopy } from "@/features/installation/copy/types";
import type { OsId } from "@/lib/release";

export const INSTALLATION_PATH = "/docs/empezar/instalacion";

/** Nombre genérico del archive; `fillArchiveName` lo sustituye por el real. */
export const ARCHIVE_TEMPLATE_TAR = "rei_<versión>_<os>_<arch>.tar.gz";
export const ARCHIVE_TEMPLATE_ZIP = "rei_<versión>_<os>_<arch>.zip";

export const COMMAND_EXTRACT_TAR = `tar -xzf ${ARCHIVE_TEMPLATE_TAR}`;
export const COMMAND_MOVE_BIN = "mv rei /usr/local/bin/";
export const COMMAND_VERSION = "rei version";
export const COMMAND_UPDATE = "rei update";
export const COMMAND_UPDATE_CHECK = "rei update --check";

export type InstallStep = {
  title: string;
  text: string;
  /** Comando con la plantilla del archive; ausente si el paso es solo prosa. */
  command?: string;
};

const UNIX_COMMANDS: (string | undefined)[] = [
  COMMAND_EXTRACT_TAR,
  COMMAND_MOVE_BIN,
  COMMAND_VERSION,
];

/**
 * Comando de cada paso de instalación por sistema operativo, definido una
 * vez. Los títulos y textos salen de la copy del idioma, en el mismo orden.
 */
export const INSTALL_STEP_COMMANDS: Record<OsId, (string | undefined)[]> = {
  linux: UNIX_COMMANDS,
  macos: UNIX_COMMANDS,
  windows: [undefined, undefined, COMMAND_VERSION],
};

/** Pasos de instalación: texto del idioma + comando compartido. */
export function buildInstallSteps(
  steps: InstallerCopy["steps"],
): Record<OsId, InstallStep[]> {
  const build = (os: OsId): InstallStep[] =>
    steps[os].map((step, index) => ({
      ...step,
      command: INSTALL_STEP_COMMANDS[os][index],
    }));

  return { linux: build("linux"), macos: build("macos"), windows: build("windows") };
}

/** Sustituye la plantilla del archive por el nombre real del asset. */
export function fillArchiveName(command: string, archiveName: string): string {
  return command
    .replace(ARCHIVE_TEMPLATE_TAR, archiveName)
    .replace(ARCHIVE_TEMPLATE_ZIP, archiveName);
}
