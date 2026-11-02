import type { DocCopy } from "@/features/docs/copy/types";

export const REFERENCIA_CONFIGURACION_EN: DocCopy = {
  eyebrow: "Reference · Configuration",
  meta: "checks · GitHub Issues · viewer · codes 0/1/2",
  sections: [
    {
      id: "archivo",
      title: "The file",
      blocks: [
        {
          kind: "paragraph",
          text: "`.rei/config.json` is the project configuration for the harness: it declares the quick checks that `rei check` runs, the optional GitHub Issues integration and the viewer's behavior. It lives at the root of `.rei/` and is written by `rei init`; afterwards it is edited by hand or with the commands that modify it.",
        },
        {
          kind: "code",
          language: "json",
          title: ".rei/config.json",
          code: '{\n  "checks": [\n    {\n      "id": "V1",\n      "description": "ESLint del proyecto",\n      "command": ["pnpm", "lint"]\n    },\n    {\n      "id": "V4",\n      "description": "Tests de lógica y datos",\n      "command": ["pnpm", "test"]\n    }\n  ],\n  "integrations": {\n    "github": {\n      "enabled": true,\n      "repo": "owner/name",\n      "base": "main",\n      "mergeStrategy": "squash"\n    }\n  },\n  "viewer": {\n    "autoOpenOnReady": true\n  }\n}',
        },
        {
          kind: "paragraph",
          text: "The three keys are independent: you can declare checks without GitHub Issues and configure the viewer without checks. The absence of `integrations.github` means the integration is disabled.",
        },
      ],
    },
    {
      id: "checks",
      title: "checks",
      blocks: [
        {
          kind: "paragraph",
          text: "`checks` is an array of quick checkpoints. `rei check` runs them, in addition to its own harness checks, and reflects the result in its exit code.",
        },
        {
          kind: "table",
          columns: ["Field", "Content"],
          rows: [
            ["`id`", "Stable identifier of the checkpoint, such as V1 or V4."],
            ["`description`", "What the check validates, in one sentence."],
            [
              "`command`",
              "Array of the command's arguments. It runs without an intermediate shell.",
            ],
          ],
        },
        {
          kind: "list",
          items: [
            "`command` does not interpret redirections, pipes or shell variables: each element of the array is a literal argument.",
            "Only quick checks go here. The full build, e2e or integration are documented in `.rei/docs/project/verification.md` and run when the Work Item is closed.",
            "The ids and commands must match the checkpoints declared in the project documentation.",
          ],
        },
      ],
    },
    {
      id: "github",
      title: "integrations.github",
      blocks: [
        {
          kind: "paragraph",
          text: "The GitHub Issues integration is optional and is configured under `integrations.github`. The CLI never calls GitHub: the commands only write this configuration and the agent runs the actions with `gh` and `git`.",
        },
        {
          kind: "table",
          columns: ["Field", "Value"],
          rows: [
            [
              "`enabled`",
              "true enables the integration; false disables it and keeps repo, base, mergeStrategy and the local links.",
            ],
            [
              "`repo`",
              "Target repository in owner/name format. It has no default value: without a flag or previous value it is detected from the origin remote.",
            ],
            [
              "`base`",
              "Fallback base branch. It uses main when there is no previous value or detection from origin/HEAD.",
            ],
            [
              "`mergeStrategy`",
              "PR merge strategy: squash, merge or rebase. It uses squash by default.",
            ],
          ],
        },
        {
          kind: "paragraph",
          text: "`base` is only the fallback: the effective base is decided per Work Item at the gate and lives in `links.json`, not in `.rei/config.json`. `rei github status` is offline and does not know the effective base of each Work Item.",
        },
      ],
    },
    {
      id: "visor",
      title: "viewer",
      blocks: [
        {
          kind: "paragraph",
          text: "`viewer.autoOpenOnReady` is a boolean. With true, the Leader opens the viewer with `rei view <id> --open` at the approval gate, without blocking the conversation. With false or without the key, it runs nothing and the flow is identical.",
        },
        {
          kind: "list",
          items: [
            "`rei view --enable` turns on `viewer.autoOpenOnReady` in `.rei/config.json`.",
            "`rei view --disable` turns it off.",
            "Both flags only change that key and keep the rest of the file.",
            "The viewer is read-only: it does not approve and does not modify documents, `meta.json` or the state of the Work Item.",
          ],
        },
      ],
    },
    {
      id: "precedencia",
      title: "Value precedence",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei github enable` resolves each value with the same precedence: explicit flag > previous value of `integrations.github` > detection from `git` > default value. An enable without flags does not overwrite values that are already configured.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "The explicit flag wins: `--repo owner/name`, `--base <rama>` or `--strategy squash|merge|rebase`.",
            "If it is missing, the previous value of `integrations.github` is kept.",
            "If that does not exist either, it is detected from `git`: origin for `repo` and origin/HEAD for `base`.",
            "If detection fails, `base` uses main and `mergeStrategy` uses squash; `repo` has no default and requires a resolvable origin.",
          ],
        },
        {
          kind: "paragraph",
          text: "An unknown, repeated, valueless or invalid flag is incorrect usage (code 2) and does not write the configuration. Operational failures —invalid configuration, unresolvable remote or write error— exit with 1.",
        },
      ],
    },
    {
      id: "codigos-de-salida",
      title: "Exit codes",
      blocks: [
        {
          kind: "table",
          columns: ["Code", "Meaning"],
          rows: [
            ["0", "The operation finished correctly, also when there were only warnings."],
            ["1", "A check failed or the command could not complete."],
            ["2", "Incorrect usage: unknown, repeated, valueless or invalid flag."],
          ],
        },
        {
          kind: "paragraph",
          text: "In checks, 0 means everything passed and 1 means there is at least one [FAIL] or a project check failed. rei test reports and exits 0 when no checks are configured. The exit code is the signal the workflow uses: a check is not disabled to make it pass.",
        },
        {
          kind: "note",
          tone: "info",
          title: "Warnings that do not block",
          text: "Warnings about a missing or unauthenticated `gh` do not block `rei github enable`: it exits 0. An invalid `links.json` is reported as a recoverable WARN, never as a FAIL.",
        },
        {
          kind: "links",
          links: [
            { label: "Declare checks step by step", href: "/docs/guias/checks" },
            { label: "See the meta.json fields", href: "/docs/referencia/meta" },
            {
              label: "Resolve a red check",
              href: "/docs/operacion/troubleshooting",
            },
          ],
        },
      ],
    },
  ],
};
