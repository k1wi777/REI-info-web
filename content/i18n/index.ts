import { en } from "@/content/i18n/en";
import { es } from "@/content/i18n/es";
import type { Dictionary } from "@/content/i18n/types";
import {
  FOOTER_GROUPS,
  NAV_ITEMS,
  PRIMARY_CTA,
  type NavItem,
} from "@/content/site";
import type { Locale } from "@/lib/i18n";

export type { Dictionary } from "@/content/i18n/types";

const DICTIONARIES: Record<Locale, Dictionary> = { es, en };

export function getDictionary(lang: Locale): Dictionary {
  return DICTIONARIES[lang];
}

export type LabeledFooterGroup = { title: string; items: NavItem[] };

/** Navegación principal con las etiquetas del idioma; los hrefs son únicos. */
export function buildNavItems(dictionary: Dictionary): NavItem[] {
  return NAV_ITEMS.map(({ id, href, external }) => ({
    label: dictionary.shell.nav[id],
    href,
    external,
  }));
}

export function buildPrimaryCta(dictionary: Dictionary): NavItem {
  return { label: dictionary.shell.cta, href: PRIMARY_CTA.href };
}

export function buildFooterGroups(dictionary: Dictionary): LabeledFooterGroup[] {
  return FOOTER_GROUPS.map((group) => ({
    title: dictionary.footer.groups[group.id],
    items: group.items.map(({ id, href, external }) => ({
      label: dictionary.footer.items[id],
      href,
      external,
    })),
  }));
}

/** Opciones del selector de idioma: código corto y nombre en su idioma. */
export function buildLanguageOptions(
  dictionary: Dictionary,
): Record<Locale, { code: string; name: string }> {
  return {
    es: { code: dictionary.language.codes.es, name: dictionary.language.names.es },
    en: { code: dictionary.language.codes.en, name: dictionary.language.names.en },
  };
}
