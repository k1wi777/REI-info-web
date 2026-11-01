"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { getContentLocale } from "@/content/i18n/coverage";
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  stripLocale,
} from "@/lib/i18n";

/**
 * Declara el idioma real del contenido de la página. Mientras una ruta de `/en`
 * no esté traducida, su contenido sigue en español y se marca con `lang="es"`
 * para tecnologías de apoyo. El contenido sigue renderizándose en servidor:
 * aquí solo se envuelve.
 */
export function ContentLanguage({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lang = getLocaleFromPathname(pathname) ?? DEFAULT_LOCALE;
  const contentLang = getContentLocale(lang, stripLocale(pathname));

  if (contentLang === lang) {
    return children;
  }

  return (
    <div lang={contentLang} className="contents">
      {children}
    </div>
  );
}
