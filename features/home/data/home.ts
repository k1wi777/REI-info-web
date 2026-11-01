import { INSTALL_PATH } from "@/content/site";
import type { HomeBlockCopy, HomeCopy } from "@/features/home/copy/types";
import type { FinalCta, HomeBlock } from "@/features/home/types";

/**
 * Contenido no demostrativo de la home. Los ids y destinos se definen aquí una
 * vez; el texto sale de la copy del idioma. Todo es rastreable a README.md,
 * PRODUCT.md y docs/product-strategy.md; no hay cifras, testimonios ni
 * clientes.
 */
function buildBlock(id: string, href: string, copy: HomeBlockCopy): HomeBlock {
  const { linkLabel, ...rest } = copy;
  return { id, ...rest, link: { label: linkLabel, href } };
}

export const PROCESS_INTRO_HREF = "/docs/empezar/primer-work-item";
export const LIMITS_HREF = "/docs/referencia/comandos";
export const PRODUCT_HREF = "/producto";

export function buildProcessIntro(copy: HomeCopy): HomeBlock {
  return buildBlock("solucion", PROCESS_INTRO_HREF, copy.process);
}

export function buildLimitsBlock(copy: HomeCopy): HomeBlock {
  return buildBlock("limites", LIMITS_HREF, copy.limits);
}

export function buildFinalCta(copy: HomeCopy["cta"]): FinalCta {
  return {
    eyebrow: copy.eyebrow,
    title: copy.title,
    intro: copy.intro,
    primary: { label: copy.primary, href: INSTALL_PATH },
    secondary: { label: copy.secondary, href: PRODUCT_HREF },
  };
}
