import type { DocsEntry } from "@/features/docs/types";

/** Entradas de la landing de documentación: solo rutas que existen. */
export const DOCS_ENTRIES: DocsEntry[] = [
  {
    title: "Instalar REI",
    mode: "Empezar · Instalación",
    description:
      "Descarga el binario, verifícalo y prepáralo para actualizarse sin dependencias de runtime.",
    href: "/docs/empezar/instalacion",
  },
  {
    title: "Abrir tu primer Work Item",
    mode: "Empezar · Tutorial",
    description:
      "Recorre rei init, la personalización, la planificación, la aprobación, la implementación y la revisión.",
    href: "/docs/empezar/primer-work-item",
  },
  {
    title: "Consultar el CLI",
    mode: "Referencia",
    description:
      "Comandos, flags y ejemplos reales, agrupados por la tarea que resuelven.",
    href: "/docs/referencia/comandos",
  },
  {
    title: "Resolver dudas",
    mode: "Operación",
    description:
      "Work Items en paralelo, cambios directos, checks, git, historial y documentación necesaria.",
    href: "/docs/operacion/faq",
  },
];
