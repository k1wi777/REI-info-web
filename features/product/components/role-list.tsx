import { AGENT_ROLES } from "@/content/rei";
import type { AgentRole, AgentRoleId } from "@/content/rei";

type RoleListProps = {
  roleIds: AgentRoleId[];
};

/** Roles canónicos en el orden pedido; sin copias locales de nombres ni límites. */
export function RoleList({ roleIds }: RoleListProps) {
  const roles = roleIds
    .map((id) => AGENT_ROLES.find((role) => role.id === id))
    .filter((role): role is AgentRole => Boolean(role));

  return (
    <ol className="border-t border-hairline-strong">
      {roles.map((role) => (
        <li
          key={role.id}
          className="grid gap-3 border-b border-hairline py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
        >
          <div>
            <p className="type-meta text-foreground">{role.name}</p>
            <p className="mt-1 type-meta-sm text-muted-strong">{role.when}</p>
          </div>
          <div>
            <p className="type-docs text-secondary">{role.responsibility}</p>
            <p className="mt-1 type-meta-sm text-muted-strong">
              Límite · {role.limit}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
