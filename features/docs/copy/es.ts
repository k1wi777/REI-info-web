import type { DocsLandingCopyEs } from "@/features/docs/copy/types";

export const es: DocsLandingCopyEs = {
  meta: {
    title: "Documentación",
    description:
      "Guías y referencia de REI Harness: instalación, primer Work Item, comandos y preguntas frecuentes.",
  },
  eyebrow: "Documentación",
  title: "¿Qué quieres hacer?",
  intro:
    "La documentación de REI Harness explica el proceso antes que los comandos. Elige por dónde entrar; todas las rutas llevan a contenido real.",
  recommended: {
    heading: "Ruta recomendada",
    text: "Si es tu primera vez, instala el binario y abre un Work Item. Cuando el flujo ya te resulte familiar, la referencia de comandos y las preguntas frecuentes resuelven el resto.",
    install: "Empezar por la instalación",
    firstWorkItem: "Ver el primer Work Item",
  },
  entries: {
    install: {
      title: "Instalar REI",
      mode: "Empezar · Instalación",
      description:
        "Descarga el binario, verifícalo y prepáralo para actualizarse sin dependencias de runtime.",
    },
    "first-work-item": {
      title: "Abrir tu primer Work Item",
      mode: "Empezar · Tutorial",
      description:
        "Recorre rei init, la personalización, la planificación, la aprobación, la implementación y la revisión.",
    },
    commands: {
      title: "Consultar el CLI",
      mode: "Referencia",
      description:
        "Comandos, flags y ejemplos reales, agrupados por la tarea que resuelven.",
    },
    faq: {
      title: "Resolver dudas",
      mode: "Operación",
      description:
        "Work Items en paralelo, cambios directos, checks, git, historial y documentación necesaria.",
    },
  },
};
