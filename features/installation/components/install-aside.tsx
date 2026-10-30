import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";
import { InlineText } from "@/components/ui/inline-text";
import {
  COMMAND_UPDATE,
  COMMAND_UPDATE_CHECK,
  INSTALLATION_PATH,
} from "@/features/installation/data/installation";

const LIMITS = [
  "La versión, la fecha y los archivos salen de la API pública de GitHub Releases; la web no muestra cifras de descargas ni tamaños.",
  "La consulta se hace en el servidor y se reutiliza unas horas. Si GitHub no responde, la página muestra el enlace a la página de releases.",
  "Detectar tu sistema es una ayuda: si no hay evidencia de la arquitectura, se conserva amd64 y se indica cómo comprobarla.",
];

/** Actualización con `rei update`, límites de la página y enlace a la documentación. */
export function InstallAside() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section aria-labelledby="actualizar-title" className="flex min-w-0 flex-col gap-4">
        <h2 id="actualizar-title" className="type-docs-heading text-foreground">
          Mantenerlo actualizado
        </h2>
        <p className="max-w-(--container-reading) type-docs text-secondary">
          <InlineText text="Una vez instalado, el binario se actualiza solo: `rei update` descarga la última release, verifica el checksum SHA-256 y reemplaza el ejecutable. `rei update --check` solo comprueba si hay una versión nueva." />
        </p>
        <CodeBlock
          code={`${COMMAND_UPDATE}\n${COMMAND_UPDATE_CHECK}`}
          language="Shell"
        />
      </section>

      <section aria-labelledby="limites-title" className="flex min-w-0 flex-col gap-4">
        <h2 id="limites-title" className="type-docs-heading text-foreground">
          Qué debes saber
        </h2>
        <ul className="flex max-w-(--container-reading) list-disc flex-col gap-2 pl-5 type-docs text-secondary">
          {LIMITS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link
          href={INSTALLATION_PATH}
          className="-mt-1.5 inline-flex w-fit border-b border-border-strong pb-0.5 pt-1.5 type-meta text-foreground transition-colors duration-(--duration-fast) hover:border-foreground"
        >
          Leer la documentación de instalación
        </Link>
      </section>
    </div>
  );
}
