import type { DocContent, DocsContentPath } from "@/features/docs/types";
import { CONCEPTOS_APROBACION_HUMANA_DOCUMENT } from "@/features/docs/data/pages/conceptos-aprobacion-humana";
import { CONCEPTOS_MODO_DIRECTO_DOCUMENT } from "@/features/docs/data/pages/conceptos-modo-directo";
import { CONCEPTOS_SDD_DOCUMENT } from "@/features/docs/data/pages/conceptos-sdd";
import { CONCEPTOS_WORK_ITEMS_Y_ESTADOS_DOCUMENT } from "@/features/docs/data/pages/conceptos-work-items-y-estados";
import { GUIAS_ACTUALIZAR_DOCUMENT } from "@/features/docs/data/pages/guias-actualizar";
import { GUIAS_CHECKS_DOCUMENT } from "@/features/docs/data/pages/guias-checks";
import { GUIAS_GITHUB_DOCUMENT } from "@/features/docs/data/pages/guias-github";
import { GUIAS_VISOR_DOCUMENT } from "@/features/docs/data/pages/guias-visor";
import { OPERACION_CHANGELOG_DOCUMENT } from "@/features/docs/data/pages/operacion-changelog";
import { OPERACION_TROUBLESHOOTING_DOCUMENT } from "@/features/docs/data/pages/operacion-troubleshooting";
import { REFERENCIA_ADAPTADORES_DOCUMENT } from "@/features/docs/data/pages/referencia-adaptadores";
import { REFERENCIA_CONFIGURACION_DOCUMENT } from "@/features/docs/data/pages/referencia-configuracion";
import { REFERENCIA_ESTADOS_DOCUMENT } from "@/features/docs/data/pages/referencia-estados";
import { REFERENCIA_META_DOCUMENT } from "@/features/docs/data/pages/referencia-meta";
import { REFERENCIA_PLANTILLAS_DOCUMENT } from "@/features/docs/data/pages/referencia-plantillas";

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
  "/docs/referencia/configuracion": REFERENCIA_CONFIGURACION_DOCUMENT,
  "/docs/referencia/meta": REFERENCIA_META_DOCUMENT,
  "/docs/referencia/estados": REFERENCIA_ESTADOS_DOCUMENT,
  "/docs/referencia/plantillas": REFERENCIA_PLANTILLAS_DOCUMENT,
  "/docs/referencia/adaptadores": REFERENCIA_ADAPTADORES_DOCUMENT,
  "/docs/operacion/troubleshooting": OPERACION_TROUBLESHOOTING_DOCUMENT,
  "/docs/operacion/changelog": OPERACION_CHANGELOG_DOCUMENT,
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
