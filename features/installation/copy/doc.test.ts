import { docParity } from "@/lib/doc-parity";
import { installationDocEn } from "@/features/installation/copy/doc.en";
import { installationDocEs } from "@/features/installation/copy/doc.es";
import { getInstallationDocCopy } from "@/features/installation/copy";

describe("copy de la instalación (docs)", () => {
  it("mantiene la estructura y los bloques de código entre es y en", () => {
    docParity(installationDocEs.sections, installationDocEn.sections);
  });

  it("traduce de verdad: la prosa difiere entre idiomas", () => {
    expect(installationDocEn.eyebrow).not.toBe(installationDocEs.eyebrow);
    expect(installationDocEn.description).not.toBe(installationDocEs.description);
    expect(installationDocEn.sections[0].title).not.toBe(
      installationDocEs.sections[0].title,
    );
  });

  it("devuelve la copy de cada idioma", () => {
    expect(getInstallationDocCopy("es")).toBe(installationDocEs);
    expect(getInstallationDocCopy("en")).toBe(installationDocEn);
  });
});
