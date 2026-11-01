import { en } from "@/features/home/copy/en";
import { es } from "@/features/home/copy/es";
import { getHomeCopy } from "@/features/home/copy";
import { buildAgentNodes, buildGateDemo, buildTerminalSnapshot } from "@/features/home/data/demos";
import { EVIDENCE_MANIFEST } from "@/features/home/data/evidence";
import { buildFinalCta } from "@/features/home/data/home";
import { LOCALES } from "@/lib/i18n";

type Leaf = string | ((...args: never[]) => string);

function paths(value: unknown, prefix = ""): string[] {
  if (typeof value === "function" || typeof value === "string") {
    return [prefix];
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

function leaves(value: unknown): Leaf[] {
  if (typeof value === "function" || typeof value === "string") {
    return [value as Leaf];
  }
  return Object.values(value as Record<string, unknown>).flatMap(leaves);
}

/** Literales que ningún idioma traduce: comandos, estados y archivos. */
const UNTRANSLATED = [
  "rei items status",
  "in_progress",
  "rei init",
  "rei github enable",
  "pnpm capture:evidence",
];

describe("copy de la home", () => {
  it("tiene la misma estructura en es y en", () => {
    expect(paths(en)).toEqual(paths(es));
  });

  it("no deja textos vacíos", () => {
    for (const copy of [es, en]) {
      for (const leaf of leaves(copy)) {
        if (typeof leaf === "string") {
          expect(leaf.trim()).not.toBe("");
        }
      }
    }
  });

  it("devuelve la copy de cada idioma", () => {
    for (const lang of LOCALES) {
      expect(getHomeCopy(lang)).toBe(lang === "es" ? es : en);
    }
  });

  it("traduce de verdad: la prosa difiere entre idiomas", () => {
    expect(en.hero.lede).not.toBe(es.hero.lede);
    expect(en.cta.title).not.toBe(es.cta.title);
    expect(en.problem.title).not.toBe(es.problem.title);
    expect(en.process.items[0].title).not.toBe(es.process.items[0].title);
  });

  it("cubre todas las capturas del manifiesto en ambos idiomas", () => {
    const ids = EVIDENCE_MANIFEST.captures.map((capture) => capture.id).sort();

    for (const copy of [es, en]) {
      expect(Object.keys(copy.captures).sort()).toEqual(ids);
      for (const text of Object.values(copy.captures)) {
        expect(text.alt.trim()).not.toBe("");
        expect(text.description.trim()).not.toBe("");
      }
    }
  });

  it("el español conserva el texto del manifiesto", () => {
    for (const capture of EVIDENCE_MANIFEST.captures) {
      expect(es.captures[capture.id]).toEqual({
        alt: capture.alt,
        description: capture.description,
      });
    }
  });

  it("conserva sin traducir los literales de comandos y estados", () => {
    const texts = (copy: typeof es) =>
      leaves(copy)
        .filter((leaf): leaf is string => typeof leaf === "string")
        .join("\n");

    for (const literal of UNTRANSLATED) {
      expect(texts(es)).toContain(literal);
      expect(texts(en)).toContain(literal);
    }
  });
});

describe("elementos intactos entre idiomas", () => {
  it("la salida simulada de la terminal es idéntica salvo la nota", () => {
    const output = (lang: "es" | "en") =>
      buildTerminalSnapshot(getHomeCopy(lang).terminal).lines.filter(
        (line) => line.kind !== "note",
      );

    expect(output("en")).toEqual(output("es"));
  });

  it("los estados, roles y artefactos de la puerta son los mismos", () => {
    const shape = (lang: "es" | "en") =>
      buildGateDemo(getHomeCopy(lang).gate).map((stage) => ({
        id: stage.id,
        state: stage.state,
        roleId: stage.roleId,
        artifacts: stage.artifacts?.map((artifact) => artifact.name),
      }));

    expect(shape("en")).toEqual(shape("es"));
  });

  it("los nodos de agentes conservan roles y ramas", () => {
    const shape = (lang: "es" | "en") =>
      buildAgentNodes(getHomeCopy(lang).agents.handoffs).map((node) => ({
        roleId: node.roleId,
        branch: node.branch,
      }));

    expect(shape("en")).toEqual(shape("es"));
  });

  it("los destinos del CTA final no dependen del idioma", () => {
    const hrefs = (lang: "es" | "en") => {
      const cta = buildFinalCta(getHomeCopy(lang).cta);
      return [cta.primary.href, cta.secondary.href];
    };

    expect(hrefs("en")).toEqual(hrefs("es"));
  });
});
