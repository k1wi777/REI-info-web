import { OptionRadio } from "@/features/installation/components/option-radio";
import { OsIcon } from "@/features/installation/components/os-icon";
import { SelectionMark } from "@/features/installation/components/selection-mark";
import type { OsChoice } from "@/features/installation/data/choices";
import { cn } from "@/lib/cn";

type OsCardProps = {
  choice: OsChoice;
  checked: boolean;
  /** El sistema del visitante coincide con esta tarjeta (solo informa). */
  detected: boolean;
  index: number;
  onSelect: (value: string) => void;
};

/**
 * Tarjeta grande de sistema operativo: icono propio, etiqueta, formato del
 * archivo y, si procede, «Detectado». Ficha vertical en móvil (tres en fila) y
 * fila ancha desde `lg`, donde apila el selector junto al escenario de descarga.
 */
export function OsCard({ choice, checked, detected, index, onSelect }: OsCardProps) {
  return (
    <OptionRadio
      group="instalar-os"
      value={choice.id}
      checked={checked}
      onSelect={onSelect}
      index={index}
      className="flex flex-col items-center gap-3 rounded-sm px-2 pb-4 pt-6 text-center sm:gap-4 sm:px-4 sm:pb-5 sm:pt-7 lg:min-h-28 lg:flex-row lg:gap-5 lg:px-5 lg:py-4 lg:text-left"
    >
      <span
        className={cn(
          "flex size-16 shrink-0 items-center justify-center rounded-sm border transition-[color,border-color,transform] duration-(--duration-fast) ease-(--ease-out) sm:size-20 lg:size-20",
          checked
            ? "border-foreground/50 bg-canvas text-foreground"
            : "border-hairline-strong bg-canvas text-secondary",
        )}
      >
        <OsIcon os={choice.icon} className="size-10 sm:size-12" />
      </span>

      <span className="flex min-w-0 flex-col items-center gap-1.5 lg:flex-1 lg:items-start">
        <span className="type-ui font-medium text-foreground sm:text-body lg:type-docs-heading lg:font-normal">
          {choice.label}
        </span>
        <span className="type-meta text-muted-strong">{choice.format}</span>
        {detected ? (
          <span className="mt-1 inline-flex items-center gap-1.5 rounded-xs border border-hairline-strong px-1.5 py-0.5 type-meta-sm text-secondary">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-success"
            />
            Detectado
          </span>
        ) : null}
      </span>

      <SelectionMark
        checked={checked}
        className="absolute right-2.5 top-2.5 lg:static lg:ml-auto"
      />
    </OptionRadio>
  );
}
