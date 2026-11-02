import { DocArticle } from "@/components/layout/doc-article";
import { DocBlocks } from "@/components/layout/doc-blocks";
import { sectionsToToc } from "@/content/docs";
import { getDocsPageText } from "@/content/i18n/docs-nav";
import { getCurrentLocale } from "@/content/i18n/server";
import { getFirstWorkItemCopy } from "@/features/first-work-item/copy";
import { FIRST_WORK_ITEM_PATH } from "@/features/first-work-item/data/first-work-item";

export async function FirstWorkItemPage() {
  const lang = await getCurrentLocale();
  const copy = getFirstWorkItemCopy(lang);

  return (
    <DocArticle
      path={FIRST_WORK_ITEM_PATH}
      eyebrow={copy.eyebrow}
      title={getDocsPageText(lang, FIRST_WORK_ITEM_PATH).title.text}
      description={copy.description}
      meta={copy.articleMeta}
      toc={sectionsToToc(copy.sections)}
    >
      <DocBlocks sections={copy.sections} />
    </DocArticle>
  );
}
