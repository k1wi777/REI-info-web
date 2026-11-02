import { docParity } from "@/lib/doc-parity";
import { en } from "@/features/first-work-item/copy/en";
import { es } from "@/features/first-work-item/copy/es";
import { getFirstWorkItemCopy } from "@/features/first-work-item/copy";

describe("copy del primer Work Item", () => {
  it("mantiene la estructura y los bloques de código entre es y en", () => {
    docParity(es.sections, en.sections);
  });

  it("traduce de verdad: la prosa difiere entre idiomas", () => {
    expect(en.eyebrow).not.toBe(es.eyebrow);
    expect(en.articleMeta).not.toBe(es.articleMeta);
    expect(en.sections[0].title).not.toBe(es.sections[0].title);
  });

  it("devuelve la copy de cada idioma", () => {
    expect(getFirstWorkItemCopy("es")).toBe(es);
    expect(getFirstWorkItemCopy("en")).toBe(en);
  });
});
