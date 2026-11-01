import { Fragment } from "react";
import { InlineText } from "@/components/ui/inline-text";
import { StatusTag } from "@/components/ui/status-tag";
import { AGENT_ROLES } from "@/content/rei";
import { getCurrentProductCopy } from "@/features/product/copy/server";
import type { AgentRole, AgentRoleId } from "@/content/rei";

type RoleListProps = {
  roleIds: AgentRoleId[];
};

/** Roles canónicos en el orden pedido; sin copias locales de nombres ni límites. */
export async function RoleList({ roleIds }: RoleListProps) {
  const copy = await getCurrentProductCopy();
  const roles = roleIds
    .map((id) => AGENT_ROLES.find((role) => role.id === id))
    .filter((role): role is AgentRole => Boolean(role))
    .filter((role) => role.id !== "initializer");

  const initializer = AGENT_ROLES.find((role) => role.id === "initializer");

  return (
    <div>
      <ol className="border-t border-hairline-strong">
        {roles.map((role) => (
          <Fragment key={role.id}>
            {role.id === "implementer" ? (
              <li className="border-b border-accent/40 bg-accent/10 px-4 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <p className="type-meta text-accent-text">
                    {copy.gate.label}
                  </p>
                  <StatusTag tone="accent">{copy.gate.status}</StatusTag>
                </div>
                <p className="mt-2 max-w-[58ch] type-body text-secondary">
                  {copy.gate.detail}
                </p>
              </li>
            ) : null}

            <li className="grid gap-4 border-b border-hairline py-5 sm:grid-cols-[11rem_1fr] sm:gap-6 lg:grid-cols-[12rem_1fr] lg:gap-8">
              <div className="min-w-0">
                <p className="type-meta-sm text-muted-strong tabular-nums">
                  {String(roles.indexOf(role) + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1.5 type-docs-heading text-foreground">
                  {role.name}
                </h3>
                <p className="mt-2 type-caption text-muted-strong">
                  {copy.roles[role.id].when}
                </p>
              </div>

              <div className="min-w-0">
                <p className="max-w-[58ch] type-body text-secondary">
                  {copy.roles[role.id].responsibility}
                </p>
                <p className="mt-3 max-w-[58ch] type-caption text-secondary">
                  <span className="type-meta-sm text-muted-strong">
                    {copy.roleList.limit} ·{" "}
                  </span>
                  {copy.roles[role.id].limit}
                </p>
              </div>
            </li>
          </Fragment>
        ))}
      </ol>

      {initializer ? (
        <div className="mt-8">
          <p className="type-meta-sm text-muted-strong">{copy.roleList.outsideCycle}</p>

          <div className="mt-2 border-t border-dashed border-border-strong pt-4">
            <h3 className="type-docs-heading text-foreground">
              {initializer.name}
            </h3>
            <p className="mt-2 max-w-[58ch] type-body text-secondary">
              {copy.roles.initializer.responsibility}
            </p>
            <p className="mt-2 max-w-[58ch] type-caption text-muted-strong">
              {copy.roles.initializer.when}
            </p>
            <p className="mt-2 max-w-[58ch] type-caption text-secondary">
              <InlineText text={copy.roles.initializer.limit} />
            </p>
            <p className="mt-3 type-caption text-muted-strong">
              {copy.roleList.initializerNote}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
