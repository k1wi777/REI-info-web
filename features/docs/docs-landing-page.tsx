import Link from "next/link";
import { DocsEntryGrid } from "@/features/docs/components/docs-entry-grid";
import { DOCS_ENTRIES } from "@/features/docs/data/entries";

/** Landing de documentación: orienta por intención, sin UI falsa. */
export function DocsLandingPage() {
  return (
    <div>
      <header className="border-b border-hairline pb-6">
        <p className="type-meta text-muted-strong">Documentación</p>
        <h1 className="type-docs-title mt-3 text-foreground">
          ¿Qué quieres hacer?
        </h1>
        <p className="mt-3 max-w-(--container-reading) type-docs text-secondary">
          La documentación de REI Harness explica el proceso antes que los
          comandos. Elige por dónde entrar; todas las rutas llevan a contenido
          real.
        </p>
      </header>

      <DocsEntryGrid entries={DOCS_ENTRIES} />

      <section
        aria-labelledby="ruta-recomendada"
        className="mt-10 border-t border-hairline pt-6"
      >
        <h2
          id="ruta-recomendada"
          className="type-meta text-muted-strong"
        >
          Ruta recomendada
        </h2>
        <p className="mt-3 max-w-(--container-reading) type-docs text-secondary">
          Si es tu primera vez, instala el binario y abre un Work Item. Cuando
          el flujo ya te resulte familiar, la referencia de comandos y las
          preguntas frecuentes resuelven el resto.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Link
            className="-mt-1.5 border-b border-border-strong pb-0.5 pt-1.5 type-meta text-foreground transition-colors duration-(--duration-fast) hover:border-foreground"
            href="/docs/empezar/instalacion"
          >
            Empezar por la instalación
          </Link>
          <Link
            className="-mt-1.5 border-b border-border-strong pb-0.5 pt-1.5 type-meta text-foreground transition-colors duration-(--duration-fast) hover:border-foreground"
            href="/docs/empezar/primer-work-item"
          >
            Ver el primer Work Item
          </Link>
        </div>
      </section>
    </div>
  );
}
