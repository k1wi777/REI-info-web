import { BRANCH_STATES, CYCLE_STATES } from "@/content/rei";
import { REPOSITORY_URL } from "@/content/site";
import type { ProductDocument } from "@/features/product/types";

/** Planning artifacts by type; the fact sheet and the comparison read from here. */
const FEATURE_PLANNING = ["requirements.md", "design.md", "tasks.md"];
const TASK_PLANNING = ["plan.md"];

export const WORK_ITEMS_EN: ProductDocument = {
  id: "work-items",
  eyebrow: "Product · Work Items",
  meta: "Feature vs Task · versioned evidence",
  facts: [
    { label: "Types", value: "Feature · Task" },
    {
      label: "Planning",
      value: `${FEATURE_PLANNING.length} documents / ${TASK_PLANNING.length} document`,
    },
    {
      label: "States",
      value: `${CYCLE_STATES.length} + ${BRANCH_STATES.length} branches`,
    },
    { label: "In progress", value: "One at a time" },
    { label: "Review", value: "By diff" },
  ],
  sections: [
    {
      id: "tipos",
      label: "Types",
      title: "Feature or Task",
      weight: "lead",
      blocks: [
        {
          kind: "paragraph",
          text: "All work starts as a Work Item with an identifier and a type. The type decides which plan is generated and whether the GitHub Issues integration opens an issue and a branch.",
        },
        {
          kind: "choices",
          choices: [
            {
              id: "feature",
              name: "Feature",
              planning: FEATURE_PLANNING,
              when: "The work needs a specification, involves several design decisions, or changes behavior or architecture.",
            },
            {
              id: "task",
              name: "Task",
              planning: TASK_PLANNING,
              when: "Documentation, contracts or a small, localized change, with no change in behavior or architecture.",
            },
          ],
        },
        {
          kind: "note",
          tone: "info",
          title: "Tie-breaker rule",
          text: "If there is any doubt about the type, choose Feature. A Task must not become a Feature in disguise.",
        },
      ],
    },
    {
      id: "ciclo",
      label: "Cycle",
      title: "Lifecycle and prior approval",
      blocks: [
        {
          kind: "paragraph",
          text: "Features and Tasks share the same states. No Work Item can be implemented without an approved plan, and none finishes without going through the Reviewer.",
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
          kind: "paragraph",
          text: "Prior approval is a checkpoint, not a formality: the person reviews requirements, design and tasks before any code is written. If the Reviewer rejects the implementation, the Work Item returns to in_progress with the requested changes.",
        },
      ],
    },
    {
      id: "evidencia",
      label: "Evidence",
      title: "Versioned evidence",
      blocks: [
        {
          kind: "paragraph",
          text: "The repository keeps the evidence of the work; the chat is not the record. Each document has an owner and a moment.",
        },
        { kind: "terminal" },
        {
          kind: "note",
          tone: "info",
          title: "Dated snapshot",
          text: "The terminal outputs were captured on 2026-10-28; the state may change. The tree shows the real path of each document and who writes it.",
        },
      ],
    },
    {
      id: "revision",
      label: "Review",
      title: "Review by diff",
      blocks: [
        {
          kind: "paragraph",
          text: "With `git`, review is limited to the actual changes of the Work Item. `base_commit` marks the start of the implementation and `last_review_commit` the point already reviewed; `rei review-diff` produces the review package. Without `git`, the flow still works in read mode.",
        },
        {
          kind: "note",
          tone: "warning",
          title: "When direct mode is refused",
          text: "If the change affects behavior, security, data, dependencies, public API, architecture, more than one file, or needs a specification or review, the Leader refuses and offers a Task or a Feature. Insisting is not authorization.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Walk through the first Work Item",
              href: "/docs/empezar/primer-work-item",
            },
            {
              label: "Command reference",
              href: "/docs/referencia/comandos",
            },
            { label: "Frequently asked questions", href: "/docs/operacion/faq" },
            {
              label: "How the flow works",
              href: "/producto/como-funciona",
            },
            { label: "Learn the roles", href: "/producto/agentes" },
            {
              label: "REI Harness repository",
              href: REPOSITORY_URL,
              external: true,
            },
          ],
        },
      ],
    },
  ],
};
