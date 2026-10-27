import type { DocContent, DocsContentPath } from "@/features/docs/types";
import { CONCEPTOS_APROBACION_HUMANA_DOCUMENT } from "@/features/docs/data/pages/conceptos-aprobacion-humana";
import { CONCEPTOS_MODO_DIRECTO_DOCUMENT } from "@/features/docs/data/pages/conceptos-modo-directo";
import { CONCEPTOS_SDD_DOCUMENT } from "@/features/docs/data/pages/conceptos-sdd";
import { CONCEPTOS_WORK_ITEMS_Y_ESTADOS_DOCUMENT } from "@/features/docs/data/pages/conceptos-work-items-y-estados";
import { GUIAS_ACTUALIZAR_DOCUMENT } from "@/features/docs/data/pages/guias-actualizar";
import { GUIAS_CHECKS_DOCUMENT } from "@/features/docs/data/pages/guias-checks";
import { GUIAS_GITHUB_DOCUMENT } from "@/features/docs/data/pages/guias-github";
import { GUIAS_VISOR_DOCUMENT } from "@/features/docs/data/pages/guias-visor";

/** El registro obliga a que exista un documento por cada ruta de contenido. */
export const DOCS_DOCUMENTS: Record<DocsContentPath, DocContent> = {
  "/docs/conceptos/sdd": CONCEPTOS_SDD_DOCUMENT,
  "/docs/conceptos/aprobacion-humana": CONCEPTOS_APROBACION_HUMANA_DOCUMENT,
  "/docs/conceptos/work-items-y-estados":
    CONCEPTOS_WORK_ITEMS_Y_ESTADOS_DOCUMENT,
  "/docs/conceptos/modo-directo": CONCEPTOS_MODO_DIRECTO_DOCUMENT,
  "/docs/guias/github": GUIAS_GITHUB_DOCUMENT,
  "/docs/guias/visor": GUIAS_VISOR_DOCUMENT,
  "/docs/guias/checks": GUIAS_CHECKS_DOCUMENT,
  "/docs/guias/actualizar": GUIAS_ACTUALIZAR_DOCUMENT,
};

export const DOCS_CONTENT_PATHS = Object.keys(
  DOCS_DOCUMENTS,
) as DocsContentPath[];

export function isDocsContentPath(path: string): path is DocsContentPath {
  return Object.prototype.hasOwnProperty.call(DOCS_DOCUMENTS, path);
}

export function getDocsDocument(path: DocsContentPath): DocContent {
  return DOCS_DOCUMENTS[path];
}
