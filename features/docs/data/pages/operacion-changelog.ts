import {
  DOCUMENTED_VERSION,
  DOCUMENTED_VERSION_DATE,
  RELEASES_URL,
} from "@/content/site";
import type { DocContent, DocsContentPath } from "@/features/docs/types";

export const OPERACION_CHANGELOG_PATH: DocsContentPath =
  "/docs/operacion/changelog";

const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

/** Fecha larga en español a partir del ISO de content/site.ts, sin depender de la zona horaria. */
export function formatDocumentedDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  const monthName = MONTHS[Number(month) - 1] ?? month;
  return `${Number(day)} de ${monthName} de ${year}`;
}

export const OPERACION_CHANGELOG_DOCUMENT: DocContent = {
  path: OPERACION_CHANGELOG_PATH,
  eyebrow: "Operación · Changelog",
  meta: `${DOCUMENTED_VERSION} · ${formatDocumentedDate(DOCUMENTED_VERSION_DATE)}`,
  sections: [
    {
      id: "version-documentada",
      title: "Versión documentada",
      blocks: [
        {
          kind: "paragraph",
          text: `Esta web documenta ${DOCUMENTED_VERSION}. La versión y su fecha viven en content/site.ts; la versión se muestra también en el pie del sitio y el changelog no la duplica a mano.`,
        },
        {
          kind: "table",
          columns: ["Dato", "Valor"],
          rows: [
            ["Versión documentada", DOCUMENTED_VERSION],
            [
              "Fecha de la release",
              formatDocumentedDate(DOCUMENTED_VERSION_DATE),
            ],
            ["Fuente canónica", "GitHub Releases de REI Harness"],
          ],
        },
      ],
    },
    {
      id: "v0-3-0",
      title: "v0.3.0",
      blocks: [
        {
          kind: "paragraph",
          text: "Resumen de los temas publicados en la release v0.3.0. Cada línea corresponde a un cambio verificable en las notas de la release; no se enumeran hashes ni se prometen versiones futuras.",
        },
        {
          kind: "table",
          columns: ["Tema", "Qué cambió"],
          rows: [
            [
              "GitHub v2",
              "Épicas, backlog de hijas y base por Work Item decidida en la puerta de aprobación.",
            ],
            [
              "Visor y un solo in_progress",
              "El visor pasa a ser de solo lectura y el arnés exige un único Work Item activo.",
            ],
            [
              "rei init",
              "El esqueleto neutro se separa del proyecto vivo y no sobrescribe archivos existentes.",
            ],
            [
              "Validación y enlaces",
              "Validación offline y links.json visible en rei item show y rei items status.",
            ],
            [
              "Workflow",
              "Modo directo autorizado para cambios triviales y presupuesto de planificación.",
            ],
            [
              "Archivado de sesión",
              "rei session archive rechaza Work Items que no están en un estado terminal.",
            ],
          ],
        },
      ],
    },
    {
      id: "fuente",
      title: "Fuente canónica",
      blocks: [
        {
          kind: "paragraph",
          text: "GitHub Releases es la fuente de verdad de versiones, fechas y cambios. Esta página resume lo que el sitio documenta; cuando la release y esta página difieran, manda la release.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Ver REI Harness en GitHub Releases",
              href: RELEASES_URL,
              external: true,
            },
            { label: "Actualizar el arnés y el binario", href: "/docs/guias/actualizar" },
            { label: "Consultar rei update", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
  ],
};
