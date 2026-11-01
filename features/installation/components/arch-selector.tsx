import { ArchIcon } from "@/features/installation/components/arch-icon";
import { OptionRadio } from "@/features/installation/components/option-radio";
import { SelectionMark } from "@/features/installation/components/selection-mark";
import type { InstallerCopy } from "@/features/installation/copy/types";
import {
  ARCH_CHOICES,
  archDescription,
} from "@/features/installation/data/choices";
import { cn } from "@/lib/cn";
import type { ArchId, OsId } from "@/lib/release";

type ArchSelectorProps = {
  descriptions: InstallerCopy["archDescriptions"];
  os: OsId;
  value: ArchId;
  onSelect: (value: ArchId) => void;
};

/**
 * Dos fichas de arquitectura (pictograma, etiqueta y descriptor de equipo),
 * también un grupo de radio nativo. Altura propia: no se estiran para igualar
 * a la columna vecina.
 */
export function ArchSelector({
  descriptions,
  os,
  value,
  onSelect,
}: ArchSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {ARCH_CHOICES.map((choice, index) => {
        const checked = value === choice.id;

        return (
          <OptionRadio
            key={choice.id}
            index={index + 3}
            group="instalar-arch"
            value={choice.id}
            checked={checked}
            onSelect={(next) => onSelect(next as ArchId)}
            className="flex flex-col items-start gap-3 rounded-sm p-4"
          >
            <span
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-sm border transition-[color,border-color] duration-(--duration-fast)",
                checked
                  ? "border-foreground/50 bg-canvas text-foreground"
                  : "border-hairline-strong bg-canvas text-secondary",
              )}
            >
              <ArchIcon className="size-8" />
            </span>
            <span className="flex min-w-0 flex-col gap-1">
              <span className="type-ui font-medium text-foreground sm:text-body">
                {choice.label}
              </span>
              <span className="type-caption text-secondary">
                {archDescription(descriptions, os, choice.id)}
              </span>
            </span>
            <SelectionMark
              checked={checked}
              className="absolute right-3 top-3"
            />
          </OptionRadio>
        );
      })}
    </div>
  );
}
