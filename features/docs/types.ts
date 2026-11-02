import type { DocSection } from "@/content/docs";
import type { Locale } from "@/lib/i18n";

export type DocsEntry = {
  title: string;
  mode: string;
  description: string;
  href: string;
  /** Idioma real del texto; ausente si es el del contenedor. */
  lang?: Locale;
};

export type DocsContentPath =
  | "/docs/conceptos/sdd"
  | "/docs/conceptos/aprobacion-humana"
  | "/docs/conceptos/work-items-y-estados"
  | "/docs/conceptos/modo-directo"
  | "/docs/guias/github-issues"
  | "/docs/guias/visor"
  | "/docs/guias/checks"
  | "/docs/guias/actualizar"
  | "/docs/referencia/configuracion"
  | "/docs/referencia/meta"
  | "/docs/referencia/estados"
  | "/docs/referencia/plantillas"
  | "/docs/referencia/adaptadores"
  | "/docs/operacion/troubleshooting"
  | "/docs/operacion/changelog";

export type DocContent = {
  path: DocsContentPath;
  eyebrow: string;
  meta?: string;
  sections: DocSection[];
};

export type DocsModeId = "conceptos" | "guias" | "referencia" | "operacion";
