import { OS_IDS } from "@/lib/release";
import {
  ARCHIVE_TEMPLATE_TAR,
  COMMAND_EXTRACT_TAR,
  COMMAND_MOVE_BIN,
  COMMAND_UPDATE,
  COMMAND_UPDATE_CHECK,
  COMMAND_VERSION,
  INSTALLATION_SECTIONS,
  INSTALL_STEPS,
  fillArchiveName,
} from "@/features/installation/data/installation";
import { INSTALL_PATH } from "@/content/site";

const docsCode = INSTALLATION_SECTIONS.flatMap((section) => section.blocks)
  .filter((block) => block.kind === "code")
  .map((block) => block.code)
  .join("\n");

describe("INSTALL_STEPS", () => {
  it("define tres pasos para cada sistema, terminando en rei version", () => {
    for (const os of OS_IDS) {
      expect(INSTALL_STEPS[os]).toHaveLength(3);
      expect(INSTALL_STEPS[os].at(-1)?.command).toBe(COMMAND_VERSION);
    }
  });

  it("comparte los comandos de Linux y macOS", () => {
    expect(INSTALL_STEPS.linux).toBe(INSTALL_STEPS.macos);
    expect(INSTALL_STEPS.linux.map((step) => step.command)).toEqual([
      COMMAND_EXTRACT_TAR,
      COMMAND_MOVE_BIN,
      COMMAND_VERSION,
    ]);
  });

  it("no inventa comandos para Windows en los pasos de archive", () => {
    expect(INSTALL_STEPS.windows[0].command).toBeUndefined();
    expect(INSTALL_STEPS.windows[1].command).toBeUndefined();
  });
});

describe("documentación de instalación", () => {
  it("reutiliza las mismas constantes de comandos", () => {
    for (const command of [
      COMMAND_EXTRACT_TAR,
      COMMAND_MOVE_BIN,
      COMMAND_VERSION,
      COMMAND_UPDATE,
      COMMAND_UPDATE_CHECK,
    ]) {
      expect(docsCode).toContain(command);
    }
  });

  it("enlaza a la página de instalación", () => {
    const links = INSTALLATION_SECTIONS.flatMap((section) => section.blocks)
      .filter((block) => block.kind === "links")
      .flatMap((block) => block.links.map((link) => link.href));

    expect(links).toContain(INSTALL_PATH);
  });
});

describe("fillArchiveName", () => {
  it("sustituye la plantilla por el nombre real", () => {
    expect(
      fillArchiveName(COMMAND_EXTRACT_TAR, "rei_0.3.0_linux_amd64.tar.gz"),
    ).toBe("tar -xzf rei_0.3.0_linux_amd64.tar.gz");
    expect(fillArchiveName(COMMAND_MOVE_BIN, "x")).toBe(COMMAND_MOVE_BIN);
    expect(COMMAND_EXTRACT_TAR).toContain(ARCHIVE_TEMPLATE_TAR);
  });
});
