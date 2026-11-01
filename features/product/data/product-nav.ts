import type { NavItem } from "@/content/site";
import { PRODUCT_PAGES } from "@/content/site";
import type { ProductCopy } from "@/features/product/copy/types";

/** Subnavegación derivada del registro único de páginas y de la copy. */
export function productNavItems(copy: ProductCopy): NavItem[] {
  return PRODUCT_PAGES.map((page) => ({
    label: copy.pages[page.slug].label,
    href: page.path,
  }));
}
