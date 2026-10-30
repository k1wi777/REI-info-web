import { OptionRadio } from "@/features/installation/components/option-radio";
import { ARCH_CHOICES } from "@/features/installation/data/choices";
import type { ArchId } from "@/lib/release";

type ArchSelectorProps = {
  value: ArchId;
  onSelect: (value: ArchId) => void;
};

/** Control segmentado de arquitectura, también un grupo de radio nativo. */
export function ArchSelector({ value, onSelect }: ArchSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
      {ARCH_CHOICES.map((choice) => (
        <OptionRadio
          key={choice.id}
          group="instalar-arch"
          value={choice.id}
          checked={value === choice.id}
          onSelect={(next) => onSelect(next as ArchId)}
          className="rounded-sm px-4 py-3 text-center type-code text-foreground"
        >
          {choice.label}
        </OptionRadio>
      ))}
    </div>
  );
}
