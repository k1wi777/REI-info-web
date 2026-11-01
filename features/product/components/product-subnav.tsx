import { NavLinks } from "@/components/layout/nav-links";
import { getCurrentProductCopy } from "@/features/product/copy/server";
import { productNavItems } from "@/features/product/data/product-nav";

/**
 * Subnavegación de producto: `exact` evita que el hub quede activo en las
 * cinco rutas hijas. En móvil se desplaza en horizontal, sin romper el ancho.
 */
export async function ProductSubnav() {
  const copy = await getCurrentProductCopy();

  return (
    <nav aria-label={copy.chrome.subnavLabel} className="border-b border-hairline">
      <div className="flex items-baseline gap-6">
        <p className="hidden shrink-0 type-meta-sm text-muted-strong lg:block">
          {copy.chrome.subnavTitle}
        </p>
        <NavLinks
          items={productNavItems(copy)}
          exact
          className="min-w-0 flex-1 flex-wrap gap-1 sm:flex-nowrap"
          itemClassName="-mb-px whitespace-nowrap border-b-2 border-transparent px-3 py-2.5"
        />
      </div>
    </nav>
  );
}
