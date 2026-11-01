import type { Dictionary } from "@/content/i18n/types";

export const es: Dictionary = {
  meta: {
    title: "REI Harness — El código empieza después de la aprobación",
    description:
      "REI Harness convierte el trabajo con agentes de IA en un proceso con especificación, aprobación humana y evidencia, dentro de tu propio repositorio.",
    ogAlt: "REI Harness — Tu agente escribe. Tú decides.",
  },
  shell: {
    skipLink: "Saltar al contenido",
    brandHome: "Inicio",
    brandSuffix: "Harness",
    mainNavLabel: "Navegación principal",
    mobileNavLabel: "Navegación principal móvil",
    menu: "Menú",
    nav: { product: "Producto", docs: "Docs", github: "GitHub" },
    cta: "Instalar REI",
  },
  language: {
    label: "Idioma",
    names: { es: "Español", en: "English" },
    codes: { es: "ES", en: "EN" },
  },
  footer: {
    tagline: (product) =>
      `${product} convierte el trabajo con agentes de IA en un proceso con especificación, aprobación y evidencia, dentro de tu repositorio.`,
    documentedVersion: (version) => `Versión documentada ${version}`,
    groups: { documentation: "Documentación", project: "Proyecto" },
    items: {
      install: "Instalar",
      start: "Empezar",
      firstWorkItem: "Primer Work Item",
      commands: "Comandos",
      faq: "Preguntas frecuentes",
      repository: "Repositorio",
      releases: "Releases",
      issues: "Issues",
      projectStatus: "Estado del proyecto",
    },
    status: "Proyecto en fase inicial · Contenido estático y versionado",
    releasesNote: "La fuente de verdad de versiones son las releases",
  },
  notFound: {
    metaTitle: "Página no encontrada",
    metaDescription:
      "La ruta solicitada no forma parte de REI Web. Vuelve al inicio o abre la documentación.",
    eyebrow: "Error 404",
    title: "Esta hoja no existe",
    body: "La ruta solicitada no forma parte del sitio. La documentación disponible se organiza en el índice de docs.",
    home: "Volver al inicio",
    docs: "Abrir documentación",
  },
  og: {
    brand: "REI HARNESS",
    badge: "Aprobación humana",
    lineOne: "Tu agente escribe.",
    lineTwo: "Tú decides.",
    footer: "Spec Driven Development · Arnés de agentes de IA",
  },
  llms: {
    version: (version, date) => `Versión documentada: ${version} (${date}).`,
    docsIndexTitle: "Documentación",
    docsIndexDescription: (sections) =>
      `Índice de la documentación: ${sections}.`,
    headings: {
      product: "Producto",
      documentation: "Documentación",
      start: "Empezar",
      reference: "Referencia",
      operation: "Operación",
      source: "Fuente",
    },
    releasesTitle: "Releases de REI Harness",
    releasesDescription: "fuente de verdad de las versiones publicadas.",
    repositoryTitle: "Repositorio de REI Harness",
    repositoryDescription: "código y documentación canónica del CLI.",
    readmeTitle: "README del repositorio",
    readmeDescription: "estado actual del proyecto.",
  },
};
