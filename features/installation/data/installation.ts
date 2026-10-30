import type { DocSection, TocItem } from "@/content/docs";
import { INSTALL_PATH } from "@/content/site";
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

const UNIX_STEPS: InstallStep[] = [
  {
    title: "Descomprime el archive",
    text: "Extrae el binario `rei` en el directorio donde descargaste el archivo.",
    command: COMMAND_EXTRACT_TAR,
  },
  {
    title: "Colócalo en tu PATH",
    text: "Puedes moverlo a cualquier directorio del PATH, como `~/.local/bin`.",
    command: COMMAND_MOVE_BIN,
  },
  {
    title: "Verifica la instalación",
    text: "Debe responder con la versión instalada.",
    command: COMMAND_VERSION,
  },
];

/** Pasos de instalación por sistema operativo; comandos definidos una vez. */
export const INSTALL_STEPS: Record<OsId, InstallStep[]> = {
  linux: UNIX_STEPS,
  macos: UNIX_STEPS,
  windows: [
    {
      title: "Descomprime el archive",
      text: "En Windows el archive es .zip. Descomprímelo para obtener rei.exe.",
    },
    {
      title: "Colócalo en tu PATH",
      text: "Coloca rei.exe en un directorio incluido en el PATH.",
    },
    {
      title: "Verifica la instalación",
      text: "Abre una terminal nueva; debe responder con la versión instalada.",
      command: COMMAND_VERSION,
    },
  ],
};

/** Sustituye la plantilla del archive por el nombre real del asset. */
export function fillArchiveName(command: string, archiveName: string): string {
  return command
    .replace(ARCHIVE_TEMPLATE_TAR, archiveName)
    .replace(ARCHIVE_TEMPLATE_ZIP, archiveName);
}

export const INSTALLATION_SECTIONS: DocSection[] = [
  {
    id: "requisitos",
    title: "Requisitos",
    blocks: [
      {
        kind: "paragraph",
        text: "El CLI rei se distribuye como binario precompilado. No necesita Go ni ninguna dependencia de runtime para ejecutarse.",
      },
      {
        kind: "list",
        items: [
          "Linux, macOS o Windows.",
          "Arquitectura amd64 o arm64.",
          "Un directorio del PATH donde colocar el binario.",
        ],
      },
      {
        kind: "note",
        tone: "info",
        title: "Compilar desde el código",
        text: "Si trabajas sobre el repositorio de REI Harness y tienes Go instalado, `make build` deja el binario en `bin/rei`.",
      },
    ],
  },
  {
    id: "descargar",
    title: "Descargar y colocar el binario",
    blocks: [
      {
        kind: "note",
        tone: "info",
        title: "Descarga guiada",
        text: "La página de instalación detecta tu sistema, resuelve el archive de la última release y muestra estos mismos pasos.",
      },
      {
        kind: "links",
        links: [{ label: "Instalar REI", href: INSTALL_PATH }],
      },
      {
        kind: "paragraph",
        text: "Entra en la página de releases y descarga el archive de tu sistema operativo y arquitectura: rei_<versión>_<os>_<arch>.tar.gz.",
      },
      {
        kind: "code",
        language: "Shell",
        code: `${COMMAND_EXTRACT_TAR}\n${COMMAND_MOVE_BIN}`,
      },
      {
        kind: "paragraph",
        text: "Puedes moverlo a cualquier directorio incluido en tu PATH, como `~/.local/bin`.",
      },
      {
        kind: "note",
        tone: "info",
        title: "Windows",
        text: "En Windows el archive es .zip. Descomprime rei.exe y colócalo en un directorio del PATH.",
      },
    ],
  },
  {
    id: "verificar",
    title: "Verificar la instalación",
    blocks: [
      {
        kind: "code",
        language: "Shell",
        code: COMMAND_VERSION,
      },
      {
        kind: "paragraph",
        text: "El comando debe responder con la versión instalada. Si la shell no encuentra el binario, revisa que el directorio esté en el PATH.",
      },
    ],
  },
  {
    id: "actualizar",
    title: "Actualizar el CLI",
    blocks: [
      {
        kind: "paragraph",
        text: "El binario puede actualizarse por sí mismo desde GitHub Releases.",
      },
      {
        kind: "code",
        language: "Shell",
        code: `${COMMAND_UPDATE}\n${COMMAND_UPDATE_CHECK}`,
      },
      {
        kind: "paragraph",
        text: "`rei update` descarga la última release, verifica el checksum SHA-256 y reemplaza el ejecutable de forma atómica. `rei update --check` solo comprueba si hay una versión nueva, sin descargar ni modificar nada.",
      },
      {
        kind: "note",
        tone: "info",
        title: "Códigos de salida",
        text: "Ambos devuelven 0 cuando no hay nada que actualizar; 1 se reserva para fallos reales, como problemas de red o un checksum inválido.",
      },
    ],
  },
];

export const INSTALLATION_TOC: TocItem[] = INSTALLATION_SECTIONS.map(
  (section) => ({ id: section.id, title: section.title }),
);
