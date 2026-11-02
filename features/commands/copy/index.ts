import { en } from "@/features/commands/copy/en";
import { es } from "@/features/commands/copy/es";
import type { CommandsPageCopy } from "@/features/commands/copy/types";
import type { Locale } from "@/lib/i18n";

const COPIES: Record<Locale, CommandsPageCopy> = { es, en };

/** Textos de la página de comandos en el idioma pedido. */
export function getCommandsCopy(lang: Locale): CommandsPageCopy {
  return COPIES[lang];
}
