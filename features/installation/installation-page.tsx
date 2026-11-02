import { DocArticle } from "@/components/layout/doc-article";
import { DocBlocks } from "@/components/layout/doc-blocks";
import { sectionsToToc } from "@/content/docs";
import { getDocsPageText } from "@/content/i18n/docs-nav";
import { getCurrentLocale } from "@/content/i18n/server";
import { getInstallationDocCopy } from "@/features/installation/copy";
import { INSTALLATION_PATH } from "@/features/installation/data/installation";

export async function InstallationPage() {
  const lang = await getCurrentLocale();
  const copy = getInstallationDocCopy(lang);

  return (
    <DocArticle
      path={INSTALLATION_PATH}
      eyebrow={copy.eyebrow}
      title={getDocsPageText(lang, INSTALLATION_PATH).title.text}
      description={copy.description}
      meta={copy.articleMeta}
      toc={sectionsToToc(copy.sections)}
    >
      <DocBlocks sections={copy.sections} />
    </DocArticle>
  );
}
