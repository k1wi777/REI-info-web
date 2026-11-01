import { REPOSITORY_URL } from "@/content/site";
import type { ProductDocument } from "@/features/product/types";

export const GITHUB_ISSUES_EN: ProductDocument = {
  id: "github-issues",
  eyebrow: "Product · GitHub Issues",
  meta: "Optional GitHub Issues integration · projection of the work",
  facts: [
    { label: "Integration", value: "Optional" },
    { label: "Source of truth", value: "`.rei`" },
    { label: "Runs", value: "`gh` and `git`" },
    { label: "Issue and branch", value: "Features only" },
    { label: "Merge", value: "On order" },
  ],
  sections: [
    {
      id: "opcional",
      label: "Projection",
      title: "An optional integration",
      weight: "lead",
      blocks: [
        {
          kind: "paragraph",
          text: "GitHub Issues is a projection of the work, not its source of truth. The integration is optional: if the `integrations.github` key does not exist or `enabled` is false, the flow is identical and the Leader does not mention GitHub Issues.",
        },
        { kind: "projection" },
        {
          kind: "list",
          items: [
            "The CLI never calls GitHub: the real actions are run by `gh` and `git` under the Leader's explicit order.",
            "`.rei` rules the execution of the Work Item; the issue rules the problem, the scope and the discussion.",
            "The configuration lives in `.rei/config.json`, under `integrations.github`.",
          ],
        },
      ],
    },
    {
      id: "comandos",
      label: "Commands",
      title: "Enable, disable and check",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei github` resolves the configuration with this precedence: explicit flag, previous value, detection from `git`, and default value. `status` is offline and read-only: it does not call `gh` or the GitHub API.",
        },
        { kind: "commands", ids: ["github"] },
        {
          kind: "code",
          language: "bash",
          title: "Configuration",
          code: "rei github enable --repo owner/name --base main --strategy squash\nrei github disable\nrei github status",
        },
        {
          kind: "paragraph",
          text: "An unknown, repeated, valueless or invalid flag is incorrect use and does not write the configuration. `disable` keeps `repo`, `base`, `mergeStrategy` and `links.json`.",
        },
      ],
    },
    {
      id: "puerta",
      label: "Gate",
      title: "Issue and branch for Features only",
      blocks: [
        {
          kind: "paragraph",
          text: "The issue + branch gate runs only when `meta.json` is in ready, the user approves, the integration is active and the Work Item is a Feature. A Task is worked on the base branch, with no issue or branch, and there is no opt-in for Tasks.",
        },
        {
          kind: "note",
          tone: "info",
          title: "No gate for Tasks",
          text: "A Task is not asked about the gate \"just in case\", and no rei:task label is used. If the integration is disabled, GitHub Issues is not mentioned either.",
        },
      ],
    },
    {
      id: "pr-merge",
      label: "PR and merge",
      title: "PR and merge on order",
      blocks: [
        {
          kind: "paragraph",
          text: "There is never a commit, push, PR or merge without an explicit order from the user. The merge strategy comes from the configuration (squash by default) and the merge is not automatic: there is no auto-merge and no `--admin`.",
        },
      ],
    },
    {
      id: "epicas",
      label: "Epics",
      title: "Epics, backlog and labels",
      blocks: [
        {
          kind: "paragraph",
          text: "The integration includes epics, a backlog of child issues, adoption, publishing the spec, assignment and closing the epic. `links.json` is a recoverable local index, not the source of truth.",
        },
        {
          kind: "paragraph",
          text: "Markers identify; labels only help a person. If a marker appears duplicated or more than one issue has the same marker, the action stops and the anomaly is reported.",
        },
        {
          kind: "issue",
          number: 3,
          caption:
            "Header of epic #3, closed and with its labels published (the capture is in Spanish)",
        },
      ],
    },
    {
      id: "fuera",
      label: "Out of scope",
      title: "Out of scope",
      weight: "fine",
      blocks: [
        {
          kind: "list",
          items: [
            "Projects, milestones and native sub-issues.",
            "PRs from a fork to upstream.",
            "Two-way synchronization.",
            "Local pending Work Items as a substitute for the backlog.",
            "Self-assignment by workload and time tracking.",
            "Providers other than GitHub.",
            "Automatic commits, push or merge, `--admin` and auto-merge.",
            "Flags for GitHub actions in rei.",
          ],
        },
        {
          kind: "links",
          links: [
            {
              label: "Command reference",
              href: "/docs/referencia/comandos",
            },
            { label: "Frequently asked questions", href: "/docs/operacion/faq" },
            { label: "See Work Items", href: "/producto/work-items" },
            { label: "What the viewer does", href: "/producto/visor" },
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
