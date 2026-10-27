import {
  COMMANDS,
  COMMAND_CATEGORIES,
  commandsByCategory,
} from "@/content/rei/commands";
import type { CommandCategoryId } from "@/content/rei/types";

const CATEGORY_IDS: CommandCategoryId[] = [
  "proyecto",
  "work-items",
  "verificacion",
  "mantenimiento",
];

describe("comandos del CLI", () => {
  it("declara las cuatro categorías canónicas una sola vez", () => {
    expect(COMMAND_CATEGORIES.map((category) => category.id)).toEqual(
      CATEGORY_IDS,
    );
  });

  it("rellena etiqueta y descripción de cada categoría", () => {
    for (const category of COMMAND_CATEGORIES) {
      expect(category.label.trim()).not.toBe("");
      expect(category.description.trim()).not.toBe("");
    }
  });

  it("usa identificadores de comando únicos", () => {
    const ids = COMMANDS.map((command) => command.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("rellena nombre, resumen y ejemplo de cada comando", () => {
    for (const command of COMMANDS) {
      expect(command.name.trim()).not.toBe("");
      expect(command.summary.trim()).not.toBe("");
      expect(command.example.trim()).not.toBe("");
    }
  });

  it("asigna cada comando a una categoría declarada", () => {
    for (const command of COMMANDS) {
      expect(CATEGORY_IDS).toContain(command.category);
    }
  });

  it("declara un array de flags con texto en cada uno", () => {
    for (const command of COMMANDS) {
      expect(Array.isArray(command.flags)).toBe(true);
      for (const flag of command.flags) {
        expect(flag.flag.trim()).not.toBe("");
        expect(flag.description.trim()).not.toBe("");
      }
    }
  });

  it("completa los flags documentados de check y review-diff", () => {
    const check = COMMANDS.find((command) => command.id === "check");
    const reviewDiff = COMMANDS.find(
      (command) => command.id === "review-diff",
    );

    expect(check?.flags.map((flag) => flag.flag)).toContain("--quiet, -q");
    expect(reviewDiff?.flags.map((flag) => flag.flag)).toContain("--full");
  });

  it("declara notes y exitCodes opcionales con forma válida", () => {
    for (const command of COMMANDS) {
      if (command.notes) {
        expect(command.notes.length).toBeGreaterThan(0);
        expect(new Set(command.notes).size).toBe(command.notes.length);
        for (const note of command.notes) {
          expect(note.trim()).not.toBe("");
        }
      }

      if (command.exitCodes) {
        const codes = command.exitCodes.map((exitCode) => exitCode.code);

        expect(codes.length).toBeGreaterThan(0);
        expect(new Set(codes).size).toBe(codes.length);
        for (const exitCode of command.exitCodes) {
          expect(["0", "1", "2"]).toContain(exitCode.code);
          expect(exitCode.meaning.trim()).not.toBe("");
        }
      }
    }
  });

  it("mantiene al menos un comando en cada categoría", () => {
    for (const category of CATEGORY_IDS) {
      expect(commandsByCategory(category).length).toBeGreaterThan(0);
    }
  });

  it("filtra por categoría sin mezclar comandos", () => {
    for (const category of CATEGORY_IDS) {
      const filtered = commandsByCategory(category);
      expect(filtered).toHaveLength(
        COMMANDS.filter((command) => command.category === category).length,
      );
      for (const command of filtered) {
        expect(command.category).toBe(category);
      }
    }
  });

  it("cubre todos los comandos con la unión de categorías", () => {
    const grouped = CATEGORY_IDS.flatMap((category) =>
      commandsByCategory(category).map((command) => command.id),
    );
    expect(grouped.sort()).toEqual(
      COMMANDS.map((command) => command.id).sort(),
    );
  });
});
