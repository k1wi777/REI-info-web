import { sectionsToToc } from "@/content/docs";
import { WORK_ITEM_STATES } from "@/content/rei";
import { DOCS_SECTIONS, ROUTES } from "@/content/site";
import { DOCS_MODE_LANDINGS } from "@/features/docs/data/modes";
import { DOCS_DOCUMENTS } from "@/features/docs/data/pages";
import type { DocsContentPath } from "@/features/docs/types";

const MODE_IDS = ["conceptos", "guias"] as const;

const CONTENT_PAGES = DOCS_SECTIONS.filter(
  (section) => section.id === "conceptos" || section.id === "guias",
).flatMap((section) =>
  section.pages.filter((page) => page.path !== section.path),
);

const GUIDE_PATHS: DocsContentPath[] = [
  "/docs/guias/github",
  "/docs/guias/visor",
  "/docs/guias/checks",
  "/docs/guias/actualizar",
];

const GUIDE_SKELETON = [
  "cuando-usarla",
  "requisitos",
  "pasos",
  "verificacion",
  "limites",
  "siguiente-paso",
];

const DOCUMENTS = Object.values(DOCS_DOCUMENTS);

describe("documentos de Conceptos y Guías", () => {
  it("registra un documento por página publicada, sin landings", () => {
    expect(Object.keys(DOCS_DOCUMENTS).sort()).toEqual(
      CONTENT_PAGES.map((page) => page.path).sort(),
    );
    expect(CONTENT_PAGES.length).toBe(8);
  });

  it("comparte ruta entre documento y página y declara eyebrow", () => {
    for (const path of Object.keys(DOCS_DOCUMENTS) as DocsContentPath[]) {
      const document = DOCS_DOCUMENTS[path];
      const page = CONTENT_PAGES.find((candidate) => candidate.path === path);

      expect(page).toBeDefined();
      expect(document.path).toBe(path);
      expect(document.eyebrow.trim()).not.toBe("");
    }
  });

  it("usa al menos dos secciones con id único, título y bloques", () => {
    for (const document of DOCUMENTS) {
      expect(document.sections.length).toBeGreaterThanOrEqual(2);

      const ids = document.sections.map((section) => section.id);
      expect(new Set(ids).size).toBe(ids.length);

      for (const section of document.sections) {
        expect(section.id.trim()).not.toBe("");
        expect(section.title.trim()).not.toBe("");
        expect(section.blocks.length).toBeGreaterThan(0);
      }
    }
  });

  it("deriva el TOC de las secciones en orden y sin ids repetidos", () => {
    for (const document of DOCUMENTS) {
      const toc = sectionsToToc(document.sections);

      expect(toc).toEqual(
        document.sections.map(({ id, title }) => ({ id, title })),
      );
      expect(new Set(toc.map((item) => item.id)).size).toBe(toc.length);
    }
  });

  it("declara el esqueleto de seis secciones en cada guía", () => {
    for (const path of GUIDE_PATHS) {
      expect(DOCS_DOCUMENTS[path].sections.map((section) => section.id)).toEqual(
        GUIDE_SKELETON,
      );
    }
  });

  it("solo enlaza rutas internas existentes y URLs https externas", () => {
    const blocks = [
      ...DOCUMENTS.flatMap((document) =>
        document.sections.flatMap((section) => section.blocks),
      ),
      ...MODE_IDS.flatMap((mode) => DOCS_MODE_LANDINGS[mode].outro ?? []),
    ];

    for (const block of blocks) {
      if (block.kind !== "links") {
        continue;
      }

      expect(block.links.length).toBeGreaterThan(0);
      for (const link of block.links) {
        expect(link.label.trim()).not.toBe("");

        if (link.href.startsWith("https://")) {
          expect(link.external).toBe(true);
        } else {
          expect(link.href.startsWith("/")).toBe(true);
          expect(ROUTES).toContain(link.href);
        }
      }
    }
  });

  it("incluye todos los estados en las tablas de work-items-y-estados", () => {
    const document = DOCS_DOCUMENTS["/docs/conceptos/work-items-y-estados"];
    const labels = document.sections
      .filter((section) => section.id === "el-ciclo" || section.id === "ramas")
      .flatMap((section) => section.blocks)
      .filter((block) => block.kind === "table")
      .flatMap((block) => (block.kind === "table" ? block.rows : []))
      .map((row) => row[0]);

    for (const state of WORK_ITEM_STATES) {
      expect(labels).toContain(state.label);
    }
  });

  it("reserva cuatro tarjetas por landing, sin la propia landing", () => {
    for (const mode of MODE_IDS) {
      const section = DOCS_SECTIONS.find(
        (candidate) => candidate.id === mode,
      );

      if (!section) {
        throw new Error(`Falta la sección del modo: ${mode}`);
      }

      const cards = section.pages.filter(
        (page) => page.path !== section.path,
      );

      expect(DOCS_MODE_LANDINGS[mode].intro.trim()).not.toBe("");
      expect(cards.length).toBe(4);
      for (const card of cards) {
        expect(card.path).not.toBe(section.path);
        expect(ROUTES).toContain(card.path);
        expect(Object.keys(DOCS_DOCUMENTS)).toContain(card.path);
      }
    }
  });
});
