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
