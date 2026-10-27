import { DocArticle } from "@/components/layout/doc-article";
import { DocBlocks } from "@/components/layout/doc-blocks";
import {
  INSTALLATION_PATH,
  INSTALLATION_SECTIONS,
  INSTALLATION_TOC,
} from "@/features/installation/data/installation";

export function InstallationPage() {
  return (
    <DocArticle
      path={INSTALLATION_PATH}
      eyebrow="Empezar · Instalación"
      title="Instalación"
      description="Descarga el binario rei, verifícalo y prepáralo para actualizarse. No hay dependencias de runtime ni instalación de Go para usarlo."
      meta="Linux · macOS · Windows"
      toc={INSTALLATION_TOC}
    >
      <DocBlocks sections={INSTALLATION_SECTIONS} />
    </DocArticle>
  );
}
