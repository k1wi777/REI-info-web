import type { NavItem, ProductPage } from "@/content/site";
import { PRODUCT_PAGES } from "@/content/site";

/** Subnavegación derivada del registro único de páginas de producto. */
export const PRODUCT_NAV_ITEMS: NavItem[] = PRODUCT_PAGES.map(
  (page: ProductPage) => ({
    label: page.label,
    href: page.path,
  }),
);
