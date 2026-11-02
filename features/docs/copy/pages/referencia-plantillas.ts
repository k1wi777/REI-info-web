import type { DocCopy } from "@/features/docs/copy/types";

export const REFERENCIA_PLANTILLAS_EN: DocCopy = {
  eyebrow: "Reference · Templates",
  meta: "current.md · history.md · meta.json",
  sections: [
    {
      id: "ubicacion",
      title: "The canonical templates",
      blocks: [
        {
          kind: "paragraph",
          text: "`.rei/templates/` contains the three templates from which the state files come: `current.md`, `history.md` and `meta.json`. They are the single source of format and no agent should invent a new one.",
        },
        {
          kind: "list",
          items: [
            "The CLI uses them when it starts, archives or resets the session.",
            "They are not copied or written by hand: they are generated and reset with `rei`.",
            "Changing a template by hand puts the files already generated from it out of sync.",
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
          text: "`current.md` represents the current state of the session: which Work Item is active, in what state, what plan remains, what has happened and what the next step is. Its template fixes five fields and three sections.",
        },
        {
          kind: "table",
          columns: ["Part", "Content"],
          rows: [
            [
              "Header",
              "Work Item, Tipo (type), Estado (state), Inicio (start) and Agente activo (active agent).",
            ],
            ["Plan", "Steps of the work, checked off as they advance."],
            ["Bitácora", "Chronological record of what happened in the session."],
            ["Próximo paso", "What must happen next."],
          ],
        },
        {
          kind: "paragraph",
          text: "The Spec Author initializes it with `rei session start` when planning begins and leaves it in ready. The Implementer maintains it during in_progress and leaves it in review. It is updated throughout the cycle, not only at the end.",
        },
        {
          kind: "code",
          language: "text",
          title: "Template placeholders",
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
          text: "`history.md` is the project's historical log and its content is append-only: earlier entries are never modified or deleted. Each entry summarizes the date, Work Item, agent, work done, files modified, verification and final state.",
        },
        {
          kind: "list",
          items: [
            "`rei session archive` appends the summary of `current.md` to the end of the history.",
            "The entry reflects the Reviewer's verdict, because archiving happens after `rei status set <id> done`.",
            "An entry is not rewritten to correct it: if context is needed, a new one is added.",
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
          text: "The `meta.json` template declares the eight fields with placeholders that the CLI fills in when the Work Item is created. It is not a list of values: the id format, the values of `type` and `status` and the use of the commits are documented on the `meta.json` page.",
        },
        {
          kind: "code",
          language: "json",
          title: "Template placeholders",
          code: '{\n  "id": "{{ID}}",\n  "title": "{{TITLE}}",\n  "description": "{{DESCRIPTION}}",\n  "type": "{{TYPE}}",\n  "status": "{{STATUS}}",\n  "created_at": "{{CREATED_AT}}",\n  "base_commit": "{{BASE_COMMIT}}",\n  "last_review_commit": "{{LAST_REVIEW_COMMIT}}"\n}',
        },
        {
          kind: "links",
          links: [
            {
              label: "See the meta.json fields",
              href: "/docs/referencia/meta",
            },
          ],
        },
      ],
    },
    {
      id: "archivado",
      title: "Archiving the session",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei session archive` moves the summary of `current.md` to `history.md` and resets `current.md` to its initial state. It only archives when the Work Item is closed and the session state is consistent.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "It checks that `meta.json` is in a terminal state: done or blocked.",
            "It checks that the Estado field of `current.md` matches the one in `meta.json`.",
            "If something does not match, it rejects the archiving with code 1 and explains the cause; it writes nothing.",
            "If everything matches, it appends the entry to the end of history.md and resets current.md.",
          ],
        },
        {
          kind: "paragraph",
          text: "`rei session reset` resets `current.md` to its initial state without archiving the history. It is used to discard a session that was never closed, never to delete the evidence of a finished Work Item.",
        },
        {
          kind: "links",
          links: [
            { label: "Look up the session commands", href: "/docs/referencia/comandos" },
            { label: "See the Work Item states", href: "/docs/referencia/estados" },
          ],
        },
      ],
    },
  ],
};
