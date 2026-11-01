import { INSTALL_PATH, REPOSITORY_URL } from "@/content/site";
import type { ProductDocument } from "@/features/product/types";

export const PRODUCTO_EN: ProductDocument = {
  id: "producto",
  eyebrow: "Product · Spec Driven Development",
  meta: "Source: README.md, docs/product-strategy.md and .rei/docs/",
  facts: [
    { label: "Model", value: "Spec Driven Development" },
    { label: "Install", value: "Single binary" },
    { label: "Gate", value: "Human approval" },
    { label: "Record", value: "`.rei/` in your repository" },
    { label: "Scope", value: "Runtime-agnostic · local-first" },
  ],
  actions: [
    { label: "Install REI", href: INSTALL_PATH },
    { label: "See how it works", href: "/producto/como-funciona" },
  ],
  sections: [
    {
      id: "problema",
      label: "Problem",
      title: "The problem: deciding, planning and executing in the same conversation",
      blocks: [
        {
          kind: "paragraph",
          text: "When deciding what to build, planning how and making the change all happen in the same conversation, nothing is recorded and nobody can review the decision. AI speeds up writing, but it does not guarantee that the right thing is being built.",
        },
        {
          kind: "points",
          variant: "ledger",
          points: [
            {
              title: "Building blind",
              detail: "Code is written before the scope is clear.",
            },
            {
              title: "Hallucinations",
              detail: "Invented APIs or data presented as fact.",
            },
            {
              title: "Unauthorized decisions",
              detail: "Architecture or scope changed without approval.",
            },
            {
              title: "Out-of-bounds actions",
              detail: "Environments and data that should not be touched.",
            },
            {
              title: "Rework",
              detail: "Code that is fast to write and expensive to fix.",
            },
          ],
        },
      ],
    },
    {
      id: "propuesta",
      label: "Mechanism",
      title: "The proposal: specification, human approval and evidence",
      weight: "lead",
      blocks: [
        {
          kind: "paragraph",
          text: "REI Harness is a Spec Driven Development harness that installs in any repository and coordinates AI agents behind a mandatory human approval gate. It separates deciding, planning and executing, and leaves the trail in the repository itself.",
        },
        {
          kind: "points",
          variant: "ledger",
          points: [
            {
              title: "Specification first",
              detail: "The plan exists before the first line of code.",
            },
            {
              title: "Human approval",
              detail:
                "No Work Item moves to implementation without an explicit sign-off; silence is not approval.",
              gate: true,
            },
            {
              title: "Separate roles",
              detail:
                "Leader, Spec Author, Implementer and Reviewer each have their own contract; the Initializer customizes the project documentation.",
            },
            {
              title: "Guardrails",
              detail: "Defined scope, mandatory verification and hard rules.",
            },
            {
              title: "Traceability",
              detail:
                "Planning, progress, decisions and history live in `.rei/`.",
            },
            {
              title: "Living documentation",
              detail:
                "What the site states can be traced to the repository or to a cited source.",
            },
            {
              title: "Runtime-agnostic and local-first",
              detail:
                "The role contract and the CLI are the value; the adapter is optional.",
            },
          ],
        },
        {
          kind: "note",
          tone: "info",
          title: "The value is not the agent",
          text: "REI is not a smarter agent or a code generator: it is the process around the agent and the evidence it leaves.",
        },
        {
          kind: "links",
          links: [
            {
              label: "How the full cycle works",
              href: "/producto/como-funciona",
            },
            { label: "Install REI", href: INSTALL_PATH },
            {
              label: "REI Harness repository",
              href: REPOSITORY_URL,
              external: true,
            },
          ],
        },
      ],
    },
    {
      id: "evidencia",
      label: "Evidence",
      title: "External evidence",
      blocks: [
        {
          kind: "paragraph",
          text: "Most developers use AI, and many distrust how accurate it is. This site does not make up its own figures: each case links to its source and sticks to what the study shows.",
        },
        {
          kind: "evidence",
          ids: [
            "replit",
            "metr",
            "gitclear",
            "veracode",
            "dora-2025",
            "stack-overflow-2025",
            "github-copilot-2023",
          ],
        },
      ],
    },
    {
      id: "principios",
      label: "Principles",
      title: "Product principles",
      blocks: [
        {
          kind: "points",
          variant: "manifesto",
          points: [
            {
              title: "The why before the what",
              detail: "The process and the problem justify the commands.",
            },
            {
              title: "Human approval is the product",
              detail: "The flow makes the gate visible; it does not hide it.",
            },
            {
              title: "Documentation is the source of truth",
              detail: "Every claim can be traced.",
            },
            {
              title: "Showing limits builds trust",
              detail:
                "The viewer is read-only, GitHub Issues is optional and direct mode has restrictions.",
            },
            {
              title: "One source per fact and minimal dependencies",
              detail: "Commands, states and roles are defined once.",
            },
          ],
        },
      ],
    },
    {
      id: "no-es",
      label: "Limits",
      title: "What REI is not",
      blocks: [
        {
          kind: "points",
          variant: "limits",
          points: [
            {
              title: "Not a code generator",
              detail: "Nor an autonomous agent that works on its own.",
            },
            {
              title: "Not the CLI repository",
              detail:
                "The code lives in its own repository and this site documents it.",
            },
            {
              title: "Not the spec viewer",
              detail: "`rei view` is local and read-only.",
            },
            {
              title: "Not a control panel",
              detail: "The site does not run commands or modify Work Items.",
            },
            {
              title: "Not a metrics showcase",
              detail: "No customers, testimonials or figures that cannot be shown.",
            },
          ],
        },
        {
          kind: "note",
          tone: "warning",
          title: "What the site does not claim",
          text: "That REI completely eliminates hallucinations, that AI becomes autonomous, that it replaces the CLI or the viewer, or that human approval can be skipped. The site documents the harness; it does not replace it.",
        },
      ],
    },
    {
      id: "audiencias",
      label: "Audiences",
      title: "Who it is for",
      weight: "fine",
      blocks: [
        {
          kind: "audiences",
          items: [
            {
              id: "desarrollador",
              who: "Individual developer",
              seeks:
                "To stop improvising with the agent without setting up a heavy process.",
              next: [
                { label: "Installation", href: INSTALL_PATH },
                {
                  label: "First Work Item",
                  href: "/docs/empezar/primer-work-item",
                },
              ],
            },
            {
              id: "revisor",
              who: "Reviewer or approver",
              seeks:
                "To see what will be done before it is written, and to be able to reject it.",
              next: [
                { label: "How it works", href: "/producto/como-funciona" },
                { label: "Work Items", href: "/producto/work-items" },
              ],
            },
            {
              id: "equipo",
              who: "Team with several runtimes",
              seeks:
                "A shared role contract for OpenCode, Claude Code, Cursor and Codex.",
              next: [
                { label: "Agents", href: "/producto/agentes" },
                { label: "Installation", href: INSTALL_PATH },
              ],
            },
            {
              id: "mantenedor",
              who: "Maintainer",
              seeks: "A public reference for commands, states and contracts.",
              next: [
                {
                  label: "Commands",
                  href: "/docs/referencia/comandos",
                },
                { label: "Work Items", href: "/producto/work-items" },
              ],
            },
            {
              id: "esceptico",
              who: "Skeptic",
              seeks: "Limits and evidence: what it does and what it does not.",
              next: [
                {
                  label: "Frequently asked questions",
                  href: "/docs/operacion/faq",
                },
                { label: "Viewer", href: "/producto/visor" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "fortalezas",
      label: "Strengths",
      title: "Distinguishing strengths",
      blocks: [
        {
          kind: "points",
          variant: "columns",
          points: [
            {
              title: "SDD from minute zero",
              detail: "Code does not start until an approved plan exists.",
            },
            {
              title: "Mandatory human approval",
              detail:
                "No Work Item moves to implementation without an explicit decision; silence is not approval.",
            },
            {
              title: "Explicit, separate roles",
              detail: "Each role has a contract and does not step into another's work.",
            },
            {
              title: "Guardrails",
              detail:
                "Defined scope, mandatory verification, diff-based review and hard rules.",
            },
            {
              title: "Traceability",
              detail:
                "Planning, progress and decisions stay in the repository, not in the chat.",
            },
            {
              title: "Living documentation",
              detail:
                "The source of truth is the repository and it is updated with the work.",
            },
            {
              title: "Runtime-agnostic",
              detail:
                "The value is in the role contract and the CLI; the adapter is optional.",
            },
            {
              title: "Optional GitHub Issues",
              detail:
                "Issues, branches and PRs are a projection of the work, not the source of truth.",
            },
            {
              title: "Single binary",
              detail: "One executable with no runtime dependencies.",
            },
            {
              title: "Local-first",
              detail:
                "Everything happens on the user's machine and repository; the CLI does not call external services.",
            },
            {
              title: "Minimal dependencies",
              detail: "The platform and own code before third-party libraries.",
            },
          ],
        },
        {
          kind: "links",
          links: [
            { label: "See the five roles", href: "/producto/agentes" },
            { label: "Understand Work Items", href: "/producto/work-items" },
            { label: "What the viewer does", href: "/producto/visor" },
            {
              label: "How GitHub Issues fits in",
              href: "/producto/github-issues",
            },
            {
              label: "Command reference",
              href: "/docs/referencia/comandos",
            },
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
