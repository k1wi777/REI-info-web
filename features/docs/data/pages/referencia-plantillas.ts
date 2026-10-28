import type { DocContent, DocsContentPath } from "@/features/docs/types";

export const REFERENCIA_PLANTILLAS_PATH: DocsContentPath =
  "/docs/referencia/plantillas";

export const REFERENCIA_PLANTILLAS_DOCUMENT: DocContent = {
  path: REFERENCIA_PLANTILLAS_PATH,
  eyebrow: "Referencia · Plantillas",
  meta: "current.md · history.md · meta.json",
  sections: [
    {
      id: "ubicacion",
      title: "Las plantillas canónicas",
      blocks: [
        {
          kind: "paragraph",
          text: "`.rei/templates/` contiene las tres plantillas de las que salen los archivos de estado: `current.md`, `history.md` y `meta.json`. Son la fuente única de formato y ningún agente debe inventar uno nuevo.",
        },
        {
          kind: "list",
          items: [
            "Las usa el CLI al iniciar la sesión, archivarla o restablecerla.",
            "No se copian ni se escriben a mano: se generan y restablecen con `rei`.",
            "Cambiar una plantilla a mano desincroniza los archivos que ya se generaron con ella.",
          ],
        },
      ],
    },
    {
      id: "current-md",
      title: "current.md",
      blocks: [
        {
          kind: "paragraph",
          text: "`current.md` representa el estado actual de la sesión: qué Work Item está activo, en qué estado, qué plan queda, qué ha pasado y cuál es el próximo paso. Su plantilla fija cinco campos y tres secciones.",
        },
        {
          kind: "table",
          columns: ["Parte", "Contenido"],
          rows: [
            [
              "Cabecera",
              "Work Item, Tipo, Estado, Inicio y Agente activo.",
            ],
            ["Plan", "Pasos del trabajo, marcados a medida que avanzan."],
            ["Bitácora", "Registro cronológico de lo ocurrido en la sesión."],
            ["Próximo paso", "Qué debe ocurrir a continuación."],
          ],
        },
        {
          kind: "paragraph",
          text: "El Spec Author lo inicializa con `rei session start` al empezar la planificación y lo deja en ready. El Implementer lo mantiene durante in_progress y lo deja en review. Se actualiza durante todo el ciclo, no solo al final.",
        },
        {
          kind: "code",
          language: "text",
          title: "Placeholders de la plantilla",
          code: "{{WORK_ITEM}}\n{{TYPE}}\n{{STATE}}\n{{START}}\n{{AGENT}}\n{{PLAN}}\n{{LOG}}\n{{NEXT}}",
        },
      ],
    },
    {
      id: "history-md",
      title: "history.md",
      blocks: [
        {
          kind: "paragraph",
          text: "`history.md` es la bitácora histórica del proyecto y su contenido es append-only: las entradas anteriores nunca se modifican ni se eliminan. Cada entrada resume fecha, Work Item, agente, trabajo realizado, archivos modificados, verificación y estado final.",
        },
        {
          kind: "list",
          items: [
            "`rei session archive` añade el resumen de `current.md` al final del historial.",
            "La entrada refleja el veredicto del Reviewer, porque el archivado ocurre después de `rei status set <id> done`.",
            "No se reescribe una entrada para corregirla: si hace falta contexto, se añade una nueva.",
          ],
        },
      ],
    },
    {
      id: "meta-json",
      title: "meta.json",
      blocks: [
        {
          kind: "paragraph",
          text: "La plantilla de `meta.json` declara los ocho campos con placeholders que rellena el CLI al crear el Work Item. No es una lista de valores: el formato del id, los valores de `type` y `status` y el uso de los commits se documentan en la página de `meta.json`.",
        },
        {
          kind: "code",
          language: "json",
          title: "Placeholders de la plantilla",
          code: '{\n  "id": "{{ID}}",\n  "title": "{{TITLE}}",\n  "description": "{{DESCRIPTION}}",\n  "type": "{{TYPE}}",\n  "status": "{{STATUS}}",\n  "created_at": "{{CREATED_AT}}",\n  "base_commit": "{{BASE_COMMIT}}",\n  "last_review_commit": "{{LAST_REVIEW_COMMIT}}"\n}',
        },
        {
          kind: "links",
          links: [
            {
              label: "Ver los campos de meta.json",
              href: "/docs/referencia/meta",
            },
          ],
        },
      ],
    },
    {
      id: "archivado",
      title: "Archivar la sesión",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei session archive` mueve el resumen de `current.md` a `history.md` y restablece `current.md` a su estado inicial. Solo archiva cuando el Work Item está cerrado y el estado de la sesión es coherente.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Comprueba que `meta.json` está en un estado terminal: done o blocked.",
            "Comprueba que el campo Estado de `current.md` coincide con el de `meta.json`.",
            "Si algo no coincide, rechaza el archivado con código 1 y explica la causa; no escribe nada.",
            "Si todo coincide, añade la entrada al final de history.md y restablece current.md.",
          ],
        },
        {
          kind: "paragraph",
          text: "`rei session reset` restablece `current.md` a su estado inicial sin archivar el historial. Se usa para descartar una sesión que no llegó a cerrarse, nunca para borrar evidencia de un Work Item terminado.",
        },
        {
          kind: "links",
          links: [
            { label: "Consultar los comandos de sesión", href: "/docs/referencia/comandos" },
            { label: "Ver los estados del Work Item", href: "/docs/referencia/estados" },
          ],
        },
      ],
    },
  ],
};
