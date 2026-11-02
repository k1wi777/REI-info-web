import { isTranslated } from "@/content/i18n/coverage";
import { getDocsLandingCopy } from "@/features/docs/copy";
import type { DocsEntryId } from "@/features/docs/copy/types";
import type { DocsEntry } from "@/features/docs/types";
import type { Locale } from "@/lib/i18n";

/** Entradas de la landing de documentación: solo rutas que existen. */
export const DOCS_ENTRIES: { id: DocsEntryId; href: string }[] = [
  { id: "install", href: "/docs/empezar/instalacion" },
  { id: "first-work-item", href: "/docs/empezar/primer-work-item" },
  { id: "commands", href: "/docs/referencia/comandos" },
  { id: "faq", href: "/docs/operacion/faq" },
];

/**
 * Tarjetas del idioma pedido. Si el destino no está traducido, la tarjeta
 * conserva el texto en español y lo declara en `lang`.
 */
export function buildDocsEntries(
  lang: Locale,
  translated: (lang: Locale, path: string) => boolean = isTranslated,
): DocsEntry[] {
  const own = getDocsLandingCopy(lang).entries;
  const fallback = getDocsLandingCopy("es").entries;

  return DOCS_ENTRIES.map(({ id, href }) => {
    const text = translated(lang, href) ? own[id] : undefined;

    return text
      ? { ...text, href, lang }
      : { ...fallback[id]!, href, lang: "es" };
  });
}
