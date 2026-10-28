import { REPOSITORY_URL } from "@/content/site";
import type { ProductDocument } from "@/features/product/types";

export const VISOR_DOCUMENT: ProductDocument = {
  id: "visor",
  eyebrow: "Producto · Visor",
  meta: "Local · solo lectura · sin aprobación",
  facts: [
    { label: "Modo", value: "Solo lectura" },
    { label: "Aprueba", value: "No" },
    { label: "Host", value: "Local" },
    { label: "Recarga", value: "SSE" },
    { label: "Cierre", value: "Al llegar a done" },
  ],
  sections: [
    {
      id: "que-es",
      label: "Qué es",
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
      label: "Qué muestra",
      title: "Qué muestra",
      weight: "lead",
      blocks: [
        {
          kind: "viewer",
          caption:
            "Captura real del visor abierto sobre el Work Item de referencia",
        },
        {
          kind: "points",
          variant: "ledger",
          points: [
            {
              title: "Documentos",
              detail: "Planificación y progreso renderizados.",
            },
            {
              title: "Validación",
              detail: "El resultado de la coherencia interna del Work Item.",
            },
            {
              title: "Sesión",
              detail: "La sesión activa y su estado.",
            },
            {
              title: "TOC",
              detail: "La tabla de contenidos de los documentos.",
            },
            {
              title: "Diff",
              detail: "Los cambios reales del Work Item.",
            },
            {
              title: "FICHA",
              detail:
                "Metadatos e issue, base y épica de links.json cuando existen.",
            },
          ],
        },
      ],
    },
    {
      id: "recarga",
      label: "Recarga",
      title: "Recarga en vivo y cierre",
      blocks: [
        {
          kind: "paragraph",
          text: "El badge de estado y la FICHA se refrescan en vivo por SSE. Cuando el Work Item llega a done, el visor se cierra poco después de mostrar «terminado»; `--stop`, el tiempo de inactividad y Ctrl+C también lo detienen.",
        },
      ],
    },
    {
      id: "limites",
      label: "Límites",
      title: "Qué no hace",
      blocks: [
        {
          kind: "points",
          variant: "limits",
          points: [
            {
              title: "No aprueba",
              detail: "No tiene botón ni ruta de aprobación.",
            },
            {
              title: "No modifica Work Items",
              detail: "Ni escribe en el repositorio.",
            },
            {
              title: "No sustituye la respuesta humana",
              detail: "En el chat o en la terminal.",
            },
            {
              title: "No sustituye al CLI",
              detail: "Ni al historial de git.",
            },
          ],
        },
        {
          kind: "note",
          tone: "info",
          title: "La aprobación se registra desde el CLI",
          text: "Ver el estado en el visor no equivale a aprobar. El paso a in_progress lo registra el Leader con `rei status set`.",
        },
      ],
    },
    {
      id: "comandos",
      label: "Comandos",
      title: "Comandos del visor",
      weight: "fine",
      blocks: [
        { kind: "commands", ids: ["view", "item-show", "validate"] },
        {
          kind: "links",
          links: [
            {
              label: "Referencia de comandos",
              href: "/docs/referencia/comandos",
            },
            { label: "Preguntas frecuentes", href: "/docs/operacion/faq" },
            { label: "Ver los Work Items", href: "/producto/work-items" },
            {
              label: "Cómo funciona el flujo",
              href: "/producto/como-funciona",
            },
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
