import type { Metadata, ResolvingMetadata } from "next";
import { getDocsPageOrThrow } from "@/content/site";
import { DocsContentPage, GUIAS_GITHUB_ISSUES_PATH } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const docsPage = getDocsPageOrThrow(GUIAS_GITHUB_ISSUES_PATH);

export async function generateMetadata(
  _props: PageProps<"/docs/guias/github-issues">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/docs/guias/github-issues",
    title: docsPage.title,
    description: docsPage.description,
  });
}

export default function Page() {
  return <DocsContentPage path={GUIAS_GITHUB_ISSUES_PATH} />;
}
