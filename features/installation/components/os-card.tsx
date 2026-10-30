import { OptionRadio } from "@/features/installation/components/option-radio";
import type { OsChoice } from "@/features/installation/data/choices";

type OsCardProps = {
  choice: OsChoice;
  checked: boolean;
  onSelect: (value: string) => void;
};

/** Tarjeta de sistema operativo del selector. */
export function OsCard({ choice, checked, onSelect }: OsCardProps) {
  return (
    <OptionRadio
      group="instalar-os"
      value={choice.id}
      checked={checked}
      onSelect={onSelect}
      className="flex flex-col gap-4 rounded-sm px-4 py-4"
    >
      <span
        aria-hidden="true"
        className="type-meta text-muted-strong"
      >
        {choice.mark}
      </span>
      <span className="flex flex-col gap-1">
        <span className="type-ui font-medium text-foreground">
          {choice.label}
        </span>
        <span className="type-meta-sm text-muted-strong">{choice.format}</span>
      </span>
    </OptionRadio>
  );
}
