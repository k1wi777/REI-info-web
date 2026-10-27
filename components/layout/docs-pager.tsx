import Link from "next/link";
import { getDocsPager } from "@/content/site";

type DocsPagerProps = {
  path: string;
};

/** Navegación anterior/siguiente calculada del árbol de documentación. */
export function DocsPager({ path }: DocsPagerProps) {
  const { previous, next } = getDocsPager(path);

  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Navegación entre páginas de documentación"
      className="mt-10 grid gap-3 border-t border-hairline pt-6 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          className="group flex flex-col gap-1 border border-hairline p-4 transition-colors duration-(--duration-fast) hover:border-border-strong"
          href={previous.path}
        >
          <span className="type-meta-sm text-muted-strong">Anterior</span>
          <span className="type-docs text-foreground">{previous.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      {next ? (
        <Link
          className="group flex flex-col gap-1 border border-hairline p-4 transition-colors duration-(--duration-fast) hover:border-border-strong sm:text-right"
          href={next.path}
        >
          <span className="type-meta-sm text-muted-strong">Siguiente</span>
          <span className="type-docs text-foreground">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
