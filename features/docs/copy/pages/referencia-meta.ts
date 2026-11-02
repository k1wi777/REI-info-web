import type { DocCopy } from "@/features/docs/copy/types";

export const REFERENCIA_META_EN: DocCopy = {
  eyebrow: "Reference · meta.json",
  meta: "eight fields · durable record · commits",
  sections: [
    {
      id: "ubicacion",
      title: "Location",
      blocks: [
        {
          kind: "paragraph",
          text: "Each Work Item lives in `.rei/specs/<work-item-id>/` and contains a single `meta.json`. The folder name is the Work Item's immutable id and must match `.rei/progress/work-items/<work-item-id>/`.",
        },
        {
          kind: "code",
          language: "text",
          title: "Structure",
          code: ".rei/specs/\n└── <work-item-id>/\n    ├── meta.json\n    └── ...",
        },
      ],
    },
    {
      id: "campos",
      title: "Fields",
      blocks: [
        {
          kind: "table",
          columns: ["Field", "Content"],
          rows: [
            [
              "`id`",
              "Immutable identifier. It matches the folder in `.rei/specs/` and in `.rei/progress/work-items/`.",
            ],
            ["`title`", "Short, descriptive name of the Work Item."],
            [
              "`description`",
              "Technical description of the agreement reached with the user; it does not copy the conversation.",
            ],
            ["`type`", "feature or task."],
            [
              "`status`",
              "Current stage of the workflow. The valid values and their transitions are in the states reference.",
            ],
            [
              "`created_at`",
              "Creation date and time in ISO 8601, with time zone. It matches the id prefix.",
            ],
            [
              "`base_commit`",
              "SHA of the commit that marks the start of the implementation. Empty if the project does not use git.",
            ],
            [
              "`last_review_commit`",
              "SHA of the point already reviewed. Empty if not applicable.",
            ],
          ],
        },
      ],
    },
    {
      id: "identificador",
      title: "The identifier",
      blocks: [
        {
          kind: "paragraph",
          text: "The id is built from the creation date and time and a kebab-case slug. It does not change even if the work is resumed or the title changes.",
        },
        {
          kind: "code",
          language: "text",
          title: "Format",
          code: "YYYY-MM-DD_HH-mm__slug-en-kebab-case",
        },
        {
          kind: "paragraph",
          text: "If an identical identifier already exists, a numeric suffix is added to the slug (-2, -3, ...) without changing the original date and time. The id is generated when the Work Item is created; it is not rewritten afterwards.",
        },
      ],
    },
    {
      id: "estado",
      title: "type and status",
      blocks: [
        {
          kind: "paragraph",
          text: "`type` decides the planning that is generated and whether the GitHub Issues integration opens an issue and a branch. A feature produces `requirements.md`, `design.md` and `tasks.md`; a task produces `plan.md` and generates no issue or branch.",
        },
        {
          kind: "paragraph",
          text: "`status` records the workflow stage and accepts the harness's seven states. Their meaning and transitions are documented in the states reference, which is the single source; they are not repeated here.",
        },
        {
          kind: "links",
          links: [
            { label: "See the seven states", href: "/docs/referencia/estados" },
            {
              label: "Change the state of a Work Item",
              href: "/docs/referencia/comandos",
            },
          ],
        },
      ],
    },
    {
      id: "commits",
      title: "base_commit and last_review_commit",
      blocks: [
        {
          kind: "paragraph",
          text: "Both fields are written by the CLI with the current `git` commit. `base_commit` is recorded by the Leader when approving the Work Item; `last_review_commit` is recorded by the Reviewer when rejecting the implementation.",
        },
        {
          kind: "code",
          language: "Shell",
          title: "Record a commit",
          code: "rei commit set <work-item-id> base_commit\nrei commit set <work-item-id> last_review_commit",
        },
        {
          kind: "list",
          items: [
            "`rei review-diff` uses `base_commit` as the base point of the review package.",
            "If `last_review_commit` is present, `review-diff` computes the diff from that point and the review sees only the requested changes.",
            "For the diff to stay bounded, the implementation must be committed before requesting the review; if it is not, the diff covers everything pending since `base_commit`.",
            "In a project without `git` both fields stay empty.",
          ],
        },
      ],
    },
    {
      id: "current-md",
      title: "meta.json and current.md",
      blocks: [
        {
          kind: "paragraph",
          text: "`meta.json` is the durable record of each Work Item and the reference for diagnosing the set with `rei items status`. `current.md` is the live context of the active session: it lets you resume exactly where it was left if the conversation is interrupted.",
        },
        {
          kind: "table",
          columns: ["File", "What it records", "Scope"],
          rows: [
            [
              "`meta.json`",
              "Type, state, dates and commits.",
              "Durable; it survives the end of the session.",
            ],
            [
              "`current.md`",
              "State, plan, log and next step.",
              "Active session; archived when the Work Item is closed.",
            ],
          ],
        },
        {
          kind: "paragraph",
          text: "Both files are maintained and complement each other. The state in `meta.json` is not inferred from the conversation or from the agent's memory.",
        },
        {
          kind: "links",
          links: [
            { label: "See the Work Item states", href: "/docs/referencia/estados" },
            { label: "Learn about the canonical templates", href: "/docs/referencia/plantillas" },
            { label: "Look up the commands", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
  ],
};
