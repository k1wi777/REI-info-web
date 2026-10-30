import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type OptionRadioProps = {
  group: string;
  value: string;
  checked: boolean;
  onSelect: (value: string) => void;
  children: ReactNode;
  className?: string;
};

/**
 * Opción de un grupo de radio: el `input` nativo (oculto a la vista) aporta
 * teclado y estado anunciado; la etiqueta es la tarjeta y refleja `:checked`.
 */
export function OptionRadio({
  group,
  value,
  checked,
  onSelect,
  children,
  className,
}: OptionRadioProps) {
  const id = `${group}-${value}`;

  return (
    <div className="relative min-w-0">
      <input
        id={id}
        type="radio"
        name={group}
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        className={cn(
          "block h-full cursor-pointer border border-hairline-strong bg-surface transition-colors duration-(--duration-fast) hover:border-muted peer-checked:border-accent peer-checked:bg-accent/10 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus",
          className,
        )}
      >
        {children}
      </label>
    </div>
  );
}
