import type { DocContent, DocsContentPath } from "@/features/docs/types";

export const OPERACION_TROUBLESHOOTING_PATH: DocsContentPath =
  "/docs/operacion/troubleshooting";

export const OPERACION_TROUBLESHOOTING_DOCUMENT: DocContent = {
  path: OPERACION_TROUBLESHOOTING_PATH,
  eyebrow: "Operación · Solución de problemas",
  meta: "diez síntomas · causa · siguiente paso",
  sections: [
    {
      id: "personalizacion-pendiente",
      title: "La personalización sigue pendiente",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei init` despliega el esqueleto con marcadores REI:PENDIENTE en la documentación del proyecto. Mientras queden marcadores, `rei init status` informa de los documentos pendientes y sale con 1: los agentes trabajarían con reglas genéricas.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Ejecuta `rei init status` para ver qué documentos faltan.",
            "Abre `/personalize` en OpenCode o Claude Code, o pide «personaliza mi proyecto» para que el Initializer conduzca la entrevista.",
            "Revisa que `AGENTS.md` y `.rei/docs/project/` describan tu repositorio y no el esqueleto.",
            "Repite `rei init status`: debe salir 0 cuando no quede nada pendiente.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "Volver a la instalación", href: "/docs/empezar/instalacion" },
            { label: "Consultar rei init status", href: "/docs/referencia/comandos" },
            { label: "Leer las dudas frecuentes", href: "/docs/operacion/faq" },
          ],
        },
      ],
    },
    {
      id: "check-falla",
      title: "rei check falla",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei check` ejecuta sus comprobaciones del arnés y los checks declarados en `.rei/config.json`. Sale con 1 si hay al menos un [FAIL] o si un check del proyecto falla; el código 2 está reservado al uso incorrecto.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Lee la salida: distingue un fallo del arnés de un check del proyecto.",
            "Si falla un check, ejecuta su comando por separado y corrige la causa.",
            "Comprueba que el check esté bien declarado: `id`, `description` y `command` como array.",
            "Repite `rei check --quiet` hasta obtener 0. No desactives el check para que pase.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "Revisar la guía de checks", href: "/docs/guias/checks" },
            {
              label: "Ver los campos de config.json",
              href: "/docs/referencia/configuracion",
            },
            { label: "Consultar rei check", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
    {
      id: "varios-in-progress",
      title: "Más de un Work Item en in_progress",
      blocks: [
        {
          kind: "paragraph",
          text: "El arnés solo admite un Work Item activo. `rei status set <id> in_progress` rechaza un segundo Work Item, también con `--force`; `rei check`, `rei doctor` y `rei items status` fallan si detectan más de uno.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Ejecuta `rei items status` y localiza el Work Item marcado con << ACTIVO.",
            "Cierra el activo (review o done), bloquéalo o termina su revisión.",
            "Confirma que ya no queda ninguno en in_progress.",
            "Inicia el siguiente Work Item solo cuando el anterior haya salido del estado.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "Ver los estados y el límite", href: "/docs/referencia/estados" },
            {
              label: "Entender el ciclo del Work Item",
              href: "/docs/conceptos/work-items-y-estados",
            },
            { label: "Consultar los comandos", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
    {
      id: "links-json",
      title: "links.json inválido",
      blocks: [
        {
          kind: "paragraph",
          text: "`.rei/specs/<id>/links.json` es un índice local recuperable, no la fuente de verdad. Si el JSON está roto o su forma no es válida, `rei validate` lo informa como WARN —nunca como FAIL— y `rei item show` o `rei items status` lo señalan como nota sin bloquear el Work Item.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Ejecuta `rei validate` para leer la causa concreta.",
            "Localiza la issue por su marcador rei:work-item:<id>, no por el título ni por la label.",
            "Reescribe `links.json` con su forma válida: provider, repo, issue, url, base y epic cuando correspondan.",
            "Vuelve a validar; el aviso desaparece sin cambiar el estado del Work Item.",
          ],
        },
        {
          kind: "note",
          tone: "info",
          title: "Aviso recuperable",
          text: "Un `links.json` ausente, roto o incompleto no cambia `meta.json`, `current.md` ni la etapa del workflow. Se reconstruye y se sigue trabajando.",
        },
        {
          kind: "links",
          links: [
            { label: "Revisar la guía de GitHub Issues", href: "/docs/guias/github-issues" },
            { label: "Ver la integración con GitHub Issues", href: "/producto/github-issues" },
            { label: "Consultar rei validate", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
    {
      id: "sesion-no-inicia",
      title: "La sesión no inicia",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei session start <id> <tipo>` solo crea la sesión si el Work Item existe, el tipo coincide con `meta.json` y su estado es pending. En cualquier otro caso rechaza con causa y siguiente paso sin escribir `current.md`.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Ejecuta `rei item show <id>` para ver el tipo y el estado reales.",
            "Si el tipo no coincide con el argumento, repite el comando con el tipo de `meta.json`.",
            "Si el estado es ready, no reinicies: aprueba la planificación o pide cambios.",
            "Si está en in_progress, review o changes_requested, retoma la sesión existente con `rei item show <id>`.",
            "Si está en done o blocked, crea un Work Item nuevo con `rei new`.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "Ver la plantilla de current.md", href: "/docs/referencia/plantillas" },
            { label: "Consultar los estados", href: "/docs/referencia/estados" },
            { label: "Consultar rei session", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
    {
      id: "gh",
      title: "gh ausente o sin autenticación",
      blocks: [
        {
          kind: "paragraph",
          text: "La integración con GitHub Issues se apoya en `gh` para las acciones reales; el CLI rei nunca llama a GitHub. Si `gh` no está instalado o no tiene sesión, el mensaje lo dice con causa y siguiente paso. Son avisos que no bloquean `rei github`: el comando sale 0.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Instala GitHub CLI y comprueba que `gh` está en el PATH.",
            "Ejecuta `gh auth login` y después `gh auth status`.",
            "Ejecuta `rei github status` para ver el estado offline de la configuración y la disponibilidad de `gh`.",
            "Repite la acción de GitHub Issues solo cuando `gh` responda con una sesión válida.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "Revisar la guía de GitHub Issues", href: "/docs/guias/github-issues" },
            { label: "Ver la integración con GitHub Issues", href: "/producto/github-issues" },
            { label: "Consultar rei github", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
    {
      id: "visor",
      title: "El visor no abre o su dirección local no responde",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei view` sirve el visor en local. Sin modo se queda en primer plano hasta Ctrl+C; `--open` arranca o reutiliza el servidor en segundo plano y abre el navegador sin bloquear. Si la página no responde, el servidor de fondo pudo quedar parado o haber perdido su registro temporal.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Ejecuta `rei view <id> --open` para arrancar o reutilizar el servidor y abrir el navegador.",
            "Si sigue sin responder, detén el servidor con `rei view --stop` y vuelve a abrirlo.",
            "Sin `<id>`, el visor usa el Work Item de la sesión activa; comprueba que exista con `rei session`.",
            "Revisa `viewer.autoOpenOnReady` si esperabas que se abriera en la puerta de aprobación.",
          ],
        },
        {
          kind: "note",
          tone: "info",
          title: "Solo lectura",
          text: "El visor no aprueba ni modifica documentos, `meta.json` ni el estado del Work Item. Aprobar se hace en el chat o en la terminal; el visor nunca sustituye esa respuesta.",
        },
        {
          kind: "links",
          links: [
            { label: "Revisar la guía del visor", href: "/docs/guias/visor" },
            { label: "Ver el visor del producto", href: "/producto/visor" },
            {
              label: "Configurar viewer.autoOpenOnReady",
              href: "/docs/referencia/configuracion",
            },
          ],
        },
      ],
    },
    {
      id: "checksum",
      title: "Checksum inválido al actualizar",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei update` descarga la última release, verifica el SHA-256 del archive contra `checksums.txt` y solo entonces reemplaza el binario. Un checksum inválido, un fallo de red o un error de permisos abortan la actualización con código 1 y no dejan el binario degradado.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Ejecuta `rei update --check` para confirmar la versión disponible sin descargar.",
            "Repite `rei update` cuando la red esté estable.",
            "Si el fallo de integridad persiste, descarga el archive de la página de releases y verifica su SHA-256 contra `checksums.txt` antes de reemplazar el binario.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "Revisar la guía de actualización", href: "/docs/guias/actualizar" },
            { label: "Consultar rei update", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
    {
      id: "git",
      title: "El proyecto no usa git",
      blocks: [
        {
          kind: "paragraph",
          text: "`git` no es obligatorio: el workflow sigue funcionando en modo lectura. Lo que se pierde es la revisión acotada al diff y el registro de commits en `meta.json`. `rei check` inicializa `git` automáticamente si falta.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Ejecuta `rei check`: crea la estructura e inicializa `git` si no existe.",
            "Si decides usar `git`, confirma que el repositorio tiene un commit inicial antes de aprobar un Work Item.",
            "Sin `git`, `base_commit` y `last_review_commit` quedan vacíos; el flujo no se bloquea por ello.",
            "Con `git`, registra los commits antes de solicitar revisión para que `rei review-diff` acote el diff.",
          ],
        },
        {
          kind: "links",
          links: [
            { label: "Ver los campos de commit", href: "/docs/referencia/meta" },
            { label: "Leer las dudas frecuentes", href: "/docs/operacion/faq" },
            { label: "Consultar los comandos", href: "/docs/referencia/comandos" },
          ],
        },
      ],
    },
    {
      id: "no-esta-aqui",
      title: "El síntoma no está aquí",
      blocks: [
        {
          kind: "paragraph",
          text: "Esta página cubre los fallos que documentan la guía de uso y los documentos del arnés. Si el síntoma no aparece, empieza por la pregunta frecuente correspondiente y, si tampoco está, consulta el comando concreto con `rei <comando> --help`.",
        },
        {
          kind: "links",
          links: [
            { label: "Abrir las preguntas frecuentes", href: "/docs/operacion/faq" },
            { label: "Consultar los comandos", href: "/docs/referencia/comandos" },
            { label: "Consultar la referencia", href: "/docs/referencia" },
          ],
        },
      ],
    },
  ],
};
