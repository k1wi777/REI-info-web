import { BRANCH_STATES, CYCLE_STATES } from "@/content/rei";
import { INSTALL_PATH } from "@/content/site";
import type { ProductDocument } from "@/features/product/types";

export const COMO_FUNCIONA_ES: ProductDocument = {
  id: "como-funciona",
  eyebrow: "Producto · Flujo",
  meta: "Un Work Item · una puerta · un solo in_progress",
  facts: [
    { label: "Ciclo", value: `${CYCLE_STATES.length} estados` },
    { label: "Ramas", value: String(BRANCH_STATES.length) },
    { label: "En curso", value: "Un Work Item a la vez" },
    { label: "Firma", value: "Humana y explícita" },
    { label: "Registro", value: "`.rei/`" },
  ],
  sections: [
    {
      id: "flujo",
      label: "Flujo",
      title: "De la solicitud al cierre",
      weight: "lead",
      blocks: [
        {
          kind: "paragraph",
          text: "Un Work Item recorre el mismo flujo tanto si es una Feature como si es una Task. Lo que cambia es la planificación que genera el Spec Author: requisitos, diseño y tareas para una Feature; un plan breve para una Task.",
        },
        { kind: "cycle" },
        {
          kind: "paragraph",
          text: "La ventana es una simulación automática: al entrar en pantalla recorre las seis paradas y se detiene en la puerta para escenificar la firma. El cursor, el botón «Aprobar» y el check son fingidos; la aprobación real es humana y se registra desde el CLI. Puedes pausarla o recorrer las paradas a mano: la simulación no ejecuta comandos ni aprueba Work Items. La tabla de estados de más abajo conserva el registro completo.",
        },
        {
          kind: "paragraph",
          text: "El estado del trabajo no vive en la conversación: `meta.json` registra la etapa de cada Work Item y `current.md` refleja la sesión activa para poder retomarla.",
        },
      ],
    },
    {
      id: "aprobacion",
      label: "Puerta",
      title: "La puerta de aprobación",
      blocks: [
        {
          kind: "paragraph",
          text: "La puerta es real: el Work Item queda en ready hasta que la persona revisa la planificación y decide. La aprobación se da en el chat o en la terminal, y el Leader registra el paso con `rei status set <id> in_progress`. El visor no la sustituye.",
        },
        {
          kind: "note",
          tone: "info",
          title: "El silencio no aprueba",
          text: "Ningún Work Item avanza de ready a in_progress sin una decisión humana explícita. Si la planificación no refleja lo acordado, se pide cambiarla antes de implementar.",
        },
      ],
    },
    {
      id: "estados",
      label: "Estados",
      title: "Estados y ramas",
      blocks: [
        {
          kind: "paragraph",
          text: "El ciclo tiene cinco estados y dos ramas. blocked y changes_requested no son atajos: describen trabajo que no puede continuar o una revisión que exige correcciones.",
        },
        {
          kind: "states",
          states: [
            "pending",
            "ready",
            "in_progress",
            "review",
            "done",
            "blocked",
            "changes_requested",
          ],
        },
        {
          kind: "list",
          items: [
            "Solo puede existir un Work Item in_progress a la vez. El límite lo aplican `rei status set`, `rei check`, `rei doctor` y `rei items status`.",
            "done es terminal: no se sale de él por una transición estándar.",
            "Si el Reviewer rechaza, el Work Item pasa a changes_requested y vuelve a in_progress con las correcciones.",
            "Si el trabajo no puede continuar en cualquier punto, pasa a blocked.",
          ],
        },
      ],
    },
    {
      id: "modo-directo",
      label: "Modo directo",
      title: "Modo directo autorizado",
      blocks: [
        {
          kind: "paragraph",
          text: "Existe una vía fuera del workflow para cambios triviales solicitados explícitamente. No es un tipo de Work Item ni un estado: trabaja sobre la rama y el árbol actuales, y no crea Work Item, planificación, sesión, issue ni rama.",
        },
        {
          kind: "points",
          variant: "ledger",
          points: [
            {
              title: "Elegible",
              detail:
                "Documentación, erratas, formato, comentarios o ajustes triviales sin cambio de comportamiento.",
            },
            {
              title: "Negativa",
              detail:
                "Si afecta comportamiento, seguridad, datos, dependencias, API pública, arquitectura, más de un archivo o necesita especificación o revisión, el Leader se niega y ofrece una Task o una Feature.",
            },
            {
              title: "Autorización",
              detail:
                "El Leader pide confirmación explícita e informa de que no habrá planificación, rama ni registro.",
            },
            {
              title: "Sin registro",
              detail:
                "La única traza es el diff o commit y la conversación; no se escribe `current.md`, `meta.json` ni `history.md`.",
            },
            {
              title: "Entrega",
              detail:
                "Sin una orden explícita no hay commit, push, PR ni merge.",
            },
          ],
        },
        {
          kind: "note",
          tone: "warning",
          title: "La insistencia no autoriza",
          text: "No existe override de la negativa. Si el cambio deja de ser trivial en cualquier punto, se detiene y se propone una Task o una Feature.",
        },
      ],
    },
    {
      id: "relacion",
      label: "Contexto",
      title: "Cómo encaja con la home y la documentación",
      weight: "fine",
      blocks: [
        {
          kind: "paragraph",
          text: "La home presenta el producto; esta sección explica el mecanismo y la puerta; la documentación enseña tareas concretas. Ninguna de las tres duplica a las otras.",
        },
        {
          kind: "links",
          links: [
            { label: "Instalar REI", href: INSTALL_PATH },
            {
              label: "Recorrer el primer Work Item",
              href: "/docs/empezar/primer-work-item",
            },
            { label: "Conocer los roles", href: "/producto/agentes" },
            { label: "Ver los Work Items", href: "/producto/work-items" },
            {
              label: "Referencia de comandos",
              href: "/docs/referencia/comandos",
            },
            { label: "Preguntas frecuentes", href: "/docs/operacion/faq" },
          ],
        },
      ],
    },
  ],
};
