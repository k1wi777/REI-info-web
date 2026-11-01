import { WORK_ITEM_ROLES } from "@/content/rei";
import { getCurrentHomeCopy } from "@/features/home/copy/server";
import { WorkItemMeta } from "@/features/home/components/work-item-meta";
import { EXAMPLE_SHEET, SHEET_PHASES } from "@/features/home/data/sheet";

/**
 * Ficha autocontenida del primer viewport: cabecera, matriz de roles y fases,
 * puerta de aprobación en alfa y pie de metadata. Las marcas no dependen del
 * color; cada una lleva su texto para lectores de pantalla.
 */
export async function ResponsibilityMatrix() {
  const { sheet } = await getCurrentHomeCopy();

  return (
    <section
      aria-labelledby="home-matrix-title"
      className="min-w-0  border-hairline-strong bg-surface"
    >
      <header className="border-b border-hairline-strong px-4 py-3.5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="type-meta text-muted-strong">
            {EXAMPLE_SHEET.code} / {EXAMPLE_SHEET.type}
          </p>
          <p className="type-meta-sm text-muted-strong">
            {EXAMPLE_SHEET.revision}
          </p>
        </div>
        <p
          id="home-matrix-title"
          className="mt-3 type-docs-heading text-foreground"
        >
          {sheet.title}
        </p>
        <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
          <p className="type-meta-sm text-muted-strong">{sheet.summary}</p>
          <p className="type-meta-sm text-warning">{sheet.exampleTag}</p>
        </div>
      </header>

      <div
        role="group"
        aria-label={sheet.matrixLabel(sheet.title)}
        tabIndex={0}
        className="scroll-code max-sm:fade-right min-w-0 overflow-x-auto"
      >
        <table className="w-full table-fixed border-collapse text-left max-sm:min-w-[25rem]">
          <caption className="sr-only">
            {sheet.caption}
          </caption>
          <thead>
            <tr className="border-b border-hairline">
              <th
                scope="col"
                className="w-[4.5rem] px-0.5 py-2.5 sm:w-[6.5rem]"
              >
                <span className="sr-only">{sheet.phaseColumn}</span>
              </th>
              {WORK_ITEM_ROLES.map((role) => (
                <th
                  key={role.id}
                  scope="col"
                  className="break-words px-0.5 py-2.5 text-center font-normal type-meta-sm tracking-normal text-muted-strong"
                >
                  {role.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SHEET_PHASES.map((phase) => (
              <tr key={phase.id} className="border-b border-hairline">
                <th
                  scope="row"
                  className="break-words px-1 py-2.5 text-left align-middle"
                >
                  <span className="block break-words type-meta-sm tracking-normal text-muted-strong">
                    {phase.id}
                  </span>
                  <span className="block break-words type-meta-sm tracking-normal hyphens-auto text-secondary">
                    {sheet.phases[phase.id]}
                  </span>
                </th>
                {WORK_ITEM_ROLES.map((role) => {
                  const isResponsible = role.id === phase.roleId;

                  return (
                    <td
                      key={role.id}
                      className="px-0 py-2.5 text-center align-middle sm:px-2"
                    >
                      <span
                        aria-hidden="true"
                        className={
                          isResponsible ? "text-accent-text" : "text-muted"
                        }
                      >
                        {isResponsible ? "●" : "·"}
                      </span>
                      <span className="sr-only">
                        {isResponsible ? sheet.responsible : sheet.notInvolved}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <td
                colSpan={5}
                className="border border-accent/40 bg-accent/10 px-3 py-3"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
                  <p className="type-meta text-accent-text">
                    {sheet.gate.label}
                  </p>
                  <p className="type-meta text-accent-text">
                    {sheet.gate.status}
                  </p>
                </div>
                <p className="mt-2 type-body text-secondary">
                  {sheet.gate.detail}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <WorkItemMeta />
    </section>
  );
}
