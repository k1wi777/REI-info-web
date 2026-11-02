import { ARCH_IDS, OS_IDS } from "@/lib/release";
import { getInstallCopy, getInstallationDocCopy } from "@/features/installation/copy";
import { LOCALES } from "@/lib/i18n";
import {
  ARCH_CHECKABLE,
  ARCH_CHOICES,
  OS_CHOICES,
  OS_LABELS,
  archDescription,
} from "@/features/installation/data/choices";
import {
  ARCHIVE_TEMPLATE_TAR,
  COMMAND_EXTRACT_TAR,
  COMMAND_MOVE_BIN,
  COMMAND_UPDATE,
  COMMAND_UPDATE_CHECK,
  COMMAND_VERSION,
  INSTALL_STEP_COMMANDS,
  buildInstallSteps,
  fillArchiveName,
} from "@/features/installation/data/installation";
import { INSTALL_PATH } from "@/content/site";

describe.each(LOCALES)("INSTALL_STEPS (%s)", (lang) => {
  const INSTALL_STEPS = buildInstallSteps(getInstallCopy(lang).installer.steps);

  it("define tres pasos para cada sistema, terminando en rei version", () => {
    for (const os of OS_IDS) {
      expect(INSTALL_STEPS[os]).toHaveLength(3);
      expect(INSTALL_STEPS[os].at(-1)?.command).toBe(COMMAND_VERSION);
    }
  });

  it("comparte los comandos de Linux y macOS", () => {
    expect(INSTALL_STEPS.linux).toEqual(INSTALL_STEPS.macos);
    expect(INSTALL_STEP_COMMANDS.linux).toBe(INSTALL_STEP_COMMANDS.macos);
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

describe.each(LOCALES)("documentación de instalación (%s)", (lang) => {
  const sections = getInstallationDocCopy(lang).sections;
  const docsCode = sections
    .flatMap((section) => section.blocks)
    .filter((block) => block.kind === "code")
    .map((block) => block.code)
    .join("\n");

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
    const links = sections
      .flatMap((section) => section.blocks)
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

describe("OS_CHOICES", () => {
  it("cubre cada sistema una sola vez y su icono apunta a sí mismo", () => {
    expect(OS_CHOICES.map((choice) => choice.id)).toEqual([...OS_IDS]);
    for (const choice of OS_CHOICES) {
      expect(choice.icon).toBe(choice.id);
      expect(choice.label).toBe(OS_LABELS[choice.id]);
      expect(choice.format).toMatch(/^\.(tar\.gz|zip)$/);
    }
  });

  it("usa .zip solo en Windows", () => {
    const zip = OS_CHOICES.filter((choice) => choice.format === ".zip");
    expect(zip.map((choice) => choice.id)).toEqual(["windows"]);
  });
});

describe.each(LOCALES)("archDescription (%s)", (lang) => {
  const { archDescriptions, archHints } = getInstallCopy(lang).installer;

  it("describe arm64 según el sistema y amd64 igual en todos", () => {
    expect(archDescription(archDescriptions, "macos", "arm64")).toContain(
      "Apple Silicon",
    );
    expect(archDescription(archDescriptions, "linux", "arm64")).not.toContain(
      "Apple",
    );
    expect(archDescription(archDescriptions, "windows", "arm64")).not.toContain(
      "Apple",
    );

    for (const os of OS_IDS) {
      expect(archDescription(archDescriptions, os, "amd64")).toBe(
        archDescriptions.amd64,
      );
    }
  });

  it("solo ofrece un comando de comprobación donde es estándar", () => {
    expect(ARCH_CHECKABLE).toEqual({ linux: true, macos: true, windows: false });
    expect(archHints.linux).toContain("uname -m");
    expect(archHints.macos).toContain("uname -m");
    expect(archHints.windows).not.toContain("uname");
  });
});

describe("ARCH_CHOICES", () => {
  it("cubre cada arquitectura una sola vez", () => {
    expect(ARCH_CHOICES.map((choice) => choice.id)).toEqual([...ARCH_IDS]);
    for (const choice of ARCH_CHOICES) {
      expect(choice.label).toBe(choice.id);
    }
  });
});
