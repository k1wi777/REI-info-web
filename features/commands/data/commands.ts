import { COMMAND_CATEGORIES, commandsByCategory } from "@/content/rei";
import type { CommandCategory } from "@/content/rei";
import type { TocItem } from "@/content/docs";

export const COMMANDS_PATH = "/docs/referencia/comandos";

export type CommandGroup = {
  category: CommandCategory;
  commands: ReturnType<typeof commandsByCategory>;
};

export const COMMAND_GROUPS: CommandGroup[] = COMMAND_CATEGORIES.map(
  (category) => ({
    category,
    commands: commandsByCategory(category.id),
  }),
);

export const COMMANDS_TOC: TocItem[] = COMMAND_CATEGORIES.map((category) => ({
  id: `comandos-${category.id}`,
  title: category.label,
}));
