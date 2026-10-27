import type { Metadata } from "next";
import { DocsLandingPage } from "@/features/docs";

export const metadata: Metadata = {
  title: "Documentación",
  description:
    "Guías y referencia de REI Harness: instalación, primer Work Item, comandos y preguntas frecuentes.",
};

export default function Page() {
  return <DocsLandingPage />;
}
