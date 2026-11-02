import type { TocItem } from "@/content/docs";
import type { ReiProse } from "@/content/i18n/rei";
import type { CommandsPageCopy } from "@/features/commands/copy/types";
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

/** Tabla de contenidos en el idioma pedido; los ids (anclas) no se traducen. */
export function buildCommandsToc(
  copy: CommandsPageCopy,
  prose: ReiProse,
): TocItem[] {
  return [
    { id: COMMAND_EXIT_CODE_TOC_ID, title: copy.exitCodes.heading },
    ...COMMAND_CATEGORIES.map((category) => ({
      id: `comandos-${category.id}`,
      title: prose.categories[category.id].label,
    })),
  ];
}
