import { InlineText } from "@/components/ui/inline-text";
import { WindowFrame } from "@/components/ui/window-frame";
import { ArtifactsTree } from "@/features/home/components/demos/artifacts-tree";
import { DemoSection } from "@/features/home/components/demo-section";
import { getCurrentHomeCopy } from "@/features/home/copy/server";
import { buildTerminalSnapshot } from "@/features/home/data/demos";
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
export async function TerminalDemo() {
  const { terminal: copy } = await getCurrentHomeCopy();
  const TERMINAL_SNAPSHOT = buildTerminalSnapshot(copy);

  return (
    <DemoSection
      id="terminal"
      eyebrow={copy.eyebrow}
      title={copy.title}
      intro={copy.intro}
      note={copy.note(TERMINAL_SNAPSHOT.capturedAt)}
    >
      <div className="grid gap-4 lg:grid-cols-12 lg:items-start lg:gap-6">
        <div
          data-reveal="up"
          className="min-w-0 lg:col-span-7 xl:col-span-8"
        >
          <WindowFrame
            label={TERMINAL_SNAPSHOT.command}
            meta={copy.snapshotMeta(TERMINAL_SNAPSHOT.capturedAt)}
            footer={
              <>
                <InlineText text={TERMINAL_SNAPSHOT.caption} />
                <span className="mt-1 block">
                  {copy.scrollHint}
                </span>
              </>
            }
          >
            <ol
              aria-label={copy.outputLabel(TERMINAL_SNAPSHOT.command)}
              tabIndex={0}
              className="scroll-code max-xl:fade-right overflow-x-auto bg-canvas px-4 py-4"
            >
              {TERMINAL_SNAPSHOT.lines.map((line, index) => (
                <TerminalRow key={`${line.kind}-${index}`} line={line} />
              ))}
            </ol>
          </WindowFrame>
        </div>

        <div
          data-reveal="up"
          data-reveal-delay="1"
          className="min-w-0 lg:col-span-5 xl:col-span-4"
        >
          <ArtifactsTree />
        </div>
      </div>
    </DemoSection>
  );
}
