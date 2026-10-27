import { PRODUCT_PAGES, ROUTES } from "@/content/site";
import { AGENT_ROLES, COMMANDS, WORK_ITEM_STATES } from "@/content/rei";
import { EVIDENCE } from "@/features/product/data/evidence";
import { PRODUCT_DOCUMENTS } from "@/features/product/data/pages";
import { PRODUCT_NAV_ITEMS } from "@/features/product/data/product-nav";

const DOCUMENTS = Object.values(PRODUCT_DOCUMENTS);

describe("documentos de producto", () => {
  it("declara un documento por slug publicado y ninguno extra", () => {
    expect(Object.keys(PRODUCT_DOCUMENTS).sort()).toEqual(
      PRODUCT_PAGES.map((page) => page.slug).sort(),
    );

    for (const page of PRODUCT_PAGES) {
      expect(PRODUCT_DOCUMENTS[page.slug].id).toBe(page.slug);
    }
  });

  it("rellena el eyebrow y declara al menos una sección", () => {
    for (const document of DOCUMENTS) {
      expect(document.eyebrow.trim()).not.toBe("");
      expect(document.sections.length).toBeGreaterThan(0);
    }
  });

  it("usa secciones con id único, título no vacío y bloques", () => {
    for (const document of DOCUMENTS) {
      const ids = document.sections.map((section) => section.id);
      expect(new Set(ids).size).toBe(ids.length);

      for (const section of document.sections) {
        expect(section.id.trim()).not.toBe("");
        expect(section.title.trim()).not.toBe("");
        expect(section.blocks.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("bloques de producto", () => {
  it("solo enlaza rutas internas existentes y URLs https externas", () => {
    for (const document of DOCUMENTS) {
      for (const section of document.sections) {
        for (const block of section.blocks) {
          if (block.kind !== "links") {
            continue;
          }

          expect(block.links.length).toBeGreaterThan(0);
          for (const link of block.links) {
            expect(link.label.trim()).not.toBe("");

            if (link.external) {
              expect(link.href.startsWith("https://")).toBe(true);
              expect(new URL(link.href).protocol).toBe("https:");
            } else {
              expect(link.href.startsWith("/")).toBe(true);
              expect(ROUTES).toContain(link.href);
            }
          }
        }
      }
    }
  });

  it("resuelve roles, estados, evidencia y comandos contra su fuente", () => {
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

            default:
              break;
          }
        }
      }
    }
  });

  it("usa un solo bloque de flujo en la página que lo explica", () => {
    const flowDocuments = DOCUMENTS.filter((document) =>
      document.sections.some((section) =>
        section.blocks.some((block) => block.kind === "flow"),
      ),
    );

    expect(flowDocuments.map((document) => document.id)).toEqual([
      "como-funciona",
    ]);
  });
});

describe("subnavegación de producto", () => {
  it("deriva una entrada por página, sin hrefs duplicados ni vacíos", () => {
    expect(PRODUCT_NAV_ITEMS.map((item) => item.href)).toEqual(
      PRODUCT_PAGES.map((page) => page.path),
    );

    const hrefs = PRODUCT_NAV_ITEMS.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);

    for (const item of PRODUCT_NAV_ITEMS) {
      expect(item.label.trim()).not.toBe("");
      expect(ROUTES).toContain(item.href);
    }
  });
});
