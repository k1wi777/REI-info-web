import {
  TRANSLATED_DOCS_MODES,
  TRANSLATED_DOCS_PATHS,
  UNTRANSLATED_DOCS_PATHS,
  isTranslated,
} from "@/content/i18n/coverage";
import {
  DOCS_NAV_EN,
  getDocsNav,
  getDocsPageText,
  type DocsNavOverlay,
} from "@/content/i18n/docs-nav";
import { DOCS_PAGES, DOCS_SECTIONS } from "@/content/site";

describe("cobertura de docs", () => {
  it("solo registra paths que existen en el árbol", () => {
    const known = DOCS_PAGES.map((page) => page.path);
    for (const path of TRANSLATED_DOCS_PATHS) {
      expect(known).toContain(path);
    }
  });

  it("un modo está registrado si y solo si todas sus páginas lo están", () => {
    for (const section of DOCS_SECTIONS) {
      const all = section.pages.every(
        (page) =>
          (TRANSLATED_DOCS_PATHS as readonly string[]).includes(page.path) ||
          (UNTRANSLATED_DOCS_PATHS as readonly string[]).includes(page.path),
      );
      expect(
        (TRANSLATED_DOCS_MODES as readonly string[]).includes(section.id),
      ).toBe(all);
    }
  });

  it("cada ruta del árbol está en exactamente una lista de cobertura", () => {
    for (const page of DOCS_PAGES) {
      const inTranslated = (TRANSLATED_DOCS_PATHS as readonly string[]).includes(
        page.path,
      );
      const inUntranslated = (
        UNTRANSLATED_DOCS_PATHS as readonly string[]
      ).includes(page.path);
      const registered = (TRANSLATED_DOCS_MODES as readonly string[]).includes(
        DOCS_SECTIONS.find((s) => s.pages.includes(page))!.id,
      );

      expect(inTranslated && inUntranslated).toBe(false);
      if (registered) expect(inTranslated || inUntranslated).toBe(true);
    }
  });

  it("el overlay en inglés cubre exactamente lo registrado", () => {
    expect(Object.keys(DOCS_NAV_EN.pages).sort()).toEqual(
      [...TRANSLATED_DOCS_PATHS].sort(),
    );
    expect(Object.keys(DOCS_NAV_EN.modes).sort()).toEqual(
      [...TRANSLATED_DOCS_MODES].sort(),
    );
  });
});

describe("getDocsNav", () => {
  it("mantiene el árbol y el español sin cambios en es", () => {
    const nav = getDocsNav("es");

    expect(nav.map((mode) => mode.id)).toEqual(DOCS_SECTIONS.map((s) => s.id));
    nav.forEach((mode, index) => {
      const section = DOCS_SECTIONS[index];
      expect(mode.label).toEqual({ text: section.label, lang: "es" });
      expect(mode.pages.map((page) => page.path)).toEqual(
        section.pages.map((page) => page.path),
      );
      mode.pages.forEach((page, pageIndex) => {
        expect(page.title).toEqual({
          text: section.pages[pageIndex].title,
          lang: "es",
        });
        expect(page.description.text).toBe(section.pages[pageIndex].description);
      });
    });
  });

  it("en inglés usa el overlay solo donde hay cobertura y marca el resto como es", () => {
    for (const mode of getDocsNav("en")) {
      const translated = isTranslated("en", mode.path);
      expect(mode.label.lang).toBe(translated ? "en" : "es");
      for (const page of mode.pages) {
        const pageTranslated = isTranslated("en", page.path);
        expect(page.title.lang).toBe(pageTranslated ? "en" : "es");
        expect(page.description.lang).toBe(pageTranslated ? "en" : "es");
      }
    }
  });

  it("traduce las dos páginas de Empezar", () => {
    expect(getDocsPageText("en", "/docs/empezar/instalacion").title.text).toBe(
      "Installation",
    );
    expect(
      getDocsPageText("en", "/docs/empezar/primer-work-item").title,
    ).toEqual({ text: "First Work Item", lang: "en" });
  });

  it("deja las páginas no traducidas en español bajo en", () => {
    const text = getDocsPageText("en", "/docs/operacion/faq");

    expect(text.title.lang).toBe("es");
    expect(text.description.lang).toBe("es");
  });

  it("cambia a inglés al registrar un modo simulado, sin tocar componentes", () => {
    const overlay: DocsNavOverlay = {
      ...DOCS_NAV_EN,
      modes: { ...DOCS_NAV_EN.modes, operacion: { label: "Operations" } },
      pages: {
        ...DOCS_NAV_EN.pages,
        "/docs/operacion/troubleshooting": {
          title: "Troubleshooting",
          description: "Fixes.",
        },
      },
    } as unknown as DocsNavOverlay;
    const translated = (lang: string, path: string) =>
      lang === "en" && path.startsWith("/docs/operacion");
    const operacion = getDocsNav("en", { isTranslated: translated, overlay }).find(
      (mode) => mode.id === "operacion",
    );

    expect(operacion?.label).toEqual({ text: "Operations", lang: "en" });
    expect(
      operacion?.pages.find(
        (page) => page.path === "/docs/operacion/troubleshooting",
      )?.title,
    ).toEqual({ text: "Troubleshooting", lang: "en" });
    // Sin overlay para otra página cubierta, cae al español.
    expect(
      operacion?.pages.find((page) => page.path === "/docs/operacion/faq")
        ?.title.lang,
    ).toBe("es");
  });
});
