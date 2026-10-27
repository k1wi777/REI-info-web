import type { Command, CommandCategory } from "@/content/rei";
import { commandAnchor } from "@/features/commands/data/commands";

type CommandIndexTableProps = {
  category: CommandCategory;
  commands: Command[];
};

/** Índice de una categoría: enlace al detalle, resumen y nombres de flags. */
export function CommandIndexTable({
  category,
  commands,
}: CommandIndexTableProps) {
  return (
    <div className="mt-4 w-full min-w-0 max-w-full overflow-x-auto border border-hairline">
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <caption className="sr-only">
          {category.label}: comandos, qué hacen y flags
        </caption>
        <thead>
          <tr className="border-b border-hairline-strong">
            <th scope="col" className="px-3 py-2 type-meta text-muted-strong">
              Comando
            </th>
            <th scope="col" className="px-3 py-2 type-meta text-muted-strong">
              Qué hace
            </th>
            <th scope="col" className="px-3 py-2 type-meta text-muted-strong">
              Flags
            </th>
          </tr>
        </thead>
        <tbody>
          {commands.map((command) => (
            <tr
              key={command.id}
              className="border-b border-hairline align-top last:border-b-0"
            >
              <th
                scope="row"
                className="px-3 py-3 font-normal type-code text-foreground"
              >
                <a
                  className="border-b border-border-strong pb-0.5 transition-colors duration-(--duration-fast) hover:border-foreground"
                  href={`#${commandAnchor(command.id)}`}
                >
                  {command.name}
                </a>
              </th>
              <td className="px-3 py-3 type-docs text-secondary">
                {command.summary}
              </td>
              <td className="px-3 py-3 type-code text-muted-strong">
                {command.flags.length > 0 ? (
                  <span className="flex flex-wrap gap-x-2 gap-y-1">
                    {command.flags.map((flag) => (
                      <span key={flag.flag} className="whitespace-nowrap">
                        {flag.flag}
                      </span>
                    ))}
                  </span>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
