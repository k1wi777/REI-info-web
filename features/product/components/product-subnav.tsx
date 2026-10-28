import { NavLinks } from "@/components/layout/nav-links";
import { PRODUCT_NAV_ITEMS } from "@/features/product/data/product-nav";

/**
 * Subnavegación de producto: `exact` evita que el hub quede activo en las
 * cinco rutas hijas. En móvil se desplaza en horizontal, sin romper el ancho.
 */
export function ProductSubnav() {
  return (
    <nav aria-label="Secciones de producto" className="border-b border-hairline">
      <div className="flex items-baseline gap-6">
        <p className="hidden shrink-0 type-meta-sm text-muted-strong lg:block">
          Dossier
        </p>
        <NavLinks
          items={PRODUCT_NAV_ITEMS}
          exact
          className="min-w-0 flex-1 flex-wrap gap-1 sm:flex-nowrap"
          itemClassName="-mb-px whitespace-nowrap border-b-2 border-transparent px-3 py-2.5"
        />
      </div>
    </nav>
  );
}
