import type { DocCopy } from "@/features/docs/copy/types";

export const OPERACION_TROUBLESHOOTING_EN: DocCopy = {
  eyebrow: "Operations · Troubleshooting",
  meta: "ten symptoms · cause · next step",
  sections: [
    {
      id: "personalizacion-pendiente",
      title: "Customization is still pending",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei init` deploys the skeleton with REI:PENDIENTE markers in the project documentation. While markers remain, `rei init status` reports the pending documents and exits with 1: the agents would work with generic rules.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Run `rei init status` to see which documents are missing.",
            "Open `/personalize` in OpenCode or Claude Code, or ask «personaliza mi proyecto» so the Initializer runs the interview.",
            "Check that `AGENTS.md` and `.rei/docs/project/` describe your repository and not the skeleton.",
            "Repeat `rei init status`: it must exit 0 when nothing is pending.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "Back to the installation", href: "/docs/empezar/instalacion" },
            { label: "Look up rei init status", href: "/docs/referencia/comandos" },
            { label: "Read the frequently asked questions", href: "/docs/operacion/faq" },
          ],
        },
      ],
    },
    {
      id: "check-falla",
      title: "rei check fails",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei check` runs its harness checks and the checks declared in `.rei/config.json`. It exits with 1 if there is at least one [FAIL] or if a project check fails; code 2 is reserved for incorrect usage.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Read the output: tell a harness failure apart from a project check.",
            "If a check fails, run its command separately and fix the cause.",
            "Check that the check is declared correctly: `id`, `description` and `command` as an array.",
            "Repeat `rei check --quiet` until you get 0. Do not disable the check to make it pass.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "Review the checks guide", href: "/docs/guias/checks" },
            {
              label: "See the config.json fields",
              href: "/docs/referencia/configuracion",
            },
            { label: "Look up rei check", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
    {
      id: "varios-in-progress",
      title: "More than one Work Item in in_progress",
      blocks: [
        {
          kind: "paragraph",
          text: "The harness only allows one active Work Item. `rei status set <id> in_progress` rejects a second Work Item, also with `--force`; `rei check`, `rei doctor` and `rei items status` fail if they detect more than one.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Run `rei items status` and find the Work Item marked with << ACTIVO.",
            "Close the active one (review or done), block it or finish its review.",
            "Confirm that none is left in in_progress.",
            "Start the next Work Item only when the previous one has left the state.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "See the states and the limit", href: "/docs/referencia/estados" },
            {
              label: "Understand the Work Item cycle",
              href: "/docs/conceptos/work-items-y-estados",
            },
            { label: "Look up the commands", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
    {
      id: "links-json",
      title: "Invalid links.json",
      blocks: [
        {
          kind: "paragraph",
          text: "`.rei/specs/<id>/links.json` is a recoverable local index, not the source of truth. If the JSON is broken or its shape is invalid, `rei validate` reports it as a WARN —never as a FAIL— and `rei item show` or `rei items status` flag it as a note without blocking the Work Item.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Run `rei validate` to read the specific cause.",
            "Find the issue by its marker rei:work-item:<id>, not by the title or the label.",
            "Rewrite `links.json` in its valid shape: provider, repo, issue, url, base and epic where they apply.",
            "Validate again; the warning disappears without changing the Work Item's state.",
          ],
        },
        {
          kind: "note",
          tone: "info",
          title: "Recoverable warning",
          text: "A missing, broken or incomplete `links.json` does not change `meta.json`, `current.md` or the workflow stage. It is rebuilt and work continues.",
        },
        {
          kind: "links",
          links: [
            { label: "Review the GitHub Issues guide", href: "/docs/guias/github-issues" },
            { label: "See the GitHub Issues integration", href: "/producto/github-issues" },
            { label: "Look up rei validate", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
    {
      id: "sesion-no-inicia",
      title: "The session does not start",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei session start <id> <tipo>` only creates the session if the Work Item exists, the type matches `meta.json` and its state is pending. In any other case it rejects with the cause and next step without writing `current.md`.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Run `rei item show <id>` to see the real type and state.",
            "If the type does not match the argument, repeat the command with the type from `meta.json`.",
            "If the state is ready, do not restart: approve the planning or ask for changes.",
            "If it is in in_progress, review or changes_requested, resume the existing session with `rei item show <id>`.",
            "If it is in done or blocked, create a new Work Item with `rei new`.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "See the current.md template", href: "/docs/referencia/plantillas" },
            { label: "Look up the states", href: "/docs/referencia/estados" },
            { label: "Look up rei session", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
    {
      id: "gh",
      title: "gh missing or not authenticated",
      blocks: [
        {
          kind: "paragraph",
          text: "The GitHub Issues integration relies on `gh` for the real actions; the rei CLI never calls GitHub. If `gh` is not installed or has no session, the message says so with the cause and next step. These are warnings that do not block `rei github`: the command exits 0.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Install GitHub CLI and check that `gh` is on the PATH.",
            "Run `gh auth login` and then `gh auth status`.",
            "Run `rei github status` to see the offline state of the configuration and the availability of `gh`.",
            "Repeat the GitHub Issues action only when `gh` responds with a valid session.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "Review the GitHub Issues guide", href: "/docs/guias/github-issues" },
            { label: "See the GitHub Issues integration", href: "/producto/github-issues" },
            { label: "Look up rei github", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
    {
      id: "visor",
      title: "The viewer does not open or its local address does not respond",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei view` serves the viewer locally. With no mode it stays in the foreground until Ctrl+C; `--open` starts or reuses the server in the background and opens the browser without blocking. If the page does not respond, the background server may have stopped or lost its temporary record.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Run `rei view <id> --open` to start or reuse the server and open the browser.",
            "If it still does not respond, stop the server with `rei view --stop` and open it again.",
            "Without `<id>`, the viewer uses the Work Item of the active session; check that it exists with `rei session`.",
            "Check `viewer.autoOpenOnReady` if you expected it to open at the approval gate.",
          ],
        },
        {
          kind: "note",
          tone: "info",
          title: "Read-only",
          text: "The viewer does not approve and does not modify documents, `meta.json` or the state of the Work Item. Approving is done in the chat or the terminal; the viewer never replaces that answer.",
        },
        {
          kind: "links",
          links: [
            { label: "Review the viewer guide", href: "/docs/guias/visor" },
            { label: "See the product's viewer", href: "/producto/visor" },
            {
              label: "Configure viewer.autoOpenOnReady",
              href: "/docs/referencia/configuracion",
            },
          ],
        },
      ],
    },
    {
      id: "checksum",
      title: "Invalid checksum when updating",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei update` downloads the latest release, verifies the archive's SHA-256 against `checksums.txt` and only then replaces the binary. An invalid checksum, a network failure or a permission error abort the update with code 1 and leave the binary undamaged.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Run `rei update --check` to confirm the available version without downloading.",
            "Repeat `rei update` when the network is stable.",
            "If the integrity failure persists, download the archive from the releases page and verify its SHA-256 against `checksums.txt` before replacing the binary.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "Review the update guide", href: "/docs/guias/actualizar" },
            { label: "Look up rei update", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
    {
      id: "git",
      title: "The project does not use git",
      blocks: [
        {
          kind: "paragraph",
          text: "`git` is not mandatory: the workflow keeps working in read mode. What is lost is the diff-bounded review and the commit record in `meta.json`. `rei check` initializes `git` automatically if it is missing.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Run `rei check`: it creates the structure and initializes `git` if it does not exist.",
            "If you decide to use `git`, confirm the repository has an initial commit before approving a Work Item.",
            "Without `git`, `base_commit` and `last_review_commit` stay empty; the flow is not blocked by it.",
            "With `git`, record the commits before requesting a review so that `rei review-diff` bounds the diff.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "See the commit fields", href: "/docs/referencia/meta" },
            { label: "Read the frequently asked questions", href: "/docs/operacion/faq" },
            { label: "Look up the commands", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
    {
      id: "no-esta-aqui",
      title: "The symptom is not here",
      blocks: [
        {
          kind: "paragraph",
          text: "This page covers the failures documented by the usage guide and the harness documents. If the symptom does not appear, start with the matching frequently asked question and, if it is not there either, look up the specific command with `rei <comando> --help`.",
        },
        {
          kind: "links",
          links: [
            { label: "Open the frequently asked questions", href: "/docs/operacion/faq" },
            { label: "Look up the commands", href: "/docs/referencia/comandos" },
            { label: "Look up the reference", href: "/docs/referencia" },
          ],
        },
      ],
    },
  ],
};
