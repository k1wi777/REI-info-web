import { COMMANDS, COMMAND_CATEGORIES } from "@/content/rei";
import {
  COMMANDS_TOC,
  COMMAND_EXIT_CODE_CONVENTION,
  COMMAND_GROUPS,
  commandAnchor,
} from "@/features/commands/data/commands";

describe("índice de comandos", () => {
  it("asigna cada comando a una sola categoría sin perder ninguno", () => {
    const grouped = COMMAND_GROUPS.flatMap((group) =>
      group.commands.map((command) => command.id),
    );

    expect(grouped.sort()).toEqual(
      COMMANDS.map((command) => command.id).sort(),
    );
    expect(new Set(grouped).size).toBe(grouped.length);

    for (const group of COMMAND_GROUPS) {
      for (const command of group.commands) {
        expect(command.category).toBe(group.category.id);
      }
    }
  });

  it("declara una categoría por cada categoría canónica", () => {
    expect(COMMAND_GROUPS.map((group) => group.category.id)).toEqual(
      COMMAND_CATEGORIES.map((category) => category.id),
    );
  });

  it("genera anclas únicas y seguras para cada comando", () => {
    const anchors = COMMANDS.map((command) => commandAnchor(command.id));

    expect(new Set(anchors).size).toBe(anchors.length);
    for (const anchor of anchors) {
      expect(anchor).toMatch(/^comando-[a-z0-9-]+$/);
    }
  });

  it("abre la tabla de contenidos con los códigos de salida", () => {
    expect(COMMANDS_TOC[0]).toEqual({
      id: "codigos-de-salida",
      title: "Códigos de salida",
    });

    const ids = COMMANDS_TOC.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const category of COMMAND_CATEGORIES) {
      expect(ids).toContain(`comandos-${category.id}`);
    }
  });

  it("declara la convención general con los códigos 0, 1 y 2", () => {
    expect(COMMAND_EXIT_CODE_CONVENTION.map((exitCode) => exitCode.code)).toEqual(
      ["0", "1", "2"],
    );
    for (const exitCode of COMMAND_EXIT_CODE_CONVENTION) {
      expect(exitCode.meaning.trim()).not.toBe("");
    }
  });
});
