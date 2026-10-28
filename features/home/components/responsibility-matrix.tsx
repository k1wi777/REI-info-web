import { APPROVAL_GATE, WORK_ITEM_ROLES } from "@/content/rei";
import { WorkItemMeta } from "@/features/home/components/work-item-meta";
import { EXAMPLE_SHEET, SHEET_PHASES } from "@/features/home/data/sheet";

/**
 * Ficha autocontenida del primer viewport: cabecera, matriz de roles y fases,
 * puerta de aprobación en alfa y pie de metadata. Las marcas no dependen del
 * color; cada una lleva su texto para lectores de pantalla.
 */
export function ResponsibilityMatrix() {
  return (
    <section
      aria-labelledby="home-matrix-title"
      className="min-w-0 border border-hairline-strong bg-surface"
    >
      <header className="border-b border-hairline-strong px-4 py-3">
        <div className="flex items-baseline justify-between gap-4">
          <p className="type-meta text-muted-strong">
            {EXAMPLE_SHEET.code} / {EXAMPLE_SHEET.type}
          </p>
          <p className="type-meta-sm text-muted-strong">
            {EXAMPLE_SHEET.revision}
          </p>
        </div>
        <h2
          id="home-matrix-title"
          className="mt-3 type-docs-heading text-foreground"
        >
          {EXAMPLE_SHEET.title}
        </h2>
        <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="type-meta-sm text-muted-strong">4 roles · 1 firma</p>
          <p className="type-meta-sm text-warning">Hoja de ejemplo</p>
        </div>
      </header>

      <div className="min-w-0 overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">
            Matriz de responsabilidades por rol y fase
          </caption>
          <thead>
            <tr className="border-b border-hairline">
              <th
                scope="col"
                className="w-[4.5rem] px-1 py-2 sm:w-24 sm:px-2 lg:w-20 lg:px-1 xl:w-24 xl:px-2"
              >
                <span className="sr-only">Fase</span>
              </th>
              {WORK_ITEM_ROLES.map((role) => (
                <th
                  key={role.id}
                  scope="col"
                  className="break-words px-0 py-2 text-center font-mono text-[0.5rem] font-normal uppercase leading-[1.4] tracking-normal text-muted-strong sm:px-2 sm:text-[0.59375rem] lg:px-0 lg:text-[0.5rem] xl:px-2 xl:text-[0.59375rem]"
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
                  className="break-words px-1 py-2 text-left align-middle sm:px-2 lg:px-1 xl:px-2"
                >
                  <span className="block font-mono text-[0.46875rem] uppercase leading-[1.4] tracking-normal text-muted-strong sm:text-[0.59375rem] lg:text-[0.46875rem] xl:text-[0.59375rem]">
                    {phase.id}
                  </span>
                  <span className="block font-mono text-[0.46875rem] uppercase leading-[1.4] tracking-normal text-secondary sm:text-[0.59375rem] lg:text-[0.46875rem] xl:text-[0.59375rem]">
                    {phase.label}
                  </span>
                </th>
                {WORK_ITEM_ROLES.map((role) => {
                  const isResponsible = role.id === phase.roleId;

                  return (
                    <td
                      key={role.id}
                      className="px-0 py-2 text-center align-middle sm:px-2 lg:px-0 xl:px-2"
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
                        {isResponsible ? "Responsable" : "No interviene"}
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
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="type-meta text-accent-text">
                    {APPROVAL_GATE.label}
                  </p>
                  <p className="type-meta text-accent-text">
                    {APPROVAL_GATE.status}
                  </p>
                </div>
                <p className="mt-2 type-docs text-secondary">
                  {APPROVAL_GATE.detail}
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
