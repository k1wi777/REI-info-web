import type { DocBlock } from "@/content/docs";
import type { DocsModeId } from "@/features/docs/types";

export const CONCEPTOS_MODE_PATH = "/docs/conceptos";
export const GUIAS_MODE_PATH = "/docs/guias";

export type DocsModeLanding = {
  id: DocsModeId;
  intro: string;
  outro?: DocBlock[];
};

/** Lo propio de cada landing: el título, la ruta y las tarjetas salen del árbol. */
export const DOCS_MODE_LANDINGS: Record<DocsModeId, DocsModeLanding> = {
  conceptos: {
    id: "conceptos",
    intro:
      "Antes de instalar nada, conviene saber por qué el arnés se organiza así. Estas páginas explican el modelo: la especificación que precede al código, la puerta de aprobación, el ciclo de un Work Item y la única vía que queda fuera del workflow.",
    outro: [
      {
        kind: "paragraph",
        text: "Los conceptos no sustituyen la práctica. Cuando quieras ejecutar el proceso, empieza por la instalación o por una receta concreta.",
      },
      {
        kind: "links",
        links: [
          { label: "Empezar por la instalación", href: "/docs/empezar/instalacion" },
          { label: "Abrir las guías", href: "/docs/guias" },
        ],
      },
    ],
  },
  guias: {
    id: "guias",
    intro:
      "Cada guía resuelve una tarea concreta con el orden que funciona: cuándo usarla, qué necesitas, los pasos, cómo comprobar el resultado y qué hacer después. No son explicaciones del modelo ni el catálogo completo de comandos.",
    outro: [
      {
        kind: "paragraph",
        text: "Si necesitas el detalle de un flag o el significado de un estado, la referencia y los conceptos están a un enlace.",
      },
      {
        kind: "links",
        links: [
          { label: "Consultar la referencia de comandos", href: "/docs/referencia/comandos" },
          { label: "Repasar los conceptos", href: "/docs/conceptos" },
        ],
      },
    ],
  },
};
