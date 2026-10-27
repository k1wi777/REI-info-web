import { DocArticle } from "@/components/layout/doc-article";
import { CommandDetail } from "@/features/commands/components/command-detail";
import { CommandIndexTable } from "@/features/commands/components/command-index-table";
import {
  COMMANDS_PATH,
  COMMANDS_TOC,
  COMMAND_EXIT_CODE_CONVENTION,
  COMMAND_EXIT_CODE_TOC_ID,
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
        <section
          id={COMMAND_EXIT_CODE_TOC_ID}
          aria-labelledby={`${COMMAND_EXIT_CODE_TOC_ID}-heading`}
        >
          <h2
            id={`${COMMAND_EXIT_CODE_TOC_ID}-heading`}
            className="type-docs-heading text-foreground"
          >
            Códigos de salida
          </h2>
          <p className="mt-2 max-w-(--container-reading) type-docs text-secondary">
            La convención general se aplica salvo que el comando documente sus
            propios códigos en el detalle. El código de salida es la señal que
            usa el workflow para saber si una verificación pasó.
          </p>
          <div className="mt-4 w-full min-w-0 max-w-full overflow-x-auto border border-hairline">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Convención de códigos de salida del CLI
              </caption>
              <thead>
                <tr className="border-b border-hairline-strong">
                  <th scope="col" className="px-3 py-2 type-meta text-muted-strong">
                    Código
                  </th>
                  <th scope="col" className="px-3 py-2 type-meta text-muted-strong">
                    Significado
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMMAND_EXIT_CODE_CONVENTION.map((exitCode) => (
                  <tr
                    key={exitCode.code}
                    className="border-b border-hairline last:border-b-0"
                  >
                    <td className="px-3 py-2.5 type-code text-foreground">
                      {exitCode.code}
                    </td>
                    <td className="px-3 py-2.5 type-docs text-secondary">
                      {exitCode.meaning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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

            <CommandIndexTable category={category} commands={commands} />

            <div className="mt-8 flex flex-col gap-8">
              {commands.map((command) => (
                <CommandDetail key={command.id} command={command} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </DocArticle>
  );
}
