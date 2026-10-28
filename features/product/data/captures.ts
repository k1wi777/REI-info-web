import manifest from "@/public/evidence/manifest.json";

export type ProductCapture = {
  id: string;
  kind: "issue" | "viewer";
  file: string;
  width: number;
  height: number;
  source: string;
  capturedAt: string;
  description: string;
  alt: string;
  issue?: number;
  labels?: string[];
  state?: "open" | "closed";
  workItem?: string;
  view?: "desktop" | "ficha" | "mobile" | "diff";
};

type ProductManifest = {
  generatedAt: string;
  repository: string;
  viewerWorkItem: string;
  captures: ProductCapture[];
};

const EVIDENCE = manifest as unknown as ProductManifest;

/** Fecha de la evidencia, anunciada en los pies de las ventanas. */
export const PRODUCT_EVIDENCE_DAY = EVIDENCE.generatedAt.slice(0, 10);

const CAPTURES = new Map(
  EVIDENCE.captures.map((capture) => [capture.id, capture] as const),
);

export function productCapture(id: string): ProductCapture | undefined {
  return CAPTURES.get(id);
}

export function productViewerCapture(
  view: ProductCapture["view"],
): ProductCapture | undefined {
  return EVIDENCE.captures.find(
    (capture) => capture.kind === "viewer" && capture.view === view,
  );
}

/** Cabecera publicada de una issue: estado, labels y enlace de origen. */
export function productIssueCapture(issue: number): ProductCapture | undefined {
  return EVIDENCE.captures.find(
    (capture) =>
      capture.kind === "issue" &&
      capture.issue === issue &&
      capture.id.endsWith("-head"),
  );
}

export function issueStateLabel(
  state: ProductCapture["state"],
): "Closed" | "Open" {
  return state === "closed" ? "Closed" : "Open";
}
