import type { DocBlock, DocSection } from "@/content/docs";

/** Parte no textual de un bloque: lo que debe coincidir entre idiomas. */
function skeleton(block: DocBlock): unknown {
  switch (block.kind) {
    case "paragraph":
      return { kind: block.kind };
    case "list":
      return { kind: block.kind, count: block.items.length, ordered: block.ordered };
    case "code":
      return { kind: block.kind, code: block.code, language: block.language };
    case "table":
      return {
        kind: block.kind,
        columns: block.columns.length,
        rows: block.rows.length,
      };
    case "note":
      return { kind: block.kind, tone: block.tone };
    case "links":
      return {
        kind: block.kind,
        links: block.links.map((link) => ({
          href: link.href,
          external: link.external,
        })),
      };
  }
}

/**
 * Comprueba la paridad estructural entre dos versiones de las mismas
 * secciones: mismo orden, ids, tipos de bloque, tonos, enlaces y código.
 * Solo para tests.
 */
export function docParity(base: DocSection[], other: DocSection[]): void {
  const shape = (sections: DocSection[]) =>
    sections.map((section) => ({
      id: section.id,
      blocks: section.blocks.map(skeleton),
    }));

  expect(shape(other)).toEqual(shape(base));
}
