import type { DocContent, DocsContentPath } from "@/features/docs/types";

export const CONCEPTOS_APROBACION_HUMANA_PATH: DocsContentPath =
  "/docs/conceptos/aprobacion-humana";

export const CONCEPTOS_APROBACION_HUMANA_DOCUMENT: DocContent = {
  path: CONCEPTOS_APROBACION_HUMANA_PATH,
  eyebrow: "Conceptos · Aprobación",
  meta: "Una puerta real · ready → in_progress",
  sections: [
    {
      id: "la-puerta",
      title: "La puerta de aprobación",
      blocks: [
        {
          kind: "paragraph",
          text: "Cuando el Spec Author termina, el Work Item queda en ready. Ese estado no es una sala de espera técnica: es el punto donde la persona revisa la planificación y decide si se implementa o no. Ningún Work Item avanza de ready a in_progress sin una decisión humana explícita.",
        },
        {
          kind: "paragraph",
          text: "La puerta existe porque la responsabilidad de qué se construye no es del agente. El Leader coordina y el Spec Author propone, pero el acuerdo sobre el alcance, las decisiones de diseño y los requisitos es de quien encarga el trabajo.",
        },
      ],
    },
    {
      id: "que-significa-aprobar",
      title: "Qué significa aprobar",
      blocks: [
        {
          kind: "paragraph",
          text: "Aprobar no es revisar código: todavía no existe. Es confirmar que la planificación refleja el acuerdo alcanzado y que las decisiones que determinan el resultado son correctas.",
        },
        {
          kind: "list",
          items: [
            "Que los requisitos describen el comportamiento que se espera.",
            "Que las decisiones de diseño y las alternativas descartadas tienen sentido.",
            "Que las tareas cubren el alcance y dejan claro cómo se verificará.",
            "Que lo que queda fuera de alcance también es lo acordado.",
          ],
        },
        {
          kind: "paragraph",
          text: "Aprobar es un acto de responsabilidad, no un visto bueno automático. Si la planificación no refleja lo hablado, el paso correcto es pedir cambios, no aprobar y corregir después.",
        },
      ],
    },
    {
      id: "lo-que-no-significa",
      title: "Lo que no significa aprobar",
      blocks: [
        {
          kind: "list",
          items: [
            "El silencio no aprueba: una respuesta ambigua tampoco. Sin una confirmación inequívoca, el Work Item se queda en ready.",
            "Abrir el visor no aprueba: `rei view` es de solo lectura y no tiene botón ni ruta de aprobación.",
            "Leer la planificación no aprueba: la decisión se comunica y se registra, no se deduce.",
            "Aprobar no bloquea cambios futuros: si la implementación se desvía, el Reviewer puede rechazarla.",
          ],
        },
        {
          kind: "note",
          tone: "warning",
          title: "El defecto es no avanzar",
          text: "Ante la duda, el Leader espera. La aprobación nunca se asume por haber mostrado la planificación ni por el paso del tiempo.",
        },
      ],
    },
    {
      id: "como-se-registra",
      title: "Cómo se registra desde el CLI",
      blocks: [
        {
          kind: "paragraph",
          text: "La aprobación se da en el chat o en la terminal. El Leader registra el cambio de estado; la persona no necesita ejecutar nada, aunque puede hacerlo si trabaja directamente con el CLI.",
        },
        {
          kind: "code",
          language: "Shell",
          code: "rei status set 2026-10-27_01-54__mi-feature in_progress",
        },
        {
          kind: "paragraph",
          text: "Al aprobar, el Leader registra también el commit de inicio de la implementación en `base_commit`. Si la integración con GitHub Issues está activa y el Work Item es una Feature, la puerta issue + rama se resuelve en este mismo momento, antes de mover el estado.",
        },
        {
          kind: "note",
          tone: "info",
          title: "Una sola sesión activa",
          text: "El paso a in_progress puede rechazarse si ya hay otro Work Item activo. El límite es duro y también se aplica con `--force`.",
        },
      ],
    },
    {
      id: "si-no-apruebas",
      title: "Si no apruebas",
      blocks: [
        {
          kind: "paragraph",
          text: "Si algo no refleja lo acordado o una decisión de diseño no te convence, dilo en lenguaje natural. El Leader relanza al Spec Author, la planificación se actualiza y vuelve a presentarse. El Work Item no pasa a implementación mientras tanto.",
        },
        {
          kind: "paragraph",
          text: "El rechazo en la revisión es otro momento distinto: si el Reviewer encuentra que la implementación no cumple la planificación, el Work Item pasa a changes_requested y vuelve a in_progress con las correcciones. No tienes que gestionar ese bucle: el Leader lo coordina.",
        },
      ],
    },
    {
      id: "siguiente",
      title: "Siguiente paso",
      blocks: [
        {
          kind: "paragraph",
          text: "Si quieres ver la puerta en un ciclo real, empieza por el tutorial. Si ya trabajas con Work Items, la guía de GitHub Issues explica cómo la puerta convive con issue y rama.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Recorrer el primer Work Item",
              href: "/docs/empezar/primer-work-item",
            },
            {
              label: "Repasar Spec Driven Development",
              href: "/docs/conceptos/sdd",
            },
            {
              label: "Activar la integración con GitHub Issues",
              href: "/docs/guias/github-issues",
            },
            {
              label: "Resolver dudas frecuentes",
              href: "/docs/operacion/faq",
            },
          ],
        },
      ],
    },
  ],
};
