import type { ReiProse } from "@/content/i18n/rei";
import type { Command } from "@/content/rei";
import type { CommandsPageCopy } from "@/features/commands/copy/types";
import { commandAnchor } from "@/features/commands/data/commands";
import { fillTemplate } from "@/lib/template";

type CommandIndexTableProps = {
  categoryLabel: string;
  commands: Command[];
  copy: CommandsPageCopy;
  prose: ReiProse;
};

/** Índice de una categoría: enlace al detalle, resumen y nombres de flags. */
export function CommandIndexTable({
  categoryLabel,
  commands,
  copy,
  prose,
}: CommandIndexTableProps) {
  return (
    <div className="mt-4 w-full min-w-0 max-w-full overflow-x-auto border border-hairline">
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <caption className="sr-only">
          {fillTemplate(copy.index.captionTemplate, { category: categoryLabel })}
        </caption>
        <thead>
          <tr className="border-b border-hairline-strong">
            <th scope="col" className="px-3 py-2 type-meta text-muted-strong">
              {copy.index.command}
            </th>
            <th scope="col" className="px-3 py-2 type-meta text-muted-strong">
              {copy.index.whatItDoes}
            </th>
            <th scope="col" className="px-3 py-2 type-meta text-muted-strong">
              {copy.index.flags}
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
                {prose.commands[command.id].summary}
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
