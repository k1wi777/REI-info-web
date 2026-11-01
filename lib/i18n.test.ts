import {
  DEFAULT_LOCALE,
  LOCALES,
  getLocaleFromPathname,
  isLocale,
  isLocalizableHref,
  localizePath,
  stripLocale,
  swapLocale,
} from "@/lib/i18n";

describe("isLocale", () => {
  it("acepta solo es y en", () => {
    expect(LOCALES).toEqual(["es", "en"]);
    expect(DEFAULT_LOCALE).toBe("es");
    expect(isLocale("es")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});

describe("getLocaleFromPathname", () => {
  it("lee el primer segmento", () => {
    expect(getLocaleFromPathname("/en/docs")).toBe("en");
    expect(getLocaleFromPathname("/es")).toBe("es");
    expect(getLocaleFromPathname("/docs/es")).toBeUndefined();
    expect(getLocaleFromPathname("/")).toBeUndefined();
    expect(getLocaleFromPathname("/english")).toBeUndefined();
  });
});

describe("stripLocale", () => {
  it("quita el prefijo y deja la raíz como /", () => {
    expect(stripLocale("/es/docs/guias")).toBe("/docs/guias");
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/en/")).toBe("/");
  });

  it("no toca paths sin idioma", () => {
    expect(stripLocale("/docs")).toBe("/docs");
    expect(stripLocale("/")).toBe("/");
    expect(stripLocale("/english/x")).toBe("/english/x");
  });
});

describe("localizePath", () => {
  it("antepone el idioma", () => {
    expect(localizePath("es", "/")).toBe("/es");
    expect(localizePath("en", "/instalar")).toBe("/en/instalar");
    expect(localizePath("en", "/docs/referencia/")).toBe(
      "/en/docs/referencia",
    );
  });

  it("es idempotente y reemplaza un prefijo existente", () => {
    expect(localizePath("es", "/es/docs")).toBe("/es/docs");
    expect(localizePath("en", "/es/docs")).toBe("/en/docs");
  });

  it("conserva query y hash", () => {
    expect(localizePath("en", "/docs#estados")).toBe("/en/docs#estados");
    expect(localizePath("en", "/docs?a=1#x")).toBe("/en/docs?a=1#x");
    expect(localizePath("en", "/#top")).toBe("/en#top");
  });
});

describe("swapLocale", () => {
  it("lleva a la misma página en el otro idioma", () => {
    expect(swapLocale("/es/docs/guias/visor", "en")).toBe(
      "/en/docs/guias/visor",
    );
    expect(swapLocale("/en", "es")).toBe("/es");
    expect(swapLocale("/en/producto", "es")).toBe("/es/producto");
  });

  it("es su propia inversa", () => {
    const path = "/es/docs/operacion/faq";
    expect(swapLocale(swapLocale(path, "en"), "es")).toBe(path);
  });
});

describe("isLocalizableHref", () => {
  it("solo acepta paths internos", () => {
    expect(isLocalizableHref("/docs")).toBe(true);
    expect(isLocalizableHref("#contenido")).toBe(false);
    expect(isLocalizableHref("https://example.com")).toBe(false);
    expect(isLocalizableHref("//cdn.example.com")).toBe(false);
    expect(isLocalizableHref("mailto:a@b.c")).toBe(false);
  });
});
