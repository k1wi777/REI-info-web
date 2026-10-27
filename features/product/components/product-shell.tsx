import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { ProductSubnav } from "@/features/product/components/product-subnav";

type ProductShellProps = {
  children: ReactNode;
};

/** Shell compartido por las seis rutas de producto. */
export function ProductShell({ children }: ProductShellProps) {
  return (
    <div className="border-b border-hairline">
      <Container className="py-8 lg:py-10">
        <ProductSubnav />
        <div className="mt-8 min-w-0">{children}</div>
      </Container>
    </div>
  );
}
