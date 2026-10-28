import { Fragment } from "react";
import { AGENT_ROLES, APPROVAL_GATE } from "@/content/rei";
import { DemoSection } from "@/features/home/components/demo-section";
import { AGENT_NODES } from "@/features/home/data/demos";
import type { AgentNode } from "@/features/home/types";
import type { AgentRole } from "@/content/rei";
import { cn } from "@/lib/cn";

const ROLES = new Map(AGENT_ROLES.map((role) => [role.id, role]));

type RoleNodeProps = {
  role: AgentRole;
  node: AgentNode;
  branch?: boolean;
};

function RoleNode({ role, node, branch = false }: RoleNodeProps) {
  return (
    <li
      className={cn(
        "min-w-0 border bg-surface-deep",
        branch ? "border-dashed border-border-strong" : "border-hairline",
      )}
    >
      <details className="h-full">
        <summary
          aria-label={`${role.name}. ${node.handoff}. Abrir responsabilidad y límite.`}
          className="flex h-full cursor-pointer flex-col gap-2 p-4"
        >
          <span className="type-meta-sm text-muted-strong">
            {node.handoff}
          </span>
          <span className="type-docs-heading text-foreground">
            {role.name}
          </span>
          <span className="mt-auto type-meta-sm text-muted-strong">
            Responsabilidad y límite
          </span>
        </summary>
        <div className="space-y-3 border-t border-hairline p-4">
          <div>
            <p className="type-meta-sm text-muted-strong">Responsabilidad</p>
            <p className="mt-1 type-docs text-secondary">
              {role.responsibility}
            </p>
          </div>
          <div>
            <p className="type-meta-sm text-muted-strong">Límite</p>
            <p className="mt-1 type-docs text-secondary">{role.limit}</p>
          </div>
        </div>
      </details>
    </li>
  );
}

/** Grafo de roles: cuatro etapas, la puerta en medio y el Initializer aparte. */
export function AgentsDemo() {
  const flow = AGENT_NODES.filter((node) => !node.branch);
  const branches = AGENT_NODES.filter((node) => node.branch);

  return (
    <DemoSection
      id="agentes"
      eyebrow="Roles"
      title="Roles explícitos, límites explícitos"
      intro="Cada rol recibe un contrato propio y no invade el trabajo de otro. Abre cualquier rol —también con teclado— para leer su responsabilidad y su límite."
      note="La puerta ocupa el lugar entre Spec Author e Implementer; el Initializer es una rama lateral que no recorre el ciclo del Work Item. Los adaptadores nativos de OpenCode y Claude Code son opcionales; Cursor y Codex funcionan por fallback."
    >
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {flow.map((node) => {
          const role = ROLES.get(node.roleId);
          if (!role) return null;

          return (
            <Fragment key={node.roleId}>
              {node.roleId === "implementer" ? (
                <li className="min-w-0 border border-accent/40 bg-accent/10 p-4">
                  <p className="type-meta-sm text-accent-text">La puerta</p>
                  <p className="mt-2 break-words type-code text-accent-text">
                    {APPROVAL_GATE.label}
                  </p>
                  <p className="mt-2 type-meta-sm text-secondary">
                    {APPROVAL_GATE.status} · firma humana
                  </p>
                </li>
              ) : null}
              <RoleNode role={role} node={node} />
            </Fragment>
          );
        })}
      </ol>

      <div className="mt-2 grid gap-2 lg:grid-cols-5">
        {branches.map((node) => {
          const role = ROLES.get(node.roleId);
          if (!role) return null;
          return (
            <ul key={node.roleId} className="lg:col-start-1">
              <RoleNode role={role} node={node} branch />
            </ul>
          );
        })}
      </div>

      <p className="mt-4 type-meta-sm text-muted-strong">
        El texto de cada nodo está en el HTML servido: la demo no depende de
        JavaScript para leerse.
      </p>
    </DemoSection>
  );
}
