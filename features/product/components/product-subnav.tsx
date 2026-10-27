import { NavLinks } from "@/components/layout/nav-links";
import { PRODUCT_NAV_ITEMS } from "@/features/product/data/product-nav";

/**
 * Subnavegación de producto: `exact` evita que el hub quede activo en las
 * cinco rutas hijas. En móvil se desplaza en horizontal, sin romper el ancho.
 */
export function ProductSubnav() {
  return (
    <nav aria-label="Secciones de producto" className="border-b border-hairline">
      <NavLinks
        items={PRODUCT_NAV_ITEMS}
        exact
        className="gap-1 overflow-x-auto"
        itemClassName="-mb-px whitespace-nowrap border-b-2 border-transparent px-3 py-2.5"
      />
    </nav>
  );
}
