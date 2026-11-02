import type { DocCopy } from "@/features/docs/copy/types";

export const GUIAS_GITHUB_ISSUES_EN: DocCopy = {
  eyebrow: "Guides · GitHub Issues",
  meta: "Optional GitHub Issues integration · the CLI never calls GitHub",
  sections: [
    {
      id: "cuando-usarla",
      title: "When to use it",
      blocks: [
        {
          kind: "paragraph",
          text: "Use this guide when you want to project REI work onto GitHub Issues: link a Feature to an issue and a branch, publish implementation and review comments, open a PR, or plan a module with epics and a backlog.",
        },
        {
          kind: "paragraph",
          text: "The integration is optional. If `integrations.github` does not exist or `enabled` is false, the flow is identical and the Leader does not mention GitHub Issues. The CLI never creates, reads or modifies issues, labels, comments, PRs or epics: the real actions are run by the Leader with `gh` and `git` under your orders.",
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
            "A project already initialized with `rei init` and its `.rei/config.json`.",
            "GitHub CLI installed and authenticated; git with a resolvable remote.",
            "A target repository in owner/name format and a base branch.",
            "Explicit orders for commit, push, PR or merge: none of that happens automatically.",
            "For the issue + branch gate, a Work Item of type Feature. Tasks do not generate an issue or a branch.",
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
            "Enable the integration with `rei github enable`. Without flags it detects the repository from origin and the base from origin/HEAD; if the base cannot be resolved, it uses main and says so.",
            "Adjust `repo`, `base` and strategy. Each value is resolved with the precedence explicit flag, previous value, detection from `git` and default value; `repo` has no default value.",
            "Check the status with `rei github status`. It is offline and read-only: it does not call `gh` or the API. Disable with `rei github disable`, which keeps `repo`, `base`, `mergeStrategy` and `links.json`.",
            "At the gate of a Feature, confirm the base before moving the Work Item. First the branch and the sha are captured; then the issue and the `feat/<n>-<slug>` branch are created. This gate is not asked for a Task.",
            "Let the Leader publish the automatic implementation and review comments. They are updated in place by their marker, never duplicated, and are not published on state changes.",
            "Open the PR and merge only on an explicit order. The PR base is the Work Item's recorded base; before that, it is verified that it is published on origin. There is never `--admin` or auto-merge.",
            "Manage epics, the backlog of child issues, adoption and labels as a projection of the work. The identity of an issue is its marker, not the label or the title.",
          ],
        },
        {
          kind: "code",
          language: "Shell",
          title: "Configuration",
          code: "rei github enable --repo owner/name --base main --strategy squash\nrei github status\nrei github disable",
        },
        {
          kind: "note",
          tone: "info",
          title: "Precedence and errors",
          text: "An unknown, repeated, valueless or invalid flag is incorrect usage and does not write the configuration. Operational failures, such as an invalid config or an unresolvable remote, exit with code 1. Warnings about a missing or unauthenticated `gh` do not block.",
        },
        {
          kind: "table",
          columns: ["Label", "Color", "Use"],
          rows: [
            ["rei", "1D76DB", "Managed by REI."],
            ["rei:epic", "6F42C1", "Epic: module planning, not a Work Item."],
            ["rei:backlog", "FBCA04", "Backlog child issue pending adoption."],
            ["rei:feature", "0E8A16", "Work Item of type feature."],
            ["rei:blocked", "B60205", "Blocked Work Item."],
          ],
        },
        {
          kind: "paragraph",
          text: "`links.json` is a recoverable local index, never the source of truth. If it is missing or corrupt it does not block the Work Item: the issue is recovered by its marker and the file is rewritten. It stores the link to the issue, its URL, the base and the epic when there is one.",
        },
        {
          kind: "code",
          language: "json",
          title: ".rei/specs/<id>/links.json",
          code: '{ "provider": "github", "repo": "owner/name", "issue": 123, "url": "https://github.com/owner/name/issues/123", "base": { "branch": "main", "sha": "0a1b2c3d4e5f" }, "epic": null }',
        },
      ],
    },
    {
      id: "verificacion",
      title: "Verification",
      blocks: [
        {
          kind: "code",
          language: "Shell",
          code: "rei github status\nrei item show 2026-10-27_01-54__mi-feature\nrei items status",
        },
        {
          kind: "paragraph",
          text: "`status` confirms state, values, remote and `gh` availability, without claiming anything about issues or PRs. `item show` adds the Links section with issue, URL, base and epic when `links.json` exists. `items status` lists the type, state and issue of each Work Item and marks the active one.",
        },
        {
          kind: "paragraph",
          text: "An invalid `links.json` is reported as a recoverable WARN in `rei validate` and as a note on the card; it never changes the state of the Work Item. Always verify the number, URL, state, labels or marker before treating an action as completed.",
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
            "No Projects, milestones or native sub-issues.",
            "No PRs from a fork to upstream: it works on a single canonical repository.",
            "No two-way sync, and no local pending Work Items as a substitute for the backlog.",
            "No load-based auto-assignment, time tracking or providers other than GitHub.",
            "No automatic commits, push or merge; no --admin, auto-merge or GitHub action flags in rei either.",
            "If the remote does not match the configured `repo`, `status` warns about it and does not conclude that the configuration is complete.",
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
          text: "If the integration is already active, the natural next recipe is to review the Work Item in the viewer. For the detail of each flag, see the command reference.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Open the viewer for a Work Item",
              href: "/docs/guias/visor",
            },
            {
              label: "Look up the commands",
              href: "/docs/referencia/comandos",
            },
            {
              label: "Understand the GitHub Issues integration",
              href: "/producto/github-issues",
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
