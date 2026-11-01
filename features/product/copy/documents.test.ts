import { PRODUCT_PAGES, ROUTES } from "@/content/site";
import { AGENT_ROLES, COMMANDS, WORK_ITEM_STATES } from "@/content/rei";
import {
  productCapture,
  productViewerCapture,
} from "@/features/product/data/captures";
import { EVIDENCE } from "@/features/product/data/evidence";
import { getProductCopy, getProductDocument } from "@/features/product/copy";
import { productNavItems } from "@/features/product/data/product-nav";
import type { ProductDocument } from "@/features/product/types";
import { LOCALES } from "@/lib/i18n";

function documentsOf(lang: (typeof LOCALES)[number]) {
  return Object.fromEntries(
    PRODUCT_PAGES.map((page) => [page.slug, getProductDocument(page.slug, lang)]),
  ) as Record<(typeof PRODUCT_PAGES)[number]["slug"], ProductDocument>;
}

/** Documentos en español: las pruebas de unicidad cuentan una vez cada bloque. */
const PRODUCT_DOCUMENTS = documentsOf("es");
const ES_DOCUMENTS = Object.values(PRODUCT_DOCUMENTS);
/** Cada documento en cada idioma, para las comprobaciones de contenido. */
const DOCUMENTS = LOCALES.flatMap((lang) => Object.values(documentsOf(lang)));
const SECTION_WEIGHTS = new Set(["lead", "body", "fine"]);

describe("documentos de producto", () => {
  it("declara un documento por slug publicado y ninguno extra", () => {
    for (const lang of LOCALES) {
      const copy = getProductCopy(lang);
      expect(Object.keys(copy.documents).sort()).toEqual(
        PRODUCT_PAGES.map((page) => page.slug).sort(),
      );

      for (const page of PRODUCT_PAGES) {
        expect(copy.documents[page.slug].id).toBe(page.slug);
      }
    }
  });

  it("rellena el eyebrow, la ficha y declara al menos una sección", () => {
    for (const document of DOCUMENTS) {
      expect(document.eyebrow.trim()).not.toBe("");
      expect(document.sections.length).toBeGreaterThan(0);

      expect(document.facts.length).toBeGreaterThanOrEqual(3);
      const labels = document.facts.map((fact) => fact.label);
      expect(new Set(labels).size).toBe(labels.length);
      for (const fact of document.facts) {
        expect(fact.label.trim()).not.toBe("");
        expect(fact.value.trim()).not.toBe("");
      }
    }
  });

  it("usa secciones con id y etiqueta únicos y un solo peso lead", () => {
    for (const document of DOCUMENTS) {
      const ids = document.sections.map((section) => section.id);
      const labels = document.sections.map((section) => section.label);
      expect(new Set(ids).size).toBe(ids.length);
      expect(new Set(labels).size).toBe(labels.length);

      for (const section of document.sections) {
        expect(section.id.trim()).not.toBe("");
        expect(section.label.trim()).not.toBe("");
        expect(section.title.trim()).not.toBe("");
        expect(section.blocks.length).toBeGreaterThan(0);
        expect(
          section.weight === undefined ||
            SECTION_WEIGHTS.has(section.weight),
        ).toBe(true);
      }

      const leads = document.sections.filter(
        (section) => section.weight === "lead",
      );
      expect(leads.length).toBeLessThanOrEqual(1);
    }
  });
});

describe("bloques de producto", () => {
  it("solo enlaza rutas internas existentes y URLs https externas", () => {
    const checkLink = (link: {
      label: string;
      href: string;
      external?: boolean;
    }) => {
      expect(link.label.trim()).not.toBe("");

      if (link.external) {
        expect(link.href.startsWith("https://")).toBe(true);
        expect(new URL(link.href).protocol).toBe("https:");
      } else {
        expect(link.href.startsWith("/")).toBe(true);
        expect(ROUTES).toContain(link.href);
      }
    };

    for (const document of DOCUMENTS) {
      if (document.actions) {
        expect(document.actions.length).toBeGreaterThan(0);
        document.actions.forEach(checkLink);
      }

      for (const section of document.sections) {
        for (const block of section.blocks) {
          switch (block.kind) {
            case "links":
              expect(block.links.length).toBeGreaterThan(0);
              block.links.forEach(checkLink);
              break;

            case "audiences":
              expect(block.items.length).toBeGreaterThan(0);
              for (const item of block.items) {
                expect(item.who.trim()).not.toBe("");
                expect(item.seeks.trim()).not.toBe("");
                expect(item.next.length).toBeGreaterThan(0);
                item.next.forEach(checkLink);
              }
              break;

            default:
              break;
          }
        }
      }
    }
  });

  it("rellena los ledgers y las opciones", () => {
    for (const document of DOCUMENTS) {
      for (const section of document.sections) {
        for (const block of section.blocks) {
          switch (block.kind) {
            case "points":
              expect(block.points.length).toBeGreaterThan(0);
              for (const point of block.points) {
                expect(point.title.trim()).not.toBe("");
                expect(point.detail.trim()).not.toBe("");
              }
              break;

            case "choices":
              expect(block.choices.length).toBe(2);
              for (const choice of block.choices) {
                expect(choice.name.trim()).not.toBe("");
                expect(choice.planning.length).toBeGreaterThan(0);
                expect(choice.when.trim()).not.toBe("");
              }
              break;

            default:
              break;
          }
        }
      }
    }
  });

  it("resuelve roles, estados, evidencia, comandos y capturas", () => {
    const roleIds = new Set(AGENT_ROLES.map((role) => role.id));
    const stateIds = new Set(WORK_ITEM_STATES.map((state) => state.id));
    const evidenceIds = new Set(EVIDENCE.map((source) => source.id));
    const commandIds = new Set(COMMANDS.map((command) => command.id));

    for (const document of DOCUMENTS) {
      for (const section of document.sections) {
        for (const block of section.blocks) {
          switch (block.kind) {
            case "roles":
              expect(block.roles.length).toBeGreaterThan(0);
              for (const role of block.roles) {
                expect(roleIds.has(role)).toBe(true);
              }
              break;

            case "states":
              expect(block.states.length).toBeGreaterThan(0);
              for (const state of block.states) {
                expect(stateIds.has(state)).toBe(true);
              }
              break;

            case "evidence":
              expect(block.ids.length).toBeGreaterThan(0);
              for (const id of block.ids) {
                expect(evidenceIds.has(id)).toBe(true);
              }
              break;

            case "commands":
              expect(block.ids.length).toBeGreaterThan(0);
              for (const id of block.ids) {
                expect(commandIds.has(id)).toBe(true);
              }
              break;

            case "viewer":
              expect(block.caption.trim()).not.toBe("");
              break;

            case "issue":
              expect(block.caption.trim()).not.toBe("");
              expect(
                productCapture(`gh-${block.number}-head`),
              ).toBeDefined();
              break;

            case "initializer":
              expect(block.text.trim()).not.toBe("");
              expect(block.caption.trim()).not.toBe("");
              break;

            default:
              break;
          }
        }
      }
    }
  });

  it("usa un solo ciclo y una sola terminal en las páginas que los explican", () => {
    const blocksOf = (kind: "cycle" | "terminal") =>
      ES_DOCUMENTS.flatMap((document) =>
        document.sections.flatMap((section) =>
          section.blocks.filter((block) => block.kind === kind),
        ),
      );

    const cycleDocuments = ES_DOCUMENTS.filter((document) =>
      document.sections.some((section) =>
        section.blocks.some((block) => block.kind === "cycle"),
      ),
    );
    const terminalDocuments = ES_DOCUMENTS.filter((document) =>
      document.sections.some((section) =>
        section.blocks.some((block) => block.kind === "terminal"),
      ),
    );

    expect(cycleDocuments.map((document) => document.id)).toEqual([
      "como-funciona",
    ]);
    expect(terminalDocuments.map((document) => document.id)).toEqual([
      "work-items",
    ]);
    expect(blocksOf("cycle")).toHaveLength(1);
    expect(blocksOf("terminal")).toHaveLength(1);
  });

  it("presenta el ciclo como simulación y remite la aprobación real al CLI", () => {
    const blocks = PRODUCT_DOCUMENTS["como-funciona"].sections.flatMap(
      (section) => section.blocks,
    );
    const cycleIndex = blocks.findIndex((block) => block.kind === "cycle");
    expect(cycleIndex).toBeGreaterThanOrEqual(0);

    const following = blocks[cycleIndex + 1];
    if (!following || following.kind !== "paragraph") {
      throw new Error("El ciclo debe ir seguido de un párrafo explicativo.");
    }

    const text = following.text.toLowerCase();
    expect(text).toContain("simulación");
    expect(text).toContain("firma");
    expect(text).toContain("cli");
    expect(text).toContain("no ejecuta comandos ni aprueba work items");
  });

  it("presenta también en inglés el ciclo como simulación sin aprobar nada", () => {
    const blocks = getProductDocument("como-funciona", "en").sections.flatMap(
      (section) => section.blocks,
    );
    const cycleIndex = blocks.findIndex((block) => block.kind === "cycle");
    const following = blocks[cycleIndex + 1];
    if (!following || following.kind !== "paragraph") {
      throw new Error("The cycle must be followed by an explanatory paragraph.");
    }

    const text = following.text.toLowerCase();
    expect(text).toContain("simulation");
    expect(text).toContain("cli");
    expect(text).toContain("does not run commands or approve work items");
  });

  it("publica la captura de /personalize una sola vez y solo en la página de roles", () => {
    const documentsWithBlock = ES_DOCUMENTS.filter((document) =>
      document.sections.some((section) =>
        section.blocks.some((block) => block.kind === "initializer"),
      ),
    );

    expect(documentsWithBlock.map((document) => document.id)).toEqual([
      "agentes",
    ]);

    const blocks = ES_DOCUMENTS.flatMap((document) =>
      document.sections.flatMap((section) =>
        section.blocks.filter((block) => block.kind === "initializer"),
      ),
    );
    expect(blocks).toHaveLength(1);
  });

  it("encuentra las capturas que dibujan el visor y la issue de ejemplo", () => {
    expect(productViewerCapture("desktop")).toBeDefined();
    expect(productViewerCapture("ficha")).toBeDefined();
    expect(productCapture("gh-3-head")).toBeDefined();

    const viewerDocument = PRODUCT_DOCUMENTS.visor;
    const viewerBlocks = viewerDocument.sections.flatMap(
      (section) => section.blocks,
    );
    expect(viewerBlocks.some((block) => block.kind === "viewer")).toBe(true);

    const githubBlocks = PRODUCT_DOCUMENTS["github-issues"].sections.flatMap(
      (section) => section.blocks,
    );
    expect(githubBlocks.some((block) => block.kind === "projection")).toBe(
      true,
    );
    expect(
      githubBlocks.some(
        (block) => block.kind === "issue" && block.number === 3,
      ),
    ).toBe(true);
  });
});

describe("subnavegación de producto", () => {
  it("deriva una entrada por página, sin hrefs duplicados ni vacíos", () => {
    for (const lang of LOCALES) {
      const items = productNavItems(getProductCopy(lang));
      expect(items.map((item) => item.href)).toEqual(
        PRODUCT_PAGES.map((page) => page.path),
      );

      const hrefs = items.map((item) => item.href);
      expect(new Set(hrefs).size).toBe(hrefs.length);

      for (const item of items) {
        expect(item.label.trim()).not.toBe("");
        expect(ROUTES).toContain(item.href);
      }
    }
  });
});
