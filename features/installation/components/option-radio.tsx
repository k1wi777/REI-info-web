import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type OptionRadioProps = {
  group: string;
  value: string;
  checked: boolean;
  onSelect: (value: string) => void;
  children: ReactNode;
  className?: string;
  /** Posición en el grupo: escalona la entrada de las opciones. */
  index?: number;
};

/**
 * Opción de un grupo de radio: el `input` nativo (oculto a la vista) aporta
 * teclado y estado anunciado; la etiqueta es la tarjeta y refleja `:checked`
 * con borde claro, relleno elevado y una luz tenue (`option-glow`); la marca de
 * selección del contenido aporta la señal no cromática. El violeta no se usa:
 * queda reservado a la puerta de aprobación.
 */
export function OptionRadio({
  group,
  value,
  checked,
  onSelect,
  children,
  className,
  index = 0,
}: OptionRadioProps) {
  const id = `${group}-${value}`;

  return (
    <div
      className="option-enter relative min-w-0"
      style={{ "--enter-index": index } as CSSProperties}
    >
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
          "option-glow block h-full cursor-pointer border border-hairline-strong bg-surface-deep transition-colors duration-(--duration-fast) hover:border-muted peer-checked:border-foreground peer-checked:bg-surface peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus",
          className,
        )}
      >
        {children}
      </label>
    </div>
  );
}
