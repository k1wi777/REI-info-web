export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const SITE_NAME = "REI Web";
export const PRODUCT_NAME = "REI Harness";
export const PRODUCT_SHORT_NAME = "REI";
export const DOCUMENTED_VERSION = "v0.3.0";

export const REPOSITORY_URL = "https://github.com/k1wi777/REI-Harness";
export const RELEASES_URL = "https://github.com/k1wi777/REI-Harness/releases";
export const ISSUES_URL = "https://github.com/k1wi777/REI-Harness/issues";
export const REPOSITORY_README_URL =
  "https://github.com/k1wi777/REI-Harness/blob/main/README.md";

export const SITE_TITLE =
  "REI Harness — El código empieza después de la aprobación";
export const SITE_DESCRIPTION =
  "REI Harness convierte el trabajo con agentes de IA en un proceso con especificación, aprobación humana y evidencia, dentro de tu propio repositorio.";

export const SITE_URL_FALLBACK = "http://localhost:3000";

export const INSTALL_PATH = "/docs/empezar/instalacion";

export function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return configured ? configured.replace(/\/+$/, "") : SITE_URL_FALLBACK;
}

export function hasDeployedSiteUrl(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Producto", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: REPOSITORY_URL, external: true },
];

export const PRIMARY_CTA: NavItem = {
  label: "Instalar REI",
  href: INSTALL_PATH,
};

export type FooterGroup = {
  title: string;
  items: NavItem[];
};

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: "Documentación",
    items: [
      { label: "Empezar", href: "/docs/empezar/instalacion" },
      { label: "Primer Work Item", href: "/docs/empezar/primer-work-item" },
      { label: "Comandos", href: "/docs/referencia/comandos" },
      { label: "Preguntas frecuentes", href: "/docs/operacion/faq" },
    ],
  },
  {
    title: "Proyecto",
    items: [
      { label: "Repositorio", href: REPOSITORY_URL, external: true },
      { label: "Releases", href: RELEASES_URL, external: true },
      { label: "Issues", href: ISSUES_URL, external: true },
      { label: "Estado del proyecto", href: REPOSITORY_README_URL, external: true },
    ],
  },
];

export type DocsPage = {
  slug: string;
  path: string;
  title: string;
  description: string;
};

export type DocsSection = {
  id: "empezar" | "referencia" | "operacion";
  label: string;
  path: string;
  pages: DocsPage[];
};

export const DOCS_SECTIONS: DocsSection[] = [
  {
    id: "empezar",
    label: "Empezar",
    path: "/docs/empezar/instalacion",
    pages: [
      {
        slug: "instalacion",
        path: "/docs/empezar/instalacion",
        title: "Instalación",
        description:
          "Descargar el binario rei, verificarlo y mantenerlo actualizado en Linux, macOS y Windows.",
      },
      {
        slug: "primer-work-item",
        path: "/docs/empezar/primer-work-item",
        title: "Primer Work Item",
        description:
          "Recorrer el ciclo completo de un Work Item: inicializar, planificar, aprobar, implementar y revisar.",
      },
    ],
  },
  {
    id: "referencia",
    label: "Referencia",
    path: "/docs/referencia/comandos",
    pages: [
      {
        slug: "comandos",
        path: "/docs/referencia/comandos",
        title: "Comandos",
        description:
          "Referencia del CLI rei: comandos, flags y ejemplos agrupados por tarea.",
      },
    ],
  },
  {
    id: "operacion",
    label: "Operación",
    path: "/docs/operacion/faq",
    pages: [
      {
        slug: "faq",
        path: "/docs/operacion/faq",
        title: "Preguntas frecuentes",
        description:
          "Dudas reales sobre Work Items en paralelo, cambios directos, checks, git e historial.",
      },
    ],
  },
];

export const DOCS_PAGES: DocsPage[] = DOCS_SECTIONS.flatMap(
  (section) => section.pages,
);

export const ROUTES: string[] = [
  "/",
  "/docs",
  ...DOCS_PAGES.map((page) => page.path),
];

export function getDocsPage(path: string): DocsPage | undefined {
  return DOCS_PAGES.find((page) => page.path === path);
}

/** Falla en build si una ruta declara una página que no está en el árbol. */
export function getDocsPageOrThrow(path: string): DocsPage {
  const page = getDocsPage(path);
  if (!page) {
    throw new Error(`La página de documentación no existe: ${path}`);
  }
  return page;
}

export function getDocsSection(path: string): DocsSection | undefined {
  return DOCS_SECTIONS.find((section) =>
    section.pages.some((page) => page.path === path),
  );
}

export type DocsPager = {
  previous?: DocsPage;
  next?: DocsPage;
};

export function getDocsPager(path: string): DocsPager {
  const index = DOCS_PAGES.findIndex((page) => page.path === path);
  if (index === -1) {
    return {};
  }
  return {
    previous: index > 0 ? DOCS_PAGES[index - 1] : undefined,
    next: index < DOCS_PAGES.length - 1 ? DOCS_PAGES[index + 1] : undefined,
  };
}
