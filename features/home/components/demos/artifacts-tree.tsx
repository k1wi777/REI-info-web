import { ARTIFACT_TREE } from "@/features/home/data/demos";
import { cn } from "@/lib/cn";

/** Árbol de `.rei/specs/<id>/` como componente: rutas y notas reales. */
export function ArtifactsTree() {
  return (
    <figure className="min-w-0 border border-hairline-strong bg-surface-deep">
      <figcaption className="border-b border-hairline px-4 py-2 type-meta text-muted-strong">
        Árbol de planificación
      </figcaption>

      <ul className="px-4 py-3">
        {ARTIFACT_TREE.map((entry) => (
          <li
            key={entry.id}
            className={cn("py-1.5", entry.depth > 0 && "pl-4")}
          >
            <p className="break-words type-code text-foreground">
              {entry.depth > 0 ? (
                <span aria-hidden="true" className="text-muted-strong">
                  └─{" "}
                </span>
              ) : null}
              {entry.depth === 0
                ? entry.path
                : entry.path.split("/").filter(Boolean).at(-1)}
            </p>
            <p className="mt-0.5 type-meta-sm text-muted-strong">
              {entry.note}
            </p>
          </li>
        ))}
      </ul>
    </figure>
  );
}
