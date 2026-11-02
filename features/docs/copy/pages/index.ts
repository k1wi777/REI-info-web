import { CONCEPTOS_APROBACION_HUMANA_EN } from "@/features/docs/copy/pages/conceptos-aprobacion-humana";
import { CONCEPTOS_MODO_DIRECTO_EN } from "@/features/docs/copy/pages/conceptos-modo-directo";
import { CONCEPTOS_SDD_EN } from "@/features/docs/copy/pages/conceptos-sdd";
import { CONCEPTOS_WORK_ITEMS_Y_ESTADOS_EN } from "@/features/docs/copy/pages/conceptos-work-items-y-estados";
import { GUIAS_ACTUALIZAR_EN } from "@/features/docs/copy/pages/guias-actualizar";
import { GUIAS_CHECKS_EN } from "@/features/docs/copy/pages/guias-checks";
import { GUIAS_GITHUB_ISSUES_EN } from "@/features/docs/copy/pages/guias-github-issues";
import { GUIAS_VISOR_EN } from "@/features/docs/copy/pages/guias-visor";
import { REFERENCIA_ADAPTADORES_EN } from "@/features/docs/copy/pages/referencia-adaptadores";
import { REFERENCIA_CONFIGURACION_EN } from "@/features/docs/copy/pages/referencia-configuracion";
import { REFERENCIA_ESTADOS_EN } from "@/features/docs/copy/pages/referencia-estados";
import { REFERENCIA_META_EN } from "@/features/docs/copy/pages/referencia-meta";
import { REFERENCIA_PLANTILLAS_EN } from "@/features/docs/copy/pages/referencia-plantillas";
import { OPERACION_CHANGELOG_EN } from "@/features/docs/copy/pages/operacion-changelog";
import { OPERACION_TROUBLESHOOTING_EN } from "@/features/docs/copy/pages/operacion-troubleshooting";
import type { TranslatedDocsContentPath } from "@/features/docs/copy/documents";
import type { DocCopy } from "@/features/docs/copy/types";

/** Un documento en inglés por cada ruta de contenido registrada como traducida. */
export const DOCUMENTS_EN: Record<TranslatedDocsContentPath, DocCopy> = {
  "/docs/conceptos/sdd": CONCEPTOS_SDD_EN,
  "/docs/conceptos/aprobacion-humana": CONCEPTOS_APROBACION_HUMANA_EN,
  "/docs/conceptos/work-items-y-estados": CONCEPTOS_WORK_ITEMS_Y_ESTADOS_EN,
  "/docs/conceptos/modo-directo": CONCEPTOS_MODO_DIRECTO_EN,
  "/docs/guias/github-issues": GUIAS_GITHUB_ISSUES_EN,
  "/docs/guias/visor": GUIAS_VISOR_EN,
  "/docs/guias/checks": GUIAS_CHECKS_EN,
  "/docs/guias/actualizar": GUIAS_ACTUALIZAR_EN,
  "/docs/referencia/configuracion": REFERENCIA_CONFIGURACION_EN,
  "/docs/referencia/meta": REFERENCIA_META_EN,
  "/docs/referencia/estados": REFERENCIA_ESTADOS_EN,
  "/docs/referencia/plantillas": REFERENCIA_PLANTILLAS_EN,
  "/docs/referencia/adaptadores": REFERENCIA_ADAPTADORES_EN,
  "/docs/operacion/troubleshooting": OPERACION_TROUBLESHOOTING_EN,
  "/docs/operacion/changelog": OPERACION_CHANGELOG_EN,
};
