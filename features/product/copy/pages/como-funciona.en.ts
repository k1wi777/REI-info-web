import { BRANCH_STATES, CYCLE_STATES } from "@/content/rei";
import { INSTALL_PATH } from "@/content/site";
import type { ProductDocument } from "@/features/product/types";

export const COMO_FUNCIONA_EN: ProductDocument = {
  id: "como-funciona",
  eyebrow: "Product · Flow",
  meta: "One Work Item · one gate · a single in_progress",
  facts: [
    { label: "Cycle", value: `${CYCLE_STATES.length} states` },
    { label: "Branches", value: String(BRANCH_STATES.length) },
    { label: "In progress", value: "One Work Item at a time" },
    { label: "Sign-off", value: "Human and explicit" },
    { label: "Record", value: "`.rei/`" },
  ],
  sections: [
    {
      id: "flujo",
      label: "Flow",
      title: "From request to close",
      weight: "lead",
      blocks: [
        {
          kind: "paragraph",
          text: "A Work Item goes through the same flow whether it is a Feature or a Task. What changes is the plan the Spec Author produces: requirements, design and tasks for a Feature; a short plan for a Task.",
        },
        { kind: "cycle" },
        {
          kind: "paragraph",
          text: "The window is an automatic simulation: when it scrolls into view it runs through the six stops and pauses at the gate to stage the sign-off. The cursor, the \"Approve\" button and the check are fake; real approval is human and is recorded from the CLI. You can pause it or step through the stops by hand: the simulation does not run commands or approve Work Items. The state table below keeps the full record.",
        },
        {
          kind: "paragraph",
          text: "The state of the work does not live in the conversation: `meta.json` records the stage of each Work Item and `current.md` reflects the active session so it can be resumed.",
        },
      ],
    },
    {
      id: "aprobacion",
      label: "Gate",
      title: "The approval gate",
      blocks: [
        {
          kind: "paragraph",
          text: "The gate is real: the Work Item stays in ready until the person reviews the plan and decides. Approval is given in the chat or the terminal, and the Leader records the step with `rei status set <id> in_progress`. The viewer does not replace it.",
        },
        {
          kind: "note",
          tone: "info",
          title: "Silence is not approval",
          text: "No Work Item moves from ready to in_progress without an explicit human decision. If the plan does not reflect what was agreed, ask for it to be changed before implementing.",
        },
      ],
    },
    {
      id: "estados",
      label: "States",
      title: "States and branches",
      blocks: [
        {
          kind: "paragraph",
          text: "The cycle has five states and two branches. blocked and changes_requested are not shortcuts: they describe work that cannot continue or a review that demands corrections.",
        },
        {
          kind: "states",
          states: [
            "pending",
            "ready",
            "in_progress",
            "review",
            "done",
            "blocked",
            "changes_requested",
          ],
        },
        {
          kind: "list",
          items: [
            "Only one Work Item can be in_progress at a time. The limit is enforced by `rei status set`, `rei check`, `rei doctor` and `rei items status`.",
            "done is terminal: you do not leave it through a standard transition.",
            "If the Reviewer rejects, the Work Item moves to changes_requested and returns to in_progress with the corrections.",
            "If the work cannot continue at any point, it moves to blocked.",
          ],
        },
      ],
    },
    {
      id: "modo-directo",
      label: "Direct mode",
      title: "Authorized direct mode",
      blocks: [
        {
          kind: "paragraph",
          text: "There is a path outside the workflow for trivial changes that are explicitly requested. It is not a Work Item type or a state: it works on the current branch and tree, and it creates no Work Item, plan, session, issue or branch.",
        },
        {
          kind: "points",
          variant: "ledger",
          points: [
            {
              title: "Eligible",
              detail:
                "Documentation, typos, formatting, comments or trivial adjustments with no change in behavior.",
            },
            {
              title: "Refusal",
              detail:
                "If it affects behavior, security, data, dependencies, public API, architecture, more than one file, or needs a specification or review, the Leader refuses and offers a Task or a Feature.",
            },
            {
              title: "Authorization",
              detail:
                "The Leader asks for explicit confirmation and states that there will be no plan, branch or record.",
            },
            {
              title: "No record",
              detail:
                "The only trace is the diff or commit and the conversation; `current.md`, `meta.json` and `history.md` are not written.",
            },
            {
              title: "Delivery",
              detail:
                "Without an explicit order there is no commit, push, PR or merge.",
            },
          ],
        },
        {
          kind: "note",
          tone: "warning",
          title: "Insisting is not authorization",
          text: "There is no override of the refusal. If the change stops being trivial at any point, work stops and a Task or a Feature is proposed.",
        },
      ],
    },
    {
      id: "relacion",
      label: "Context",
      title: "How it fits with the home page and the documentation",
      weight: "fine",
      blocks: [
        {
          kind: "paragraph",
          text: "The home page presents the product; this section explains the mechanism and the gate; the documentation teaches concrete tasks. None of the three duplicates the others.",
        },
        {
          kind: "links",
          links: [
            { label: "Install REI", href: INSTALL_PATH },
            {
              label: "Walk through the first Work Item",
              href: "/docs/empezar/primer-work-item",
            },
            { label: "Learn the roles", href: "/producto/agentes" },
            { label: "See Work Items", href: "/producto/work-items" },
            {
              label: "Command reference",
              href: "/docs/referencia/comandos",
            },
            { label: "Frequently asked questions", href: "/docs/operacion/faq" },
          ],
        },
      ],
    },
  ],
};
