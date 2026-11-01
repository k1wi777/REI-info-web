import { SITE_URL_FALLBACK } from "@/content/site";
import { TRANSLATED_ROUTES } from "@/content/i18n/coverage";
import {
  buildAlternateLanguages,
  buildCanonicalUrl,
  buildPageMetadata,
  getCanonicalUrl,
} from "@/lib/seo";

describe("buildCanonicalUrl", () => {
  it("une base y path con una sola barra", () => {
    expect(buildCanonicalUrl("https://example.com", "/docs")).toBe(
      "https://example.com/docs",
    );
  });

  it("recorta las barras finales de la base", () => {
    expect(buildCanonicalUrl("https://example.com///", "/docs")).toBe(
      "https://example.com/docs",
    );
  });

  it("devuelve la base sin barra final para la ruta raíz", () => {
    expect(buildCanonicalUrl("https://example.com/", "/")).toBe(
      "https://example.com",
    );
  });

  it("añade la barra inicial que falta al path", () => {
    expect(buildCanonicalUrl("https://example.com", "docs")).toBe(
      "https://example.com/docs",
    );
  });

  it("normaliza las barras repetidas entre base y path", () => {
    expect(buildCanonicalUrl("https://example.com/", "//producto")).toBe(
      "https://example.com/producto",
    );
  });
});

describe("getCanonicalUrl", () => {
  it("resuelve un path contra el fallback local", () => {
    expect(getCanonicalUrl("/docs")).toBe(`${SITE_URL_FALLBACK}/docs`);
  });

  it("no deja barra final en la home", () => {
    expect(getCanonicalUrl("/")).toBe(SITE_URL_FALLBACK);
  });
});

describe("buildPageMetadata", () => {
  it("deriva canonical, Open Graph y Twitter de un título string", () => {
    const metadata = buildPageMetadata({
      lang: "es",
      path: "/producto",
      title: "Producto",
      description: "Descripción de producto.",
    });

    expect(metadata.title).toBe("Producto");
    expect(metadata.description).toBe("Descripción de producto.");
    expect(metadata.alternates?.canonical).toBe(
      `${SITE_URL_FALLBACK}/es/producto`,
    );
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      siteName: "REI Harness",
      locale: "es_ES",
      title: "Producto",
      description: "Descripción de producto.",
      url: "/es/producto",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Producto",
      description: "Descripción de producto.",
    });
  });

  it("usa el título absolute para la tarjeta sin heredar el template", () => {
    const metadata = buildPageMetadata({
      lang: "es",
      path: "/",
      title: { absolute: "REI Harness — El código empieza después de la aprobación" },
      description: "Descripción de la home.",
    });

    expect(metadata.openGraph).toMatchObject({
      title: "REI Harness — El código empieza después de la aprobación",
    });
    expect(metadata.twitter).toMatchObject({
      title: "REI Harness — El código empieza después de la aprobación",
    });
  });

  it("omite las imágenes cuando no se reciben", () => {
    const metadata = buildPageMetadata({
      lang: "es",
      path: "/docs",
      title: "Documentación",
      description: "Descripción de docs.",
    });

    expect(metadata.openGraph?.images).toBeUndefined();
    expect(metadata.twitter?.images).toBeUndefined();
  });

  it("propaga las imágenes ya resueltas a Open Graph y Twitter", () => {
    const images = [
      {
        url: "https://example.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "REI Harness — Tu agente escribe. Tú decides.",
      },
    ];

    const metadata = buildPageMetadata(
      {
        lang: "es",
        path: "/docs",
        title: "Documentación",
        description: "Descripción de docs.",
      },
      images,
    );

    expect(metadata.openGraph?.images).toEqual(images);
    expect(metadata.twitter?.images).toEqual(images);
  });
});

describe("metadata por idioma", () => {
  const input = {
    path: "/producto",
    title: "Producto",
    description: "Descripción de producto.",
  };

  it("apunta el canonical de una ruta sin traducir en /en al español", () => {
    const metadata = buildPageMetadata({ ...input, lang: "en" });

    expect(metadata.alternates?.canonical).toBe(
      `${SITE_URL_FALLBACK}/es/producto`,
    );
    expect(metadata.alternates?.languages).toBeUndefined();
    expect(metadata.openGraph).toMatchObject({ locale: "es_ES" });
  });

  it("no declara alternates mientras solo exista el español", () => {
    expect(buildPageMetadata({ ...input, lang: "es" }).alternates?.languages)
      .toBeUndefined();
    expect(buildAlternateLanguages("https://example.com", "/producto"))
      .toBeUndefined();
  });

  describe("con una ruta traducida", () => {
    beforeEach(() => {
      (TRANSLATED_ROUTES as { en: readonly string[] }).en = ["/producto"];
    });

    afterEach(() => {
      (TRANSLATED_ROUTES as { en: readonly string[] }).en = [];
    });

    it("emite canonical propio, hreflang y locale del idioma", () => {
      const metadata = buildPageMetadata({ ...input, lang: "en" });

      expect(metadata.alternates?.canonical).toBe(
        `${SITE_URL_FALLBACK}/en/producto`,
      );
      expect(metadata.alternates?.languages).toEqual({
        es: `${SITE_URL_FALLBACK}/es/producto`,
        en: `${SITE_URL_FALLBACK}/en/producto`,
        "x-default": `${SITE_URL_FALLBACK}/es/producto`,
      });
      expect(metadata.openGraph).toMatchObject({
        locale: "en_US",
        url: "/en/producto",
      });
    });
  });
});
