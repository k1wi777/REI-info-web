import { WindowFrame } from "@/components/ui/window-frame";
import { ARTIFACT_TREE } from "@/features/home/data/demos";

/** Árbol de `.rei/specs/<id>/` con conectores dibujados y notas del arnés. */
export function ArtifactsTree() {
  const [root, ...files] = ARTIFACT_TREE;

  return (
    <WindowFrame
      label={`árbol · ${root.path}`}
      meta={`${files.length} archivos`}
      footer={root.note}
    >
      <div className="scroll-code overflow-x-auto px-4 py-4">
        <p className="whitespace-pre type-code text-foreground">{root.path}</p>

        <ul className="mt-2 border-l border-border-strong">
          {files.map((entry) => (
            <li key={entry.id} className="relative pb-3 pl-4 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute top-[0.7em] left-0 h-px w-3 bg-border-strong"
              />
              <p className="whitespace-pre type-code text-foreground">
                {entry.path.split("/").filter(Boolean).at(-1)}
              </p>
              <p className="mt-0.5 type-caption text-muted-strong">
                {entry.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </WindowFrame>
  );
}
