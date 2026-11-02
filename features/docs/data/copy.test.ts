import type { DocBlock } from "@/content/docs";
import {
  TRANSLATED_DOCS_MODES,
  TRANSLATED_DOCS_PATHS,
  UNTRANSLATED_DOCS_PATHS,
} from "@/content/i18n/coverage";
import { DOCS_SECTIONS } from "@/content/site";
import { getDocsDocument } from "@/features/docs/copy/documents";
import { MODE_LANDINGS_EN, getDocsModeLandingCopy } from "@/features/docs/copy/modes";
import { DOCUMENTS_EN } from "@/features/docs/copy/pages";
import { DOCS_MODE_LANDINGS } from "@/features/docs/data/modes";
import { DOCS_DOCUMENTS } from "@/features/docs/data/pages";
import type { DocsContentPath, DocsModeId } from "@/features/docs/types";

const PATHS = Object.keys(DOCUMENTS_EN) as DocsContentPath[];

/** Forma de un bloque sin su prosa: lo que debe coincidir entre idiomas. */
function shape(block: DocBlock): unknown {
  switch (block.kind) {
    case "paragraph":
      return { kind: block.kind };
    case "list":
      return { kind: block.kind, ordered: !!block.ordered, n: block.items.length };
    case "code":
      return { kind: block.kind, code: block.code, language: block.language };
    case "table":
      return {
        kind: block.kind,
        columns: block.columns.length,
        rows: block.rows.map((row) => row.length),
      };
    case "note":
      return { kind: block.kind, tone: block.tone };
    case "links":
      return {
        kind: block.kind,
        links: block.links.map((link) => [link.href, !!link.external]),
      };
  }
}

function strings(block: DocBlock): string[] {
  switch (block.kind) {
    case "paragraph":
      return [block.text];
    case "list":
      return block.items;
    case "code":
      return [];
    case "table":
      return [...block.columns, ...block.rows.flat()];
    case "note":
      return [block.title, block.text];
    case "links":
      return block.links.map((link) => link.label);
  }
}

function tokens(blocks: DocBlock[]): string[] {
  return blocks
    .flatMap(strings)
    .flatMap((text) => text.match(/`[^`]+`/g) ?? [])
    .sort();
}

describe("cobertura de documentos en inglés", () => {
  it("hay un documento en inglés por cada ruta de contenido traducida", () => {
    const translated = (TRANSLATED_DOCS_PATHS as readonly string[]).filter(
      (path) => path in DOCS_DOCUMENTS,
    );

    expect([...PATHS].sort()).toEqual([...translated].sort());
  });

  it("cada ruta del árbol está en exactamente una lista, salvo en modos sin registrar", () => {
    for (const section of DOCS_SECTIONS) {
      const registered = (TRANSLATED_DOCS_MODES as readonly string[]).includes(
        section.id,
      );

      for (const page of section.pages) {
        const translated = (TRANSLATED_DOCS_PATHS as readonly string[]).includes(
          page.path,
        );
        const untranslated = (
          UNTRANSLATED_DOCS_PATHS as readonly string[]
        ).includes(page.path);

        expect(translated && untranslated).toBe(false);
        if (registered) expect(translated || untranslated).toBe(true);
      }
    }
  });

  it("los cuatro modos están registrados y solo la FAQ queda en español", () => {
    for (const mode of ["conceptos", "guias", "referencia", "operacion"]) {
      expect(TRANSLATED_DOCS_MODES).toContain(mode);
    }
    expect(UNTRANSLATED_DOCS_PATHS).toEqual(["/docs/operacion/faq"]);
  });
});

describe.each(PATHS)("documento %s", (path) => {
  const es = DOCS_DOCUMENTS[path];
  const en = DOCUMENTS_EN[path];

  it("conserva secciones, ids y forma de bloques entre idiomas", () => {
    expect(en.sections.map((section) => section.id)).toEqual(
      es.sections.map((section) => section.id),
    );
    en.sections.forEach((section, index) => {
      expect(section.blocks.map(shape)).toEqual(
        es.sections[index].blocks.map(shape),
      );
    });
  });

  it("conserva los tokens entre backticks de cada sección", () => {
    en.sections.forEach((section, index) => {
      expect(tokens(section.blocks)).toEqual(tokens(es.sections[index].blocks));
    });
  });

  it("tiene textos no vacíos", () => {
    expect(en.eyebrow.trim()).not.toBe("");
    for (const section of en.sections) {
      expect(section.title.trim()).not.toBe("");
      for (const text of section.blocks.flatMap(strings)) {
        expect(text.trim()).not.toBe("");
      }
    }
  });

  it("se resuelve por idioma", () => {
    expect(getDocsDocument(path, "es")).toBe(es);
    expect(getDocsDocument(path, "en")).toEqual({ path, ...en });
  });
});

describe("landings de modo en inglés", () => {
  const MODES = Object.keys(MODE_LANDINGS_EN) as DocsModeId[];

  it("hay una landing por cada modo de contenido registrado", () => {
    expect([...MODES].sort()).toEqual(
      ["conceptos", "guias", "operacion", "referencia"].sort(),
    );
  });

  it.each(MODES)("%s conserva la forma y los enlaces del español", (mode) => {
    const es = DOCS_MODE_LANDINGS[mode];
    const en = MODE_LANDINGS_EN[mode as keyof typeof MODE_LANDINGS_EN];

    expect(en.intro.trim()).not.toBe("");
    expect((en.outro ?? []).map(shape)).toEqual((es.outro ?? []).map(shape));
    expect(getDocsModeLandingCopy(mode, "en")).toBe(en);
    expect(getDocsModeLandingCopy(mode, "es")).toBe(es);
  });
});
