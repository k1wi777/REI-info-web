import type { DocContent, DocsContentPath } from "@/features/docs/types";

export const GUIAS_VISOR_PATH: DocsContentPath = "/docs/guias/visor";

export const GUIAS_VISOR_DOCUMENT: DocContent = {
  path: GUIAS_VISOR_PATH,
  eyebrow: "Guías · Visor",
  meta: "Local · solo lectura · recarga en vivo",
  sections: [
    {
      id: "cuando-usarla",
      title: "Cuándo usarla",
      blocks: [
        {
          kind: "paragraph",
          text: "Abre el visor cuando quieras revisar un Work Item con los documentos renderizados, su tabla de contenidos, la validación, la sesión, el diff y la FICHA en una sola página. Es una herramienta local para leer y comprobar, no para decidir.",
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
            "Un proyecto inicializado con .rei/ y el binario rei disponible.",
            "Una sesión activa o el identificador del Work Item que quieres ver.",
            "Un navegador local; el visor sirve un HTTP en tu máquina y no despliega nada.",
            "El puerto libre que el propio visor elige y comunica al arrancar.",
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
            "Ejecuta rei view sin identificador para abrir el Work Item de la sesión activa. Si no hay sesión, indica uno con rei view <id>.",
            "Si no quieres bloquear la terminal, usa rei view --open: arranca o reutiliza el servidor en segundo plano y abre el navegador. Los modos --open, --stop, --enable y --disable son mutuamente excluyentes.",
            "Revisa los documentos de planificación y progreso, el TOC, la validación, la sesión, el diff y la FICHA. La FICHA muestra issue, base y épica cuando links.json existe.",
            "Deja la pestaña abierta si quieres seguir el estado: el badge y la FICHA se refrescan en vivo por SSE cuando cambian en disco.",
            "Cierra el servidor con rei view --stop, con Ctrl+C o esperando el tiempo de inactividad. En segundo plano también se cierra poco después de mostrar «terminado» cuando el Work Item llega a done.",
            "Activa o desactiva la apertura automática al llegar a ready con rei view --enable o rei view --disable. Solo cambia viewer.autoOpenOnReady en .rei/config.json.",
          ],
        },
        {
          kind: "code",
          language: "Shell",
          title: "Ciclo de vida",
          code: "rei view\nrei view 2026-10-27_01-54__mi-feature --open\nrei view --stop\nrei view --enable\nrei view --disable",
        },
        {
          kind: "note",
          tone: "warning",
          title: "El visor no aprueba",
          text: "No tiene botón ni ruta de aprobación. Ver el estado en el visor no equivale a aprobar: la aprobación se registra desde el chat o la terminal y el Leader ejecuta rei status set.",
        },
        {
          kind: "note",
          tone: "info",
          title: "Códigos de salida",
          text: "0 si la operación termina correctamente; 1 si no hay sesión activa o falla la lectura/escritura; 2 si el uso es incorrecto, por ejemplo con dos modos a la vez.",
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
          code: "rei item show 2026-10-27_01-54__mi-feature\nrei validate 2026-10-27_01-54__mi-feature",
        },
        {
          kind: "paragraph",
          text: "Comprueba que el estado y la FICHA del visor coinciden con la ficha del CLI y con links.json, y que el diff corresponde a los cambios reales del Work Item. Si el visor muestra un estado antiguo, actualiza la página: el refresco depende de la conexión SSE.",
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
            "Es de solo lectura: no aprueba, no modifica documentos, meta.json ni el estado del Work Item.",
            "No sustituye la respuesta humana en el chat o la terminal, ni el CLI, ni el historial de git.",
            "No carga JavaScript, CSS ni fuentes de terceros: sus assets van embebidos en el binario.",
            "No expone una ruta de aprobación ni un botón que cambie el estado.",
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
          text: "Después de revisar el visor, el siguiente control es la verificación del proyecto. La guía de checks explica qué comandos se ejecutan y cómo interpretar su resultado.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Configurar los checks del proyecto",
              href: "/docs/guias/checks",
            },
            {
              label: "Consultar los comandos",
              href: "/docs/referencia/comandos",
            },
            {
              label: "Qué hace el visor",
              href: "/producto/visor",
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
