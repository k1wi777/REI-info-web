"use client";

import { usePathname } from "next/navigation";
import { stripLocale } from "@/lib/i18n";

/** Ruta actual sin prefijo de idioma, para comparar con los hrefs de los datos. */
export function useUnlocalizedPathname(): string {
  return stripLocale(usePathname());
}
