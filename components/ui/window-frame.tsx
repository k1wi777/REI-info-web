import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type WindowFrameProps = {
  /** Nombre de la ventana: host, archivo o comando. Se anuncia al lector. */
  label: string;
  /** Dato a la derecha de la barra: estado, fecha o medida. */
  meta?: string;
  /** Cuerpo de la ventana, sin relleno: quien lo usa decide el suyo. */
  children: ReactNode;
  /** Pie opcional dentro del marco. */
  footer?: ReactNode;
  className?: string;
  bodyClassName?: string;
};

/**
 * Marco de ventana con barra de título, tres controles y elevación suave.
 * Es una primitiva: no conoce el producto que muestra. La barra es
 * decorativa salvo su texto, que sigue siendo legible sin CSS.
 */
export function WindowFrame({
  label,
  meta,
  children,
  footer,
  className,
  bodyClassName,
}: WindowFrameProps) {
  return (
    <div
      className={cn(
        "min-w-0 overflow-hidden rounded-window bg-surface-deep ring-1 ring-hairline-strong shadow-window",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-hairline bg-canvas px-3 py-2.5">
        <span
          aria-hidden="true"
          className="flex shrink-0 items-center gap-1.5"
        >
          <span className="size-2 rounded-full bg-error/75" />
          <span className="size-2 rounded-full bg-warning/75" />
          <span className="size-2 rounded-full bg-success/75" />
        </span>

        <p className="min-w-0 flex-1 truncate text-center type-meta-sm text-muted-strong normal-case">
          {label}
        </p>

        {meta ? (
          <p className="hidden shrink-0 truncate type-meta-sm text-muted-strong normal-case sm:block">
            {meta}
          </p>
        ) : null}
      </div>

      <div className={cn("min-w-0", bodyClassName)}>{children}</div>

      {footer ? (
        <div className="border-t border-hairline px-4 py-2.5 type-caption text-muted-strong">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
