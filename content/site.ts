export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const SITE_NAME = "REI Web";
export const PRODUCT_NAME = "REI Harness";
export const PRODUCT_SHORT_NAME = "REI";
export const DOCUMENTED_VERSION = "v0.3.0";
export const DOCUMENTED_VERSION_DATE = "2026-10-26";

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

export const INSTALL_PATH = "/instalar";

/** API pública de GitHub: única llamada externa del sitio, hecha en el servidor. */
export const LATEST_RELEASE_API_URL =
  "https://api.github.com/repos/k1wi777/REI-Harness/releases/latest";

export const INSTALL_PAGE = {
  path: INSTALL_PATH,
  title: "Instalar REI",
  description:
    "Elige tu sistema operativo y arquitectura, descarga el binario rei de la última release de GitHub y verifícalo en minutos.",
} as const;

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
  { label: "Producto", href: "/producto" },
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
      { label: "Instalar", href: INSTALL_PATH },
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
  id: "empezar" | "conceptos" | "guias" | "referencia" | "operacion";
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
    id: "conceptos",
    label: "Conceptos",
    path: "/docs/conceptos",
    pages: [
      {
        slug: "conceptos",
        path: "/docs/conceptos",
        title: "Conceptos",
        description:
          "Las ideas que sostienen REI Harness: Spec Driven Development, aprobación humana, Work Items y modo directo.",
      },
      {
        slug: "sdd",
        path: "/docs/conceptos/sdd",
        title: "Spec Driven Development",
        description:
          "Qué es Spec Driven Development, por qué la especificación precede al código y qué artefactos produce el arnés.",
      },
      {
        slug: "aprobacion-humana",
        path: "/docs/conceptos/aprobacion-humana",
        title: "Aprobación humana",
        description:
          "Qué significa aprobar una planificación, qué no significa y cómo se registra la puerta desde el CLI.",
      },
      {
        slug: "work-items-y-estados",
        path: "/docs/conceptos/work-items-y-estados",
        title: "Work Items y estados",
        description:
          "Feature frente a Task, los estados del ciclo, sus ramas y el límite de un solo Work Item en in_progress.",
      },
      {
        slug: "modo-directo",
        path: "/docs/conceptos/modo-directo",
        title: "Modo directo",
        description:
          "Qué es el modo directo, cuándo se permite, cuándo se niega y por qué no es un atajo del workflow.",
      },
    ],
  },
  {
    id: "guias",
    label: "Guías",
    path: "/docs/guias",
    pages: [
      {
        slug: "guias",
        path: "/docs/guias",
        title: "Guías",
        description:
          "Recetas para activar GitHub Issues, abrir el visor, configurar checks y actualizar el arnés.",
      },
      {
        slug: "github-issues",
        path: "/docs/guias/github-issues",
        title: "GitHub Issues",
        description:
          "Activar, consultar y desactivar la integración opcional con GitHub Issues y operar issue, rama, PR y backlog.",
      },
      {
        slug: "visor",
        path: "/docs/guias/visor",
        title: "Visor",
        description:
          "Abrir rei view, leer sus vistas, controlar su ciclo de vida y respetar sus límites de solo lectura.",
      },
      {
        slug: "checks",
        path: "/docs/guias/checks",
        title: "Checks",
        description:
          "Declarar los checks rápidos en .rei/config.json y ejecutarlos con rei check o rei test.",
      },
      {
        slug: "actualizar",
        path: "/docs/guias/actualizar",
        title: "Actualizar",
        description:
          "Actualizar el arnés con rei init --update y el binario con rei update, incluido el caso de Windows.",
      },
    ],
  },
  {
    id: "referencia",
    label: "Referencia",
    path: "/docs/referencia",
    pages: [
      {
        slug: "referencia",
        path: "/docs/referencia",
        title: "Referencia",
        description:
          "Hechos exactos del arnés: comandos, configuración, estados, plantillas y adaptadores.",
      },
      {
        slug: "comandos",
        path: "/docs/referencia/comandos",
        title: "Comandos",
        description:
          "Referencia del CLI rei: comandos, flags y ejemplos agrupados por tarea.",
      },
      {
        slug: "configuracion",
        path: "/docs/referencia/configuracion",
        title: "Configuración",
        description:
          ".rei/config.json: checks, integración con GitHub Issues, visor y códigos de salida.",
      },
      {
        slug: "meta",
        path: "/docs/referencia/meta",
        title: "meta.json",
        description:
          "Campos, identificador, tipo, estado y commits del registro duradero de cada Work Item.",
      },
      {
        slug: "estados",
        path: "/docs/referencia/estados",
        title: "Estados",
        description:
          "Los siete estados del workflow, sus transiciones, el límite de un in_progress y --force.",
      },
      {
        slug: "plantillas",
        path: "/docs/referencia/plantillas",
        title: "Plantillas",
        description:
          "Las plantillas canónicas de current.md, history.md y meta.json y cómo se archiva la sesión.",
      },
      {
        slug: "adaptadores",
        path: "/docs/referencia/adaptadores",
        title: "Adaptadores",
        description:
          "El contrato canónico de rol, la generación de subagentes nativos y el fallback sin adaptador.",
      },
    ],
  },
  {
    id: "operacion",
    label: "Operación",
    path: "/docs/operacion",
    pages: [
      {
        slug: "operacion",
        path: "/docs/operacion",
        title: "Operación",
        description:
          "Diagnóstico y cambios: qué hacer cuando algo falla, dudas frecuentes y la versión documentada.",
      },
      {
        slug: "troubleshooting",
        path: "/docs/operacion/troubleshooting",
        title: "Solución de problemas",
        description:
          "Síntomas, causa y siguiente paso para los fallos habituales del arnés y del CLI.",
      },
      {
        slug: "faq",
        path: "/docs/operacion/faq",
        title: "Preguntas frecuentes",
        description:
          "Dudas reales sobre Work Items en paralelo, cambios directos, checks, git e historial.",
      },
      {
        slug: "changelog",
        path: "/docs/operacion/changelog",
        title: "Changelog",
        description:
          "La versión documentada, su fecha y los temas verificables de la release v0.3.0.",
      },
    ],
  },
];

export const DOCS_PAGES: DocsPage[] = DOCS_SECTIONS.flatMap(
  (section) => section.pages,
);

export type ProductPageSlug =
  | "producto"
  | "como-funciona"
  | "agentes"
  | "work-items"
  | "visor"
  | "github-issues";

export type ProductPage = {
  slug: ProductPageSlug;
  path: string;
  label: string;
  title: string;
  description: string;
};

export const PRODUCT_PAGES: ProductPage[] = [
  {
    slug: "producto",
    path: "/producto",
    label: "Producto",
    title: "Qué es REI",
    description:
      "Qué es REI Harness, qué problema resuelve y por qué el proceso importa antes que los comandos.",
  },
  {
    slug: "como-funciona",
    path: "/producto/como-funciona",
    label: "Cómo funciona",
    title: "Cómo funciona",
    description:
      "El flujo completo de un Work Item, la puerta de aprobación humana, los estados y el modo directo.",
  },
  {
    slug: "agentes",
    path: "/producto/agentes",
    label: "Agentes",
    title: "Agentes",
    description:
      "Los cinco roles de REI Harness, su responsabilidad, su límite y el momento en que intervienen.",
  },
  {
    slug: "work-items",
    path: "/producto/work-items",
    label: "Work Items",
    title: "Work Items",
    description:
      "Feature frente a Task, ciclo de vida, aprobación previa y evidencia versionada con revisión por diff.",
  },
  {
    slug: "visor",
    path: "/producto/visor",
    label: "Visor",
    title: "Visor",
    description:
      "rei view: visor local de solo lectura, recarga en vivo, FICHA y límites.",
  },
  {
    slug: "github-issues",
    path: "/producto/github-issues",
    label: "GitHub Issues",
    title: "GitHub Issues",
    description:
      "Integración opcional GitHub Issues: issue y rama para Features, PR y merge bajo orden, GitHub como proyección.",
  },
];

export const ROUTES: string[] = [
  "/",
  INSTALL_PAGE.path,
  "/docs",
  ...DOCS_PAGES.map((page) => page.path),
  ...PRODUCT_PAGES.map((page) => page.path),
];

export function getProductPage(path: string): ProductPage | undefined {
  return PRODUCT_PAGES.find((page) => page.path === path);
}

/** Falla en build si una ruta declara una página que no está en el árbol. */
export function getProductPageOrThrow(path: string): ProductPage {
  const page = getProductPage(path);
  if (!page) {
    throw new Error(`La página de producto no existe: ${path}`);
  }
  return page;
}

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
