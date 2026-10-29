import type { Metadata, ResolvingMetadata } from "next";
import { DocsLandingPage } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const description =
  "Guías y referencia de REI Harness: instalación, primer Work Item, comandos y preguntas frecuentes.";

export async function generateMetadata(
  _props: PageProps<"/docs">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    path: "/docs",
    title: "Documentación",
    description,
  });
}

export default function Page() {
  return <DocsLandingPage />;
}
