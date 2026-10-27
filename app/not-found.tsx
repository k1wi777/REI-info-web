import { BrandMark } from "@/components/layout/brand-mark";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description:
    "La ruta solicitada no forma parte de REI Web. Vuelve al inicio o abre la documentación.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-hairline">
        <Container className="flex h-(--layout-header-height) items-center">
          <BrandMark />
        </Container>
      </header>

      <main id="contenido" tabIndex={-1} className="flex flex-1 items-center">
        <Container className="py-20">
          <p className="type-meta text-muted-strong">Error 404</p>
          <h1 className="type-display mt-4 max-w-[16ch] text-foreground">
            Esta hoja no existe
          </h1>
          <p className="mt-5 max-w-(--container-reading) type-body text-secondary">
            La ruta solicitada no forma parte del sitio. La documentación
            disponible se organiza en el índice de docs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/">Volver al inicio</ButtonLink>
            <ButtonLink href="/docs" variant="secondary">
              Abrir documentación
            </ButtonLink>
          </div>
        </Container>
      </main>
    </div>
  );
}
