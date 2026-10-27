import { DocArticle } from "@/components/layout/doc-article";
import { DocBlocks } from "@/components/layout/doc-blocks";
import {
  FIRST_WORK_ITEM_PATH,
  FIRST_WORK_ITEM_SECTIONS,
  FIRST_WORK_ITEM_TOC,
} from "@/features/first-work-item/data/first-work-item";

export function FirstWorkItemPage() {
  return (
    <DocArticle
      path={FIRST_WORK_ITEM_PATH}
      eyebrow="Empezar · Tutorial"
      title="Primer Work Item"
      description="Recorre el ciclo completo una vez: inicializar el arnés, personalizar el proyecto, planificar, aprobar, implementar y revisar."
      meta="7 pasos · Un Work Item completo"
      toc={FIRST_WORK_ITEM_TOC}
    >
      <DocBlocks sections={FIRST_WORK_ITEM_SECTIONS} />
    </DocArticle>
  );
}
