import { reiProseEn, transitionKey } from "@/content/i18n/rei";
import { STATE_TRANSITIONS, WORK_ITEM_STATES } from "@/content/rei";
import type { StateTransitionKind } from "@/content/rei";
import type { DocCopy } from "@/features/docs/copy/types";

const TRANSITION_KIND_LABELS: Record<StateTransitionKind, string> = {
  cycle: "Cycle",
  branch: "Branch",
  force: "Forced (--force)",
};

export const REFERENCIA_ESTADOS_EN: DocCopy = {
  eyebrow: "Reference · States",
  meta: "seven states · transitions · a single in_progress",
  sections: [
    {
      id: "estados",
      title: "The seven states",
      blocks: [
        {
          kind: "paragraph",
          text: "Every Work Item, whether Feature or Task, goes through the same states. Five form the linear cycle and two are branches outside it.",
        },
        {
          kind: "table",
          columns: ["State", "Meaning", "Kind"],
          rows: WORK_ITEM_STATES.map((state) => [
            state.label,
            reiProseEn.states[state.id],
            state.terminal ? "Terminal" : state.kind === "cycle" ? "Cycle" : "Branch",
          ]),
        },
      ],
    },
    {
      id: "transiciones",
      title: "Transitions",
      blocks: [
        {
          kind: "paragraph",
          text: "The table is generated from the harness's canonical data. Exits to blocked are derived from all non-terminal states; done can only be left with a forced transition.",
        },
        {
          kind: "table",
          columns: ["From", "To", "Type", "When"],
          rows: STATE_TRANSITIONS.map((transition) => [
            transition.from,
            transition.to,
            TRANSITION_KIND_LABELS[transition.kind],
            reiProseEn.transitions[transitionKey(transition)] ?? "—",
          ]),
        },
      ],
    },
    {
      id: "un-solo-in-progress",
      title: "A single in_progress",
      blocks: [
        {
          kind: "paragraph",
          text: "The limit is hard: only one Work Item can exist in in_progress. It is not a style recommendation or a convention the agent can skip.",
        },
        {
          kind: "list",
          items: [
            "`rei status set <id> in_progress` rejects activating a second Work Item, also with `--force`.",
            "`rei check`, `rei doctor` and `rei items status` fail if they detect more than one.",
            "`rei items status` marks the active Work Item with << ACTIVO and names the ones involved when there is a conflict.",
            "Before starting another one, the active one must be closed (review or done), blocked or sent to review.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "See the session and state commands", href: "/docs/referencia/comandos" },
            {
              label: "Resolve several active Work Items",
              href: "/docs/operacion/troubleshooting",
            },
          ],
        },
      ],
    },
    {
      id: "done-terminal",
      title: "done is terminal",
      blocks: [
        {
          kind: "paragraph",
          text: "done closes the Work Item: it is not left through a standard transition. The only exit is done → blocked with `--force`, reserved for a non-standard transition with an explicit order from the user.",
        },
        {
          kind: "code",
          language: "Shell",
          title: "Forced transition",
          code: "rei status set <work-item-id> blocked --force",
        },
        {
          kind: "note",
          tone: "warning",
          title: "Not a shortcut",
          text: "`--force` only authorizes a non-standard transition, such as done → blocked, and requires an explicit order. It does not change the limit of a single in_progress: `rei status set` still rejects it even with `--force`.",
        },
      ],
    },
    {
      id: "ramas",
      title: "The branches",
      blocks: [
        {
          kind: "paragraph",
          text: "blocked and changes_requested describe stopped work, not success states. The Work Item keeps existing and keeps its planning and history.",
        },
        {
          kind: "list",
          items: [
            "blocked is reached from any non-terminal state when the work cannot continue; it is left once the cause is resolved.",
            "changes_requested is produced by a Reviewer rejection in review. The Work Item returns to in_progress with the requested corrections.",
            "In changes_requested, the Reviewer records `last_review_commit` so the next review sees only what changed.",
          ],
        },
        {
          kind: "links",
          links: [
            {
              label: "Understand the state model",
              href: "/docs/conceptos/work-items-y-estados",
            },
            {
              label: "Read the last_review_commit fields",
              href: "/docs/referencia/meta",
            },
            { label: "Look up the commands", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
  ],
};
