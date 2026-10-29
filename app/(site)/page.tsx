import type { Metadata, ResolvingMetadata } from "next";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { HomePage } from "@/features/home";

export async function generateMetadata(
  _props: PageProps<"/">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/",
    title: { absolute: SITE_TITLE },
    description: SITE_DESCRIPTION,
  });
}

export default function Page() {
  return <HomePage />;
}
