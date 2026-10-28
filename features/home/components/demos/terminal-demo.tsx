import { InlineText } from "@/components/ui/inline-text";
import { ArtifactsTree } from "@/features/home/components/demos/artifacts-tree";
import { DemoSection } from "@/features/home/components/demo-section";
import { TERMINAL_SNAPSHOT } from "@/features/home/data/demos";
import { cn } from "@/lib/cn";

const LINE_STYLES = {
  prompt: "text-foreground",
  output: "text-secondary",
  note: "mt-2 text-muted-strong",
} as const;

/** Terminal con una salida real del CLI y el árbol de artefactos al lado. */
export function TerminalDemo() {
  return (
    <DemoSection
      id="terminal"
      eyebrow="CLI y artefactos"
      title="La terminal deja lo que el chat no deja"
      intro="Una instantánea real de `rei items status` junto al árbol de planificación del Work Item. No hay vídeo ni reproducción simulada: el texto es el que produjo el CLI."
      note={`La captura está fechada (${TERMINAL_SNAPSHOT.capturedAt}); los estados cambian con el tiempo.`}
    >
      <div className="grid gap-4 lg:grid-cols-12 lg:items-start">
        <figure className="min-w-0 border border-hairline-strong bg-canvas lg:col-span-7 xl:col-span-8">
          <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-hairline px-4 py-2">
            <span className="type-meta text-muted-strong">
              Terminal · {TERMINAL_SNAPSHOT.command}
            </span>
            <span className="type-meta-sm text-muted-strong">
              Instantánea · {TERMINAL_SNAPSHOT.capturedAt}
            </span>
          </figcaption>

          <ol
            aria-label={`Salida de ${TERMINAL_SNAPSHOT.command}`}
            className="overflow-x-auto px-4 py-3"
          >
            {TERMINAL_SNAPSHOT.lines.map((line, index) => (
              <li
                key={`${line.kind}-${index}`}
                className={cn(
                  "whitespace-pre type-code",
                  LINE_STYLES[line.kind],
                )}
              >
                {line.text}
              </li>
            ))}
          </ol>

          <figcaption className="border-t border-hairline px-4 py-2 type-meta-sm text-muted-strong">
            <InlineText text={TERMINAL_SNAPSHOT.caption} />
          </figcaption>
        </figure>

        <div className="min-w-0 lg:col-span-5 xl:col-span-4">
          <ArtifactsTree />
        </div>
      </div>
    </DemoSection>
  );
}
