import { AGENT_ROLES, WORK_ITEM_ROLES } from "@/content/rei";
import { REPOSITORY_URL } from "@/content/site";
import type { ProductDocument } from "@/features/product/types";

export const AGENTES_EN: ProductDocument = {
  id: "agentes",
  eyebrow: "Product · Roles",
  meta: "Five roles · explicit contracts",
  facts: [
    { label: "Roles", value: String(AGENT_ROLES.length) },
    { label: "In the cycle", value: String(WORK_ITEM_ROLES.length) },
    {
      label: "Outside the cycle",
      value: `${AGENT_ROLES.length - WORK_ITEM_ROLES.length} · Initializer`,
    },
    { label: "Contract", value: "`.rei/agents/`" },
    { label: "Adapters", value: "Optional" },
  ],
  sections: [
    {
      id: "roles",
      label: "Roles",
      title: "Five roles, five limits",
      weight: "lead",
      blocks: [
        {
          kind: "paragraph",
          text: "REI separates coordinating, planning, implementing, reviewing and customizing. Each role has its own contract with a responsibility, a limit and a moment of intervention; none steps into another's work.",
        },
        {
          kind: "roles",
          roles: [
            "leader",
            "spec-author",
            "implementer",
            "reviewer",
            "initializer",
          ],
        },
        {
          kind: "initializer",
          text: "The CLIs with a native adapter, OpenCode and Claude Code, recognize `/personalize` as a project command: it starts the Initializer interview, which guides the customization of the documentation. The Initializer does not implement code or approve Work Items. The capture shows Claude Code as an example, and the command runs in the agent's runtime, not on this site.",
          caption:
            "The capture shows Claude Code; native adapters expose the same command. The site only shows the evidence.",
        },
      ],
    },
    {
      id: "ciclo",
      label: "Cycle",
      title: "The four roles in the cycle",
      blocks: [
        {
          kind: "paragraph",
          text: "Leader, Spec Author, Implementer and Reviewer take the Work Item from start to finish. The Initializer stays outside the cycle: it guides the customization of the project documentation after `rei init`, when placeholders remain.",
        },
        {
          kind: "note",
          tone: "info",
          title: "One cycle, one sign-off",
          text: "Human approval remains the checkpoint between ready and in_progress. No role can skip it.",
        },
      ],
    },
    {
      id: "contratos",
      label: "Contracts",
      title: "Contracts and adapters",
      blocks: [
        {
          kind: "paragraph",
          text: "The canonical contract lives in `.rei/agents/`. If the runtime has a native adapter, `rei init opencode` or `rei init claude` generate one subagent per role from the `## Contrato` section. Cursor and Codex work through a fallback: the Leader passes only that contract, with no extra configuration.",
        },
        {
          kind: "paragraph",
          text: "Generated files carry the GENERATED marker and installation is idempotent: if they are already up to date they are not modified, and a file they did not generate is never overwritten. `rei init opencode --check` or `rei init claude --check` detect drift without writing anything.",
        },
        {
          kind: "links",
          links: [
            {
              label: "See the lifecycle of a Work Item",
              href: "/producto/work-items",
            },
            {
              label: "Command reference",
              href: "/docs/referencia/comandos",
            },
            { label: "Frequently asked questions", href: "/docs/operacion/faq" },
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
      id: "limites",
      label: "Limits",
      title: "What does not change with the runtime",
      weight: "fine",
      blocks: [
        {
          kind: "list",
          items: [
            "The contract is the source; the adapter is an optional layer.",
            "Invoking a subagent directly does not remove the workflow: the Work Item still needs a plan and approval.",
            "The Leader passes the subagent only the role contract, never the whole file.",
            "Adapter installation is idempotent and does not overwrite files that are not its own.",
          ],
        },
      ],
    },
  ],
};
