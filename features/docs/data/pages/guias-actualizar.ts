import type { DocContent, DocsContentPath } from "@/features/docs/types";

export const GUIAS_ACTUALIZAR_PATH: DocsContentPath = "/docs/guias/actualizar";

export const GUIAS_ACTUALIZAR_DOCUMENT: DocContent = {
  path: GUIAS_ACTUALIZAR_PATH,
  eyebrow: "Guías · Actualizar",
  meta: "Arnés y binario · actualización segura",
  sections: [
    {
      id: "cuando-usarla",
      title: "Cuándo usarla",
      blocks: [
        {
          kind: "paragraph",
          text: "Usa esta guía cuando quieras comprobar si hay una versión nueva del binario, actualizarlo, o refrescar el esqueleto del arnés en un proyecto que ya lo tiene inicializado.",
        },
      ],
    },
    {
      id: "requisitos",
      title: "Requisitos",
      blocks: [
        {
          kind: "list",
          items: [
            "Para actualizar el binario, conexión con GitHub Releases y permisos de escritura sobre el ejecutable.",
            "Para actualizar el arnés, un proyecto ya inicializado con .rei/.",
            "Una copia de seguridad o un commit limpio antes de forzar cambios en la documentación.",
            "Conocer la diferencia entre actualizar el binario y actualizar el esqueleto del proyecto.",
          ],
        },
      ],
    },
    {
      id: "pasos",
      title: "Pasos",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Comprueba si hay una versión nueva con rei update --check. Solo informa del resultado: no descarga ni escribe nada.",
            "Actualiza el binario con rei update. Descarga el asset de tu sistema y arquitectura, verifica su SHA-256 contra checksums.txt y reemplaza el ejecutable de forma atómica. Si la integridad falla, aborta sin modificar el binario.",
            "En Windows no se puede reemplazar un .exe en ejecución: rei update informa y abre la página de releases para que descargues el archive a mano.",
            "Actualiza el esqueleto del arnés con rei init --update. Exige un proyecto REI; no instala desde cero y nunca toca .rei/specs/** ni .rei/progress/**.",
            "Revisa los avisos. --update es marker-aware: actualiza los documentos de personalización que aún contienen el marcador pendiente y conserva los ya personalizados. El resto de archivos se actualiza solo si el manifiesto confirma que no se modificaron.",
            "Usa rei init --update --force solo si aceptas sobrescribir cualquier archivo que difiera, incluidos los personalizados o modificados a mano. El resultado se reporta como [NEW], [UPD], [OK] o [SKIP].",
          ],
        },
        {
          kind: "code",
          language: "Shell",
          title: "Binario",
          code: "rei update --check\nrei update",
        },
        {
          kind: "code",
          language: "Shell",
          title: "Arnés",
          code: "rei init --update\nrei init --update --force\nrei init status",
        },
        {
          kind: "note",
          tone: "warning",
          title: "--force sobrescribe",
          text: "La actualización normal conserva lo personalizado y avisa. --force no distingue: si un archivo difiere, lo reemplaza. No lo uses para arreglar un check en rojo sin entender qué se pierde.",
        },
      ],
    },
    {
      id: "verificacion",
      title: "Verificación",
      blocks: [
        {
          kind: "code",
          language: "Shell",
          code: "rei version\nrei init status\nrei check\nrei validate",
        },
        {
          kind: "paragraph",
          text: "rei version confirma la versión del binario. rei init status indica si queda documentación pendiente de personalizar. rei check comprueba el arnés y los checks del proyecto, y rei validate revisa la coherencia de un Work Item.",
        },
        {
          kind: "paragraph",
          text: "Si la actualización del binario falla por red, permisos o checksum, el ejecutable anterior queda intacto. Si falla la sustitución después de iniciarse, se restaura el original.",
        },
      ],
    },
    {
      id: "limites",
      title: "Límites",
      blocks: [
        {
          kind: "list",
          items: [
            "rei init --update no instala el arnés desde cero: para eso se usa rei init.",
            "--update no modifica .rei/specs/** ni .rei/progress/**: el trabajo en curso no se pierde.",
            "Los documentos personalizados se conservan con aviso; solo --force los sobrescribe.",
            "--update regenera los subagentes nativos solo si el proyecto ya tiene .opencode/ o .claude/.",
            "En Windows, la actualización del binario es manual desde la página de releases.",
          ],
        },
      ],
    },
    {
      id: "siguiente-paso",
      title: "Siguiente paso",
      blocks: [
        {
          kind: "paragraph",
          text: "Después de actualizar, vuelve a ejecutar los checks y, si el arnés cambió, revisa la referencia de comandos y la instalación.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Configurar los checks del proyecto",
              href: "/docs/guias/checks",
            },
            {
              label: "Revisar la instalación",
              href: "/docs/empezar/instalacion",
            },
            {
              label: "Consultar los comandos",
              href: "/docs/referencia/comandos",
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
