import type { DocCopy } from "@/features/docs/copy/types";

export const REFERENCIA_ADAPTADORES_EN: DocCopy = {
  eyebrow: "Reference · Adapters",
  meta: "canonical contract · OpenCode · Claude Code · fallback",
  sections: [
    {
      id: "contrato-canonico",
      title: "The canonical role contract",
      blocks: [
        {
          kind: "paragraph",
          text: "Each role lives in `.rei/agents/<rol>.md`. The file has three parts in this order: YAML frontmatter, a `## Contrato` section and a `## Referencia` section. There must be no normative content outside those two sections.",
        },
        {
          kind: "table",
          columns: ["Key", "Required", "Value"],
          rows: [
            ["name", "Yes", "Identifier of the role; it matches the file name."],
            ["description", "Yes", "One sentence; it is the text the runtime shows when choosing an agent."],
            ["mode", "Yes", "primary for the Leader; subagent for the rest."],
            [
              "tools",
              "Yes",
              "Inline list of generic tools: read, write, edit, search, shell, subagent.",
            ],
            ["model", "No", "Runtime model, for example provider/model."],
          ],
        },
        {
          kind: "code",
          language: "markdown",
          title: "Frontmatter",
          code: "---\nname: implementer\ndescription: Implementa un único Work Item siguiendo la planificación aprobada.\nmode: subagent\ntools: [read, write, edit, search, shell]\n---",
        },
        {
          kind: "paragraph",
          text: "tools uses generic names: the canonical format never mentions the tools of a specific runtime. The translation is done by the adapter.",
        },
      ],
    },
    {
      id: "contrato-y-referencia",
      title: "Contract versus Reference",
      blocks: [
        {
          kind: "paragraph",
          text: "`## Contrato` is self-sufficient: it contains identity, objective, preconditions, protocol, hard rules, output format and allowed tools. `## Referencia` contains only optional detail —rationale, examples, edge cases— and omitting it does not prevent the role from running.",
        },
        {
          kind: "list",
          items: [
            "If a rule or a step is needed to run the role, it lives in `## Contrato`.",
            "If it is justification or an example, it lives in `## Referencia`.",
            "Only `## Contrato` is passed to the subagent, never the full file.",
          ],
        },
      ],
    },
    {
      id: "generacion",
      title: "Generating native subagents",
      blocks: [
        {
          kind: "paragraph",
          text: "With a native adapter, the CLI extracts the frontmatter and the `## Contrato` of each role and translates them to the runtime's format. Both commands install the skeleton if it is missing.",
        },
        {
          kind: "code",
          language: "Shell",
          title: "OpenCode and Claude Code",
          code: "rei init opencode\nrei init claude",
        },
        {
          kind: "table",
          columns: ["Runtime", "Generated files"],
          rows: [
            [
              "OpenCode",
              "`.opencode/agents/<rol>.md` and the `/personalize` command in `.opencode/commands/personalize.md`, with `agent: initializer` and `subtask: true`.",
            ],
            [
              "Claude Code",
              "`.claude/agents/<rol>.md` with native frontmatter, the `/personalize` command in `.claude/commands/personalize.md` and `CLAUDE.md`, which imports `AGENTS.md` with `@AGENTS.md`.",
            ],
          ],
        },
        {
          kind: "list",
          items: [
            "The generated files carry the GENERATED mark.",
            "No command overwrites a file it did not generate: if it finds one, it warns and keeps it.",
            "The installation is idempotent: running it again over generated files leaves them identical.",
            "`/personalize` launches the initializer role's interview to customize the project documentation.",
          ],
        },
      ],
    },
    {
      id: "deriva",
      title: "Checking for drift",
      blocks: [
        {
          kind: "paragraph",
          text: "If you edit the `## Contrato` of a role in `.rei/agents/`, the generated files become outdated. `--check` compares the canonical generation with what is installed without writing anything.",
        },
        {
          kind: "code",
          language: "Shell",
          title: "Verification",
          code: "rei init opencode --check\nrei init claude --check",
        },
        {
          kind: "table",
          columns: ["Code", "Meaning"],
          rows: [
            ["0", "All files exist, carry the mark and match the canonical generation."],
            ["1", "A file is missing, lacks the mark or differs."],
          ],
        },
      ],
    },
    {
      id: "fallback",
      title: "Fallback without an adapter",
      blocks: [
        {
          kind: "paragraph",
          text: "Cursor and Codex do not expose native subagents configurable per role, so they have no adapter. They work through the fallback, with no configuration: no `.cursor/` or `.codex/` file is created.",
        },
        {
          kind: "paragraph",
          text: "In that case, the Leader passes each subagent only the `## Contrato` section of the role —the same one that feeds the native adapters—, so the operational contract is identical.",
        },
      ],
    },
    {
      id: "roles",
      title: "The roles",
      blocks: [
        {
          kind: "paragraph",
          text: "The harness defines five roles. The Leader coordinates; the Spec Author plans; the Implementer executes the approved planning; the Reviewer validates; the Initializer drives the customization. The responsibility, the moment and the limit of each one are documented once, on the product's agents page.",
        },
        {
          kind: "links",
          links: [
            { label: "See the five roles", href: "/producto/agentes" },
            { label: "Look up rei init", href: "/docs/referencia/comandos" },
            {
              label: "Resolve a generation problem",
              href: "/docs/operacion/troubleshooting",
            },
          ],
        },
      ],
    },
  ],
};
