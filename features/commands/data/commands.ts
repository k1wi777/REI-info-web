import type { TocItem } from "@/content/docs";
import {
  COMMAND_CATEGORIES,
  COMMAND_EXIT_CODE_CONVENTION,
  commandsByCategory,
} from "@/content/rei";
import type { Command, CommandCategory } from "@/content/rei";

export const COMMANDS_PATH = "/docs/referencia/comandos";

export const COMMAND_EXIT_CODE_TOC_ID = "codigos-de-salida";

export type CommandGroup = {
  category: CommandCategory;
  commands: Command[];
};

export const COMMAND_GROUPS: CommandGroup[] = COMMAND_CATEGORIES.map(
  (category) => ({
    category,
    commands: commandsByCategory(category.id),
  }),
);

/** Ancla estable del detalle de un comando; única por id. */
export function commandAnchor(id: string): string {
  return `comando-${id}`;
}

export { COMMAND_EXIT_CODE_CONVENTION };

export const COMMANDS_TOC: TocItem[] = [
  { id: COMMAND_EXIT_CODE_TOC_ID, title: "Códigos de salida" },
  ...COMMAND_CATEGORIES.map((category) => ({
    id: `comandos-${category.id}`,
    title: category.label,
  })),
];
