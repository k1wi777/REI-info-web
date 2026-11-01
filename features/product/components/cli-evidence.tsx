import { WindowFrame } from "@/components/ui/window-frame";
import { getCurrentProductCopy } from "@/features/product/copy/server";
import { CLI_SAMPLES, CLI_SNAPSHOT_DATE } from "@/features/product/data/cli";
import type { CliLine } from "@/features/product/types";
import { cn } from "@/lib/cn";
import { fillTemplate } from "@/lib/template";

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

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="size-3 shrink-0 text-muted-strong transition-transform duration-(--duration-fast) group-open:rotate-90"
    >
      <path
        d="M4.5 2.5 8 6l-3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function OutputLine({ line }: { line: CliLine }) {
  if (line.kind === "prompt") {
    return (
      <li className="flex min-h-[1.7em] items-baseline gap-2 whitespace-pre type-code text-foreground">
        <span aria-hidden="true" className="text-accent-text">
          ❯
        </span>
        <span>{line.text}</span>
      </li>
    );
  }

  if (line.kind === "note") {
    return (
      <li className="min-h-[1.7em] whitespace-pre type-code text-muted-strong">
        {line.text}
      </li>
    );
  }

  return (
    <li className="min-h-[1.7em] whitespace-pre type-code text-secondary">
      <OutputText text={line.text} />
    </li>
  );
}

function outputCount(lines: CliLine[]): number {
  return lines.filter((line) => line.kind === "output").length;
}

/**
 * Salidas reales del CLI en disclosures nativos: sin estado, sin tecleo
 * simulado y sin temporizadores. La primera queda abierta también sin JS.
 */
export async function CliEvidence() {
  const { cli } = await getCurrentProductCopy();
  return (
    <WindowFrame
      label="rei"
      meta={fillTemplate(cli.windowMeta, {
        date: CLI_SNAPSHOT_DATE,
        count: CLI_SAMPLES.length,
      })}
      bodyClassName="bg-canvas"
      footer={
        <>
          {fillTemplate(cli.snapshotFooter, { date: CLI_SNAPSHOT_DATE })}
          <span className="mt-1 block">{cli.openHint}</span>
          {cli.outputLanguageNote ? (
            <span className="mt-1 block">{cli.outputLanguageNote}</span>
          ) : null}
        </>
      }
    >
      {CLI_SAMPLES.map((sample, index) => {
        const lines = outputCount(sample.lines);
        const mayScroll = sample.lines.length > 18;

        return (
          <details
            key={sample.id}
            open={index === 0}
            className="group border-b border-hairline last:border-b-0"
          >
            <summary className="grid min-h-11 cursor-pointer list-none grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1 px-4 py-3 transition-colors hover:bg-surface-deep/60 [&::-webkit-details-marker]:hidden sm:flex sm:flex-nowrap">
              <span aria-hidden="true" className="shrink-0 text-accent-text">
                ❯
              </span>
              <span className="min-w-0 flex-1 truncate type-code text-foreground">
                {sample.command}
              </span>
              <span className="shrink-0 sm:order-last">
                <Chevron />
              </span>
              <span className="col-span-2 col-start-2 flex flex-wrap items-baseline gap-x-1.5 type-caption text-muted-strong sm:col-auto sm:ml-auto sm:flex-nowrap">
                <span>{sample.capturedAt}</span>
                <span aria-hidden="true">·</span>
                <span>{fillTemplate(cli.lines, { count: lines })}</span>
              </span>
            </summary>

            <div className="border-t border-hairline bg-canvas">
              <ol
                aria-label={fillTemplate(cli.outputLabel, {
                  command: sample.command,
                })}
                tabIndex={0}
                className={cn(
                  "scroll-code max-h-[18rem] overflow-auto px-4 py-4",
                  mayScroll && "fade-right",
                )}
              >
                {sample.lines.map((line, lineIndex) => (
                  <OutputLine key={`${line.kind}-${lineIndex}`} line={line} />
                ))}
              </ol>

              <p className="border-t border-hairline px-4 py-2 type-caption text-muted-strong">
                {mayScroll ? cli.scrollNote : cli.completeNote}
              </p>
            </div>
          </details>
        );
      })}
    </WindowFrame>
  );
}
