import { cn } from "@/lib/cn";

type CaptureLinkProps = {
  /** Archivo de la captura completa; se abre en otra pestaña. */
  href: string;
  className?: string;
};

/**
 * Enlace al archivo completo de una captura recortada. Primitiva sin dominio:
 * solo conoce la ruta y el texto fijo del sistema.
 */
export function CaptureLink({ href, className }: CaptureLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-6 items-center type-caption text-secondary underline decoration-border-strong underline-offset-4 transition-colors duration-(--duration-fast) hover:text-foreground hover:decoration-foreground",
        className,
      )}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      Ver captura completa
    </a>
  );
}
