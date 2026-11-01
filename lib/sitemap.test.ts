import { TRANSLATED_ROUTES } from "@/content/i18n/coverage";
import { ROUTES } from "@/content/site";
import { buildSitemap } from "@/lib/sitemap";

const BASE = "https://example.com";
const mutableRoutes = TRANSLATED_ROUTES as { en: readonly string[] };

afterEach(() => {
  mutableRoutes.en = [];
});

describe("buildSitemap", () => {
  it("lista cada ruta bajo /es y ninguna en /en mientras no haya traducción", () => {
    const urls = buildSitemap(BASE).map((entry) => entry.url);

    expect(urls).toHaveLength(ROUTES.length);
    expect(urls.every((url) => url.startsWith(`${BASE}/es`))).toBe(true);
    expect(urls).toContain(`${BASE}/es`);
    expect(urls).toContain(`${BASE}/es/instalar`);
  });

  it("no declara alternates para rutas solo en español", () => {
    for (const entry of buildSitemap(BASE)) {
      expect(entry.alternates).toBeUndefined();
    }
  });

  it("añade las URLs de /en y los alternates de las rutas traducidas", () => {
    mutableRoutes.en = ["/instalar"];
    const entries = buildSitemap(BASE);
    const urls = entries.map((entry) => entry.url);

    expect(urls).toHaveLength(ROUTES.length + 1);
    expect(urls).toContain(`${BASE}/en/instalar`);

    const translated = entries.filter((entry) =>
      entry.url.endsWith("/instalar"),
    );
    expect(translated).toHaveLength(2);
    for (const entry of translated) {
      expect(entry.alternates?.languages).toEqual({
        es: `${BASE}/es/instalar`,
        en: `${BASE}/en/instalar`,
        "x-default": `${BASE}/es/instalar`,
      });
    }
  });

  it("no repite URLs", () => {
    mutableRoutes.en = [...ROUTES];
    const urls = buildSitemap(BASE).map((entry) => entry.url);

    expect(urls).toHaveLength(ROUTES.length * 2);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
