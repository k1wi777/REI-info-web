import {
  isTranslated,
  type TranslatedDocsMode,
  type TranslatedDocsPath,
} from "@/content/i18n/coverage";
import {
  DOCS_SECTIONS,
  getDocsPageOrThrow,
  type DocsPage,
  type DocsSection,
} from "@/content/site";
import type { Locale } from "@/lib/i18n";

/**
 * Árbol de documentación en inglés, como overlay del español de
 * `DOCS_SECTIONS`. Solo contiene los modos y páginas traducidos: las claves
 * salen de las listas de `coverage.ts`, así que registrar un modo sin su
 * overlay rompe `pnpm typecheck`.
 */
export type DocsNavOverlay = {
  modes: Record<TranslatedDocsMode, { label: string }>;
  pages: Record<TranslatedDocsPath, { title: string; description: string }>;
};

export const DOCS_NAV_EN: DocsNavOverlay = {
  modes: {
    empezar: { label: "Get started" },
    conceptos: { label: "Concepts" },
    guias: { label: "Guides" },
    referencia: { label: "Reference" },
    operacion: { label: "Operations" },
  },
  pages: {
    "/docs/empezar/instalacion": {
      title: "Installation",
      description:
        "Download the rei binary, verify it and keep it up to date on Linux, macOS and Windows.",
    },
    "/docs/empezar/primer-work-item": {
      title: "First Work Item",
      description:
        "Walk through the full lifecycle of a Work Item: initialize, plan, approve, implement and review.",
    },
    "/docs/conceptos": {
      title: "Concepts",
      description:
        "The ideas behind REI Harness: Spec Driven Development, human approval, Work Items and direct mode.",
    },
    "/docs/conceptos/sdd": {
      title: "Spec Driven Development",
      description:
        "What Spec Driven Development is, why the specification comes before code and which artifacts the harness produces.",
    },
    "/docs/conceptos/aprobacion-humana": {
      title: "Human approval",
      description:
        "What approving a plan means, what it does not mean and how the gate is recorded from the CLI.",
    },
    "/docs/conceptos/work-items-y-estados": {
      title: "Work Items and states",
      description:
        "Feature versus Task, the states of the cycle, its branches and the limit of one Work Item in in_progress.",
    },
    "/docs/conceptos/modo-directo": {
      title: "Direct mode",
      description:
        "What direct mode is, when it is allowed, when it is refused and why it is not a workflow shortcut.",
    },
    "/docs/guias": {
      title: "Guides",
      description:
        "Recipes to enable GitHub Issues, open the viewer, configure checks and update the harness.",
    },
    "/docs/guias/github-issues": {
      title: "GitHub Issues",
      description:
        "Enable, query and disable the optional GitHub Issues integration and work with issue, branch, PR and backlog.",
    },
    "/docs/guias/visor": {
      title: "Viewer",
      description:
        "Open rei view, read its views, control its lifecycle and respect its read-only limits.",
    },
    "/docs/guias/checks": {
      title: "Checks",
      description:
        "Declare the quick checks in .rei/config.json and run them with rei check or rei test.",
    },
    "/docs/guias/actualizar": {
      title: "Update",
      description:
        "Update the harness with rei init --update and the binary with rei update, including the Windows case.",
    },
    "/docs/referencia": {
      title: "Reference",
      description:
        "Exact facts about the harness: commands, configuration, states, templates and adapters.",
    },
    "/docs/referencia/comandos": {
      title: "Commands",
      description:
        "Reference for the rei CLI: commands, flags and examples grouped by task.",
    },
    "/docs/referencia/configuracion": {
      title: "Configuration",
      description:
        ".rei/config.json: checks, GitHub Issues integration, viewer and exit codes.",
    },
    "/docs/referencia/meta": {
      title: "meta.json",
      description:
        "Fields, identifier, type, state and commits of each Work Item's durable record.",
    },
    "/docs/referencia/estados": {
      title: "States",
      description:
        "The seven workflow states, their transitions, the single in_progress limit and --force.",
    },
    "/docs/referencia/plantillas": {
      title: "Templates",
      description:
        "The canonical templates for current.md, history.md and meta.json and how the session is archived.",
    },
    "/docs/referencia/adaptadores": {
      title: "Adapters",
      description:
        "The canonical role contract, native subagent generation and the fallback without an adapter.",
    },
    "/docs/operacion": {
      title: "Operations",
      description:
        "Diagnosis and changes: what to do when something fails, frequently asked questions and the documented version.",
    },
    "/docs/operacion/troubleshooting": {
      title: "Troubleshooting",
      description:
        "Symptom, cause and next step for the usual failures of the harness and the CLI.",
    },
    "/docs/operacion/changelog": {
      title: "Changelog",
      description:
        "The documented version, its date and the verifiable topics of the v0.3.0 release.",
    },
  },
};

/** Texto con el idioma real en el que está escrito. */
export type DocsText = { text: string; lang: Locale };

export type DocsNavPage = {
  path: string;
  title: DocsText;
  description: DocsText;
};

export type DocsNavMode = {
  id: DocsSection["id"];
  path: string;
  label: DocsText;
  pages: DocsNavPage[];
};

type NavOptions = {
  isTranslated?: (lang: Locale, path: string) => boolean;
  overlay?: DocsNavOverlay;
};

function lookupPage(
  overlay: DocsNavOverlay,
  path: string,
): { title: string; description: string } | undefined {
  return (overlay.pages as Record<string, { title: string; description: string }>)[
    path
  ];
}

function resolvePage(
  lang: Locale,
  page: DocsPage,
  { isTranslated: translated = isTranslated, overlay = DOCS_NAV_EN }: NavOptions,
): DocsNavPage {
  const english = translated(lang, page.path)
    ? lookupPage(overlay, page.path)
    : undefined;

  return english && lang === "en"
    ? {
        path: page.path,
        title: { text: english.title, lang },
        description: { text: english.description, lang },
      }
    : {
        path: page.path,
        title: { text: page.title, lang: "es" },
        description: { text: page.description, lang: "es" },
      };
}

/**
 * Única función de resolución del árbol: devuelve cada texto con su idioma
 * real. Una página traducida usa el overlay; el resto sigue en español.
 */
export function getDocsNav(lang: Locale, options: NavOptions = {}): DocsNavMode[] {
  const { isTranslated: translated = isTranslated, overlay = DOCS_NAV_EN } =
    options;

  return DOCS_SECTIONS.map((section) => {
    const modeEnglish =
      lang === "en" &&
      translated(lang, section.path) &&
      (overlay.modes as Record<string, { label: string } | undefined>)[
        section.id
      ];

    return {
      id: section.id,
      path: section.path,
      label: modeEnglish
        ? { text: modeEnglish.label, lang }
        : { text: section.label, lang: "es" },
      pages: section.pages.map((page) => resolvePage(lang, page, options)),
    };
  });
}

/** Título y descripción de una página en el idioma pedido (con fallback). */
export function getDocsPageText(
  lang: Locale,
  path: string,
  options: NavOptions = {},
): { title: DocsText; description: DocsText } {
  return resolvePage(lang, getDocsPageOrThrow(path), options);
}
