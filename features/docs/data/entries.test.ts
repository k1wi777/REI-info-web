import { isTranslated } from "@/content/i18n/coverage";
import { ROUTES } from "@/content/site";
import { getDocsLandingCopy } from "@/features/docs/copy";
import { buildDocsEntries, DOCS_ENTRIES } from "@/features/docs/data/entries";
import { LOCALES } from "@/lib/i18n";

describe("entradas de la landing de documentación", () => {
  it("solo enlaza rutas que existen en ROUTES", () => {
    for (const entry of DOCS_ENTRIES) {
      expect(ROUTES).toContain(entry.href);
    }
  });

  it("rellena título, modo y descripción de cada tarjeta en cada idioma", () => {
    for (const lang of LOCALES) {
      for (const entry of buildDocsEntries(lang)) {
        expect(entry.title.trim()).not.toBe("");
        expect(entry.mode.trim()).not.toBe("");
        expect(entry.description.trim()).not.toBe("");
      }
    }
  });

  it("mantiene las mismas tarjetas y enlaces en todos los idiomas", () => {
    const hrefs = DOCS_ENTRIES.map((entry) => entry.href);

    for (const lang of LOCALES) {
      expect(buildDocsEntries(lang).map((entry) => entry.href)).toEqual(hrefs);
    }
  });

  it("el español tiene todas las tarjetas y el inglés también (todo el destino está traducido)", () => {
    const ids = DOCS_ENTRIES.map((entry) => entry.id).sort();
    expect(DOCS_ENTRIES.every((entry) => isTranslated("en", entry.href))).toBe(
      true,
    );
    expect(Object.keys(getDocsLandingCopy("es").entries).sort()).toEqual(ids);
    expect(Object.keys(getDocsLandingCopy("en").entries).sort()).toEqual(ids);
  });

  it("las tarjetas sin traducción conservan el español y lo declaran", () => {
    for (const entry of buildDocsEntries("en")) {
      expect(entry.lang).toBe(isTranslated("en", entry.href) ? "en" : "es");
    }
    for (const entry of buildDocsEntries("es")) {
      expect(entry.lang).toBe("es");
    }
  });

  it("usa el inglés solo cuando la cobertura lo permite (modo simulado)", () => {
    const none = buildDocsEntries("en", () => false);
    const all = buildDocsEntries("en", () => true);

    expect(none.every((entry) => entry.lang === "es")).toBe(true);
    expect(all.filter((entry) => entry.lang === "en")).toHaveLength(4);
  });
});
