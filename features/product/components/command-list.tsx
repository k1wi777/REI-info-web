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
    <ul className="flex flex-col gap-3">
      {commands.map((command) => (
        <li key={command.id} className="border-l-2 border-hairline-strong pl-4">
          <p className="type-code text-foreground">{command.name}</p>
          <p className="mt-1 type-docs text-secondary">{command.summary}</p>
        </li>
      ))}
    </ul>
  );
}
