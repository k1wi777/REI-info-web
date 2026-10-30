import { cn } from "@/lib/cn";

type SelectionMarkProps = {
  checked: boolean;
  className?: string;
};

/**
 * Indicador de selección: anillo vacío o disco con check. Aporta la señal no
 * cromática de «elegido»; es decorativo, el estado lo anuncia el radio nativo.
 */
export function SelectionMark({ checked, className }: SelectionMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-(--duration-fast)",
        checked
          ? "border-foreground bg-foreground text-canvas"
          : "border-border-strong text-transparent",
        className,
      )}
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "size-3.5 transition-[opacity,transform] duration-(--duration-fast) ease-(--ease-out)",
          checked ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
      >
        <path d="m3.5 8.5 3 3 6-7" />
      </svg>
    </span>
  );
}
