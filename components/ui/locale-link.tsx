"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  isLocalizableHref,
  localizePath,
  type Locale,
} from "@/lib/i18n";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  /** Fuerza el idioma del enlace (selector de idioma); por defecto, el activo. */
  locale?: Locale;
};

/**
 * Único punto que importa `next/link`. Antepone el idioma activo (tomado de la
 * ruta) a los hrefs internos para que navegar conserve el idioma. Los hrefs
 * externos y los anclajes pasan sin cambios.
 */
export function LocaleLink({ href, locale, ...props }: LocaleLinkProps) {
  const active = getLocaleFromPathname(usePathname()) ?? DEFAULT_LOCALE;
  const lang = locale ?? active;
  const localized = isLocalizableHref(href) ? localizePath(lang, href) : href;

  return <Link href={localized} {...props} />;
}
