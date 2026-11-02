import type { DocCopy } from "@/features/docs/copy/types";

export const CONCEPTOS_SDD_EN: DocCopy = {
  eyebrow: "Concepts · SDD",
  meta: "Specification first · reviewable planning",
  sections: [
    {
      id: "especificacion-antes-que-codigo",
      title: "Specification before code",
      blocks: [
        {
          kind: "paragraph",
          text: "Spec Driven Development reverses the usual order: first you agree on what to build and how, and only then do you write code. The goal is not to pile up documentation but to give the Implementer the context it needs to make the change with as little ambiguity as possible.",
        },
        {
          kind: "paragraph",
          text: "The harness separates three things that blur together in a conversation: deciding what to build, planning how, and carrying out the change. When all three live in the same chat, nothing is recorded and review depends on memory. With SDD, the planning exists before the first line of code and can be reviewed on its own.",
        },
        {
          kind: "note",
          tone: "info",
          title: "Concise, not lengthy",
          text: "Planning must be complete but brief: what is needed to execute, with no filler or repetition of the request. If a document grows beyond its budget, the Work Item is split or the length is justified.",
        },
      ],
    },
    {
      id: "que-produce",
      title: "Which artifacts it produces",
      blocks: [
        {
          kind: "paragraph",
          text: "The Work Item type decides the planning. A Feature needs requirements, design and tasks; a Task is resolved with a short plan. In both cases the planning lives in `.rei/specs/<work-item-id>/` and is approved before it is implemented.",
        },
        {
          kind: "table",
          columns: ["Type", "Planning", "What it covers"],
          rows: [
            [
              "Feature",
              "`requirements.md`, `design.md` and `tasks.md`",
              "Work that needs a specification, several design decisions, or a change in behavior or architecture.",
            ],
            [
              "Task",
              "`plan.md`",
              "Documentation, contracts, or a small, localized change with no change in behavior or architecture.",
            ],
          ],
        },
        {
          kind: "list",
          items: [
            "`meta.json` stores the type, the state and the reference commits of the Work Item.",
            "`current.md` reflects the live session so it can be resumed if interrupted.",
            "`impl.md` and `review.md` keep the evidence of the implementation and of the verdict.",
            "`history.md` archives the summary of closed Work Items and is never overwritten.",
          ],
        },
      ],
    },
    {
      id: "el-arnes",
      title: "How it relates to the harness",
      blocks: [
        {
          kind: "paragraph",
          text: "REI Harness turns SDD into a workflow with separate roles, states and a human approval gate. Each role has its own contract and an explicit limit: none of them can plan, implement and approve its own work at the same time.",
        },
        {
          kind: "paragraph",
          text: "The planning is left in ready when the Spec Author finishes. It is not implemented automatically: the person reviews the decisions and, only if they agree, the Work Item moves to in_progress. The Implementer executes exactly what was approved and the Reviewer compares the result with that planning.",
        },
        {
          kind: "note",
          tone: "warning",
          title: "The gate is not skipped",
          text: "No Work Item can be implemented without approved planning or finish without going through the Reviewer. The documentation is the record of the agreement, not a later formality.",
        },
      ],
    },
    {
      id: "lo-que-no-es",
      title: "What SDD is not",
      blocks: [
        {
          kind: "list",
          items: [
            "It is not writing documents for their own sake: planning is measured by what it lets you decide and verify.",
            "It does not replace human judgment: responsibility for what gets built stays with the person.",
            "It does not make the agent autonomous: the agent proposes and executes within a contract, and does not decide the scope alone.",
            "It does not guarantee there will be no errors: it makes decisions visible and leaves evidence to review them.",
            "It does not remove review: it changes it from improvised code to a diff that can be checked against a plan.",
          ],
        },
      ],
    },
    {
      id: "siguiente",
      title: "Next step",
      blocks: [
        {
          kind: "paragraph",
          text: "To see the process in action, walk through a complete Work Item. To understand the gate that makes it different, continue with human approval.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Walk through the first Work Item",
              href: "/docs/empezar/primer-work-item",
            },
            {
              label: "See the full flow",
              href: "/producto/como-funciona",
            },
            {
              label: "Understand human approval",
              href: "/docs/conceptos/aprobacion-humana",
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
