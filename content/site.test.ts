import {
  DOCS_PAGES,
  DOCS_SECTIONS,
  FOOTER_GROUPS,
  NAV_ITEMS,
  PRIMARY_CTA,
  PRODUCT_PAGES,
  ROUTES,
  SITE_URL_FALLBACK,
  getDocsPageOrThrow,
  getDocsPager,
  getProductPageOrThrow,
  getSiteUrl,
  isExternal,
} from "@/content/site";
import type { NavItem } from "@/content/site";

const NAV_ITEMS_ALL: NavItem[] = [
  ...NAV_ITEMS,
  PRIMARY_CTA,
  ...FOOTER_GROUPS.flatMap((group) => group.items),
];

describe("rutas del sitio", () => {
  it("declara rutas únicas y con barra inicial", () => {
    expect(new Set(ROUTES).size).toBe(ROUTES.length);
    for (const route of ROUTES) {
      expect(route.startsWith("/")).toBe(true);
    }
  });

  it("rellena las etiquetas de navegación y del pie", () => {
    for (const item of NAV_ITEMS) {
      expect(item.label.trim()).not.toBe("");
    }
    for (const group of FOOTER_GROUPS) {
      expect(group.title.trim()).not.toBe("");
      expect(group.items.length).toBeGreaterThan(0);
      for (const item of group.items) {
        expect(item.label.trim()).not.toBe("");
      }
    }
  });

  it("solo enlaza rutas internas que existen en ROUTES", () => {
    for (const item of NAV_ITEMS_ALL) {
      if (!isExternal(item.href)) {
        expect(item.href.startsWith("/")).toBe(true);
        expect(ROUTES).toContain(item.href);
      }
    }
  });

  it("marca los enlaces https como externos y viceversa", () => {
    for (const item of NAV_ITEMS_ALL) {
      if (item.external) {
        expect(item.href.startsWith("https://")).toBe(true);
      }
      if (item.href.startsWith("https://")) {
        expect(item.external).toBe(true);
      }
    }
  });
});

describe("árbol de documentación", () => {
  it("declara los cinco modos con su etiqueta y en orden", () => {
    expect(DOCS_SECTIONS.map((section) => section.id)).toEqual([
      "empezar",
      "conceptos",
      "guias",
      "referencia",
      "operacion",
    ]);
    expect(DOCS_SECTIONS.map((section) => section.label)).toEqual([
      "Empezar",
      "Conceptos",
      "Guías",
      "Referencia",
      "Operación",
    ]);
  });

  it("publica la ruta de cada sección entre sus páginas y en ROUTES", () => {
    for (const section of DOCS_SECTIONS) {
      expect(section.pages.some((page) => page.path === section.path)).toBe(
        true,
      );
      expect(ROUTES).toContain(section.path);
    }

    const sectionPaths = DOCS_SECTIONS.map((section) => section.path);
    expect(new Set(sectionPaths).size).toBe(sectionPaths.length);
  });

  it("rellena slug, título y descripción de cada página", () => {
    for (const page of DOCS_PAGES) {
      expect(page.slug.trim()).not.toBe("");
      expect(page.title.trim()).not.toBe("");
      expect(page.description.trim()).not.toBe("");
    }
  });

  it("devuelve la adyacencia exacta de cada página en el pager", () => {
    DOCS_PAGES.forEach((page, index) => {
      const { previous, next } = getDocsPager(page.path);

      expect(previous).toBe(
        index > 0 ? DOCS_PAGES[index - 1] : undefined,
      );
      expect(next).toBe(
        index < DOCS_PAGES.length - 1 ? DOCS_PAGES[index + 1] : undefined,
      );
    });
  });

  it("declara páginas únicas dentro de ROUTES", () => {
    const paths = DOCS_PAGES.map((page) => page.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) {
      expect(ROUTES).toContain(path);
    }
  });

  it("asigna al menos una página existente a cada sección", () => {
    for (const section of DOCS_SECTIONS) {
      expect(section.pages.length).toBeGreaterThan(0);
      expect(ROUTES).toContain(section.path);
      for (const page of section.pages) {
        expect(DOCS_PAGES).toContain(page);
      }
    }
  });

  it("lanza al pedir una página de documentación inexistente", () => {
    expect(getDocsPageOrThrow(DOCS_PAGES[0].path)).toBe(DOCS_PAGES[0]);
    expect(() => getDocsPageOrThrow("/docs/no-existe")).toThrow(
      /no existe/,
    );
  });

  it("deja sin anterior la primera página y sin siguiente la última", () => {
    const first = DOCS_PAGES[0];
    const last = DOCS_PAGES[DOCS_PAGES.length - 1];

    expect(getDocsPager(first.path).previous).toBeUndefined();
    expect(getDocsPager(first.path).next).toBe(DOCS_PAGES[1]);
    expect(getDocsPager(last.path).next).toBeUndefined();
  });
});

describe("árbol de producto", () => {
  it("declara seis páginas de producto únicas dentro de ROUTES", () => {
    const paths = PRODUCT_PAGES.map((page) => page.path);
    expect(paths.length).toBe(6);
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) {
      expect(ROUTES).toContain(path);
    }
  });

  it("rellena slug, etiqueta, título y descripción de cada página", () => {
    for (const page of PRODUCT_PAGES) {
      expect(page.slug.trim()).not.toBe("");
      expect(page.label.trim()).not.toBe("");
      expect(page.title.trim()).not.toBe("");
      expect(page.description.trim()).not.toBe("");
      expect(page.path.startsWith("/producto")).toBe(true);
    }
  });

  it("lanza al pedir una página de producto inexistente", () => {
    expect(getProductPageOrThrow(PRODUCT_PAGES[0].path)).toBe(
      PRODUCT_PAGES[0],
    );
    expect(() => getProductPageOrThrow("/producto/no-existe")).toThrow(
      /no existe/,
    );
  });

  it("apunta la entrada Producto de la cabecera al hub", () => {
    const entry = NAV_ITEMS.find((item) => item.label === "Producto");
    expect(entry?.href).toBe("/producto");
  });
});

describe("URL del sitio", () => {
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (originalSiteUrl === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    }
  });

  it("recorta las barras finales de NEXT_PUBLIC_SITE_URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://rei.example///";
    expect(getSiteUrl()).toBe("https://rei.example");
  });

  it("cae en el fallback cuando no hay NEXT_PUBLIC_SITE_URL", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getSiteUrl()).toBe(SITE_URL_FALLBACK);
  });
});
