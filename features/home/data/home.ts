import { INSTALL_PATH } from "@/content/site";
import type { FinalCta, HomeBlock } from "@/features/home/types";

/**
 * Contenido no demostrativo de la home. Todo es rastreable a README.md,
 * PRODUCT.md y docs/product-strategy.md; no hay cifras, testimonios ni
 * clientes.
 */
export const PROCESS_INTRO: HomeBlock = {
  id: "solucion",
  eyebrow: "Proceso",
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
        "Planificación, progreso e historial viven en `.rei/`, no en el chat.",
    },
  ],
  link: {
    label: "Recorrer el primer Work Item",
    href: "/docs/empezar/primer-work-item",
  },
};

export const LIMITS_BLOCK: HomeBlock = {
  id: "limites",
  eyebrow: "Límites",
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
      title: "GitHub Issues es opcional",
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
      description: "No modifica Work Items ni sustituye al CLI o al visor.",
    },
  ],
  link: {
    label: "Consultar los comandos",
    href: "/docs/referencia/comandos",
  },
};

export const FINAL_CTA: FinalCta = {
  eyebrow: "Siguiente paso",
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
