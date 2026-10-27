import Link from "next/link";
import { PRODUCT_NAME, PRODUCT_SHORT_NAME } from "@/content/site";

/** Marca del sitio: la hoja se reduce a su lomo. */
export function BrandMark() {
  return (
    <Link
      className="group inline-flex items-baseline gap-2"
      href="/"
      aria-label={`${PRODUCT_NAME} — Inicio`}
    >
      <span className="type-brand text-foreground transition-colors duration-(--duration-fast) group-hover:text-foreground/90">
        {PRODUCT_SHORT_NAME}
      </span>
      <span className="type-meta hidden text-muted-strong sm:inline">
        Harness
      </span>
    </Link>
  );
}
