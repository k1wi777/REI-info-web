import { InlineText } from "@/components/ui/inline-text";
import { WindowFrame } from "@/components/ui/window-frame";
import { ArtifactsTree } from "@/features/home/components/demos/artifacts-tree";
import { DemoSection } from "@/features/home/components/demo-section";
import { TERMINAL_SNAPSHOT } from "@/features/home/data/demos";
import type { TerminalLine } from "@/features/home/types";
import { cn } from "@/lib/cn";

/** Colores de los estados que el propio CLI imprime entre corchetes. */
const STATE_TONES: Record<string, string> = {
  done: "text-success",
  in_progress: "text-accent-text",
};

const STATE_PATTERN = /\[([a-z_]+)\]/;

/** Colorea el estado dentro de la línea sin tocar el texto del CLI. */
function OutputText({ text }: { text: string }) {
  const match = STATE_PATTERN.exec(text);
  const tone = match ? STATE_TONES[match[1]] : undefined;
  if (!match || !tone) return <>{text}</>;

  const start = text.indexOf(match[0]);

  return (
    <>
      {text.slice(0, start)}
      <span className={tone}>{match[0]}</span>
      {text.slice(start + match[0].length)}
    </>
  );
}

function TerminalRow({ line }: { line: TerminalLine }) {
  if (line.kind === "prompt") {
    return (
      <li className="flex items-baseline gap-2 whitespace-pre type-code text-foreground">
        <span aria-hidden="true" className="text-accent-text">
          ❯
        </span>
        <span>{line.text.replace(/^\$\s*/, "")}</span>
        <span
          aria-hidden="true"
          className="inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] bg-foreground/70"
        />
      </li>
    );
  }

  if (line.kind === "note") {
    return (
      <li className="mt-4 whitespace-pre type-code text-muted-strong">
        {line.text}
      </li>
    );
  }

  return (
    <li
      className={cn(
        "whitespace-pre type-code text-secondary",
        line.emphasis && "bg-accent/5 text-secondary",
      )}
    >
      <OutputText text={line.text} />
    </li>
  );
}

/** Terminal del CLI y árbol de artefactos: el rastro que no deja el chat. */
export function TerminalDemo() {
  return (
    <DemoSection
      id="terminal"
      eyebrow="CLI y artefactos"
      title="La terminal deja lo que el chat no deja"
      intro="Una instantánea real de `rei items status` junto al árbol de planificación del Work Item. No hay vídeo ni reproducción simulada: el texto es el que produjo el CLI."
      note={`La captura está fechada (${TERMINAL_SNAPSHOT.capturedAt}); los estados cambian con el tiempo.`}
    >
      <div className="grid gap-4 lg:grid-cols-12 lg:items-start lg:gap-6">
        <div className="min-w-0 lg:col-span-7 xl:col-span-8">
          <WindowFrame
            label={TERMINAL_SNAPSHOT.command}
            meta={`instantánea · ${TERMINAL_SNAPSHOT.capturedAt}`}
            footer={<InlineText text={TERMINAL_SNAPSHOT.caption} />}
          >
            <ol
              aria-label={`Salida de ${TERMINAL_SNAPSHOT.command}`}
              tabIndex={0}
              className="scroll-code max-sm:fade-right overflow-x-auto bg-canvas px-4 py-4"
            >
              {TERMINAL_SNAPSHOT.lines.map((line, index) => (
                <TerminalRow key={`${line.kind}-${index}`} line={line} />
              ))}
            </ol>
          </WindowFrame>
        </div>

        <div className="min-w-0 lg:col-span-5 xl:col-span-4">
          <ArtifactsTree />
        </div>
      </div>
    </DemoSection>
  );
}
