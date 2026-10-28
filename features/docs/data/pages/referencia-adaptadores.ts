import type { DocContent, DocsContentPath } from "@/features/docs/types";

export const REFERENCIA_ADAPTADORES_PATH: DocsContentPath =
  "/docs/referencia/adaptadores";

export const REFERENCIA_ADAPTADORES_DOCUMENT: DocContent = {
  path: REFERENCIA_ADAPTADORES_PATH,
  eyebrow: "Referencia · Adaptadores",
  meta: "contrato canónico · OpenCode · Claude Code · fallback",
  sections: [
    {
      id: "contrato-canonico",
      title: "El contrato canónico de rol",
      blocks: [
        {
          kind: "paragraph",
          text: "Cada rol vive en `.rei/agents/<rol>.md`. El archivo tiene tres partes en este orden: frontmatter YAML, sección `## Contrato` y sección `## Referencia`. No debe haber contenido normativo fuera de esas dos secciones.",
        },
        {
          kind: "table",
          columns: ["Clave", "Obligatoria", "Valor"],
          rows: [
            ["name", "Sí", "Identificador del rol; coincide con el nombre del archivo."],
            ["description", "Sí", "Una frase; es el texto que muestra el runtime al elegir agente."],
            ["mode", "Sí", "primary para el Leader; subagent para el resto."],
            [
              "tools",
              "Sí",
              "Lista inline de herramientas genéricas: read, write, edit, search, shell, subagent.",
            ],
            ["model", "No", "Modelo del runtime, por ejemplo provider/modelo."],
          ],
        },
        {
          kind: "code",
          language: "markdown",
          title: "Frontmatter",
          code: "---\nname: implementer\ndescription: Implementa un único Work Item siguiendo la planificación aprobada.\nmode: subagent\ntools: [read, write, edit, search, shell]\n---",
        },
        {
          kind: "paragraph",
          text: "tools usa nombres genéricos: el formato canónico nunca menciona herramientas de un runtime concreto. La traducción la hace el adaptador.",
        },
      ],
    },
    {
      id: "contrato-y-referencia",
      title: "Contrato frente a Referencia",
      blocks: [
        {
          kind: "paragraph",
          text: "`## Contrato` es autosuficiente: contiene identidad, objetivo, precondiciones, protocolo, reglas duras, formato de salida y herramientas permitidas. `## Referencia` contiene solo detalle opcional —racional, ejemplos, casos límite— y su omisión no impide ejecutar el rol.",
        },
        {
          kind: "list",
          items: [
            "Si una regla o un paso es necesario para ejecutar el rol, vive en `## Contrato`.",
            "Si es justificación o ejemplo, vive en `## Referencia`.",
            "Al subagente se le transmite únicamente `## Contrato`, nunca el archivo completo.",
          ],
        },
      ],
    },
    {
      id: "generacion",
      title: "Generar subagentes nativos",
      blocks: [
        {
          kind: "paragraph",
          text: "Con un adaptador nativo, el CLI extrae el frontmatter y el `## Contrato` de cada rol y los traduce al formato del runtime. Ambos comandos instalan el esqueleto si falta.",
        },
        {
          kind: "code",
          language: "Shell",
          title: "OpenCode y Claude Code",
          code: "rei init opencode\nrei init claude",
        },
        {
          kind: "table",
          columns: ["Runtime", "Archivos generados"],
          rows: [
            [
              "OpenCode",
              "`.opencode/agents/<rol>.md` y el comando `/personalize` en `.opencode/commands/personalize.md`, con `agent: initializer` y `subtask: true`.",
            ],
            [
              "Claude Code",
              "`.claude/agents/<rol>.md` con frontmatter nativo, el comando `/personalize` en `.claude/commands/personalize.md` y `CLAUDE.md`, que importa `AGENTS.md` con `@AGENTS.md`.",
            ],
          ],
        },
        {
          kind: "list",
          items: [
            "Los archivos generados llevan la marca GENERATED.",
            "Ningún comando sobrescribe un archivo que no haya generado: si lo encuentra, avisa y lo conserva.",
            "La instalación es idempotente: reejecutarla sobre archivos generados los deja idénticos.",
            "`/personalize` lanza la entrevista del rol initializer para personalizar la documentación del proyecto.",
          ],
        },
      ],
    },
    {
      id: "deriva",
      title: "Comprobar la deriva",
      blocks: [
        {
          kind: "paragraph",
          text: "Si editas el `## Contrato` de un rol en `.rei/agents/`, los archivos generados quedan desactualizados. `--check` compara la generación canónica con lo instalado sin escribir nada.",
        },
        {
          kind: "code",
          language: "Shell",
          title: "Verificación",
          code: "rei init opencode --check\nrei init claude --check",
        },
        {
          kind: "table",
          columns: ["Código", "Significado"],
          rows: [
            ["0", "Todos los archivos existen, llevan la marca y coinciden con la generación canónica."],
            ["1", "Falta algún archivo, no lleva la marca o difiere."],
          ],
        },
      ],
    },
    {
      id: "fallback",
      title: "Fallback sin adaptador",
      blocks: [
        {
          kind: "paragraph",
          text: "Cursor y Codex no exponen subagentes nativos configurables por rol, así que no tienen adaptador. Funcionan por fallback, sin configuración: no se crea ningún archivo `.cursor/` ni `.codex/`.",
        },
        {
          kind: "paragraph",
          text: "En ese caso, el Leader transmite a cada subagente solo la sección `## Contrato` del rol —la misma que alimenta a los adaptadores nativos—, de modo que el contrato operativo es idéntico.",
        },
      ],
    },
    {
      id: "roles",
      title: "Los roles",
      blocks: [
        {
          kind: "paragraph",
          text: "El arnés define cinco roles. El Leader coordina; el Spec Author planifica; el Implementer ejecuta la planificación aprobada; el Reviewer valida; el Initializer conduce la personalización. La responsabilidad, el momento y el límite de cada uno se documentan una sola vez en la página de agentes del producto.",
        },
        {
          kind: "links",
          links: [
            { label: "Ver los cinco roles", href: "/producto/agentes" },
            { label: "Consultar rei init", href: "/docs/referencia/comandos" },
            {
              label: "Resolver un problema de generación",
              href: "/docs/operacion/troubleshooting",
            },
          ],
        },
      ],
    },
  ],
};
