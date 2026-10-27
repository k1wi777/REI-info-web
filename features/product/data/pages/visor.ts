import { REPOSITORY_URL } from "@/content/site";
import type { ProductDocument } from "@/features/product/types";

export const VISOR_DOCUMENT: ProductDocument = {
  id: "visor",
  eyebrow: "Producto · Visor",
  meta: "Local · solo lectura · sin aprobación",
  sections: [
    {
      id: "que-es",
      title: "rei view abre un visor local",
      blocks: [
        {
          kind: "paragraph",
          text: "El visor es una herramienta local para revisar el trabajo con los documentos renderizados. Sirve un servidor HTTP en la máquina del usuario y embebe sus propios assets en el binario: no carga assets de terceros.",
        },
        {
          kind: "list",
          items: [
            "Se ejecuta desde la terminal del proyecto, sin desplegar nada.",
            "Muestra documentos de planificación y progreso, validación, sesión, tabla de contenidos, diff y FICHA.",
            "El contenido es legible y el estado real del Work Item no se simula.",
          ],
        },
      ],
    },
    {
      id: "muestra",
      title: "Qué muestra",
      blocks: [
        {
          kind: "table",
          columns: ["Vista", "Qué muestra"],
          rows: [
            ["Documentos", "Planificación y progreso renderizados."],
            ["Validación", "El resultado de la coherencia interna del Work Item."],
            ["Sesión", "La sesión activa y su estado."],
            ["TOC", "La tabla de contenidos de los documentos."],
            ["Diff", "Los cambios reales del Work Item."],
            [
              "FICHA",
              "Metadatos e issue, base y épica de links.json cuando existen.",
            ],
          ],
        },
      ],
    },
    {
      id: "recarga",
      title: "Recarga en vivo y cierre",
      blocks: [
        {
          kind: "paragraph",
          text: "El badge de estado y la FICHA se refrescan en vivo por SSE. Cuando el Work Item llega a done, el visor se cierra poco después de mostrar «terminado»; --stop, el tiempo de inactividad y Ctrl+C también lo detienen.",
        },
      ],
    },
    {
      id: "limites",
      title: "Qué no hace",
      blocks: [
        {
          kind: "list",
          items: [
            "No aprueba: no tiene botón ni ruta de aprobación.",
            "No modifica Work Items ni escribe en el repositorio.",
            "No sustituye la respuesta humana en el chat o la terminal.",
            "No sustituye al CLI ni al historial de git.",
          ],
        },
        {
          kind: "note",
          tone: "info",
          title: "La aprobación se registra desde el CLI",
          text: "Ver el estado en el visor no equivale a aprobar. El paso a in_progress lo registra el Leader con rei status set.",
        },
      ],
    },
    {
      id: "comandos",
      title: "Comandos del visor",
      blocks: [
        { kind: "commands", ids: ["view", "item-show", "validate"] },
        {
          kind: "links",
          links: [
            { label: "Referencia de comandos", href: "/docs/referencia/comandos" },
            { label: "Preguntas frecuentes", href: "/docs/operacion/faq" },
            { label: "Ver los Work Items", href: "/producto/work-items" },
            { label: "Cómo funciona el flujo", href: "/producto/como-funciona" },
            {
              label: "Repositorio de REI Harness",
              href: REPOSITORY_URL,
              external: true,
            },
          ],
        },
      ],
    },
  ],
};
