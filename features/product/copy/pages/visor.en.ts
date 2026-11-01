import { REPOSITORY_URL } from "@/content/site";
import type { ProductDocument } from "@/features/product/types";

export const VISOR_EN: ProductDocument = {
  id: "visor",
  eyebrow: "Product · Viewer",
  meta: "Local · read-only · no approval",
  facts: [
    { label: "Mode", value: "Read-only" },
    { label: "Approves", value: "No" },
    { label: "Host", value: "Local" },
    { label: "Live reload", value: "SSE" },
    { label: "Closes", value: "On reaching done" },
  ],
  sections: [
    {
      id: "que-es",
      label: "What it is",
      title: "rei view opens a local viewer",
      blocks: [
        {
          kind: "paragraph",
          text: "The viewer is a local tool for reviewing the work with rendered documents. It serves an HTTP server on the user's machine and embeds its own assets in the binary: it loads no third-party assets.",
        },
        {
          kind: "list",
          items: [
            "It runs from the project's terminal, with nothing to deploy.",
            "It shows planning and progress documents, validation, session, table of contents, diff and FICHA.",
            "The content is readable and the real state of the Work Item is not simulated.",
          ],
        },
      ],
    },
    {
      id: "muestra",
      label: "What it shows",
      title: "What it shows",
      weight: "lead",
      blocks: [
        {
          kind: "viewer",
          caption:
            "Real capture of the viewer open on the reference Work Item (the interface is in Spanish, as captured)",
        },
        {
          kind: "points",
          variant: "ledger",
          points: [
            {
              title: "Documents",
              detail: "Rendered planning and progress.",
            },
            {
              title: "Validation",
              detail: "The result of the Work Item's internal consistency check.",
            },
            {
              title: "Session",
              detail: "The active session and its state.",
            },
            {
              title: "TOC",
              detail: "The table of contents of the documents.",
            },
            {
              title: "Diff",
              detail: "The actual changes of the Work Item.",
            },
            {
              title: "FICHA",
              detail:
                "The record panel: metadata, plus issue, base and epic from links.json when they exist.",
            },
          ],
        },
      ],
    },
    {
      id: "recarga",
      label: "Reload",
      title: "Live reload and closing",
      blocks: [
        {
          kind: "paragraph",
          text: "The status badge and the FICHA refresh live over SSE. When the Work Item reaches done, the viewer closes shortly after showing \"terminado\" (its label is in Spanish); `--stop`, the idle timeout and Ctrl+C also stop it.",
        },
      ],
    },
    {
      id: "limites",
      label: "Limits",
      title: "What it does not do",
      blocks: [
        {
          kind: "points",
          variant: "limits",
          points: [
            {
              title: "It does not approve",
              detail: "It has no approval button or route.",
            },
            {
              title: "It does not modify Work Items",
              detail: "Nor does it write to the repository.",
            },
            {
              title: "It does not replace the human answer",
              detail: "In the chat or in the terminal.",
            },
            {
              title: "It does not replace the CLI",
              detail: "Nor the git history.",
            },
          ],
        },
        {
          kind: "note",
          tone: "info",
          title: "Approval is recorded from the CLI",
          text: "Seeing the state in the viewer is not the same as approving. The move to in_progress is recorded by the Leader with `rei status set`.",
        },
      ],
    },
    {
      id: "comandos",
      label: "Commands",
      title: "Viewer commands",
      weight: "fine",
      blocks: [
        { kind: "commands", ids: ["view", "item-show", "validate"] },
        {
          kind: "links",
          links: [
            {
              label: "Command reference",
              href: "/docs/referencia/comandos",
            },
            { label: "Frequently asked questions", href: "/docs/operacion/faq" },
            { label: "See Work Items", href: "/producto/work-items" },
            {
              label: "How the flow works",
              href: "/producto/como-funciona",
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
