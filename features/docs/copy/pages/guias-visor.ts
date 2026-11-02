import type { DocCopy } from "@/features/docs/copy/types";

export const GUIAS_VISOR_EN: DocCopy = {
  eyebrow: "Guides · Viewer",
  meta: "Local · read-only · live reload",
  sections: [
    {
      id: "cuando-usarla",
      title: "When to use it",
      blocks: [
        {
          kind: "paragraph",
          text: "Open the viewer when you want to review a Work Item with its documents rendered, its table of contents, validation, session, diff and FICHA on a single page. It is a local tool for reading and checking, not for deciding.",
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
            "A project initialized with `.rei/` and the rei binary available.",
            "An active session or the identifier of the Work Item you want to see.",
            "A local browser; the viewer serves HTTP on your machine and deploys nothing.",
            "A free port, which the viewer itself picks and reports at startup.",
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
            "Run `rei view` without an identifier to open the Work Item of the active session. If there is no session, pass one with `rei view <id>`.",
            "If you do not want to block the terminal, use `rei view --open`: it starts or reuses the server in the background and opens the browser. The `--open`, `--stop`, `--enable` and `--disable` modes are mutually exclusive.",
            "Review the planning and progress documents, the TOC, validation, session, diff and FICHA. The FICHA shows issue, base and epic when `links.json` exists.",
            "Leave the tab open if you want to follow the state: the badge and the FICHA refresh live over SSE when they change on disk.",
            "Close the server with `rei view --stop`, with Ctrl+C, or by waiting for the idle timeout. In the background it also closes shortly after showing «finished» when the Work Item reaches done.",
            "Turn automatic opening on ready on or off with `rei view --enable` or `rei view --disable`. It only changes `viewer.autoOpenOnReady` in `.rei/config.json`.",
          ],
        },
        {
          kind: "code",
          language: "Shell",
          title: "Lifecycle",
          code: "rei view\nrei view 2026-10-27_01-54__mi-feature --open\nrei view --stop\nrei view --enable\nrei view --disable",
        },
        {
          kind: "note",
          tone: "warning",
          title: "The viewer does not approve",
          text: "It has no approval button or route. Seeing the state in the viewer is not the same as approving: approval is recorded from the chat or the terminal and the Leader runs `rei status set`.",
        },
        {
          kind: "note",
          tone: "info",
          title: "Exit codes",
          text: "0 if the operation finishes correctly; 1 if there is no active session or reading/writing fails; 2 if usage is incorrect, for example with two modes at once.",
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
          code: "rei item show 2026-10-27_01-54__mi-feature\nrei validate 2026-10-27_01-54__mi-feature",
        },
        {
          kind: "paragraph",
          text: "Check that the viewer's state and FICHA match the CLI card and `links.json`, and that the diff corresponds to the real changes of the Work Item. If the viewer shows an old state, refresh the page: the refresh depends on the SSE connection.",
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
            "It is read-only: it does not approve and does not modify documents, `meta.json` or the state of the Work Item.",
            "It does not replace the human answer in the chat or the terminal, nor the CLI, nor the git history.",
            "It loads no third-party JavaScript, CSS or fonts: its assets are embedded in the binary.",
            "It exposes no approval route or button that changes the state.",
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
          text: "After reviewing the viewer, the next control is the project verification. The checks guide explains which commands run and how to interpret their result.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Configure the project checks",
              href: "/docs/guias/checks",
            },
            {
              label: "Look up the commands",
              href: "/docs/referencia/comandos",
            },
            {
              label: "What the viewer does",
              href: "/producto/visor",
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
