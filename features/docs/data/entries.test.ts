import { ROUTES } from "@/content/site";
import { DOCS_ENTRIES } from "@/features/docs/data/entries";

describe("entradas de la landing de documentación", () => {
  it("solo enlaza rutas que existen en ROUTES", () => {
    for (const entry of DOCS_ENTRIES) {
      expect(ROUTES).toContain(entry.href);
    }
  });

  it("rellena título, modo y descripción de cada entrada", () => {
    for (const entry of DOCS_ENTRIES) {
      expect(entry.title.trim()).not.toBe("");
      expect(entry.mode.trim()).not.toBe("");
      expect(entry.description.trim()).not.toBe("");
    }
  });
});
