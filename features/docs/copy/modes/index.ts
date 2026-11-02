import type { TranslatedDocsMode } from "@/content/i18n/coverage";
import { DOCS_MODE_LANDINGS } from "@/features/docs/data/modes";
import type { DocsModeLandingCopy } from "@/features/docs/copy/types";
import type { DocsModeId } from "@/features/docs/types";
import type { Locale } from "@/lib/i18n";

/** Una landing en inglés por cada modo de docs registrado como traducido. */
export const MODE_LANDINGS_EN: Record<
  Extract<TranslatedDocsMode, DocsModeId>,
  DocsModeLandingCopy
> = {
  conceptos: {
    intro:
      "Before installing anything, it helps to know why the harness is organized this way. These pages explain the model: the specification that comes before code, the approval gate, the lifecycle of a Work Item and the one path that stays outside the workflow.",
    outro: [
      {
        kind: "paragraph",
        text: "Concepts do not replace practice. When you want to run the process, start with the installation or with a specific recipe.",
      },
      {
        kind: "links",
        links: [
          { label: "Start with the installation", href: "/docs/empezar/instalacion" },
          { label: "Open the guides", href: "/docs/guias" },
        ],
      },
    ],
  },
  guias: {
    intro:
      "Each guide solves a specific task in the order that works: when to use it, what you need, the steps, how to check the result and what to do next. They are neither explanations of the model nor the full catalog of commands.",
    outro: [
      {
        kind: "paragraph",
        text: "If you need the detail of a flag or the meaning of a state, the reference and the concepts are one link away.",
      },
      {
        kind: "links",
        links: [
          { label: "Look up the command reference", href: "/docs/referencia/comandos" },
          { label: "Review the concepts", href: "/docs/conceptos" },
        ],
      },
    ],
  },
  referencia: {
    intro:
      "The reference gathers verifiable facts: which commands exist, with which flags, how the harness is configured, what each state means and what format the canonical files have. It does not explain the process or replace a guide: when a fact needs context, it links to the document that develops it.",
    outro: [
      {
        kind: "paragraph",
        text: "If you need the detail of a command, the exact table of states or the configuration values, the reference gathers them. If you are going to run a task step by step, the matching guide sets the order; for usage questions, the FAQ.",
      },
      {
        kind: "links",
        links: [
          { label: "Look up the commands", href: "/docs/referencia/comandos" },
          { label: "See the states", href: "/docs/referencia/estados" },
          { label: "Review the configuration", href: "/docs/referencia/configuracion" },
          { label: "Open the guides", href: "/docs/guias" },
          { label: "Read the frequently asked questions", href: "/docs/operacion/faq" },
        ],
      },
    ],
  },
  operacion: {
    intro:
      "Operations answers what shows up once the harness is running: a red check, a session that does not start, a blocked Work Item or a version you want to verify. Each page starts from a symptom or a fact and offers the next step, with no promised shortcuts.",
    outro: [
      {
        kind: "paragraph",
        text: "If the symptom is not in troubleshooting, the FAQ covers usage questions and the reference answers the detail of the CLI and the configuration.",
      },
      {
        kind: "links",
        links: [
          { label: "Troubleshooting", href: "/docs/operacion/troubleshooting" },
          { label: "Frequently asked questions", href: "/docs/operacion/faq" },
          { label: "Look up the reference", href: "/docs/referencia" },
          { label: "See the documented version", href: "/docs/operacion/changelog" },
        ],
      },
    ],
  },
};

/** Intro y cierre de la landing de un modo; el español sale de `data/modes`. */
export function getDocsModeLandingCopy(
  mode: DocsModeId,
  lang: Locale,
): DocsModeLandingCopy {
  if (lang === "en" && mode in MODE_LANDINGS_EN) {
    return MODE_LANDINGS_EN[mode as keyof typeof MODE_LANDINGS_EN];
  }

  return DOCS_MODE_LANDINGS[mode];
}
