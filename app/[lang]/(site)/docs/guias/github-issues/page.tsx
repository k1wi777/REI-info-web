import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageText } from "@/content/i18n/docs-nav";
import { DocsContentPage, GUIAS_GITHUB_ISSUES_PATH } from "@/features/docs";
import { toLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs/guias/github-issues">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const docsPage = getDocsPageText(toLocale(lang), GUIAS_GITHUB_ISSUES_PATH);

  return pageMetadata(parent, {
    lang,
    path: "/docs/guias/github-issues",
    title: docsPage.title.text,
    description: docsPage.description.text,
  });
}

export default function Page() {
  return <DocsContentPage path={GUIAS_GITHUB_ISSUES_PATH} />;
}
