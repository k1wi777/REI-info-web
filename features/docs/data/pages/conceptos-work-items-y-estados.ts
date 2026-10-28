import { BRANCH_STATES, CYCLE_STATES } from "@/content/rei";
import type { DocContent, DocsContentPath } from "@/features/docs/types";

export const CONCEPTOS_WORK_ITEMS_Y_ESTADOS_PATH: DocsContentPath =
  "/docs/conceptos/work-items-y-estados";

export const CONCEPTOS_WORK_ITEMS_Y_ESTADOS_DOCUMENT: DocContent = {
  path: CONCEPTOS_WORK_ITEMS_Y_ESTADOS_PATH,
  eyebrow: "Conceptos · Work Items",
  meta: "Feature o Task · cinco estados · dos ramas",
  sections: [
    {
      id: "feature-o-task",
      title: "Feature o Task",
      blocks: [
        {
          kind: "paragraph",
          text: "Todo trabajo nace como Work Item con un identificador y un tipo. El tipo no es una etiqueta cosmética: decide la planificación que se genera y si la integración con GitHub Issues abre issue y rama.",
        },
        {
          kind: "table",
          columns: ["Tipo", "Planificación", "Cuándo usarlo"],
          rows: [
            [
              "Feature",
              "`requirements.md`, `design.md` y `tasks.md`",
              "El trabajo necesita especificarse, hay varias decisiones de diseño o cambia el comportamiento o la arquitectura.",
            ],
            [
              "Task",
              "`plan.md`",
              "Documentación, contratos o un cambio pequeño y localizado, sin cambio de comportamiento ni de arquitectura.",
            ],
          ],
        },
        {
          kind: "note",
          tone: "info",
          title: "Regla de desempate",
          text: "Si existe cualquier duda sobre el tipo, se elige Feature. Una Task no debe convertirse en una Feature encubierta: si el plan necesita requisitos o diseño detallado, el tipo correcto es Feature.",
        },
      ],
    },
    {
      id: "el-ciclo",
      title: "El ciclo de estados",
      blocks: [
        {
          kind: "paragraph",
          text: "Features y Tasks comparten el mismo ciclo. Todo Work Item comienza en pending, pasa por la planificación y la aprobación, se implementa, se revisa y termina en done. Cada estado describe una etapa real del trabajo, no una etiqueta decorativa.",
        },
        {
          kind: "table",
          columns: ["Estado", "Significado", "Carácter"],
          rows: CYCLE_STATES.map((state) => [
            state.label,
            state.meaning,
            state.terminal ? "Terminal" : "Ciclo",
          ]),
        },
        {
          kind: "paragraph",
          text: "El paso de ready a in_progress es la aprobación humana. El paso de in_progress a review lo registra el Implementer al terminar, y el de review a done requiere el veredicto del Reviewer. Ningún atajo elimina esos puntos.",
        },
      ],
    },
    {
      id: "ramas",
      title: "Las ramas del ciclo",
      blocks: [
        {
          kind: "paragraph",
          text: "Dos estados quedan fuera del recorrido lineal. No son atajos ni estados de éxito: describen trabajo detenido o una revisión que exige correcciones.",
        },
        {
          kind: "table",
          columns: ["Estado", "Significado"],
          rows: BRANCH_STATES.map((state) => [state.label, state.meaning]),
        },
        {
          kind: "list",
          items: [
            "blocked se alcanza desde cualquier punto del ciclo cuando el trabajo no puede continuar; solo se sale con una causa resuelta.",
            "changes_requested lo produce un rechazo del Reviewer. El Work Item vuelve a in_progress con las correcciones solicitadas.",
            "done es terminal: no se sale de él por una transición estándar. Una transición no estándar exige `--force` y una orden explícita.",
          ],
        },
      ],
    },
    {
      id: "donde-vive-el-estado",
      title: "Dónde vive el estado",
      blocks: [
        {
          kind: "paragraph",
          text: "El estado no vive en la conversación ni en la memoria del agente. Se registra en dos archivos con responsabilidades distintas y complementarias.",
        },
        {
          kind: "table",
          columns: ["Archivo", "Qué registra", "Para qué sirve"],
          rows: [
            [
              "`meta.json`",
              "Tipo, estado, `base_commit` y `last_review_commit` de cada Work Item.",
              "Registro duradero y diagnóstico del conjunto de Work Items.",
            ],
            [
              "`current.md`",
              "Estado, bitácora y próximo paso de la sesión activa.",
              "Retomar el trabajo exactamente donde quedó si la sesión se interrumpe.",
            ],
          ],
        },
        {
          kind: "paragraph",
          text: "El límite de un solo in_progress es duro. Lo aplican `rei status set` al intentar activar otro Work Item, también con `--force`, y lo comprueban `rei check`, `rei doctor` y `rei items status`. Antes de iniciar otro, hay que cerrar, bloquear o revisar el activo.",
        },
      ],
    },
    {
      id: "siguiente",
      title: "Siguiente paso",
      blocks: [
        {
          kind: "paragraph",
          text: "Con el vocabulario claro, el siguiente paso es entender la puerta que separa ready de in_progress o recorrer el ciclo completo con un Work Item real.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Entender la aprobación humana",
              href: "/docs/conceptos/aprobacion-humana",
            },
            {
              label: "Recorrer el primer Work Item",
              href: "/docs/empezar/primer-work-item",
            },
            {
              label: "Ver los Work Items del producto",
              href: "/producto/work-items",
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
