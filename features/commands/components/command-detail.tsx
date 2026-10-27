import type { Command } from "@/content/rei";
import { CodeBlock } from "@/components/ui/code-block";
import { commandAnchor } from "@/features/commands/data/commands";

type CommandDetailProps = {
  command: Command;
};

/** Detalle navegable de un comando con ancla estable. */
export function CommandDetail({ command }: CommandDetailProps) {
  const anchor = commandAnchor(command.id);

  return (
    <section aria-labelledby={anchor} className="scroll-mt-24 border-t border-hairline pt-6">
      <h3 id={anchor} className="type-docs-heading text-foreground">
        {command.name}
      </h3>
      <p className="mt-2 max-w-(--container-reading) type-docs text-secondary">
        {command.summary}
      </p>

      <div className="mt-4 flex flex-col gap-4">
        <div>
          <p className="type-meta text-muted-strong">Sintaxis</p>
          <p className="mt-2 border-l-2 border-border-strong pl-3 type-code text-foreground">
            {command.name}
          </p>
        </div>

        {command.flags.length > 0 ? (
          <div>
            <p className="type-meta text-muted-strong">Flags</p>
            <ul className="mt-2 flex flex-col gap-2">
              {command.flags.map((flag) => (
                <li key={flag.flag}>
                  <code className="type-code text-foreground">{flag.flag}</code>
                  <span className="mt-0.5 block type-meta-sm text-secondary">
                    {flag.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="type-meta-sm text-muted-strong">Sin flags propios.</p>
        )}

        <div>
          <p className="type-meta text-muted-strong">Ejemplo</p>
          <div className="mt-2">
            <CodeBlock code={command.example} language="Shell" />
          </div>
        </div>

        {command.exitCodes && command.exitCodes.length > 0 ? (
          <div>
            <p className="type-meta text-muted-strong">Códigos de salida</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {command.exitCodes.map((exitCode) => (
                <li key={exitCode.code} className="type-docs text-secondary">
                  <code className="type-code text-foreground">
                    {exitCode.code}
                  </code>{" "}
                  {exitCode.meaning}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {command.notes && command.notes.length > 0 ? (
          <div>
            <p className="type-meta text-muted-strong">Notas</p>
            <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 type-docs text-secondary">
              {command.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
