import {
  DOCUMENTED_VERSION,
  DOCUMENTED_VERSION_DATE,
  RELEASES_URL,
} from "@/content/site";
import type { DocCopy } from "@/features/docs/copy/types";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Fecha larga en inglés a partir del ISO de content/site.ts, sin depender de la zona horaria. */
export function formatDocumentedDateEn(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  const monthName = MONTHS[Number(month) - 1] ?? month;

  return `${monthName} ${Number(day)}, ${year}`;
}

export const OPERACION_CHANGELOG_EN: DocCopy = {
  eyebrow: "Operations · Changelog",
  meta: `${DOCUMENTED_VERSION} · ${formatDocumentedDateEn(DOCUMENTED_VERSION_DATE)}`,
  sections: [
    {
      id: "version-documentada",
      title: "Documented version",
      blocks: [
        {
          kind: "paragraph",
          text:
            "This site documents " +
            DOCUMENTED_VERSION +
            ". The version and its date live in `content/site.ts`; the version is also shown in the site footer and the changelog does not duplicate it by hand.",
        },
        {
          kind: "table",
          columns: ["Item", "Value"],
          rows: [
            ["Documented version", DOCUMENTED_VERSION],
            [
              "Release date",
              formatDocumentedDateEn(DOCUMENTED_VERSION_DATE),
            ],
            ["Canonical source", "REI Harness GitHub Releases"],
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
          text: "Summary of the topics published in the v0.3.0 release. Each line corresponds to a change that can be checked in the release notes; no hashes are listed and no future versions are promised.",
        },
        {
          kind: "table",
          columns: ["Topic", "What changed"],
          rows: [
            [
              "GitHub Issues v2",
              "Epics, a backlog of child issues and a per-Work Item base decided at the approval gate.",
            ],
            [
              "Viewer and a single in_progress",
              "The viewer becomes read-only and the harness requires a single active Work Item.",
            ],
            [
              "`rei init`",
              "The neutral skeleton is separated from the live project and does not overwrite existing files.",
            ],
            [
              "Validation and links",
              "Offline validation and `links.json` visible in `rei item show` and `rei items status`.",
            ],
            [
              "Workflow",
              "Authorized direct mode for trivial changes and a planning budget.",
            ],
            [
              "Session archiving",
              "`rei session archive` rejects Work Items that are not in a terminal state.",
            ],
          ],
        },
      ],
    },
    {
      id: "fuente",
      title: "Canonical source",
      blocks: [
        {
          kind: "paragraph",
          text: "GitHub Releases is the source of truth for versions, dates and changes. This page summarizes what the site documents; when the release and this page differ, the release prevails.",
        },
        {
          kind: "links",
          links: [
            {
              label: "See REI Harness on GitHub Releases",
              href: RELEASES_URL,
              external: true,
            },
            { label: "Update the harness and the binary", href: "/docs/guias/actualizar" },
            { label: "Look up rei update", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
  ],
};
