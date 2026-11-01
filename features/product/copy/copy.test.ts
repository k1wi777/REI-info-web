import {
  AGENT_ROLES,
  APPROVAL_GATE,
  COMMANDS,
  STATE_TRANSITIONS,
  WORK_ITEM_STATES,
} from "@/content/rei";
import { PRODUCT_PAGES } from "@/content/site";
import { getProductCopy, getProductDocument } from "@/features/product/copy";
import { en } from "@/features/product/copy/en";
import { es } from "@/features/product/copy/es";
import {
  PRODUCT_CAPTURE_IDS,
  PRODUCT_COMMAND_IDS,
} from "@/features/product/copy/types";
import { ARTIFACT_ENTRIES } from "@/features/product/data/artifacts";
import { CLI_SAMPLES } from "@/features/product/data/cli";
import { EVIDENCE } from "@/features/product/data/evidence";
import { LOCALES } from "@/lib/i18n";
import manifest from "@/public/evidence/manifest.json";

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
  if (value === null || typeof value !== "object") return [];
  return Object.values(value as Record<string, unknown>).flatMap(strings);
}

function hasFunction(value: unknown): boolean {
  if (typeof value === "function") return true;
  if (value === null || typeof value !== "object") return false;
  return Object.values(value as Record<string, unknown>).some(hasFunction);
}

/** Marcadores `{nombre}` de una cadena, ordenados. */
function markers(text: string): string[] {
  return (text.match(/\{\w+\}/g) ?? []).sort();
}

/** Campos que identifican la estructura de un bloque y no se traducen. */
function skeleton(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(skeleton);
  if (value === null || typeof value !== "object") return undefined;

  const block = value as Record<string, unknown>;
  const kept: Record<string, unknown> = {};
  for (const key of [
    "id",
    "kind",
    "variant",
    "tone",
    "weight",
    "gate",
    "number",
    "href",
    "external",
    "language",
    "code",
    "roles",
    "states",
    "ids",
    "ordered",
    "planning",
  ]) {
    if (key in block) kept[key] = block[key];
  }
  for (const key of [
    "sections",
    "blocks",
    "actions",
    "links",
    "points",
    "choices",
    "items",
    "next",
  ]) {
    if (key in block) kept[key] = skeleton(block[key]);
  }
  return kept;
}

describe("copy de producto", () => {
  it("tiene la misma estructura en es y en", () => {
    expect(paths(en)).toEqual(paths(es));
  });

  it("no deja textos vacíos, salvo avisos opcionales nulos", () => {
    for (const copy of [es, en]) {
      for (const text of strings(copy)) {
        expect(text.trim()).not.toBe("");
      }
    }
  });

  it("devuelve la copy de cada idioma", () => {
    for (const lang of LOCALES) {
      expect(getProductCopy(lang)).toBe(lang === "es" ? es : en);
    }
  });

  it("traduce de verdad: la prosa difiere entre idiomas", () => {
    expect(en.pages.producto.title).not.toBe(es.pages.producto.title);
    expect(en.gate.detail).not.toBe(es.gate.detail);
    expect(en.cycle.footer).not.toBe(es.cycle.footer);
    expect(en.cli.outputLanguageNote).not.toBeNull();
    expect(es.cli.outputLanguageNote).toBeNull();
  });

  it("mantiene los mismos marcadores de plantilla en ambos idiomas", () => {
    const pairs = (a: unknown, b: unknown): [string, string][] => {
      const left = paths(a);
      const right = paths(b);
      expect(left).toEqual(right);
      const flat = (v: unknown, prefix = ""): Record<string, string> =>
        typeof v === "string"
          ? { [prefix]: v }
          : v && typeof v === "object"
            ? Object.assign(
                {},
                ...Object.entries(v).map(([k, c]) =>
                  flat(c, prefix ? `${prefix}.${k}` : k),
                ),
              )
            : {};
      const fa = flat(a);
      const fb = flat(b);
      return Object.keys(fa).map((key) => [fa[key], fb[key]]);
    };

    const { documents: _esDocs, ...esRest } = es;
    const { documents: _enDocs, ...enRest } = en;
    void _esDocs;
    void _enDocs;

    for (const [spanish, english] of pairs(esRest, enRest)) {
      expect(markers(english)).toEqual(markers(spanish));
    }
  });

  it("la simulación del ciclo solo lleva datos serializables (cruza a un componente cliente)", () => {
    expect(hasFunction(es.cycle)).toBe(false);
    expect(hasFunction(en.cycle)).toBe(false);
  });
});

describe("documentos de producto por idioma", () => {
  it("comparten esqueleto: secciones, bloques, ids, enlaces y roles", () => {
    for (const page of PRODUCT_PAGES) {
      expect(skeleton(getProductDocument(page.slug, "en"))).toEqual(
        skeleton(getProductDocument(page.slug, "es")),
      );
    }
  });

  it("tienen el mismo número de datos de ficha y el mismo texto de código", () => {
    for (const page of PRODUCT_PAGES) {
      const spanish = getProductDocument(page.slug, "es");
      const english = getProductDocument(page.slug, "en");
      expect(english.facts).toHaveLength(spanish.facts.length);
      expect(english.meta === undefined).toBe(spanish.meta === undefined);
    }
  });
});

describe("claves por id frente a content/rei y los datos", () => {
  it("define roles, estados y comandos con las mismas claves que su origen", () => {
    for (const copy of [es, en]) {
      expect(Object.keys(copy.roles).sort()).toEqual(
        AGENT_ROLES.map((role) => role.id).sort(),
      );
      expect(Object.keys(copy.states).sort()).toEqual(
        WORK_ITEM_STATES.map((state) => state.id).sort(),
      );
      expect(Object.keys(copy.commands).sort()).toEqual(
        [...PRODUCT_COMMAND_IDS].sort(),
      );
      for (const id of PRODUCT_COMMAND_IDS) {
        expect(COMMANDS.some((command) => command.id === id)).toBe(true);
      }
    }
  });

  it("el español repite sin deriva el texto de content/rei que consume", () => {
    for (const role of AGENT_ROLES) {
      expect(es.roles[role.id]).toEqual({
        responsibility: role.responsibility,
        when: role.when,
        limit: role.limit,
      });
    }
    for (const state of WORK_ITEM_STATES) {
      expect(es.states[state.id]).toBe(state.meaning);
    }
    for (const id of PRODUCT_COMMAND_IDS) {
      expect(es.commands[id]).toBe(
        COMMANDS.find((command) => command.id === id)?.summary,
      );
    }
    expect(es.gate).toEqual({
      label: APPROVAL_GATE.label,
      status: APPROVAL_GATE.status,
      detail: APPROVAL_GATE.detail,
    });
  });

  it("cubre cada arista del workflow con su nota", () => {
    const keys = STATE_TRANSITIONS.map(
      (transition) => `${transition.from}>${transition.to}`,
    ).sort();
    for (const copy of [es, en]) {
      expect(Object.keys(copy.cycle.transitionNotes).sort()).toEqual(keys);
    }
    for (const transition of STATE_TRANSITIONS) {
      expect(es.cycle.transitionNotes[`${transition.from}>${transition.to}`]).toBe(
        transition.note,
      );
    }
  });

  it("cubre cada fuente, documento del árbol, salida del CLI y captura", () => {
    for (const copy of [es, en]) {
      expect(Object.keys(copy.evidence.sources).sort()).toEqual(
        EVIDENCE.map((source) => source.id).sort(),
      );
      expect(Object.keys(copy.artifacts.entries).sort()).toEqual(
        ARTIFACT_ENTRIES.map((entry) => entry.id).sort(),
      );
      expect(Object.keys(copy.cli.notes).sort()).toEqual(
        CLI_SAMPLES.map((sample) => sample.id).sort(),
      );
      expect(Object.keys(copy.captures).sort()).toEqual(
        manifest.captures.map((capture) => capture.id).sort(),
      );
    }
    expect([...PRODUCT_CAPTURE_IDS].sort()).toEqual(
      manifest.captures.map((capture) => capture.id).sort(),
    );
  });

  it("conserva sin traducir los literales del arnés", () => {
    const joined = (copy: typeof es) => strings(copy).join("\n");

    for (const literal of [
      "in_progress",
      "pending",
      "changes_requested",
      "rei init",
      "`rei status set <id> in_progress`",
      "`.rei/`",
      "meta.json",
      "links.json",
      "rei github enable --repo owner/name --base main --strategy squash",
    ]) {
      expect(joined(es)).toContain(literal);
      expect(joined(en)).toContain(literal);
    }
  });
});
