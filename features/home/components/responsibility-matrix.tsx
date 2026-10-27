import { AGENT_ROLES, APPROVAL_GATE } from "@/content/rei";

/**
 * Matriz de responsabilidades: cuatro bandas cruzan la puerta y la banda de
 * aprobación cierra la hoja. Lo decorativo es `aria-hidden`; el texto existe
 * desde el primer render.
 */
export function ResponsibilityMatrix() {
  const beforeApproval = AGENT_ROLES.slice(0, 2);
  const afterApproval = AGENT_ROLES.slice(2);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-b border-hairline-strong pb-3">
        <h2 className="type-meta text-muted-strong">
          Matriz de responsabilidades
        </h2>
        <p className="hidden type-meta-sm text-muted-strong sm:block">
          4 roles · 1 firma
        </p>
      </div>

      <ol className="mt-1">
        {beforeApproval.map((role) => (
          <li
            key={role.id}
            className="matrix-band grid grid-cols-[5.5rem_1fr] gap-3 border-b border-hairline py-3 sm:grid-cols-[6.5rem_1fr]"
          >
            <span className="type-meta text-muted-strong">{role.name}</span>
            <span>
              <span className="block type-docs text-foreground">
                {role.responsibility}
              </span>
              <span className="mt-1 block type-meta-sm text-muted-strong">
                {role.limit}
              </span>
            </span>
          </li>
        ))}

        <li className="matrix-band relative my-3 overflow-hidden bg-accent px-4 py-3.5 text-on-accent">
          <span
            aria-hidden="true"
            className="gate-close absolute inset-x-0 top-0 h-0.5 bg-on-accent/70"
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="type-meta">{APPROVAL_GATE.label}</p>
            <p className="type-meta">{APPROVAL_GATE.status}</p>
          </div>
          <p className="mt-2 type-docs">{APPROVAL_GATE.detail}</p>
          <span
            aria-hidden="true"
            className="signature-line mt-4 block h-px w-2/3 bg-on-accent/70"
          />
        </li>

        {afterApproval.map((role) => (
          <li
            key={role.id}
            className="matrix-band grid grid-cols-[5.5rem_1fr] gap-3 border-b border-hairline py-3 sm:grid-cols-[6.5rem_1fr]"
          >
            <span className="type-meta text-muted-strong">{role.name}</span>
            <span>
              <span className="block type-docs text-foreground">
                {role.responsibility}
              </span>
              <span className="mt-1 block type-meta-sm text-muted-strong">
                {role.limit}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
