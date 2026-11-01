import { LocaleLink } from "@/components/ui/locale-link";
import { PRODUCT_SHORT_NAME } from "@/content/site";

type BrandMarkProps = {
  /** Nombre accesible completo del enlace, ya traducido. */
  label: string;
  /** Texto secundario de la marca, ya traducido. */
  suffix: string;
};

/** Marca del sitio: la hoja se reduce a su lomo. */
export function BrandMark({ label, suffix }: BrandMarkProps) {
  return (
    <LocaleLink
      className="group inline-flex items-baseline gap-2 py-1"
      href="/"
      aria-label={label}
    >
      <span className="type-brand text-foreground transition-colors duration-(--duration-fast) group-hover:text-foreground/90">
        {PRODUCT_SHORT_NAME}
      </span>
      <span className="type-meta hidden text-muted-strong sm:inline">
        {suffix}
      </span>
    </LocaleLink>
  );
}
