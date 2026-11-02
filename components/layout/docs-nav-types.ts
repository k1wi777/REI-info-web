import type { Locale } from "@/lib/i18n";

/** Modo de documentación ya resuelto al idioma; serializable para clientes. */
export type DocsNavModeProps = {
  id: string;
  path: string;
  label: string;
  /** Presente solo si el texto no está en el idioma del contenedor. */
  labelLang?: Locale;
  pages: { path: string; title: string; titleLang?: Locale }[];
};
