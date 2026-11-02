import type { FirstWorkItemCopy } from "@/features/first-work-item/copy/types";
import {
  COMMAND_CHECK,
  COMMAND_INIT,
  COMMAND_NEW,
  COMMAND_REVIEW,
  COMMAND_STATUS_IN_PROGRESS,
  COMMAND_STATUS_READY,
} from "@/features/first-work-item/data/first-work-item";

export const en: FirstWorkItemCopy = {
  eyebrow: "Get started · Tutorial",
  description:
    "Walk through the whole cycle once: initialize the harness, customize the project, plan, approve, implement and review.",
  articleMeta: "7 steps · One complete Work Item",
  sections: [
    {
      id: "init",
      title: "1. Initialize the harness",
      blocks: [
        {
          kind: "paragraph",
          text: "At the root of your project, `rei init` deploys `AGENTS.md` and the `.rei/` folder, sets up the state structure and initializes `git` if it is missing. It does not overwrite existing files.",
        },
        { kind: "code", language: "Shell", code: COMMAND_INIT },
        {
          kind: "note",
          tone: "info",
          title: "Check the status",
          text: "`rei init status` shows which documentation still needs customizing; `rei doctor` runs a read-only diagnosis.",
        },
      ],
    },
    {
      id: "personalizacion",
      title: "2. Customize the project",
      blocks: [
        {
          kind: "paragraph",
          text: "The harness needs to know your project. In OpenCode or Claude Code you can run `/personalize`; in any runtime, ask the agent «personaliza mi proyecto» (Spanish for \"customize my project\") and the Initializer role will lead the interview.",
        },
        {
          kind: "list",
          items: [
            "Product purpose, users and principles.",
            "Technical stack and project commands.",
            "Architecture decisions and conventions.",
            "Verification checkpoints and quick checks.",
          ],
        },
        {
          kind: "note",
          tone: "info",
          title: "The Initializer does not implement",
          text: "Its job is to complete the project documentation, not to write code.",
        },
      ],
    },
    {
      id: "crear-work-item",
      title: "3. Create the Work Item",
      blocks: [
        {
          kind: "paragraph",
          text: "Describe what you need to the agent. Once the scope is agreed, the Leader creates the Work Item in pending state with an identifier and a type.",
        },
        {
          kind: "code",
          language: "Shell",
          title: "Example",
          code: COMMAND_NEW,
        },
        {
          kind: "paragraph",
          text: "A Feature requires `requirements.md`, `design.md` and `tasks.md`; a Task is planned with a single `plan.md` for small, localized changes.",
        },
      ],
    },
    {
      id: "planificacion",
      title: "4. Plan",
      blocks: [
        {
          kind: "paragraph",
          text: "The Spec Author turns the Work Item into a technical plan you can review. It does not implement: its deliverable is the decision documents.",
        },
        {
          kind: "list",
          items: [
            "Observable, verifiable requirements.",
            "Design decisions and discarded alternatives.",
            "Ordered tasks with their verification.",
          ],
        },
        { kind: "code", language: "Shell", code: COMMAND_STATUS_READY },
      ],
    },
    {
      id: "aprobacion",
      title: "5. Approve the plan",
      blocks: [
        {
          kind: "paragraph",
          text: "Review the plan before any code is written. If you agree, the approval is recorded from the CLI; if something does not reflect what was agreed, ask the Spec Author to update it.",
        },
        { kind: "code", language: "Shell", code: COMMAND_STATUS_IN_PROGRESS },
        {
          kind: "note",
          tone: "warning",
          title: "Silence is not approval",
          text: "No Work Item moves to implementation without explicit approval. The `rei view` viewer is read-only and has no approval button.",
        },
      ],
    },
    {
      id: "implementacion",
      title: "6. Implement",
      blocks: [
        {
          kind: "paragraph",
          text: "The Implementer carries out only the approved plan, marks each task as it completes it and leaves verification evidence in `.rei/progress/work-items/`.",
        },
        { kind: "code", language: "Shell", code: COMMAND_CHECK },
        {
          kind: "paragraph",
          text: "`rei check` verifies the harness and runs the checks declared in `.rei/config.json`. Slow checkpoints, such as the production build, run when the Work Item is closed.",
        },
      ],
    },
    {
      id: "revision",
      title: "7. Review and close",
      blocks: [
        {
          kind: "paragraph",
          text: "The Reviewer compares the work with the plan and the checkpoints. If something is missing, the Work Item moves to changes_requested and the Implementer fixes it; if everything passes, it becomes done.",
        },
        { kind: "code", language: "Shell", code: COMMAND_REVIEW },
        {
          kind: "note",
          tone: "info",
          title: "One active Work Item",
          text: "Only one Work Item can be in in_progress at a time. The others wait in pending or ready.",
        },
      ],
    },
  ],
};
