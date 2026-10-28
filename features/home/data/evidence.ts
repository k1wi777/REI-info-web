import manifest from "@/public/evidence/manifest.json";
import type {
  EvidenceCapture,
  EvidenceManifest,
  EvidenceView,
} from "@/features/home/types";

/**
 * Manifiesto de evidencia generado por `pnpm capture:evidence` y versionado
 * junto a las capturas. Es la única fuente de rutas, dimensiones y textos
 * alternativos: los componentes no duplican ninguno.
 */
export const EVIDENCE_MANIFEST = manifest as unknown as EvidenceManifest;

export const ISSUE_CAPTURES = EVIDENCE_MANIFEST.captures.filter(
  (capture) => capture.kind === "issue",
);

export const VIEWER_CAPTURES = EVIDENCE_MANIFEST.captures.filter(
  (capture) => capture.kind === "viewer",
);

/** Números de issue presentes en el manifiesto, en orden ascendente. */
export const EVIDENCE_ISSUES = [
  ...new Set(
    ISSUE_CAPTURES.map((capture) => capture.issue).filter(
      (issue): issue is number => typeof issue === "number",
    ),
  ),
].sort((a, b) => a - b);

function issueCapture(
  issue: number,
  part: "head" | "body",
): EvidenceCapture | undefined {
  return ISSUE_CAPTURES.find(
    (capture) => capture.issue === issue && capture.id.endsWith(`-${part}`),
  );
}

export function issueHead(issue: number): EvidenceCapture | undefined {
  return issueCapture(issue, "head");
}

export function issueBody(issue: number): EvidenceCapture | undefined {
  return issueCapture(issue, "body");
}

export function viewerCapture(
  view: EvidenceView,
): EvidenceCapture | undefined {
  return VIEWER_CAPTURES.find((capture) => capture.view === view);
}

export const VIEWER_DESKTOP = viewerCapture("desktop");
export const VIEWER_FICHA = viewerCapture("ficha");
export const VIEWER_MOBILE = viewerCapture("mobile");
export const VIEWER_DIFF = viewerCapture("diff");
