import {
  buildFooterGroups,
  buildNavItems,
  buildPrimaryCta,
  getDictionary,
} from "@/content/i18n";
import {
  DOCS_LANDING_PATH,
  TRANSLATED_DOCS_PATHS,
  TRANSLATED_ROUTES,
  getContentLocale,
  isTranslated,
  translatedLocales,
} from "@/content/i18n/coverage";
import { en } from "@/content/i18n/en";
import { es } from "@/content/i18n/es";
import {
  INSTALL_PATH,
  FOOTER_GROUPS,
  NAV_ITEMS,
  PRIMARY_CTA,
  PRODUCT_PAGES,
  ROUTES,
  isExternal,
} from "@/content/site";
import { APPROVAL_GATE } from "@/content/rei";
import { LOCALES } from "@/lib/i18n";

type Leaf = string | ((...args: never[]) => string);

function paths(value: unknown, prefix = ""): string[] {
  if (typeof value === "function" || typeof value === "string") {
    return [prefix];
  }
  return Object.entries(value as Record<string, unknown>).flatMap(
    ([key, child]) => paths(child, prefix ? `${prefix}.${key}` : key),
  );
}

function leaves(value: unknown): Leaf[] {
  if (typeof value === "function" || typeof value === "string") {
    return [value as Leaf];
  }
  return Object.values(value as Record<string, unknown>).flatMap(leaves);
}

describe("diccionarios", () => {
  it("tienen las mismas claves en es y en", () => {
    expect(paths(en)).toEqual(paths(es));
  });

  it("no dejan textos vacíos", () => {
    for (const dictionary of [es, en]) {
      for (const leaf of leaves(dictionary)) {
        if (typeof leaf === "string") {
          expect(leaf.trim()).not.toBe("");
        }
      }
    }
  });

  it("traducen de verdad: los textos de navegación difieren entre idiomas", () => {
    expect(en.shell.skipLink).not.toBe(es.shell.skipLink);
    expect(en.shell.cta).not.toBe(es.shell.cta);
    expect(en.notFound.title).not.toBe(es.notFound.title);
  });

  it("traduce los textos del botón de copiar", () => {
    for (const key of Object.keys(es.copy) as (keyof typeof es.copy)[]) {
      expect(en.copy[key]).not.toBe(es.copy[key]);
    }
  });

  it("la puerta de aprobación del shell de docs en español iguala APPROVAL_GATE", () => {
    expect(es.docs.gate.label).toBe(APPROVAL_GATE.label);
    expect(es.docs.gate.status).toBe(APPROVAL_GATE.status);
    expect(es.docs.gate.detail).toBe(APPROVAL_GATE.detail);
  });

  it("traduce el chrome de docs al inglés", () => {
    expect(en.docs.tocLabel).not.toBe(es.docs.tocLabel);
    expect(en.docs.previous).not.toBe(es.docs.previous);
  });

  it("devuelve el diccionario de cada idioma", () => {
    for (const lang of LOCALES) {
      expect(getDictionary(lang)).toBe(lang === "es" ? es : en);
    }
  });
});

describe("composición del shell", () => {
  it("conserva los hrefs y etiqueta cada elemento de navegación", () => {
    for (const lang of LOCALES) {
      const items = buildNavItems(getDictionary(lang));

      expect(items.map((item) => item.href)).toEqual(
        NAV_ITEMS.map((item) => item.href),
      );
      for (const item of items) {
        expect(item.label.trim()).not.toBe("");
      }
    }
  });

  it("compone el CTA con el href único de instalación", () => {
    expect(buildPrimaryCta(en)).toEqual({
      label: "Install REI",
      href: PRIMARY_CTA.href,
    });
  });

  it("compone los grupos del pie sin perder enlaces", () => {
    for (const lang of LOCALES) {
      const groups = buildFooterGroups(getDictionary(lang));

      expect(groups).toHaveLength(FOOTER_GROUPS.length);
      groups.forEach((group, index) => {
        expect(group.title.trim()).not.toBe("");
        expect(group.items.map((item) => item.href)).toEqual(
          FOOTER_GROUPS[index].items.map((item) => item.href),
        );
        for (const item of group.items) {
          expect(item.label.trim()).not.toBe("");
          expect(Boolean(item.external)).toBe(isExternal(item.href));
        }
      });
    }
  });
});

describe("cobertura de traducción", () => {
  it("cubre todas las rutas en el idioma por defecto", () => {
    for (const path of ROUTES) {
      expect(isTranslated("es", path)).toBe(true);
    }
  });

  it("solo declara en inglés rutas que existen", () => {
    for (const path of TRANSLATED_ROUTES.en) {
      expect(ROUTES).toContain(path);
    }
  });

  it("recurre al español para una ruta fuera de la cobertura", () => {
    const synthetic = "/ruta-inexistente";

    expect(getContentLocale("en", synthetic)).toBe("es");
    expect(translatedLocales(synthetic)).toEqual([]);
  });

  it("cubre en inglés todas las rutas del sitio", () => {
    for (const path of ROUTES) {
      expect(isTranslated("en", path)).toBe(true);
      expect(getContentLocale("en", path)).toBe("en");
    }
  });

  it("declara traducidas en inglés la home, la instalación, producto y docs (Empezar)", () => {
    expect([...TRANSLATED_ROUTES.en]).toEqual([
      "/",
      INSTALL_PATH,
      ...PRODUCT_PAGES.map((page) => page.path),
      DOCS_LANDING_PATH,
      ...TRANSLATED_DOCS_PATHS,
    ]);
    for (const page of PRODUCT_PAGES) {
      expect(translatedLocales(page.path)).toEqual(["es", "en"]);
      expect(getContentLocale("en", page.path)).toBe("en");
    }
    expect(translatedLocales("/")).toEqual(["es", "en"]);
    expect(translatedLocales(INSTALL_PATH)).toEqual(["es", "en"]);
    expect(getContentLocale("en", INSTALL_PATH)).toBe("en");
  });
});
