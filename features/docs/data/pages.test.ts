import { sectionsToToc } from "@/content/docs";
import { STATE_TRANSITIONS, WORK_ITEM_STATES } from "@/content/rei";
import {
  DOCS_SECTIONS,
  DOCUMENTED_VERSION,
  DOCUMENTED_VERSION_DATE,
  RELEASES_URL,
  ROUTES,
} from "@/content/site";
import { DOCS_MODE_LANDINGS } from "@/features/docs/data/modes";
import { formatDocumentedDate } from "@/features/docs/data/pages/operacion-changelog";
import { DOCS_DOCUMENTS } from "@/features/docs/data/pages";
import type { DocsContentPath, DocsModeId } from "@/features/docs/types";

const MODE_IDS: DocsModeId[] = [
  "conceptos",
  "guias",
  "referencia",
  "operacion",
];

const MODE_CARD_COUNTS: Record<DocsModeId, number> = {
  conceptos: 4,
  guias: 4,
  referencia: 6,
  operacion: 3,
};

const UNREGISTERED_PATHS = [
  "/docs/referencia/comandos",
  "/docs/operacion/faq",
];

const CONTENT_PAGES = MODE_IDS.flatMap((mode) => {
  const section = DOCS_SECTIONS.find((candidate) => candidate.id === mode);
  return section
    ? section.pages.filter((page) => page.path !== section.path)
    : [];
});

const REGISTERED_PAGES = CONTENT_PAGES.filter(
  (page) => !UNREGISTERED_PATHS.includes(page.path),
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

function documentText(path: keyof typeof DOCS_DOCUMENTS): string {
  return JSON.stringify(DOCS_DOCUMENTS[path]);
}

describe("documentos de Referencia y Operación", () => {
  it("registra un documento por página publicada, sin landings ni páginas ajenas", () => {
    expect(Object.keys(DOCS_DOCUMENTS).sort()).toEqual(
      REGISTERED_PAGES.map((page) => page.path).sort(),
    );
    expect(CONTENT_PAGES.length).toBe(17);
    expect(Object.keys(DOCS_DOCUMENTS).length).toBe(15);
  });

  it("deja fuera del registro exactamente comandos y la FAQ", () => {
    const unregistered = CONTENT_PAGES.filter(
      (page) => !(page.path in DOCS_DOCUMENTS),
    ).map((page) => page.path);

    expect(unregistered.sort()).toEqual([...UNREGISTERED_PATHS].sort());
  });

  it("comparte ruta entre documento y página y declara eyebrow", () => {
    for (const path of Object.keys(DOCS_DOCUMENTS) as Array<
      keyof typeof DOCS_DOCUMENTS
    >) {
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

  it("declara el esqueleto de seis secciones solo en las guías", () => {
    for (const path of GUIDE_PATHS) {
      expect(DOCS_DOCUMENTS[path].sections.map((section) => section.id)).toEqual(
        GUIDE_SKELETON,
      );
    }

    const otherPaths = (
      Object.keys(DOCS_DOCUMENTS) as Array<keyof typeof DOCS_DOCUMENTS>
    ).filter((path) => !GUIDE_PATHS.includes(path));

    for (const path of otherPaths) {
      expect(DOCS_DOCUMENTS[path].sections.map((section) => section.id)).not.toEqual(
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
        expect(link.href).not.toContain("#");

        if (link.href.startsWith("https://")) {
          expect(link.external).toBe(true);
        } else {
          expect(link.href.startsWith("/")).toBe(true);
          expect(ROUTES).toContain(link.href);
        }
      }
    }
  });

  it("genera la tabla de estados desde los siete estados", () => {
    const document = DOCS_DOCUMENTS["/docs/referencia/estados"];
    const stateRows = document.sections
      .filter((section) => section.id === "estados")
      .flatMap((section) => section.blocks)
      .filter((block) => block.kind === "table")
      .flatMap((block) => (block.kind === "table" ? block.rows : []));

    expect(stateRows.map((row) => row[0])).toEqual(
      WORK_ITEM_STATES.map((state) => state.label),
    );
  });

  it("genera la tabla de transiciones desde STATE_TRANSITIONS", () => {
    const document = DOCS_DOCUMENTS["/docs/referencia/estados"];
    const transitionRows = document.sections
      .filter((section) => section.id === "transiciones")
      .flatMap((section) => section.blocks)
      .filter((block) => block.kind === "table")
      .flatMap((block) => (block.kind === "table" ? block.rows : []));

    expect(transitionRows.map((row) => [row[0], row[1]])).toEqual(
      STATE_TRANSITIONS.map((transition) => [
        transition.from,
        transition.to,
      ]),
    );
  });

  it("publica el changelog con versión, fecha y enlace a Releases", () => {
    const text = documentText("/docs/operacion/changelog");

    expect(text).toContain(DOCUMENTED_VERSION);
    expect(text).toContain(formatDocumentedDate(DOCUMENTED_VERSION_DATE));
    expect(text).toContain(RELEASES_URL);

    const links = DOCS_DOCUMENTS["/docs/operacion/changelog"].sections
      .flatMap((section) => section.blocks)
      .filter((block) => block.kind === "links")
      .flatMap((block) => (block.kind === "links" ? block.links : []));

    expect(links.some((link) => link.href === RELEASES_URL)).toBe(true);
  });

  it("reserva las tarjetas por modo y excluye la landing", () => {
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
      expect(cards).toHaveLength(MODE_CARD_COUNTS[mode]);
      expect(section.pages[0].path).toBe(section.path);

      for (const card of cards) {
        expect(card.path).not.toBe(section.path);
        expect(ROUTES).toContain(card.path);
      }
    }
  });
});
