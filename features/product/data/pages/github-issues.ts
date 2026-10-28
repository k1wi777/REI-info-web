import { REPOSITORY_URL } from "@/content/site";
import type { ProductDocument } from "@/features/product/types";

export const GITHUB_ISSUES_DOCUMENT: ProductDocument = {
  id: "github-issues",
  eyebrow: "Producto · GitHub Issues",
  meta: "Integración opcional GitHub Issues · proyección del trabajo",
  facts: [
    { label: "Integración", value: "Opcional" },
    { label: "Fuente de verdad", value: "`.rei`" },
    { label: "Ejecuta", value: "`gh` y `git`" },
    { label: "Issue y rama", value: "Solo Features" },
    { label: "Merge", value: "Bajo orden" },
  ],
  sections: [
    {
      id: "opcional",
      label: "Proyección",
      title: "Una integración opcional",
      weight: "lead",
      blocks: [
        {
          kind: "paragraph",
          text: "GitHub Issues es una proyección del trabajo, no su fuente de verdad. La integración es opcional: si la clave `integrations.github` no existe o `enabled` es false, el flujo es idéntico y el Leader no menciona GitHub Issues.",
        },
        { kind: "projection" },
        {
          kind: "list",
          items: [
            "El CLI nunca llama a GitHub: las acciones reales las ejecutan `gh` y `git` bajo orden explícita del Leader.",
            "`.rei` manda sobre la ejecución del Work Item; la issue manda sobre el problema, el alcance y la discusión.",
            "La configuración vive en `.rei/config.json`, bajo `integrations.github`.",
          ],
        },
      ],
    },
    {
      id: "comandos",
      label: "Comandos",
      title: "Activar, desactivar y consultar",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei github` resuelve la configuración con la precedencia flag explícito, valor previo, detección desde `git` y valor por defecto. `status` es offline y de solo lectura: no llama a `gh` ni a la API de GitHub.",
        },
        { kind: "commands", ids: ["github"] },
        {
          kind: "code",
          language: "bash",
          title: "Configuración",
          code: "rei github enable --repo owner/name --base main --strategy squash\nrei github disable\nrei github status",
        },
        {
          kind: "paragraph",
          text: "Un flag desconocido, repetido, sin valor o inválido es uso incorrecto y no escribe la configuración. `disable` conserva `repo`, `base`, `mergeStrategy` y `links.json`.",
        },
      ],
    },
    {
      id: "puerta",
      label: "Puerta",
      title: "Issue y rama solo para Features",
      blocks: [
        {
          kind: "paragraph",
          text: "La puerta issue + rama solo se ejecuta cuando `meta.json` está en ready, el usuario aprueba, la integración está activa y el Work Item es una Feature. Una Task se trabaja en la rama base, sin issue ni rama, y no existe opt-in para Tasks.",
        },
        {
          kind: "note",
          tone: "info",
          title: "Sin puerta para Tasks",
          text: "No se pregunta la puerta a una Task «por si acaso» ni se usa una label rei:task. Si la integración está desactivada, tampoco se menciona GitHub Issues.",
        },
      ],
    },
    {
      id: "pr-merge",
      label: "PR y merge",
      title: "PR y merge bajo orden",
      blocks: [
        {
          kind: "paragraph",
          text: "Nunca hay commit, push, PR ni merge sin una orden explícita del usuario. La estrategia de merge sale de la configuración —squash por defecto— y el merge no es automático: no hay auto-merge ni `--admin`.",
        },
      ],
    },
    {
      id: "epicas",
      label: "Épicas",
      title: "Épicas, backlog y labels",
      blocks: [
        {
          kind: "paragraph",
          text: "La integración incluye épicas, backlog de hijas, adopción, publicación de la spec, asignación y cierre de la épica. `links.json` es un índice local recuperable, no la fuente de verdad.",
        },
        {
          kind: "paragraph",
          text: "Los marcadores identifican; las labels solo ayudan a una persona. Si un marcador aparece duplicado o hay más de una issue con el mismo marcador, la acción se detiene y se reporta la anomalía.",
        },
        {
          kind: "issue",
          number: 3,
          caption:
            "Cabecera de la épica #3, cerrada y con sus labels publicadas",
        },
      ],
    },
    {
      id: "fuera",
      label: "Fuera de alcance",
      title: "Fuera de alcance",
      weight: "fine",
      blocks: [
        {
          kind: "list",
          items: [
            "Projects, milestones y sub-issues nativas.",
            "PRs desde fork hacia upstream.",
            "Sincronización bidireccional.",
            "Work Items pending locales como sustituto del backlog.",
            "Autoasignación por carga y time tracking.",
            "Proveedores distintos de GitHub.",
            "Commits, push o merge automáticos, `--admin` y auto-merge.",
            "Flags de acciones GitHub en rei.",
          ],
        },
        {
          kind: "links",
          links: [
            {
              label: "Referencia de comandos",
              href: "/docs/referencia/comandos",
            },
            { label: "Preguntas frecuentes", href: "/docs/operacion/faq" },
            { label: "Ver los Work Items", href: "/producto/work-items" },
            { label: "Qué hace el visor", href: "/producto/visor" },
            {
              label: "Repositorio de REI Harness",
              href: REPOSITORY_URL,
              external: true,
            },
          ],
        },
      ],
    },
  ],
};
