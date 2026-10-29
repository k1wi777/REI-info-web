import { Fragment } from "react";
import { AGENT_ROLES, APPROVAL_GATE } from "@/content/rei";
import { DemoSection } from "@/features/home/components/demo-section";
import { AGENT_NODES } from "@/features/home/data/demos";
import type { AgentRole, AgentRoleId } from "@/content/rei";
import type { AgentNode } from "@/features/home/types";
import { cn } from "@/lib/cn";

const ROLES = new Map(AGENT_ROLES.map((role) => [role.id, role]));

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="size-3 shrink-0 text-muted-strong transition-transform duration-(--duration-fast) group-open:rotate-90"
    >
      <path
        d="M4.5 2.5 8 6l-3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

type RoleNodeProps = {
  role: AgentRole;
  node: AgentNode;
  branch?: boolean;
  revealDelay?: number;
};

function RoleNode({
  role,
  node,
  branch = false,
  revealDelay = 0,
}: RoleNodeProps) {
  return (
    <li
      data-reveal="up"
      data-reveal-delay={String(revealDelay)}
      className="min-w-0"
    >
      <details className="group" name="agent-roles">
        <summary
          aria-label={`${role.name}. ${node.handoff}. Ver responsabilidad y límite.`}
          className={cn(
            "relative flex min-h-28 cursor-pointer list-none flex-col border-t pt-4 pl-2 transition-colors group-open:bg-surface-deep/50 [&::-webkit-details-marker]:hidden",
            branch
              ? "border-dashed border-border-strong"
              : "border-hairline-strong",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-0 size-1.5 -translate-y-1/2 rounded-full",
              branch ? "bg-border-strong" : "bg-muted",
            )}
          />

          <span className="type-meta-sm text-muted-strong">{node.handoff}</span>
          <span className="mt-2 type-docs-heading text-foreground">
            {role.name}
          </span>
          <span className="mt-auto flex items-center justify-between gap-2 pt-4 type-meta-sm text-muted-strong">
            Responsabilidad y límite
            <Chevron />
          </span>
        </summary>

        <div
          className={cn(
            "mt-3 border-t border-hairline-strong bg-surface-deep/60 px-4 py-4",
            !branch &&
              "sm:absolute sm:inset-x-0 sm:top-[calc(100%-8rem)] sm:z-10 sm:mt-0 sm:h-32 sm:overflow-y-auto lg:top-[calc(100%-7rem)] lg:h-28",
          )}
        >
          <p className="type-meta-sm text-muted-strong">
            {role.name} · Responsabilidad y límite
          </p>

          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="type-meta-sm text-muted-strong">Responsabilidad</p>
              <p className="mt-1 type-caption text-secondary">
                {role.responsibility}
              </p>
            </div>
            <div>
              <p className="type-meta-sm text-muted-strong">Límite</p>
              <p className="mt-1 type-caption text-secondary">{role.limit}</p>
            </div>
          </div>
        </div>
      </details>
    </li>
  );
}

const FOLLOWS: AgentRoleId = "implementer";

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
      <ol className="relative grid items-start gap-6 sm:grid-cols-2 sm:has-[details[open]]:pb-32 lg:grid-cols-5 lg:gap-5 lg:has-[details[open]]:pb-28">
        {flow.map((node, index) => {
          const role = ROLES.get(node.roleId);
          if (!role) return null;

          return (
            <Fragment key={node.roleId}>
              {node.roleId === FOLLOWS ? (
                <li
                  data-reveal="fade"
                  data-reveal-delay={String(Math.min(index + 1, 5))}
                  className="relative flex min-h-28 min-w-0 flex-col border-t border-accent/60 bg-accent/5 pt-4 pb-4 pl-2"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-[0.1875rem] left-0 size-1.5 rounded-full bg-accent-text"
                  />
                  <p className="type-meta-sm text-accent-text">La puerta</p>
                  <p className="mt-2 break-words type-docs text-foreground">
                    {APPROVAL_GATE.label}
                  </p>
                  <p className="mt-auto flex items-center gap-2 pt-4 type-meta-sm text-accent-text">
                    {APPROVAL_GATE.status}
                    <span className="text-secondary">· firma humana</span>
                  </p>
                </li>
              ) : null}
              <RoleNode
                role={role}
                node={node}
                revealDelay={Math.min(index + 1, 5)}
              />
            </Fragment>
          );
        })}
      </ol>

      <div className="mt-6 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
        {branches.map((node) => {
          const role = ROLES.get(node.roleId);
          if (!role) return null;
          return (
            <ul key={node.roleId} className="lg:col-start-1">
              <RoleNode role={role} node={node} branch revealDelay={1} />
            </ul>
          );
        })}
        <p className="max-w-[36ch] type-caption text-muted-strong lg:col-span-4 lg:self-start lg:pt-6">
          El Initializer prepara el repositorio; no aprueba ni implementa Work
          Items.
        </p>
      </div>
    </DemoSection>
  );
}
