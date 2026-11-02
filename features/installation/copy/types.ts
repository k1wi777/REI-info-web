import type { DocSection } from "@/content/docs";
import type { OsId } from "@/lib/release";

export type InstallStepText = {
  title: string;
  text: string;
};

/**
 * Textos del instalador (componente cliente). Solo cadenas y estructuras
 * serializables: el servidor se los pasa por props y una función no cruza esa
 * frontera.
 */
export type InstallerCopy = {
  osLegend: string;
  archLegend: string;
  /** Prefijo del encabezado de pasos: «Instalar en» + sistema. */
  installOn: string;
  detected: string;
  archDescriptions: {
    amd64: string;
    arm64: Record<OsId, string>;
  };
  /** Qué hacer cuando no se pudo detectar la arquitectura. */
  archHints: Record<OsId, string>;
  steps: Record<OsId, InstallStepText[]>;
  stepLabel: string;
  stageFile: string;
  download: {
    frameLabel: string;
    latest: string;
    noAssetForSelection: string;
    loadingRelease: string;
    unavailableRelease: string;
    documentedVersion: string;
    checksumsPre: string;
    checksumsPost: string;
    checksumsPublished: string;
    download: string;
    allReleases: string;
    goToReleases: string;
    unavailableNote: string;
    loadingNote: string;
    noAssetNote: string;
  };
};

/**
 * Todos los textos de `/instalar`. Una única forma: una clave ausente en `es`
 * o `en` rompe `pnpm typecheck`. Comandos, nombres de archivo, sistemas
 * operativos, arquitecturas y versiones no están aquí.
 */
export type InstallCopy = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    /** Sufijo tras el nombre del producto: «REI Harness / INSTALACIÓN». */
    section: string;
  };
  sectionLabel: string;
  installer: InstallerCopy;
  aside: {
    updateHeading: string;
    updateText: string;
    limitsHeading: string;
    limits: string[];
    docsLink: string;
  };
};


/**
 * Textos de la página de instalación de la documentación (`/docs/empezar/instalacion`),
 * distinta de `/instalar`. Los bloques de código se construyen en cada idioma
 * desde las constantes de `data/installation.ts`.
 */
export type InstallationDocCopy = {
  eyebrow: string;
  description: string;
  /** Línea bajo la descripción del artículo. */
  articleMeta: string;
  sections: DocSection[];
};
