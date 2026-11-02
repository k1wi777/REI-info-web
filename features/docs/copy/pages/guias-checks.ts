import type { DocCopy } from "@/features/docs/copy/types";

export const GUIAS_CHECKS_EN: DocCopy = {
  eyebrow: "Guides · Checks",
  meta: "Quick checks · exit code 0/1",
  sections: [
    {
      id: "cuando-usarla",
      title: "When to use it",
      blocks: [
        {
          kind: "paragraph",
          text: "Use this guide when you want `rei check` to run your project's quick verifications —lint, logic tests, type-check— and give you a single result before implementing or requesting a review.",
        },
      ],
    },
    {
      id: "requisitos",
      title: "Requirements",
      blocks: [
        {
          kind: "list",
          items: [
            "A project initialized with `.rei/config.json`.",
            "The quick checkpoints defined in `.rei/docs/project/verification.md`.",
            "The commands available on the project's PATH.",
            "No slow checks: the full build, e2e or integration do not go in the configuration.",
          ],
        },
      ],
    },
    {
      id: "pasos",
      title: "Steps",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Identify the quick checkpoints in `verification.md` and their stable identifier, for example V1 or V4.",
            "Declare each one in `checks` inside `.rei/config.json` with `id`, `description` and `command`. The command is an array of arguments and runs without an intermediate shell.",
            "Run `rei check` to verify the harness and run the declared checks. Add `--quiet` if you want to omit the [OK] lines and the summary.",
            "Run `rei test` when you only want the checks from `.rei/config.json`, without the rest of the harness checks.",
            "If a check fails, fix the cause and run it again before requesting a review.",
          ],
        },
        {
          kind: "code",
          language: "json",
          title: ".rei/config.json",
          code: '{\n  "checks": [\n    {\n      "id": "V1",\n      "description": "ESLint del proyecto",\n      "command": ["pnpm", "lint"]\n    },\n    {\n      "id": "V4",\n      "description": "Tests de lógica y datos",\n      "command": ["pnpm", "test"]\n    }\n  ]\n}',
        },
        {
          kind: "code",
          language: "Shell",
          title: "Running",
          code: "rei check\nrei check --quiet\nrei test",
        },
      ],
    },
    {
      id: "verificacion",
      title: "Verification",
      blocks: [
        {
          kind: "table",
          columns: ["Result", "Code", "What it means"],
          rows: [
            ["Everything passes", "0", "The declared checks finished with no failures."],
            ["Some failure", "1", "There is at least one [FAIL] or a project check failed."],
            ["No checks", "0", "rei test reports that no checks are configured."],
          ],
        },
        {
          kind: "paragraph",
          text: "Fix the failure and repeat the command. Do not request a review with a red check, and do not disable it to make it pass: the exit code is the signal the workflow uses.",
        },
        {
          kind: "note",
          tone: "info",
          title: "Two different suites",
          text: "`rei test` runs only the checks from `.rei/config.json`; it is not REI's own test suite. If the V4 check invokes `pnpm test`, that command does run the project's suite.",
        },
      ],
    },
    {
      id: "limites",
      title: "Limits",
      blocks: [
        {
          kind: "list",
          items: [
            "Slow checkpoints, such as the production build, are documented in `verification.md` and run when the Work Item is closed.",
            "`rei check` runs commands without an intermediate shell: it does not interpret redirections, pipes or shell variables.",
            "The configuration does not replace `verification.md` and does not justify checks that prove nothing.",
            "A check that takes too long is not added to the configuration: it turns daily verification into waiting.",
          ],
        },
      ],
    },
    {
      id: "siguiente-paso",
      title: "Next step",
      blocks: [
        {
          kind: "paragraph",
          text: "With the checks green, the Work Item can go to review. If you want to update the harness or the binary, the update guide explains the order.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Update the harness and the binary",
              href: "/docs/guias/actualizar",
            },
            {
              label: "Look up the commands",
              href: "/docs/referencia/comandos",
            },
            {
              label: "Understand the Work Item states",
              href: "/docs/conceptos/work-items-y-estados",
            },
            {
              label: "Get answers about checks",
              href: "/docs/operacion/faq",
            },
          ],
        },
      ],
    },
  ],
};
