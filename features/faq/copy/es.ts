import type { FaqCopy } from "@/features/faq/types";

export const es: FaqCopy = {
  eyebrow: "Operación",
  description:
    "Dudas reales sobre Work Items en paralelo, cambios directos, checks, git, historial y documentación necesaria.",
  metaTemplate: "{questions} preguntas · {topics} temas",
  themes: {
    "work-items": {
      title: "Work Items y aprobación",
      items: [
        {
          question: "¿Puedo tener varios Work Items en paralelo?",
          answer:
            "No al mismo tiempo en estado in_progress: REI solo permite uno activo a la vez. Sí puedes tener varios pending esperando su turno. El límite es duro; `rei check`, `rei doctor` y `rei items status` fallan si detectan más de uno.",
        },
        {
          question: "¿Cómo apruebo una planificación o pido cambios?",
          answer:
            "La aprobación se da en el chat o en la terminal; el Leader ejecuta `rei status set <id> in_progress`. Si algo no refleja lo acordado, se pide al Spec Author que actualice la planificación. El visor `rei view` es de solo lectura y no sustituye tu respuesta.",
        },
      ],
    },
    "cambios-directos": {
      title: "Cambios directos",
      items: [
        {
          question: "¿Puedo cambiar algo sin abrir un Work Item?",
          answer:
            "Solo si es un cambio trivial (documentación, errata, formato o comentario) y lo pides explícitamente como «cambio directo» o «sin Work Item». El Leader confirma contigo, aplica el cambio y lo verifica; no deja planificación ni registro. Si toca comportamiento, seguridad, datos, dependencias, API pública, arquitectura o más de un archivo, se niega y ofrece una Task o una Feature.",
        },
      ],
    },
    verificacion: {
      title: "Verificación y checks",
      items: [
        {
          question: "¿Dónde declaro los checks de mi proyecto?",
          answer:
            "En `.rei/config.json`. `rei check` ejecuta esos comandos y refleja el resultado en su código de salida. Los checkpoints lentos, como el build de producción, se documentan en `.rei/docs/project/verification.md` y se ejecutan al cerrar el Work Item.",
        },
        {
          question: "¿Qué hago si rei check falla por un check del proyecto?",
          answer:
            "Significa que un comando del proyecto falló. Revisa el detalle en la salida, corrige y vuelve a ejecutar antes de solicitar la revisión. Nunca se ignora una verificación fallida.",
        },
      ],
    },
    git: {
      title: "Git, historial y documentación",
      items: [
        {
          question: "¿REI necesita git?",
          answer:
            "No, pero funciona mejor con él. Si el repositorio usa `git`, el Reviewer revisa solo los cambios reales del Work Item con `rei review-diff`. `rei check` inicializa `git` automáticamente si no existe.",
        },
        {
          question: "¿Dónde veo el historial de todo lo que se ha hecho?",
          answer:
            "En `.rei/progress/history.md`, un registro permanente que no se sobrescribe. El estado de la sesión activa vive en `.rei/progress/current.md` y el detalle de cada Work Item en `.rei/progress/work-items/`.",
        },
        {
          question: "¿Necesito leer toda la documentación de .rei/docs/?",
          answer:
            "No. Los agentes cargan solo lo necesario según la etapa. Como persona, consulta `.rei/docs/project/` para las reglas del proyecto y `.rei/docs/harness/` para el detalle del arnés.",
        },
      ],
    },
  },
};
