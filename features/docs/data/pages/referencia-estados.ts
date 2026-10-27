import { STATE_TRANSITIONS, WORK_ITEM_STATES } from "@/content/rei";
import type { StateTransitionKind } from "@/content/rei";
import type { DocContent, DocsContentPath } from "@/features/docs/types";

export const REFERENCIA_ESTADOS_PATH: DocsContentPath =
  "/docs/referencia/estados";

const TRANSITION_KIND_LABELS: Record<StateTransitionKind, string> = {
  cycle: "Ciclo",
  branch: "Rama",
  force: "Forzada (--force)",
};

export const REFERENCIA_ESTADOS_DOCUMENT: DocContent = {
  path: REFERENCIA_ESTADOS_PATH,
  eyebrow: "Referencia · Estados",
  meta: "siete estados · transiciones · un solo in_progress",
  sections: [
    {
      id: "estados",
      title: "Los siete estados",
      blocks: [
        {
          kind: "paragraph",
          text: "Todo Work Item, sea Feature o Task, recorre los mismos estados. Cinco forman el ciclo lineal y dos son ramas fuera de él.",
        },
        {
          kind: "table",
          columns: ["Estado", "Significado", "Carácter"],
          rows: WORK_ITEM_STATES.map((state) => [
            state.label,
            state.meaning,
            state.terminal ? "Terminal" : state.kind === "cycle" ? "Ciclo" : "Rama",
          ]),
        },
      ],
    },
    {
      id: "transiciones",
      title: "Transiciones",
      blocks: [
        {
          kind: "paragraph",
          text: "La tabla se genera desde el dato canónico del arnés. Las salidas a blocked se derivan de todos los estados no terminales; done solo puede salir con una transición forzada.",
        },
        {
          kind: "table",
          columns: ["Desde", "Hasta", "Tipo", "Cuándo"],
          rows: STATE_TRANSITIONS.map((transition) => [
            transition.from,
            transition.to,
            TRANSITION_KIND_LABELS[transition.kind],
            transition.note ?? "—",
          ]),
        },
      ],
    },
    {
      id: "un-solo-in-progress",
      title: "Un solo in_progress",
      blocks: [
        {
          kind: "paragraph",
          text: "El límite es duro: solo puede existir un Work Item en in_progress. No es una recomendación de estilo ni una convención que el agente pueda saltarse.",
        },
        {
          kind: "list",
          items: [
            "rei status set <id> in_progress rechaza activar un segundo Work Item, también con --force.",
            "rei check, rei doctor y rei items status fallan si detectan más de uno.",
            "rei items status marca el Work Item activo con << ACTIVO y nombra los implicados cuando hay conflicto.",
            "Antes de iniciar otro, hay que cerrar el activo (review o done), bloquearlo o revisarlo.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "Ver los comandos de sesión y estado", href: "/docs/referencia/comandos" },
            {
              label: "Resolver varios Work Items activos",
              href: "/docs/operacion/troubleshooting",
            },
          ],
        },
      ],
    },
    {
      id: "done-terminal",
      title: "done es terminal",
      blocks: [
        {
          kind: "paragraph",
          text: "done cierra el Work Item: no se sale de él por una transición estándar. La única salida es done → blocked con --force, reservada a una transición no estándar con una orden explícita del usuario.",
        },
        {
          kind: "code",
          language: "Shell",
          title: "Transición forzada",
          code: "rei status set <work-item-id> blocked --force",
        },
        {
          kind: "note",
          tone: "warning",
          title: "No es un atajo",
          text: "--force solo autoriza una transición no estándar, como done → blocked, y requiere una orden explícita. No cambia el límite de un solo in_progress: rei status set lo sigue rechazando también con --force.",
        },
      ],
    },
    {
      id: "ramas",
      title: "Las ramas",
      blocks: [
        {
          kind: "paragraph",
          text: "blocked y changes_requested describen trabajo detenido, no estados de éxito. El Work Item sigue existiendo y conserva su planificación e historial.",
        },
        {
          kind: "list",
          items: [
            "blocked se alcanza desde cualquier estado no terminal cuando el trabajo no puede continuar; se sale con la causa resuelta.",
            "changes_requested lo produce un rechazo del Reviewer en review. El Work Item vuelve a in_progress con las correcciones solicitadas.",
            "En changes_requested, el Reviewer registra last_review_commit para que la siguiente revisión vea solo lo cambiado.",
          ],
        },
        {
          kind: "links",
          links: [
            {
              label: "Entender el modelo de estados",
              href: "/docs/conceptos/work-items-y-estados",
            },
            {
              label: "Leer los campos de last_review_commit",
              href: "/docs/referencia/meta",
            },
            { label: "Consultar los comandos", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
  ],
};
