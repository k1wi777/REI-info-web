import type { FooterGroupId, FooterItemId, NavId } from "@/content/site";

/**
 * Textos traducibles del shell global. Es la única forma de los diccionarios:
 * una clave ausente en cualquier idioma rompe `pnpm typecheck`. Los datos
 * transversales (hrefs, URLs, nombre, versión) viven en `content/site.ts`.
 */
export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogAlt: string;
  };
  shell: {
    skipLink: string;
    brandHome: string;
    brandSuffix: string;
    mainNavLabel: string;
    mobileNavLabel: string;
    menu: string;
    nav: Record<NavId, string>;
    cta: string;
  };
  language: {
    label: string;
    names: { es: string; en: string };
    codes: { es: string; en: string };
  };
  footer: {
    tagline: (product: string) => string;
    documentedVersion: (version: string) => string;
    groups: Record<FooterGroupId, string>;
    items: Record<FooterItemId, string>;
    status: string;
    releasesNote: string;
  };
  notFound: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    body: string;
    home: string;
    docs: string;
  };
  /** Chrome del shell de documentación, compartido por todos los modos. */
  docs: {
    modesLabel: string;
    sectionsSummary: string;
    tocLabel: string;
    pagerLabel: string;
    previous: string;
    next: string;
    open: string;
    gate: {
      label: string;
      status: string;
      detail: string;
      note: string;
    };
  };
  og: {
    brand: string;
    badge: string;
    lineOne: string;
    lineTwo: string;
    footer: string;
  };
  llms: {
    version: (version: string, date: string) => string;
    docsIndexTitle: string;
    docsIndexDescription: (sections: string) => string;
    headings: {
      product: string;
      documentation: string;
      start: string;
      reference: string;
      operation: string;
      source: string;
    };
    releasesTitle: string;
    releasesDescription: string;
    repositoryTitle: string;
    repositoryDescription: string;
    readmeTitle: string;
    readmeDescription: string;
  };
};
