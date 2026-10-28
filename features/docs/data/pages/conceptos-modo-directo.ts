import type { DocContent, DocsContentPath } from "@/features/docs/types";

export const CONCEPTOS_MODO_DIRECTO_PATH: DocsContentPath =
  "/docs/conceptos/modo-directo";

export const CONCEPTOS_MODO_DIRECTO_DOCUMENT: DocContent = {
  path: CONCEPTOS_MODO_DIRECTO_PATH,
  eyebrow: "Conceptos · Modo directo",
  meta: "Fuera del workflow · sin registro",
  sections: [
    {
      id: "que-es",
      title: "Qué es el modo directo",
      blocks: [
        {
          kind: "paragraph",
          text: "El modo directo es una vía fuera del workflow para que el Leader aplique un cambio trivial solicitado explícitamente. No es un tipo de Work Item ni un estado del ciclo: trabaja sobre la rama y el árbol actuales, sin abrir planificación.",
        },
        {
          kind: "paragraph",
          text: "Su existencia no relaja las reglas del arnés. Es una excepción acotada para cambios que no merecen un Work Item, no una puerta trasera para evitar la aprobación.",
        },
      ],
    },
    {
      id: "cuando-se-permite",
      title: "Cuándo se permite",
      blocks: [
        {
          kind: "paragraph",
          text: "Solo se activa cuando la persona pide un «cambio directo» o «sin Work Item». El Leader nunca lo inicia por iniciativa propia ni a partir de una petición que no lo solicite de forma explícita.",
        },
        {
          kind: "list",
          items: [
            "Documentación, erratas, formato y comentarios.",
            "Ajustes triviales que no cambian el comportamiento.",
            "Cambios contenidos en un único archivo y sin impacto técnico.",
          ],
        },
      ],
    },
    {
      id: "cuando-se-niega",
      title: "Cuándo se niega",
      blocks: [
        {
          kind: "paragraph",
          text: "Si el cambio afecta comportamiento, seguridad, datos, dependencias, API pública, arquitectura, más de un archivo o necesita especificación o revisión, el Leader debe negarse y ofrecer continuar como Task o Feature.",
        },
        {
          kind: "note",
          tone: "warning",
          title: "La insistencia no autoriza",
          text: "No existe override de la negativa. Repetir la petición no cambia la decisión; si el cambio deja de ser trivial en cualquier punto, se detiene y se propone un Work Item.",
        },
      ],
    },
    {
      id: "como-se-autoriza",
      title: "Cómo se autoriza",
      blocks: [
        {
          kind: "paragraph",
          text: "Aun siendo elegible, el cambio necesita confirmación explícita. El Leader informa de que no habrá planificación, rama ni registro y espera una respuesta inequívoca antes de tocar nada.",
        },
        {
          kind: "list",
          items: [
            "Si duda de la elegibilidad, avisa y exige esa confirmación.",
            "El silencio o una respuesta ambigua no son autorización.",
            "El defecto es no aplicar el modo directo.",
            "Si hay un Work Item en in_progress, el Leader avisa de que el cambio compartirá árbol y diff.",
          ],
        },
      ],
    },
    {
      id: "sin-registro",
      title: "Qué no deja",
      blocks: [
        {
          kind: "paragraph",
          text: "El modo directo no crea Work Item, spec, `meta.json`, `current.md`, `history.md`, `direct.md`, sesión, issue ni rama. Tampoco modifica el estado ni los documentos de un Work Item existente.",
        },
        {
          kind: "paragraph",
          text: "La única traza es el diff o el commit que la persona decida y la conversación. Por eso se reserva a cambios que no necesitan reconstruirse después: si hace falta evidencia, el camino es una Task o una Feature.",
        },
      ],
    },
    {
      id: "por-que-no-es-un-atajo",
      title: "Por qué no es un atajo del workflow",
      blocks: [
        {
          kind: "list",
          items: [
            "No evita la verificación: siempre se ejecuta `rei check` y, según el cambio, los checks del proyecto.",
            "No pasa por el Reviewer salvo petición explícita, pero tampoco permite saltarse una revisión pedida.",
            "No autoriza commit, push, PR ni merge sin una orden explícita.",
            "No exime del resto de reglas del arnés ni crea estados paralelos.",
            "Si el cambio necesita especificación, deja de ser directo y vuelve al workflow.",
          ],
        },
        {
          kind: "links",
          links: [
            {
              label: "Ver el flujo completo",
              href: "/producto/como-funciona",
            },
            {
              label: "Entender Feature y Task",
              href: "/docs/conceptos/work-items-y-estados",
            },
            {
              label: "Resolver dudas sobre cambios directos",
              href: "/docs/operacion/faq",
            },
            {
              label: "Recorrer el primer Work Item",
              href: "/docs/empezar/primer-work-item",
            },
          ],
        },
      ],
    },
  ],
};
