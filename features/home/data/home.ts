import { WORK_ITEM_ROLES } from "@/content/rei";
import { INSTALL_PATH } from "@/content/site";
import type { FinalCta, HomeBlock } from "@/features/home/types";

/**
 * Bloques de la home. Todo el contenido es rastreable a README.md,
 * PRODUCT.md y docs/product-strategy.md; no hay cifras, testimonios ni
 * clientes.
 */
export const HOME_BLOCKS: HomeBlock[] = [
  {
    id: "problema",
    eyebrow: "01 · Problema",
    title: "La IA escribe rápido; sin proceso, el retrabajo también",
    intro:
      "Los agentes de IA y los LLM escriben código a partir de una conversación. Cuando decidir, planificar y ejecutar viven en la misma conversación, nada queda registrado y nadie puede revisar la decisión.",
    items: [
      {
        title: "Alcance tardío",
        description: "El LLM escribe antes de que el alcance esté claro.",
      },
      {
        title: "Alucinaciones",
        description: "El LLM inventa APIs o datos y los presenta como ciertos.",
      },
      {
        title: "Decisiones no autorizadas",
        description: "El agente cambia arquitectura o alcance sin aprobación.",
      },
      {
        title: "Acciones fuera de límite",
        description: "El agente toca entornos o datos que no debería tocar.",
      },
      {
        title: "Retrabajo",
        description: "El código rápido del agente es caro de corregir.",
      },
    ],
  },
  {
    id: "solucion",
    eyebrow: "02 · Proceso",
    title: "Una hoja, una firma, evidencia",
    intro:
      "REI no frena al agente: le da un proceso. Separa decidir, planificar y ejecutar; cada etapa deja un artefacto que se puede leer y revisar.",
    items: [
      {
        title: "Especificación primero",
        description:
          "La planificación existe antes de que el agente escriba la primera línea.",
      },
      {
        title: "Aprobación humana",
        description:
          "Ningún Work Item pasa a implementación sin una firma explícita.",
      },
      {
        title: "Roles separados",
        description:
          "Leader, Spec Author, Implementer y Reviewer no invaden su trabajo.",
      },
      {
        title: "Evidencia versionada",
        description:
          "Planificación, progreso e historial viven en .rei/, no en el chat.",
      },
    ],
    link: {
      label: "Recorrer el primer Work Item",
      href: "/docs/empezar/primer-work-item",
    },
  },
  {
    id: "como-funciona",
    eyebrow: "03 · Flujo",
    title: "Cómo funciona",
    intro:
      "Un Work Item recorre cinco estados. La puerta de aprobación no es un trámite: es el punto donde la persona recupera el control antes de que el agente escriba código.",
    items: [
      {
        title: "Work Item",
        description:
          "Se acuerda qué se construye y se registra con su identificador y tipo.",
      },
      {
        title: "Planificación",
        description:
          "El Spec Author redacta requisitos, diseño y tareas revisables.",
      },
      {
        title: "Aprobación",
        description:
          "La persona revisa y decide; el CLI registra el paso a in_progress.",
      },
      {
        title: "Implementación",
        description:
          "El Implementer ejecuta solo la planificación aprobada.",
      },
      {
        title: "Revisión",
        description:
          "El Reviewer verifica contra la planificación y los checkpoints.",
      },
    ],
    note:
      "pending → ready → in_progress → review → done. blocked y changes_requested son ramas, no atajos; solo un Work Item puede estar in_progress a la vez.",
  },
  {
    id: "agentes",
    eyebrow: "04 · Roles",
    title: "Roles explícitos, límites explícitos",
    intro:
      "Cada agente de IA recibe un contrato propio y no invade el trabajo de otro. El runtime es una capa opcional: el valor está en el contrato.",
    items: WORK_ITEM_ROLES.map((role) => ({
      title: role.name,
      description: `${role.responsibility} ${role.limit}`,
    })),
    note:
      "El Initializer conduce la personalización guiada del proyecto. Los adaptadores nativos de OpenCode y Claude Code son opcionales; Cursor y Codex funcionan por fallback.",
  },
  {
    id: "visor",
    eyebrow: "05 · Visor",
    title: "rei view muestra el Work Item, no lo aprueba",
    intro:
      "El visor local sirve para revisar el trabajo del agente con documentos renderizados, tabla de contenidos y diff, sin botones que finjan aprobar.",
    items: [
      {
        title: "Qué muestra",
        description:
          "Documentos de planificación y progreso, validación, sesión, TOC, diff y FICHA.",
      },
      {
        title: "Qué no hace",
        description:
          "No aprueba ni modifica Work Items: no tiene botón ni ruta de aprobación.",
      },
      {
        title: "Cómo se sirve",
        description:
          "Servidor HTTP local, de solo lectura, con assets propios embebidos en el binario.",
      },
    ],
    link: {
      label: "Ver preguntas frecuentes",
      href: "/docs/operacion/faq",
    },
  },
  {
    id: "github",
    eyebrow: "06 · Integración",
    title: "GitHub es una proyección, no la fuente de verdad",
    intro:
      "La integración es opcional y no cambia dónde vive el estado del trabajo.",
    items: [
      {
        title: "Opcional",
        description:
          "Se activa con rei github enable; el flujo funciona sin ella.",
      },
      {
        title: "Proyección",
        description:
          "Issues, ramas y PR reflejan el trabajo; .rei manda sobre la ejecución.",
      },
      {
        title: "Quién llama a GitHub",
        description:
          "Nunca el CLI: lo hacen gh y git bajo orden explícita del Leader.",
      },
    ],
  },
  {
    id: "limites",
    eyebrow: "07 · Límites",
    title: "Lo que la web no hace",
    intro:
      "Mostrar los límites forma parte de la propuesta: la web documenta el arnés, no lo sustituye.",
    items: [
      {
        title: "Sin búsqueda ni selector de versiones",
        description:
          "La navegación, el TOC y una estructura de URLs predecible cubren el volumen actual.",
      },
      {
        title: "El visor es de solo lectura",
        description:
          "La aprobación se registra desde el CLI, no desde el navegador.",
      },
      {
        title: "GitHub es opcional",
        description:
          "No es la fuente de verdad del Work Item ni un requisito para trabajar.",
      },
      {
        title: "El modo directo está restringido",
        description:
          "Solo aplica a cambios triviales solicitados explícitamente.",
      },
      {
        title: "La web no ejecuta comandos",
        description:
          "No modifica Work Items ni sustituye al CLI o al visor.",
      },
    ],
    link: {
      label: "Consultar los comandos",
      href: "/docs/referencia/comandos",
    },
  },
];

export const FINAL_CTA: FinalCta = {
  eyebrow: "08 · Siguiente paso",
  title: "Instala REI y abre tu primer Work Item",
  intro:
    "Tu agente escribe; tú decides. Un binario, un comando y una planificación aprobada antes de implementar. La evidencia queda en tu repositorio.",
  primary: {
    label: "Instalar REI",
    href: INSTALL_PATH,
  },
  secondary: {
    label: "Explorar el producto",
    href: "/producto",
  },
};
