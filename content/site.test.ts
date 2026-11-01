import {
  DOCS_PAGES,
  DOCS_SECTIONS,
  DOCUMENTED_VERSION_DATE,
  FOOTER_GROUPS,
  INSTALL_PAGE,
  INSTALL_PATH,
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
import type { LinkTarget } from "@/content/site";

const NAV_ITEMS_ALL: LinkTarget<string>[] = [
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

  it("identifica cada elemento de navegación y del pie con un id único", () => {
    const navIds = NAV_ITEMS.map((item) => item.id);
    expect(new Set(navIds).size).toBe(navIds.length);
    for (const group of FOOTER_GROUPS) {
      expect(group.items.length).toBeGreaterThan(0);
      const ids = group.items.map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
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

describe("página de instalación", () => {
  it("publica /instalar en ROUTES, una sola vez", () => {
    expect(INSTALL_PATH).toBe("/instalar");
    expect(INSTALL_PAGE.path).toBe(INSTALL_PATH);
    expect(ROUTES.filter((route) => route === INSTALL_PATH)).toHaveLength(1);
  });

  it("lleva el CTA primario y el pie a /instalar", () => {
    expect(PRIMARY_CTA.href).toBe(INSTALL_PATH);
    const footer = FOOTER_GROUPS.flatMap((group) => group.items);
    expect(footer.some((item) => item.href === INSTALL_PATH)).toBe(true);
  });

  it("mantiene la instalación de la documentación como ruta distinta", () => {
    expect(ROUTES).toContain("/docs/empezar/instalacion");
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

  it("abre cada sección por su landing", () => {
    for (const section of DOCS_SECTIONS) {
      expect(section.pages[0].path).toBe(section.path);
    }
  });

  it("publica las rutas nuevas de Referencia y Operación", () => {
    const newPaths = [
      "/docs/referencia",
      "/docs/referencia/comandos",
      "/docs/referencia/configuracion",
      "/docs/referencia/meta",
      "/docs/referencia/estados",
      "/docs/referencia/plantillas",
      "/docs/referencia/adaptadores",
      "/docs/operacion",
      "/docs/operacion/troubleshooting",
      "/docs/operacion/faq",
      "/docs/operacion/changelog",
    ];

    for (const path of newPaths) {
      expect(ROUTES).toContain(path);
    }
  });

  it("declara la fecha de la versión documentada en ISO", () => {
    expect(DOCUMENTED_VERSION_DATE).toMatch(/^\d{4}-\d{2}-\d{2}$/);
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
    const entry = NAV_ITEMS.find((item) => item.id === "product");
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
