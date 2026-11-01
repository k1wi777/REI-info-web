import type { InstallCopy, InstallStepText } from "@/features/installation/copy/types";

const UNIX_STEPS: InstallStepText[] = [
  {
    title: "Descomprime el archive",
    text: "Extrae el binario `rei` en el directorio donde descargaste el archivo.",
  },
  {
    title: "Colócalo en tu PATH",
    text: "Puedes moverlo a cualquier directorio del PATH, como `~/.local/bin`.",
  },
  {
    title: "Verifica la instalación",
    text: "Debe responder con la versión instalada.",
  },
];

/** Textos de `/instalar` en español: el texto original, movido sin cambios. */
export const es: InstallCopy = {
  meta: {
    title: "Instalar REI",
    description:
      "Elige tu sistema operativo y arquitectura, descarga el binario rei de la última release de GitHub y verifícalo en minutos.",
  },
  hero: { section: "INSTALACIÓN" },
  sectionLabel: "Descarga e instalación",
  installer: {
    osLegend: "Sistema operativo",
    archLegend: "Arquitectura",
    installOn: "Instalar en",
    detected: "Detectado",
    archDescriptions: {
      amd64: "Intel y AMD (x86_64)",
      arm64: {
        linux: "Servidores y equipos ARM (aarch64)",
        macos: "Apple Silicon (aarch64)",
        windows: "Equipos Windows con procesador ARM",
      },
    },
    archHints: {
      linux: "Comprueba la tuya con `uname -m`: x86_64 es amd64; aarch64 es arm64.",
      macos: "Comprueba la tuya con `uname -m`: x86_64 es amd64; arm64 es arm64.",
      windows: "Elige la arquitectura de tu equipo; no se pudo detectar.",
    },
    steps: {
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
        },
      ],
    },
    stepLabel: "Paso",
    stageFile: "Archivo",
    download: {
      frameLabel: "Descarga",
      latest: "Latest",
      noAssetForSelection: "Sin archive para esta combinación",
      loadingRelease: "Última release en GitHub",
      unavailableRelease: "No se pudo consultar GitHub",
      documentedVersion: "Versión documentada",
      checksumsPre: "Verifica la integridad con",
      checksumsPost: "de la release.",
      checksumsPublished: "Los checksums se publican junto a cada release en GitHub.",
      download: "Descargar",
      allReleases: "Ver todas las releases",
      goToReleases: "Ir a la página de releases",
      unavailableNote:
        "GitHub no respondió, así que no hay un enlace directo. Descarga el archive desde la página de releases.",
      loadingNote:
        "El enlace directo a este archivo se resuelve con la última release. Si no aparece, descárgalo desde la página de releases.",
      noAssetNote:
        "Esta release no incluye el archive de la combinación elegida. Descárgalo desde la página de releases o elige otra.",
    },
  },
  aside: {
    updateHeading: "Mantenerlo actualizado",
    updateText:
      "Una vez instalado, el binario se actualiza solo: `rei update` descarga la última release, verifica el checksum SHA-256 y reemplaza el ejecutable. `rei update --check` solo comprueba si hay una versión nueva.",
    limitsHeading: "Qué debes saber",
    limits: [
      "La versión, la fecha y los archivos salen de la API pública de GitHub Releases; la web no muestra cifras de descargas ni tamaños.",
      "La consulta se hace en el servidor y se reutiliza unas horas. Si GitHub no responde, la página muestra el enlace a la página de releases.",
      "Detectar tu sistema es una ayuda: si no hay evidencia de la arquitectura, se conserva amd64 y se indica cómo comprobarla.",
    ],
    docsLink: "Leer la documentación de instalación",
  },
};
