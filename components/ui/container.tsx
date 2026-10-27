import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Contenedor del sitio: ancho máximo 1344 px y márgenes fluidos. */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-(--container-site) px-5 sm:px-6 lg:px-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
