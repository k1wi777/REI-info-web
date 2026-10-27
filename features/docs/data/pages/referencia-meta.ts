import type { DocContent, DocsContentPath } from "@/features/docs/types";

export const REFERENCIA_META_PATH: DocsContentPath = "/docs/referencia/meta";

export const REFERENCIA_META_DOCUMENT: DocContent = {
  path: REFERENCIA_META_PATH,
  eyebrow: "Referencia · meta.json",
  meta: "ocho campos · registro duradero · commits",
  sections: [
    {
      id: "ubicacion",
      title: "Ubicación",
      blocks: [
        {
          kind: "paragraph",
          text: "Cada Work Item vive en .rei/specs/<work-item-id>/ y contiene un único meta.json. El nombre de la carpeta es el id inmutable del Work Item y debe coincidir con .rei/progress/work-items/<work-item-id>/.",
        },
        {
          kind: "code",
          language: "text",
          title: "Estructura",
          code: ".rei/specs/\n└── <work-item-id>/\n    ├── meta.json\n    └── ...",
        },
      ],
    },
    {
      id: "campos",
      title: "Campos",
      blocks: [
        {
          kind: "table",
          columns: ["Campo", "Contenido"],
          rows: [
            [
              "id",
              "Identificador inmutable. Coincide con la carpeta de .rei/specs/ y de .rei/progress/work-items/.",
            ],
            ["title", "Nombre corto y descriptivo del Work Item."],
            [
              "description",
              "Descripción técnica del acuerdo alcanzado con el usuario; no copia la conversación.",
            ],
            ["type", "feature o task."],
            [
              "status",
              "Etapa actual del workflow. Los valores válidos y sus transiciones están en la referencia de estados.",
            ],
            [
              "created_at",
              "Fecha y hora de creación en ISO 8601, con zona horaria. Coincide con el prefijo del id.",
            ],
            [
              "base_commit",
              "SHA del commit que marca el inicio de la implementación. Vacío si el proyecto no usa git.",
            ],
            [
              "last_review_commit",
              "SHA del punto ya revisado. Vacío si no aplica.",
            ],
          ],
        },
      ],
    },
    {
      id: "identificador",
      title: "El identificador",
      blocks: [
        {
          kind: "paragraph",
          text: "El id se construye con la fecha y hora de creación y un slug en kebab-case. No cambia aunque el trabajo se reanude o cambie el título.",
        },
        {
          kind: "code",
          language: "text",
          title: "Formato",
          code: "YYYY-MM-DD_HH-mm__slug-en-kebab-case",
        },
        {
          kind: "paragraph",
          text: "Si ya existe un identificador igual, se añade un sufijo numérico al slug (-2, -3, ...) sin modificar la fecha y hora originales. El id se genera al crear el Work Item; no se reescribe después.",
        },
      ],
    },
    {
      id: "estado",
      title: "type y status",
      blocks: [
        {
          kind: "paragraph",
          text: "type decide la planificación que se genera y si la integración con GitHub abre issue y rama. Una feature produce requirements.md, design.md y tasks.md; una task produce plan.md y no genera issue ni rama.",
        },
        {
          kind: "paragraph",
          text: "status registra la etapa del workflow y admite los siete estados del arnés. Su significado y sus transiciones se documentan en la referencia de estados, que es la fuente única; no se repiten aquí.",
        },
        {
          kind: "links",
          links: [
            { label: "Ver los siete estados", href: "/docs/referencia/estados" },
            {
              label: "Cambiar el estado de un Work Item",
              href: "/docs/referencia/comandos",
            },
          ],
        },
      ],
    },
    {
      id: "commits",
      title: "base_commit y last_review_commit",
      blocks: [
        {
          kind: "paragraph",
          text: "Ambos campos los escribe el CLI con el commit actual de git. base_commit lo registra el Leader al aprobar el Work Item; last_review_commit lo registra el Reviewer al rechazar la implementación.",
        },
        {
          kind: "code",
          language: "Shell",
          title: "Registrar un commit",
          code: "rei commit set <work-item-id> base_commit\nrei commit set <work-item-id> last_review_commit",
        },
        {
          kind: "list",
          items: [
            "rei review-diff usa base_commit como punto base del paquete de revisión.",
            "Si last_review_commit está presente, review-diff calcula el diff desde ese punto y la revisión ve solo los cambios pedidos.",
            "Para que el diff quede acotado, la implementación debe estar commiteada antes de solicitar la revisión; si no lo está, el diff cubre todo lo pendiente desde base_commit.",
            "En un proyecto sin git ambos campos quedan vacíos.",
          ],
        },
      ],
    },
    {
      id: "current-md",
      title: "meta.json y current.md",
      blocks: [
        {
          kind: "paragraph",
          text: "meta.json es el registro duradero de cada Work Item y la referencia para diagnosticar el conjunto con rei items status. current.md es el contexto vivo de la sesión activa: sirve para retomarla exactamente donde quedó si la conversación se interrumpe.",
        },
        {
          kind: "table",
          columns: ["Archivo", "Qué registra", "Alcance"],
          rows: [
            [
              "meta.json",
              "Tipo, estado, fechas y commits.",
              "Duradero; sobrevive al cierre de la sesión.",
            ],
            [
              "current.md",
              "Estado, plan, bitácora y próximo paso.",
              "Sesión activa; se archiva al cerrar el Work Item.",
            ],
          ],
        },
        {
          kind: "paragraph",
          text: "Los dos archivos se mantienen y son complementarios. El estado de meta.json no se deduce de la conversación ni de la memoria del agente.",
        },
        {
          kind: "links",
          links: [
            { label: "Ver los estados del Work Item", href: "/docs/referencia/estados" },
            { label: "Conocer las plantillas canónicas", href: "/docs/referencia/plantillas" },
            { label: "Consultar los comandos", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
  ],
};
