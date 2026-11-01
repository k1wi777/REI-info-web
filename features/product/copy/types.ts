import type {
  AgentRoleId,
  StateTransitionKind,
  WorkItemStateId,
} from "@/content/rei";
import type { ProductPageSlug } from "@/content/site";
import type {
  ArtifactAppliesTo,
  EvidenceSourceId,
  ProductDocument,
} from "@/features/product/types";

/**
 * Comandos del CLI cuyo resumen muestra el dossier. El nombre, los flags y el
 * ejemplo siguen viniendo de `content/rei`; solo el resumen se traduce aquí.
 */
export const PRODUCT_COMMAND_IDS = [
  "view",
  "item-show",
  "validate",
  "github",
] as const;

export type ProductCommandId = (typeof PRODUCT_COMMAND_IDS)[number];

/** Identificador de una captura del manifiesto de evidencia. */
export const PRODUCT_CAPTURE_IDS = [
  "gh-2-head",
  "gh-2-body",
  "gh-3-head",
  "gh-3-body",
  "gh-5-head",
  "gh-5-body",
  "view-2026-10-27_12-08__referencia-operacion-docs-desktop",
  "view-2026-10-27_12-08__referencia-operacion-docs-ficha",
  "view-2026-10-27_12-08__referencia-operacion-docs-diff",
  "view-2026-10-27_12-08__referencia-operacion-docs-mobile",
] as const;

export type ProductCaptureId = (typeof PRODUCT_CAPTURE_IDS)[number];

export type ProductPageText = {
  /** Etiqueta corta de la subnavegación y del paginador. */
  label: string;
  title: string;
  description: string;
};

export type ProductRoleText = {
  responsibility: string;
  when: string;
  limit: string;
};

export type ProductEvidenceText = {
  title: string;
  date: string;
  finding: string;
  implication: string;
};

export type ProductArtifactText = {
  note: string;
  owner: string;
};

/**
 * Textos de la simulación del ciclo (componente cliente). Solo cadenas y
 * estructuras serializables: una función no cruza de servidor a cliente, así
 * que las interpolaciones son plantillas con marcadores `{nombre}`.
 */
export type ProductCycleCopy = {
  groupLabel: string;
  windowLabel: string;
  /** Marcadores: `{total}`. */
  windowMeta: string;
  footer: string;
  badge: string;
  progressShort: string;
  progressLabel: string;
  /** Marcadores: `{n}`, `{total}`, `{label}`. */
  progressValue: string;
  stopsLabel: string;
  /** Marcadores: `{n}`, `{label}`. */
  stopButton: string;
  /** Marcadores: `{n}`, `{total}` (ya rellenados con ceros). */
  stepCounter: string;
  roleGate: string;
  roleMissing: string;
  roleTerminal: string;
  terminalTag: string;
  gateNote: string;
  gateSimulated: string;
  approveButton: string;
  outputs: string;
  transitionKinds: Record<StateTransitionKind, string>;
  /** Nota de cada arista, con clave `desde>hasta`. */
  transitionNotes: Record<string, string>;
  controls: {
    previous: string;
    next: string;
    pause: string;
    resume: string;
    play: string;
    restart: string;
    pauseLabel: string;
    resumeLabel: string;
    reducedLabel: string;
  };
  reducedNote: string;
  noscript: string;
  announce: {
    /** Marcadores: `{n}`, `{total}`, `{label}`. */
    manualEnd: string;
    /** Marcadores: `{n}`, `{total}`, `{label}`, `{detail}`. */
    step: string;
    /** Marcador: `{label}`. */
    paused: string;
    /** Marcador: `{label}`. */
    resumed: string;
  };
};

/** Todo el texto de `/producto` en un idioma; `es` y `en` comparten este tipo. */
export type ProductCopy = {
  pages: Record<ProductPageSlug, ProductPageText>;
  /** Documentos completos de cada página (esqueleto idéntico en ambos idiomas). */
  documents: Record<ProductPageSlug, ProductDocument>;
  chrome: {
    bar: string;
    /** Marcadores: `{folio}`, `{total}`. */
    sheetOf: string;
    langTag: string;
    factsTitle: string;
    factsNote: string;
    subnavLabel: string;
    subnavTitle: string;
    pagerLabel: string;
    /** Marcador: `{folio}`. */
    pagerPrevious: string;
    /** Marcador: `{folio}`. */
    pagerNext: string;
    featuredSheet: string;
  };
  gate: {
    label: string;
    status: string;
    detail: string;
  };
  roles: Record<AgentRoleId, ProductRoleText>;
  roleList: {
    limit: string;
    outsideCycle: string;
    initializerNote: string;
  };
  /** Significado de cada estado. */
  states: Record<WorkItemStateId, string>;
  stateTable: {
    mapTitle: string;
    mapGate: string;
    approval: string;
    terminal: string;
    humanSignature: string;
    branchesTitle: string;
    branchesNote: string;
  };
  commands: Record<ProductCommandId, string>;
  cycle: ProductCycleCopy;
  cli: {
    /** Marcadores: `{date}`, `{count}`. */
    windowMeta: string;
    /** Marcador: `{date}`. */
    snapshotFooter: string;
    openHint: string;
    /** Aviso de que las salidas se transcriben tal cual; `null` si no hace falta. */
    outputLanguageNote: string | null;
    /** Marcador: `{count}`. */
    lines: string;
    /** Marcador: `{command}`. */
    outputLabel: string;
    scrollNote: string;
    completeNote: string;
    notes: Record<string, string>;
  };
  artifacts: {
    windowLabel: string;
    treeLabel: string;
    /** Marcador: `{count}`. */
    footer: string;
    applies: Record<ArtifactAppliesTo, string>;
    groups: Record<"specs" | "progress" | "work-items", string>;
    entries: Record<string, ProductArtifactText>;
  };
  evidence: {
    intro: string;
    implication: string;
    sources: Record<EvidenceSourceId, ProductEvidenceText>;
  };
  choices: {
    type: string;
    planning: string;
    criterion: string;
    documentOne: string;
    documentOther: string;
  };
  viewer: {
    missingBefore: string;
    missingAfter: string;
    windowMeta: string;
    fichaCaption: string;
    footnote: string;
    /** Marcador: `{date}`. */
    caption: string;
  };
  issue: {
    /** Marcador: `{number}`. */
    open: string;
    /** Marcador: `{date}`. */
    caption: string;
  };
  initializer: {
    title: string;
    footer: string;
    /** Marcador: `{date}`. */
    caption: string;
    alt: string;
  };
  projection: {
    title: string;
    source: string;
    sourceNote: string;
    targets: Record<"issue" | "branch" | "pr", { title: string; text: string }>;
    optionalBefore: string;
    optionalAfter: string;
  };
  captureLink: string;
  /** Texto alternativo de cada captura del manifiesto. */
  captures: Record<ProductCaptureId, string>;
};
