import { DocArticle } from "@/components/layout/doc-article";
import {
  COMMANDS_PATH,
  COMMANDS_TOC,
  COMMAND_GROUPS,
} from "@/features/commands/data/commands";

export function CommandsPage() {
  return (
    <DocArticle
      path={COMMANDS_PATH}
      eyebrow="Referencia"
      title="Comandos"
      description="Referencia del CLI rei agrupada por la tarea que resuelve. Todos los comandos aceptan rei <comando> --help."
      meta={`${COMMAND_GROUPS.reduce((total, group) => total + group.commands.length, 0)} comandos · ${COMMAND_GROUPS.length} categorías`}
      toc={COMMANDS_TOC}
    >
      <div className="flex flex-col gap-12">
        {COMMAND_GROUPS.map(({ category, commands }) => (
          <section
            key={category.id}
            id={`comandos-${category.id}`}
            aria-labelledby={`comandos-${category.id}-heading`}
          >
            <h2
              id={`comandos-${category.id}-heading`}
              className="type-docs-heading text-foreground"
            >
              {category.label}
            </h2>
            <p className="mt-2 max-w-(--container-reading) type-docs text-secondary">
              {category.description}
            </p>

            <div className="mt-4 w-full min-w-0 max-w-full overflow-x-auto border border-hairline">
              <table className="w-full min-w-[44rem] border-collapse text-left">
                <caption className="sr-only">
                  {category.label}: comandos, descripción, flags y ejemplo
                </caption>
                <thead>
                  <tr className="border-b border-hairline-strong">
                    <th
                      scope="col"
                      className="px-3 py-2 type-meta text-muted-strong"
                    >
                      Comando
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 type-meta text-muted-strong"
                    >
                      Qué hace
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 type-meta text-muted-strong"
                    >
                      Flags
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 type-meta text-muted-strong"
                    >
                      Ejemplo
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
                        {command.name}
                      </th>
                      <td className="px-3 py-3 type-docs text-secondary">
                        {command.summary}
                      </td>
                      <td className="px-3 py-3">
                        {command.flags.length > 0 ? (
                          <ul className="flex flex-col gap-1.5">
                            {command.flags.map((flag) => (
                              <li key={flag.flag}>
                                <code className="type-code text-foreground">
                                  {flag.flag}
                                </code>
                                <span className="mt-0.5 block type-meta-sm text-muted-strong">
                                  {flag.description}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="type-docs text-muted-strong">
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <code className="block whitespace-nowrap type-code text-secondary">
                          {command.example}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </DocArticle>
  );
}
