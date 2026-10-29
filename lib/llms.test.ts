import {
  DOCS_PAGES,
  DOCUMENTED_VERSION,
  PRODUCT_PAGES,
  RELEASES_URL,
  REPOSITORY_README_URL,
  REPOSITORY_URL,
} from "@/content/site";
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

const text = buildLlmsTxt(BASE);
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
      expect(text).toContain(`[${page.title}](${BASE}${page.path})`);
    }
  });

  it("incluye cada página de documentación con título y URL canónica", () => {
    for (const page of DOCS_PAGES) {
      expect(text).toContain(`[${page.title}](${BASE}${page.path})`);
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
