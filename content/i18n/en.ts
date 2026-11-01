import type { Dictionary } from "@/content/i18n/types";

export const en: Dictionary = {
  meta: {
    title: "REI Harness — Code starts after approval",
    description:
      "REI Harness turns work with AI agents into a process with a specification, human approval and evidence, inside your own repository.",
    ogAlt: "REI Harness — Your agent writes. You decide.",
  },
  shell: {
    skipLink: "Skip to content",
    brandHome: "Home",
    brandSuffix: "Harness",
    mainNavLabel: "Main navigation",
    mobileNavLabel: "Mobile main navigation",
    menu: "Menu",
    nav: { product: "Product", docs: "Docs", github: "GitHub" },
    cta: "Install REI",
  },
  language: {
    label: "Language",
    names: { es: "Español", en: "English" },
    codes: { es: "ES", en: "EN" },
  },
  footer: {
    tagline: (product) =>
      `${product} turns work with AI agents into a process with a specification, approval and evidence, inside your repository.`,
    documentedVersion: (version) => `Documented version ${version}`,
    groups: { documentation: "Documentation", project: "Project" },
    items: {
      install: "Install",
      start: "Get started",
      firstWorkItem: "First Work Item",
      commands: "Commands",
      faq: "Frequently asked questions",
      repository: "Repository",
      releases: "Releases",
      issues: "Issues",
      projectStatus: "Project status",
    },
    status: "Early-stage project · Static, versioned content",
    releasesNote: "The source of truth for versions is the releases",
  },
  notFound: {
    metaTitle: "Page not found",
    metaDescription:
      "The requested route is not part of REI Web. Go back home or open the documentation.",
    eyebrow: "Error 404",
    title: "This sheet does not exist",
    body: "The requested route is not part of the site. The available documentation is organized in the docs index.",
    home: "Back to home",
    docs: "Open documentation",
  },
  og: {
    brand: "REI HARNESS",
    badge: "Human approval",
    lineOne: "Your agent writes.",
    lineTwo: "You decide.",
    footer: "Spec Driven Development · AI agent harness",
  },
  llms: {
    version: (version, date) => `Documented version: ${version} (${date}).`,
    docsIndexTitle: "Documentation",
    docsIndexDescription: (sections) => `Documentation index: ${sections}.`,
    headings: {
      product: "Product",
      documentation: "Documentation",
      start: "Get started",
      reference: "Reference",
      operation: "Operations",
      source: "Source",
    },
    releasesTitle: "REI Harness releases",
    releasesDescription: "source of truth for published versions.",
    repositoryTitle: "REI Harness repository",
    repositoryDescription: "code and canonical documentation of the CLI.",
    readmeTitle: "Repository README",
    readmeDescription: "current state of the project.",
  },
};
