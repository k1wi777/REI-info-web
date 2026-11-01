import type { Metadata, ResolvingMetadata } from "next";
import { DocsLandingPage } from "@/features/docs";
import { pageMetadata } from "@/lib/seo";

const description =
  "Guías y referencia de REI Harness: instalación, primer Work Item, comandos y preguntas frecuentes.";

export async function generateMetadata(
  { params }: PageProps<"/[lang]/docs">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;

  return pageMetadata(parent, {
    lang,
    path: "/docs",
    title: "Documentación",
    description,
  });
}

export default function Page() {
  return <DocsLandingPage />;
}
