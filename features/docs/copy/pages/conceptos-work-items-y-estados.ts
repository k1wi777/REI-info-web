import { BRANCH_STATES, CYCLE_STATES } from "@/content/rei";
import { reiProseEn } from "@/content/i18n/rei";
import type { DocCopy } from "@/features/docs/copy/types";

export const CONCEPTOS_WORK_ITEMS_Y_ESTADOS_EN: DocCopy = {
  eyebrow: "Concepts · Work Items",
  meta: "Feature or Task · five states · two branches",
  sections: [
    {
      id: "feature-o-task",
      title: "Feature or Task",
      blocks: [
        {
          kind: "paragraph",
          text: "All work is born as a Work Item with an identifier and a type. The type is not a cosmetic label: it decides the planning that is generated and whether the GitHub Issues integration opens an issue and a branch.",
        },
        {
          kind: "table",
          columns: ["Type", "Planning", "When to use it"],
          rows: [
            [
              "Feature",
              "`requirements.md`, `design.md` and `tasks.md`",
              "The work needs a specification, there are several design decisions, or it changes behavior or architecture.",
            ],
            [
              "Task",
              "`plan.md`",
              "Documentation, contracts, or a small, localized change with no change in behavior or architecture.",
            ],
          ],
        },
        {
          kind: "note",
          tone: "info",
          title: "Tie-breaker rule",
          text: "If there is any doubt about the type, choose Feature. A Task must not become a disguised Feature: if the plan needs requirements or detailed design, the right type is Feature.",
        },
      ],
    },
    {
      id: "el-ciclo",
      title: "The state cycle",
      blocks: [
        {
          kind: "paragraph",
          text: "Features and Tasks share the same cycle. Every Work Item starts in pending, goes through planning and approval, is implemented, is reviewed and ends in done. Each state describes a real stage of the work, not a decorative label.",
        },
        {
          kind: "table",
          columns: ["State", "Meaning", "Kind"],
          rows: CYCLE_STATES.map((state) => [
            state.label,
            reiProseEn.states[state.id],
            state.terminal ? "Terminal" : "Cycle",
          ]),
        },
        {
          kind: "paragraph",
          text: "The move from ready to in_progress is the human approval. The move from in_progress to review is recorded by the Implementer when it finishes, and the move from review to done requires the Reviewer's verdict. No shortcut removes those points.",
        },
      ],
    },
    {
      id: "ramas",
      title: "The branches of the cycle",
      blocks: [
        {
          kind: "paragraph",
          text: "Two states sit outside the linear path. They are not shortcuts or success states: they describe work that is stopped or a review that demands corrections.",
        },
        {
          kind: "table",
          columns: ["State", "Meaning"],
          rows: BRANCH_STATES.map((state) => [
            state.label,
            reiProseEn.states[state.id],
          ]),
        },
        {
          kind: "list",
          items: [
            "blocked is reached from any point of the cycle when the work cannot continue; it is only left once the cause is resolved.",
            "changes_requested is produced by a Reviewer rejection. The Work Item returns to in_progress with the requested corrections.",
            "done is terminal: it is not left through a standard transition. A non-standard transition requires `--force` and an explicit order.",
          ],
        },
      ],
    },
    {
      id: "donde-vive-el-estado",
      title: "Where the state lives",
      blocks: [
        {
          kind: "paragraph",
          text: "State does not live in the conversation or in the agent's memory. It is recorded in two files with distinct, complementary responsibilities.",
        },
        {
          kind: "table",
          columns: ["File", "What it records", "What it is for"],
          rows: [
            [
              "`meta.json`",
              "Type, state, `base_commit` and `last_review_commit` of each Work Item.",
              "Durable record and diagnosis of the set of Work Items.",
            ],
            [
              "`current.md`",
              "State, log and next step of the active session.",
              "Resuming the work exactly where it was left if the session is interrupted.",
            ],
          ],
        },
        {
          kind: "paragraph",
          text: "The limit of a single in_progress is hard. `rei status set` enforces it when you try to activate another Work Item, also with `--force`, and `rei check`, `rei doctor` and `rei items status` verify it. Before starting another one, the active one must be closed, blocked or sent to review.",
        },
      ],
    },
    {
      id: "siguiente",
      title: "Next step",
      blocks: [
        {
          kind: "paragraph",
          text: "With the vocabulary clear, the next step is to understand the gate that separates ready from in_progress, or to walk through the full cycle with a real Work Item.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Understand human approval",
              href: "/docs/conceptos/aprobacion-humana",
            },
            {
              label: "Walk through the first Work Item",
              href: "/docs/empezar/primer-work-item",
            },
            {
              label: "See the product's Work Items",
              href: "/producto/work-items",
            },
            {
              label: "Look up the commands",
              href: "/docs/referencia/comandos",
            },
          ],
        },
      ],
    },
  ],
};
