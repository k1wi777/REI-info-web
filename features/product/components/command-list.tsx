import { COMMANDS } from "@/content/rei";
import type { Command } from "@/content/rei";

type CommandListProps = {
  ids: string[];
};

/** Comandos reales por id: nombre y resumen, sin flags duplicados. */
export function CommandList({ ids }: CommandListProps) {
  const commands = ids
    .map((id) => COMMANDS.find((command) => command.id === id))
    .filter((command): command is Command => Boolean(command));

  return (
    <ol className="border-t border-hairline-strong">
      {commands.map((command) => (
        <li
          key={command.id}
          className="grid gap-2 border-b border-hairline py-4 lg:grid-cols-[18rem_1fr] lg:items-baseline lg:gap-8"
        >
          <p className="break-words type-code text-foreground">
            <span aria-hidden="true" className="text-muted-strong">
              $ {" "}
            </span>
            {command.name}
          </p>
          <p className="max-w-[58ch] type-body text-secondary">
            {command.summary}
          </p>
        </li>
      ))}
    </ol>
  );
}
