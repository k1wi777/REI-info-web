import type { DocCopy } from "@/features/docs/copy/types";

export const CONCEPTOS_MODO_DIRECTO_EN: DocCopy = {
  eyebrow: "Concepts · Direct mode",
  meta: "Outside the workflow · no record",
  sections: [
    {
      id: "que-es",
      title: "What direct mode is",
      blocks: [
        {
          kind: "paragraph",
          text: "Direct mode is a path outside the workflow that lets the Leader apply a trivial change when it is explicitly requested. It is not a Work Item type or a lifecycle state: it works on the current branch and tree, without opening any planning.",
        },
        {
          kind: "paragraph",
          text: "Its existence does not relax the rules of the harness. It is a narrow exception for changes that do not deserve a Work Item, not a back door around approval.",
        },
      ],
    },
    {
      id: "cuando-se-permite",
      title: "When it is allowed",
      blocks: [
        {
          kind: "paragraph",
          text: "It is only activated when the person asks for a «direct change» or «no Work Item». The Leader never starts it on its own initiative or from a request that does not explicitly ask for it.",
        },
        {
          kind: "list",
          items: [
            "Documentation, typos, formatting and comments.",
            "Trivial adjustments that do not change behavior.",
            "Changes contained in a single file with no technical impact.",
          ],
        },
      ],
    },
    {
      id: "cuando-se-niega",
      title: "When it is refused",
      blocks: [
        {
          kind: "paragraph",
          text: "If the change affects behavior, security, data, dependencies, public API, architecture, more than one file, or needs specification or review, the Leader must refuse and offer to continue as a Task or Feature.",
        },
        {
          kind: "note",
          tone: "warning",
          title: "Insisting does not authorize",
          text: "There is no override of the refusal. Repeating the request does not change the decision; if the change stops being trivial at any point, work stops and a Work Item is proposed.",
        },
      ],
    },
    {
      id: "como-se-autoriza",
      title: "How it is authorized",
      blocks: [
        {
          kind: "paragraph",
          text: "Even when a change is eligible, it needs explicit confirmation. The Leader states that there will be no planning, branch or record, and waits for an unambiguous answer before touching anything.",
        },
        {
          kind: "list",
          items: [
            "If it doubts eligibility, it warns and requires that confirmation.",
            "Silence or an ambiguous answer is not authorization.",
            "The default is not to apply direct mode.",
            "If a Work Item is in in_progress, the Leader warns that the change will share the tree and the diff.",
          ],
        },
      ],
    },
    {
      id: "sin-registro",
      title: "What it does not leave behind",
      blocks: [
        {
          kind: "paragraph",
          text: "Direct mode does not create a Work Item, spec, `meta.json`, `current.md`, `history.md`, `direct.md`, session, issue or branch. It also does not change the state or the documents of an existing Work Item.",
        },
        {
          kind: "paragraph",
          text: "The only trace is the diff or commit the person decides to make, and the conversation. That is why it is reserved for changes that do not need to be reconstructed later: if you need evidence, the way is a Task or a Feature.",
        },
      ],
    },
    {
      id: "por-que-no-es-un-atajo",
      title: "Why it is not a workflow shortcut",
      blocks: [
        {
          kind: "list",
          items: [
            "It does not skip verification: `rei check` always runs and, depending on the change, so do the project checks.",
            "It does not go through the Reviewer unless explicitly requested, but it does not allow skipping a requested review either.",
            "It does not authorize commit, push, PR or merge without an explicit order.",
            "It does not exempt the change from the other harness rules or create parallel states.",
            "If the change needs a specification, it stops being direct and goes back to the workflow.",
          ],
        },
        {
          kind: "links",
          links: [
            {
              label: "See the full flow",
              href: "/producto/como-funciona",
            },
            {
              label: "Understand Feature and Task",
              href: "/docs/conceptos/work-items-y-estados",
            },
            {
              label: "Get answers about direct changes",
              href: "/docs/operacion/faq",
            },
            {
              label: "Walk through the first Work Item",
              href: "/docs/empezar/primer-work-item",
            },
          ],
        },
      ],
    },
  ],
};
