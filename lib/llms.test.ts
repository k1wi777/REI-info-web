import {
  DOCS_PAGES,
  DOCUMENTED_VERSION,
  INSTALL_PAGE,
  PRODUCT_PAGES,
  RELEASES_URL,
  REPOSITORY_README_URL,
  REPOSITORY_URL,
} from "@/content/site";
import { getInstallCopy } from "@/features/installation/copy";
import { getProductCopy } from "@/features/product/copy";
import { buildLlmsTxt } from "@/lib/llms";

const BASE = "https://example.com";
const HEADINGS = [
  "Producto",
  "Documentación",
  "Empezar",
  "Referencia",
  "Operación",
  "Fuente",
];
const EXTERNAL_LINKS = new Set([
  RELEASES_URL,
  REPOSITORY_URL,
  REPOSITORY_README_URL,
]);

const text = buildLlmsTxt("es", BASE);
const links = Array.from(
  text.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g),
  (match) => match[1],
);

describe("buildLlmsTxt", () => {
  it("empieza por el nombre del producto", () => {
    expect(text.startsWith("# REI Harness\n")).toBe(true);
  });

  it("incluye las seis secciones en orden", () => {
    const positions = HEADINGS.map((heading) => text.indexOf(`## ${heading}`));

    expect(positions.every((position) => position !== -1)).toBe(true);
    expect(positions).toEqual([...positions].sort((left, right) => left - right));
  });

  it("incluye cada página de producto con título y URL canónica", () => {
    for (const page of PRODUCT_PAGES) {
      const { title } = getProductCopy("es").pages[page.slug];
      expect(text).toContain(`[${title}](${BASE}/es${page.path})`);
    }
  });

  it("incluye la página de instalación en Empezar, antes de la docs", () => {
    const entry = `[${getInstallCopy("es").meta.title}](${BASE}/es${INSTALL_PAGE.path})`;
    const start = text.indexOf("## Empezar");

    expect(text).toContain(entry);
    expect(text.indexOf(entry)).toBeGreaterThan(start);
    expect(text.indexOf(entry)).toBeLessThan(text.indexOf("[Instalación]"));
  });

  it("incluye cada página de documentación con título y URL canónica", () => {
    for (const page of DOCS_PAGES) {
      expect(text).toContain(`[${page.title}](${BASE}/es${page.path})`);
    }
  });

  it("emite todas las URLs absolutas y válidas", () => {
    expect(links.length).toBeGreaterThan(0);

    for (const link of links) {
      const url = new URL(link);

      expect(url.protocol).toBe("https:");
    }
  });

  it("construye las rutas internas sobre la base recibida", () => {
    const internal = links.filter((link) => !EXTERNAL_LINKS.has(link));

    expect(internal.length).toBeGreaterThan(0);

    for (const link of internal) {
      expect(link.startsWith(`${BASE}/`)).toBe(true);
    }
  });

  it("no repite URLs", () => {
    expect(links).toHaveLength(new Set(links).size);
  });

  it("incluye la versión documentada y la fuente de versiones", () => {
    expect(text).toContain(DOCUMENTED_VERSION);
    expect(text).toContain(`[Releases de REI Harness](${RELEASES_URL})`);
  });

  it("respeta el formato estable", () => {
    expect(text.endsWith("\n")).toBe(true);
    expect(text.endsWith("\n\n")).toBe(false);
    expect(text.split("\n").some((line) => line !== line.trimEnd())).toBe(false);
  });
});

describe("buildLlmsTxt en inglés", () => {
  const english = buildLlmsTxt("en", BASE);

  it("traduce cabecera y secciones", () => {
    expect(english.startsWith("# REI Harness\n")).toBe(true);
    for (const heading of [
      "Product",
      "Documentation",
      "Get started",
      "Reference",
      "Operations",
      "Source",
    ]) {
      expect(english).toContain(`## ${heading}`);
    }
    expect(english).toContain("Documented version:");
    expect(english).not.toContain("## Producto");
  });

  it("enlaza a la versión en español las páginas sin traducir", () => {
    expect(english).toContain(`(${BASE}/es/docs/conceptos)`);
    // Bajo /en solo están traducidos producto, instalación y docs (Empezar).
    const englishLinks = english.match(new RegExp(`${BASE}/en/[^)]*`, "g"));
    expect(englishLinks).toEqual([
      ...PRODUCT_PAGES.map((page) => `${BASE}/en${page.path}`),
      `${BASE}/en/docs`,
      `${BASE}/en/instalar`,
      `${BASE}/en/docs/empezar/instalacion`,
      `${BASE}/en/docs/empezar/primer-work-item`,
    ]);
  });

  it("describe las páginas de producto en inglés", () => {
    for (const page of PRODUCT_PAGES) {
      const { title } = getProductCopy("en").pages[page.slug];
      expect(english).toContain(`[${title}](${BASE}/en${page.path})`);
    }
  });

  it("describe la instalación en inglés", () => {
    const { title } = getInstallCopy("en").meta;
    expect(english).toContain(`[${title}](${BASE}/en/instalar)`);
  });

  it("mantiene el formato estable", () => {
    expect(english.endsWith("\n")).toBe(true);
    expect(english.endsWith("\n\n")).toBe(false);
  });
});
