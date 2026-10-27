import type { DocContent, DocsContentPath } from "@/features/docs/types";

export const CONCEPTOS_SDD_PATH: DocsContentPath = "/docs/conceptos/sdd";

export const CONCEPTOS_SDD_DOCUMENT: DocContent = {
  path: CONCEPTOS_SDD_PATH,
  eyebrow: "Conceptos · SDD",
  meta: "Especificación primero · planificación revisable",
  sections: [
    {
      id: "especificacion-antes-que-codigo",
      title: "La especificación antes que el código",
      blocks: [
        {
          kind: "paragraph",
          text: "Spec Driven Development invierte el orden habitual: primero se acuerda qué se va a construir y cómo, y solo después se escribe código. El objetivo no es acumular documentación, sino dar al Implementer el contexto necesario para hacer el cambio con las menores ambigüedades posibles.",
        },
        {
          kind: "paragraph",
          text: "El arnés separa tres cosas que en una conversación se mezclan: decidir qué se construye, planificar cómo y ejecutar el cambio. Cuando las tres viven en el mismo chat, nada queda registrado y la revisión depende de la memoria. Con SDD, la planificación existe antes de la primera línea de código y se puede revisar por separado.",
        },
        {
          kind: "note",
          tone: "info",
          title: "Concisa, no extensa",
          text: "La planificación debe ser completa pero breve: lo necesario para ejecutar, sin relleno ni repetición de la solicitud. Si un documento crece por encima de su presupuesto, se divide el Work Item o se justifica.",
        },
      ],
    },
    {
      id: "que-produce",
      title: "Qué artefactos produce",
      blocks: [
        {
          kind: "paragraph",
          text: "El tipo de Work Item decide la planificación. Una Feature necesita requisitos, diseño y tareas; una Task se resuelve con un plan breve. En ambos casos la planificación vive en .rei/specs/<work-item-id>/ y se aprueba antes de implementarse.",
        },
        {
          kind: "table",
          columns: ["Tipo", "Planificación", "Qué resuelve"],
          rows: [
            [
              "Feature",
              "requirements.md, design.md y tasks.md",
              "Trabajo que necesita especificarse, varias decisiones de diseño, cambio de comportamiento o de arquitectura.",
            ],
            [
              "Task",
              "plan.md",
              "Documentación, contratos o un cambio pequeño y localizado, sin cambio de comportamiento ni de arquitectura.",
            ],
          ],
        },
        {
          kind: "list",
          items: [
            "meta.json guarda el tipo, el estado y los commits de referencia del Work Item.",
            "current.md refleja la sesión viva para poder retomarla si se interrumpe.",
            "impl.md y review.md dejan la evidencia de la implementación y del veredicto.",
            "history.md archiva el resumen de los Work Items cerrados y nunca se sobrescribe.",
          ],
        },
      ],
    },
    {
      id: "el-arnes",
      title: "Cómo se relaciona con el arnés",
      blocks: [
        {
          kind: "paragraph",
          text: "REI Harness convierte SDD en un workflow con roles separados, estados y una puerta de aprobación humana. Cada rol tiene un contrato propio y un límite explícito: ninguno puede planificar, implementar y aprobar su propio trabajo al mismo tiempo.",
        },
        {
          kind: "paragraph",
          text: "La planificación queda en ready cuando el Spec Author termina. No se implementa automáticamente: la persona revisa las decisiones y, solo si está de acuerdo, el Work Item pasa a in_progress. El Implementer ejecuta exactamente lo aprobado y el Reviewer compara el resultado con esa planificación.",
        },
        {
          kind: "note",
          tone: "warning",
          title: "La puerta no se omite",
          text: "Ningún Work Item puede implementarse sin planificación aprobada ni finalizar sin pasar por el Reviewer. La documentación es el registro del acuerdo, no un trámite posterior.",
        },
      ],
    },
    {
      id: "lo-que-no-es",
      title: "Lo que SDD no es",
      blocks: [
        {
          kind: "list",
          items: [
            "No es escribir documentos por escribir: la planificación se mide por lo que permite decidir y verificar.",
            "No sustituye el criterio humano: la responsabilidad de qué se construye sigue siendo de la persona.",
            "No convierte al agente en autónomo: el agente propone y ejecuta dentro de un contrato, no decide el alcance solo.",
            "No garantiza que no haya errores: hace visibles las decisiones y deja evidencia para revisarlas.",
            "No elimina la revisión: la cambia de código improvisado a un diff comprobable contra un plan.",
          ],
        },
      ],
    },
    {
      id: "siguiente",
      title: "Siguiente paso",
      blocks: [
        {
          kind: "paragraph",
          text: "Para ver el proceso en marcha, recorre un Work Item completo. Para entender la puerta que lo hace distinto, sigue con la aprobación humana.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Recorrer el primer Work Item",
              href: "/docs/empezar/primer-work-item",
            },
            {
              label: "Ver el flujo completo",
              href: "/producto/como-funciona",
            },
            {
              label: "Entender la aprobación humana",
              href: "/docs/conceptos/aprobacion-humana",
            },
            {
              label: "Consultar los comandos",
              href: "/docs/referencia/comandos",
            },
          ],
        },
      ],
    },
  ],
};
