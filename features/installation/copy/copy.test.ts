import { getInstallCopy } from "@/features/installation/copy";
import { en } from "@/features/installation/copy/en";
import { es } from "@/features/installation/copy/es";
import { INSTALL_STEP_COMMANDS } from "@/features/installation/data/installation";
import { LOCALES } from "@/lib/i18n";
import { OS_IDS } from "@/lib/release";

function paths(value: unknown, prefix = ""): string[] {
  if (typeof value === "function" || typeof value === "string") {
    return [prefix];
  }
  if (value === null) {
    return [`${prefix}:null`];
  }
  if (Array.isArray(value)) {
    return [
      `${prefix}[${value.length}]`,
      ...value.flatMap((child, index) => paths(child, `${prefix}[${index}]`)),
    ];
  }
  return Object.entries(value as Record<string, unknown>).flatMap(
    ([key, child]) => paths(child, prefix ? `${prefix}.${key}` : key),
  );
}

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (value === null || typeof value === "function") return [];
  return Object.values(value as Record<string, unknown>).flatMap(strings);
}

function hasFunction(value: unknown): boolean {
  if (typeof value === "function") return true;
  if (value === null || typeof value !== "object") return false;
  return Object.values(value as Record<string, unknown>).some(hasFunction);
}

describe("copy de instalar", () => {
  it("tiene la misma estructura en es y en", () => {
    expect(paths(en)).toEqual(paths(es));
  });

  it("no deja textos vacíos", () => {
    for (const copy of [es, en]) {
      for (const text of strings(copy)) {
        expect(text.trim()).not.toBe("");
      }
    }
  });

  it("devuelve la copy de cada idioma", () => {
    for (const lang of LOCALES) {
      expect(getInstallCopy(lang)).toBe(lang === "es" ? es : en);
    }
  });

  it("el instalador solo lleva datos serializables (cruza a un componente cliente)", () => {
    expect(hasFunction(es.installer)).toBe(false);
    expect(hasFunction(en.installer)).toBe(false);
  });

  it("traduce de verdad: la prosa difiere entre idiomas", () => {
    expect(en.meta.title).not.toBe(es.meta.title);
    expect(en.meta.description).not.toBe(es.meta.description);
    expect(en.installer.download.download).not.toBe(
      es.installer.download.download,
    );
  });

  it("define un texto por cada comando de paso en ambos idiomas", () => {
    for (const copy of [es, en]) {
      for (const os of OS_IDS) {
        expect(copy.installer.steps[os]).toHaveLength(
          INSTALL_STEP_COMMANDS[os].length,
        );
      }
    }
  });

  it("conserva sin traducir comandos y nombres de archivo", () => {
    const joined = (copy: typeof es) => strings(copy).join("\n");

    for (const literal of [
      "uname -m",
      "rei update",
      "rei update --check",
      "~/.local/bin",
      "rei.exe",
      ".zip",
      "checksum",
    ]) {
      expect(joined(es)).toContain(literal);
      expect(joined(en)).toContain(literal);
    }
  });
});
