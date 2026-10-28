import type { DocContent, DocsContentPath } from "@/features/docs/types";

export const GUIAS_GITHUB_ISSUES_PATH: DocsContentPath =
  "/docs/guias/github-issues";

export const GUIAS_GITHUB_ISSUES_DOCUMENT: DocContent = {
  path: GUIAS_GITHUB_ISSUES_PATH,
  eyebrow: "Guías · GitHub Issues",
  meta: "Integración opcional GitHub Issues · el CLI nunca llama a GitHub",
  sections: [
    {
      id: "cuando-usarla",
      title: "Cuándo usarla",
      blocks: [
        {
          kind: "paragraph",
          text: "Usa esta guía cuando quieras proyectar el trabajo de REI en GitHub Issues: vincular una Feature con una issue y una rama, publicar comentarios de implementación y revisión, abrir un PR o planificar un módulo con épicas y backlog.",
        },
        {
          kind: "paragraph",
          text: "La integración es opcional. Si `integrations.github` no existe o `enabled` es false, el flujo es idéntico y el Leader no menciona GitHub Issues. El CLI nunca crea, lee ni modifica issues, labels, comentarios, PR ni épicas: las acciones reales las ejecuta el Leader con `gh` y `git` bajo tus órdenes.",
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
            "Un proyecto ya inicializado con `rei init` y su `.rei/config.json`.",
            "GitHub CLI instalado y autenticado; git con un remoto resoluble.",
            "Un repositorio de destino en formato owner/name y una rama base.",
            "Órdenes explícitas para commit, push, PR o merge: nada de eso ocurre de forma automática.",
            "Para la puerta issue + rama, un Work Item de tipo Feature. Las Tasks no generan issue ni rama.",
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
            "Activa la integración con `rei github enable`. Sin flags detecta el repositorio desde origin y la base desde origin/HEAD; si la base no se resuelve, usa main y lo informa.",
            "Ajusta `repo`, `base` y estrategia. Cada valor se resuelve con la precedencia flag explícito, valor previo, detección desde `git` y valor por defecto; `repo` no tiene valor por defecto.",
            "Comprueba el estado con `rei github status`. Es offline y de solo lectura: no llama a `gh` ni a la API. Desactiva con `rei github disable`, que conserva `repo`, `base`, `mergeStrategy` y `links.json`.",
            "En la puerta de una Feature, confirma la base antes de mover el Work Item. Primero se captura la rama y el sha; después se crea la issue y la rama `feat/<n>-<slug>`. No se pregunta esta puerta a una Task.",
            "Deja que el Leader publique los comentarios automáticos de implementación y revisión. Se actualizan en sitio por su marcador, nunca se duplican y no se publican por cambios de estado.",
            "Abre el PR y haz merge solo con una orden explícita. La base del PR es la base registrada del Work Item; antes se verifica que esté publicada en origin. Nunca hay `--admin` ni auto-merge.",
            "Gestiona épicas, backlog de hijas, adopción y labels como proyección del trabajo. La identidad de una issue es su marcador, no la label ni el título.",
          ],
        },
        {
          kind: "code",
          language: "Shell",
          title: "Configuración",
          code: "rei github enable --repo owner/name --base main --strategy squash\nrei github status\nrei github disable",
        },
        {
          kind: "note",
          tone: "info",
          title: "Precedencia y errores",
          text: "Un flag desconocido, repetido, sin valor o inválido es uso incorrecto y no escribe la configuración. Los fallos operativos, como una config inválida o un remoto no resoluble, salen con código 1. Los avisos de `gh` ausente o sin autenticar no bloquean.",
        },
        {
          kind: "table",
          columns: ["Label", "Color", "Uso"],
          rows: [
            ["rei", "1D76DB", "Gestionado por REI."],
            ["rei:epic", "6F42C1", "Épica: planificación de módulo, no Work Item."],
            ["rei:backlog", "FBCA04", "Hija de backlog pendiente de adopción."],
            ["rei:feature", "0E8A16", "Work Item de tipo feature."],
            ["rei:blocked", "B60205", "Work Item bloqueado."],
          ],
        },
        {
          kind: "paragraph",
          text: "`links.json` es un índice local recuperable, nunca la fuente de verdad. Si falta o está corrupto no bloquea el Work Item: se recupera la issue por su marcador y se reescribe. Guarda el vínculo con la issue, su URL, la base y la épica cuando existe.",
        },
        {
          kind: "code",
          language: "json",
          title: ".rei/specs/<id>/links.json",
          code: '{ "provider": "github", "repo": "owner/name", "issue": 123, "url": "https://github.com/owner/name/issues/123", "base": { "branch": "main", "sha": "0a1b2c3d4e5f" }, "epic": null }',
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
          code: "rei github status\nrei item show 2026-10-27_01-54__mi-feature\nrei items status",
        },
        {
          kind: "paragraph",
          text: "`status` confirma estado, valores, remoto y disponibilidad de `gh`, sin afirmar nada sobre issues o PRs. `item show` añade la sección Enlaces con issue, URL, base y épica cuando `links.json` existe. `items status` lista tipo, estado e issue de cada Work Item y marca el activo.",
        },
        {
          kind: "paragraph",
          text: "Un `links.json` inválido se informa como WARN recuperable en `rei validate` y como nota en la ficha; nunca cambia el estado del Work Item. Verifica siempre número, URL, estado, labels o marcador antes de dar una acción por completada.",
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
            "Sin Projects, milestones ni sub-issues nativas.",
            "Sin PRs desde fork hacia upstream: se opera sobre un único repositorio canónico.",
            "Sin sincronización bidireccional ni Work Items pending locales como sustituto del backlog.",
            "Sin autoasignación por carga, time tracking ni proveedores distintos de GitHub.",
            "Sin commits, push ni merge automáticos; tampoco --admin, auto-merge ni flags de acciones GitHub en rei.",
            "Si el remoto no coincide con el `repo` configurado, `status` lo avisa y no concluye que la configuración esté completa.",
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
          text: "Si la integración ya está activa, la siguiente receta natural es revisar el Work Item en el visor. Para el detalle de cada flag, consulta la referencia de comandos.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Abrir el visor de un Work Item",
              href: "/docs/guias/visor",
            },
            {
              label: "Consultar los comandos",
              href: "/docs/referencia/comandos",
            },
            {
              label: "Entender la integración con GitHub Issues",
              href: "/producto/github-issues",
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
