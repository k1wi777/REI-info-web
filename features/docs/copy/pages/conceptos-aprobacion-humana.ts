import type { DocCopy } from "@/features/docs/copy/types";

export const CONCEPTOS_APROBACION_HUMANA_EN: DocCopy = {
  eyebrow: "Concepts · Approval",
  meta: "A real gate · ready → in_progress",
  sections: [
    {
      id: "la-puerta",
      title: "The approval gate",
      blocks: [
        {
          kind: "paragraph",
          text: "When the Spec Author finishes, the Work Item is left in ready. That state is not a technical waiting room: it is the point where the person reviews the planning and decides whether it is implemented or not. No Work Item moves from ready to in_progress without an explicit human decision.",
        },
        {
          kind: "paragraph",
          text: "The gate exists because responsibility for what gets built does not belong to the agent. The Leader coordinates and the Spec Author proposes, but agreement on scope, design decisions and requirements belongs to whoever commissions the work.",
        },
      ],
    },
    {
      id: "que-significa-aprobar",
      title: "What approving means",
      blocks: [
        {
          kind: "paragraph",
          text: "Approving is not reviewing code: there is none yet. It means confirming that the planning reflects the agreement reached and that the decisions that determine the result are correct.",
        },
        {
          kind: "list",
          items: [
            "That the requirements describe the behavior you expect.",
            "That the design decisions and the discarded alternatives make sense.",
            "That the tasks cover the scope and make clear how it will be verified.",
            "That what is left out of scope is also what was agreed.",
          ],
        },
        {
          kind: "paragraph",
          text: "Approving is an act of responsibility, not an automatic green light. If the planning does not reflect what was discussed, the right step is to ask for changes, not to approve and fix it later.",
        },
      ],
    },
    {
      id: "lo-que-no-significa",
      title: "What approving does not mean",
      blocks: [
        {
          kind: "list",
          items: [
            "Silence does not approve, and neither does an ambiguous answer. Without an unambiguous confirmation, the Work Item stays in ready.",
            "Opening the viewer does not approve: `rei view` is read-only and has no approval button or route.",
            "Reading the planning does not approve: the decision is communicated and recorded, not inferred.",
            "Approving does not block future changes: if the implementation drifts, the Reviewer can reject it.",
          ],
        },
        {
          kind: "note",
          tone: "warning",
          title: "The default is not to advance",
          text: "When in doubt, the Leader waits. Approval is never assumed because the planning was shown or because time has passed.",
        },
      ],
    },
    {
      id: "como-se-registra",
      title: "How it is recorded from the CLI",
      blocks: [
        {
          kind: "paragraph",
          text: "Approval is given in the chat or in the terminal. The Leader records the state change; the person does not need to run anything, although they can if they work directly with the CLI.",
        },
        {
          kind: "code",
          language: "Shell",
          code: "rei status set 2026-10-27_01-54__mi-feature in_progress",
        },
        {
          kind: "paragraph",
          text: "On approval, the Leader also records the commit at which implementation starts in `base_commit`. If the GitHub Issues integration is active and the Work Item is a Feature, the issue + branch gate is resolved at this same moment, before the state is moved.",
        },
        {
          kind: "note",
          tone: "info",
          title: "One active session",
          text: "The move to in_progress can be rejected if another Work Item is already active. The limit is hard and also applies with `--force`.",
        },
      ],
    },
    {
      id: "si-no-apruebas",
      title: "If you do not approve",
      blocks: [
        {
          kind: "paragraph",
          text: "If something does not reflect what was agreed, or a design decision does not convince you, say so in natural language. The Leader relaunches the Spec Author, the planning is updated and presented again. The Work Item does not move to implementation in the meantime.",
        },
        {
          kind: "paragraph",
          text: "Rejection in review is a different moment: if the Reviewer finds that the implementation does not meet the planning, the Work Item moves to changes_requested and returns to in_progress with the corrections. You do not have to manage that loop: the Leader coordinates it.",
        },
      ],
    },
    {
      id: "siguiente",
      title: "Next step",
      blocks: [
        {
          kind: "paragraph",
          text: "If you want to see the gate in a real cycle, start with the tutorial. If you already work with Work Items, the GitHub Issues guide explains how the gate coexists with the issue and the branch.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Walk through the first Work Item",
              href: "/docs/empezar/primer-work-item",
            },
            {
              label: "Review Spec Driven Development",
              href: "/docs/conceptos/sdd",
            },
            {
              label: "Enable the GitHub Issues integration",
              href: "/docs/guias/github-issues",
            },
            {
              label: "Find answers to common questions",
              href: "/docs/operacion/faq",
            },
          ],
        },
      ],
    },
  ],
};
