import { buildLegacyRedirects } from "@/content/i18n/redirects";
import { ROUTES } from "@/content/site";

const rules = buildLegacyRedirects();

/** Resuelve una regla de Next (`:path*`) contra un path concreto. */
function apply(path: string): string | undefined {
  for (const rule of rules) {
    if (rule.source === path) {
      return rule.destination.replace("/:path*", "");
    }
    if (rule.source.endsWith("/:path*")) {
      const prefix = rule.source.replace("/:path*", "");
      if (path === prefix || path.startsWith(`${prefix}/`)) {
        return rule.destination
          .replace(":path*", path.slice(prefix.length + 1))
          .replace(/\/$/, "");
      }
    }
  }
  return undefined;
}

describe("redirecciones de URLs sin idioma", () => {
  it("son todas permanentes", () => {
    expect(rules.length).toBeGreaterThan(0);
    for (const rule of rules) {
      expect(rule.permanent).toBe(true);
    }
  });

  it("llevan la raíz y llms.txt a /es", () => {
    expect(apply("/")).toBe("/es");
    expect(apply("/llms.txt")).toBe("/es/llms.txt");
  });

  it("llevan cada ruta pública existente a su equivalente en /es", () => {
    for (const route of ROUTES.filter((path) => path !== "/")) {
      expect(apply(route)).toBe(`/es${route}`);
    }
  });

  it("no capturan las rutas que ya llevan idioma", () => {
    expect(apply("/es")).toBeUndefined();
    expect(apply("/en/docs")).toBeUndefined();
    expect(apply("/es/docs")).toBeUndefined();
  });

  it("no usan comodines genéricos que choquen con /es y /en", () => {
    for (const rule of rules) {
      expect(rule.source).not.toBe("/:path*");
    }
  });
});
