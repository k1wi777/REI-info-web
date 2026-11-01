import type { ReactNode } from "react";
import { ProductShell } from "@/features/product";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <ProductShell>{children}</ProductShell>;
}
