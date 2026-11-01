import type { DocBlock } from "@/content/docs";
import type {
  AgentRoleId,
  WorkItemStateId,
} from "@/content/rei";
import type { ProductPageSlug } from "@/content/site";

export type ProductLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type EvidenceSourceId =
  | "replit"
  | "metr"
  | "gitclear"
  | "veracode"
  | "dora-2025"
  | "stack-overflow-2025"
  | "github-copilot-2023";

/** Esqueleto de una fuente; título, fecha y lectura salen de la copy. */
export type EvidenceSource = {
  id: EvidenceSourceId;
  url: string;
};

/** Línea de una salida real del CLI; `prompt` abre cada muestra. */
export type CliLine = {
  kind: "prompt" | "output" | "note";
  text: string;
};

/** Instantánea fechada de un comando; las líneas se transcriben sin editar. */
export type CliSample = {
  id: string;
  /** Id real de `COMMANDS` en `content/rei`. */
  commandId: string;
  command: string;
  /** Fecha ISO corta de la captura. */
  capturedAt: string;
  lines: CliLine[];
};

/**
 * Captura manual de `/personalize`: una ventana del runtime del agente con la
 * lista de comandos de proyecto abierta. No sale del manifiesto de evidencia.
 */
export type InitializerCapture = {
  file: string;
  width: number;
  height: number;
  /** Fecha ISO corta de la captura. */
  capturedAt: string;
  label: string;
  meta: string;
};

/** Dato de la ficha técnica del hero; siempre verificable en el repositorio. */
export type ProductFact = {
  label: string;
  value: string;
};

/** Punto de un ledger: problema, mecanismo, principio o límite. */
export type ProductPoint = {
  title: string;
  detail: string;
  /**
   * La fila es la puerta de aprobación. Es el único punto que se dibuja en
   * violeta, igual que en la home: no es un paso más del listado.
   */
  gate?: boolean;
};

export type ProductChoice = {
  id: string;
  name: string;
  /** Artefactos de planificación, tal como los nombra el arnés. */
  planning: string[];
  when: string;
};

export type ProductAudience = {
  id: string;
  who: string;
  seeks: string;
  /** Rutas reales; sustituyen la columna de texto «Dónde seguir». */
  next: ProductLink[];
};

/** A qué tipo de documento corresponde una entrada del árbol de evidencia. */
export type ArtifactAppliesTo =
  | "feature"
  | "task"
  | "ambos"
  | "sesion"
  | "opcional"
  | "bloqueo"
  | "estado";

export type ArtifactEntry = {
  id: string;
  /** Ruta real dentro de `.rei/`. */
  path: string;
  appliesTo: ArtifactAppliesTo;
};

/** Grupo del árbol: una raíz real de `.rei/` con sus documentos. */
export type ArtifactGroup = {
  id: "specs" | "progress" | "work-items";
  root: string;
  entries: ArtifactEntry[];
};

export type ProductDomainBlock =
  | { kind: "links"; links: ProductLink[] }
  | { kind: "roles"; roles: AgentRoleId[] }
  | { kind: "states"; states: WorkItemStateId[] }
  | { kind: "evidence"; ids: EvidenceSourceId[] }
  | { kind: "cycle" }
  | { kind: "commands"; ids: string[] }
  | {
      kind: "points";
      variant?: "ledger" | "manifesto" | "columns" | "limits";
      points: ProductPoint[];
    }
  | { kind: "choices"; choices: ProductChoice[] }
  | { kind: "audiences"; items: ProductAudience[] }
  | { kind: "terminal" }
  | { kind: "viewer"; caption: string }
  | { kind: "issue"; number: number; caption: string }
  | { kind: "initializer"; text: string; caption: string }
  | { kind: "projection" };

/** Prosa compartida con docs más los bloques propios del dominio producto. */
export type ProductBlock = DocBlock | ProductDomainBlock;

/**
 * Peso editorial de una sección. No es decoración: decide la escala del
 * titular y si la sección se lee como una hoja a sangre o como una entrada
 * del dossier. Una página admite como máximo un `lead`.
 */
export type ProductSectionWeight = "lead" | "body" | "fine";

export type ProductSection = {
  id: string;
  /** Etiqueta corta del folio: «Problema», «Mecanismo», «Límites». */
  label: string;
  title: string;
  weight?: ProductSectionWeight;
  blocks: ProductBlock[];
};

export type ProductDocument = {
  id: ProductPageSlug;
  eyebrow: string;
  meta?: string;
  /** Ficha del hero: datos reales del arnés, no métricas de adopción. */
  facts: ProductFact[];
  /** Solo el hub declara acciones; las hojas hijas no compiten con su CTA. */
  actions?: ProductLink[];
  sections: ProductSection[];
};
