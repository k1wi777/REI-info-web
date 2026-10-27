import type { DocBlock } from "@/content/docs";
import type { DocsModeId } from "@/features/docs/types";

export const CONCEPTOS_MODE_PATH = "/docs/conceptos";
export const GUIAS_MODE_PATH = "/docs/guias";
export const REFERENCIA_MODE_PATH = "/docs/referencia";
export const OPERACION_MODE_PATH = "/docs/operacion";

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
  referencia: {
    id: "referencia",
    intro:
      "La referencia reúne hechos comprobables: qué comandos existen, con qué flags, cómo se configura el arnés, qué significa cada estado y qué formato tienen los archivos canónicos. No explica el proceso ni sustituye a una guía: cuando un dato necesita contexto, enlaza al documento que lo desarrolla.",
    outro: [
      {
        kind: "paragraph",
        text: "Si necesitas el detalle de un comando, el cuadro exacto de estados o los valores de configuración, la referencia los reúne. Si vas a ejecutar una tarea paso a paso, la guía correspondiente marca el orden; para dudas de uso, la FAQ.",
      },
      {
        kind: "links",
        links: [
          { label: "Consultar los comandos", href: "/docs/referencia/comandos" },
          { label: "Ver los estados", href: "/docs/referencia/estados" },
          { label: "Revisar la configuración", href: "/docs/referencia/configuracion" },
          { label: "Abrir las guías", href: "/docs/guias" },
          { label: "Leer las preguntas frecuentes", href: "/docs/operacion/faq" },
        ],
      },
    ],
  },
  operacion: {
    id: "operacion",
    intro:
      "La operación responde a lo que aparece cuando el arnés ya está en marcha: un check en rojo, una sesión que no arranca, un Work Item bloqueado o una versión que quieres comprobar. Cada página parte de un síntoma o de un hecho y ofrece el siguiente paso, sin prometer atajos.",
    outro: [
      {
        kind: "paragraph",
        text: "Si el síntoma no está en la solución de problemas, la FAQ cubre las dudas de uso y la referencia responde al detalle del CLI y de la configuración.",
      },
      {
        kind: "links",
        links: [
          { label: "Solución de problemas", href: "/docs/operacion/troubleshooting" },
          { label: "Preguntas frecuentes", href: "/docs/operacion/faq" },
          { label: "Consultar la referencia", href: "/docs/referencia" },
          { label: "Ver la versión documentada", href: "/docs/operacion/changelog" },
        ],
      },
    ],
  },
};
