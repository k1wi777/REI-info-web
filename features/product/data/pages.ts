import type { ProductPageSlug } from "@/content/site";
import { AGENTES_DOCUMENT } from "@/features/product/data/pages/agentes";
import { COMO_FUNCIONA_DOCUMENT } from "@/features/product/data/pages/como-funciona";
import { GITHUB_DOCUMENT } from "@/features/product/data/pages/github";
import { PRODUCTO_DOCUMENT } from "@/features/product/data/pages/producto";
import { VISOR_DOCUMENT } from "@/features/product/data/pages/visor";
import { WORK_ITEMS_DOCUMENT } from "@/features/product/data/pages/work-items";
import type { ProductDocument } from "@/features/product/types";

/** El registro obliga a que exista un documento por cada slug publicado. */
export const PRODUCT_DOCUMENTS: Record<ProductPageSlug, ProductDocument> = {
  producto: PRODUCTO_DOCUMENT,
  "como-funciona": COMO_FUNCIONA_DOCUMENT,
  agentes: AGENTES_DOCUMENT,
  "work-items": WORK_ITEMS_DOCUMENT,
  visor: VISOR_DOCUMENT,
  github: GITHUB_DOCUMENT,
};
