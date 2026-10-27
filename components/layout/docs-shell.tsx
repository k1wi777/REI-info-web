import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { DocsSidebar } from "@/components/layout/docs-sidebar";
import { DocsTabs } from "@/components/layout/docs-tabs";

type DocsShellProps = {
  children: ReactNode;
};

/** Shell compartido por todas las páginas de documentación. */
export function DocsShell({ children }: DocsShellProps) {
  return (
    <div className="border-b border-hairline">
      <Container className="py-8 lg:py-10">
        <DocsTabs />

        <div className="mt-8 grid gap-8 lg:grid-cols-[var(--container-sidebar)_minmax(0,1fr)] lg:gap-12">
          <DocsSidebar />
          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </div>
  );
}
