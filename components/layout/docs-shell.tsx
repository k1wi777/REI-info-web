import type { ReactNode } from "react";
import { ContentLanguage } from "@/components/layout/content-language";
import { Container } from "@/components/ui/container";
import { DocsSidebar } from "@/components/layout/docs-sidebar";
import { DocsTabs } from "@/components/layout/docs-tabs";
import { getDictionary } from "@/content/i18n";
import { getDocsNav, type DocsText } from "@/content/i18n/docs-nav";
import { getCurrentLocale } from "@/content/i18n/server";
import type { Locale } from "@/lib/i18n";

type DocsShellProps = {
  children: ReactNode;
};

/** Idioma explícito solo si el texto difiere del idioma del contenedor. */
function langOf(text: DocsText, container: Locale): Locale | undefined {
  return text.lang === container ? undefined : text.lang;
}

/**
 * Shell compartido por todas las páginas de documentación. Sigue el idioma de
 * la ruta; el artículo conserva el de su contenido (`ContentLanguage`). Pasa a
 * los clientes solo datos serializables ya resueltos.
 */
export async function DocsShell({ children }: DocsShellProps) {
  const lang = await getCurrentLocale();
  const { docs } = getDictionary(lang);
  const modes = getDocsNav(lang).map((mode) => ({
    id: mode.id,
    path: mode.path,
    label: mode.label.text,
    labelLang: langOf(mode.label, lang),
    pages: mode.pages.map((page) => ({
      path: page.path,
      title: page.title.text,
      titleLang: langOf(page.title, lang),
    })),
  }));

  return (
    <div lang={lang} className="contents">
      <div className="border-b border-hairline">
        <Container className="py-8 lg:py-10">
          <DocsTabs label={docs.modesLabel} modes={modes} />

          <div className="mt-8 grid gap-8 lg:grid-cols-[var(--container-sidebar)_minmax(0,1fr)] lg:gap-12">
            <DocsSidebar summary={docs.sectionsSummary} modes={modes} />
            <div className="min-w-0">
              <ContentLanguage>{children}</ContentLanguage>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
