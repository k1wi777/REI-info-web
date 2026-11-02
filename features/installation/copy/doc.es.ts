import type { InstallationDocCopy } from "@/features/installation/copy/types";
import { INSTALL_PATH } from "@/content/site";
import {
  ARCHIVE_TEMPLATE_TAR,
  COMMAND_EXTRACT_TAR,
  COMMAND_MOVE_BIN,
  COMMAND_UPDATE,
  COMMAND_UPDATE_CHECK,
  COMMAND_VERSION,
} from "@/features/installation/data/installation";

export const installationDocEs: InstallationDocCopy = {
  eyebrow: "Empezar · Instalación",
  description:
    "Descarga el binario rei, verifícalo y prepáralo para actualizarse. No hay dependencias de runtime ni instalación de Go para usarlo.",
  articleMeta: "Linux · macOS · Windows",
  sections: [
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
        text: `Entra en la página de releases y descarga el archive de tu sistema operativo y arquitectura: ${ARCHIVE_TEMPLATE_TAR}.`,
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
],
};
