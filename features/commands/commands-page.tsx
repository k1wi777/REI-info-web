import { DocArticle } from "@/components/layout/doc-article";
import { getDocsPageText } from "@/content/i18n/docs-nav";
import { getReiProse } from "@/content/i18n/rei";
import { getCurrentLocale } from "@/content/i18n/server";
import { CommandDetail } from "@/features/commands/components/command-detail";
import { CommandIndexTable } from "@/features/commands/components/command-index-table";
import { getCommandsCopy } from "@/features/commands/copy";
import {
  COMMANDS_PATH,
  COMMAND_EXIT_CODE_CONVENTION,
  COMMAND_EXIT_CODE_TOC_ID,
  COMMAND_GROUPS,
  buildCommandsToc,
} from "@/features/commands/data/commands";
import { fillTemplate } from "@/lib/template";

export async function CommandsPage() {
  const lang = await getCurrentLocale();
  const copy = getCommandsCopy(lang);
  const prose = getReiProse(lang);

  return (
    <DocArticle
      path={COMMANDS_PATH}
      eyebrow={copy.eyebrow}
      title={getDocsPageText(lang, COMMANDS_PATH).title.text}
      description={copy.description}
      meta={fillTemplate(copy.metaTemplate, {
        commands: COMMAND_GROUPS.reduce(
          (total, group) => total + group.commands.length,
          0,
        ),
        categories: COMMAND_GROUPS.length,
      })}
      toc={buildCommandsToc(copy, prose)}
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
            {copy.exitCodes.heading}
          </h2>
          <p className="mt-2 max-w-(--container-reading) type-docs text-secondary">
            {copy.exitCodes.intro}
          </p>
          <div className="mt-4 w-full min-w-0 max-w-full overflow-x-auto border border-hairline">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">{copy.exitCodes.caption}</caption>
              <thead>
                <tr className="border-b border-hairline-strong">
                  <th scope="col" className="px-3 py-2 type-meta text-muted-strong">
                    {copy.exitCodes.code}
                  </th>
                  <th scope="col" className="px-3 py-2 type-meta text-muted-strong">
                    {copy.exitCodes.meaning}
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
                      {prose.exitCodeConvention[exitCode.code]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {COMMAND_GROUPS.map(({ category, commands }) => {
          const categoryProse = prose.categories[category.id];

          return (
            <section
              key={category.id}
              id={`comandos-${category.id}`}
              aria-labelledby={`comandos-${category.id}-heading`}
            >
              <h2
                id={`comandos-${category.id}-heading`}
                className="type-docs-heading text-foreground"
              >
                {categoryProse.label}
              </h2>
              <p className="mt-2 max-w-(--container-reading) type-docs text-secondary">
                {categoryProse.description}
              </p>

              <CommandIndexTable
                categoryLabel={categoryProse.label}
                commands={commands}
                copy={copy}
                prose={prose}
              />

              <div className="mt-8 flex flex-col gap-8">
                {commands.map((command) => (
                  <CommandDetail
                    key={command.id}
                    command={command}
                    copy={copy}
                    prose={prose}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </DocArticle>
  );
}
