import type { DocCopy } from "@/features/docs/copy/types";

export const GUIAS_ACTUALIZAR_EN: DocCopy = {
  eyebrow: "Guides · Update",
  meta: "Harness and binary · safe update",
  sections: [
    {
      id: "cuando-usarla",
      title: "When to use it",
      blocks: [
        {
          kind: "paragraph",
          text: "Use this guide when you want to check whether there is a new version of the binary, update it, or refresh the harness skeleton in a project that already has it initialized.",
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
            "To update the binary, a connection to GitHub Releases and write permission on the executable.",
            "To update the harness, a project already initialized with `.rei/`.",
            "A backup or a clean commit before forcing changes to the documentation.",
            "Knowing the difference between updating the binary and updating the project skeleton.",
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
            "Check whether there is a new version with `rei update --check`. It only reports the result: it does not download or write anything.",
            "Update the binary with `rei update`. It downloads the asset for your system and architecture, verifies its SHA-256 against checksums.txt and replaces the executable atomically. If the integrity check fails, it aborts without modifying the binary.",
            "On Windows a running `.exe` cannot be replaced: `rei update` reports it and opens the releases page so you can download the archive by hand.",
            "Update the harness skeleton with `rei init --update`. It requires an REI project; it does not install from scratch and never touches `.rei/specs/**` or `.rei/progress/**`.",
            "Review the warnings. `--update` is marker-aware: it updates the customization documents that still contain the pending marker and keeps those already customized. The rest of the files are updated only if the manifest confirms they were not modified.",
            "Use `rei init --update --force` only if you accept overwriting any file that differs, including customized or hand-edited ones. The result is reported as [NEW], [UPD], [OK] or [SKIP].",
          ],
        },
        {
          kind: "code",
          language: "Shell",
          title: "Binary",
          code: "rei update --check\nrei update",
        },
        {
          kind: "code",
          language: "Shell",
          title: "Harness",
          code: "rei init --update\nrei init --update --force\nrei init status",
        },
        {
          kind: "note",
          tone: "warning",
          title: "`--force` overwrites",
          text: "A normal update keeps what is customized and warns. `--force` makes no distinction: if a file differs, it replaces it. Do not use it to fix a red check without understanding what is lost.",
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
          code: "rei version\nrei init status\nrei check\nrei validate",
        },
        {
          kind: "paragraph",
          text: "`rei version` confirms the binary version. `rei init status` tells you whether any documentation is still pending customization. `rei check` verifies the harness and the project checks, and `rei validate` reviews the consistency of a Work Item.",
        },
        {
          kind: "paragraph",
          text: "If the binary update fails because of the network, permissions or checksum, the previous executable is left intact. If the replacement fails after it has started, the original is restored.",
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
            "`rei init --update` does not install the harness from scratch: use `rei init` for that.",
            "`--update` does not modify `.rei/specs/**` or `.rei/progress/**`: work in progress is not lost.",
            "Customized documents are kept with a warning; only `--force` overwrites them.",
            "`--update` regenerates native subagents only if the project already has `.opencode/` or `.claude/`.",
            "On Windows, the binary update is manual from the releases page.",
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
          text: "After updating, run the checks again and, if the harness changed, review the command reference and the installation.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Configure the project checks",
              href: "/docs/guias/checks",
            },
            {
              label: "Review the installation",
              href: "/docs/empezar/instalacion",
            },
            {
              label: "Look up the commands",
              href: "/docs/referencia/comandos",
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
