import type { Command, CommandCategory } from "./types";

export const COMMAND_CATEGORIES: CommandCategory[] = [
  {
    id: "proyecto",
    label: "Preparar el proyecto",
    description:
      "Inicializar el arnés, generar subagentes nativos y comprobar el estado de la personalización.",
  },
  {
    id: "work-items",
    label: "Work Items y sesión",
    description:
      "Crear, planificar, aprobar y mover un Work Item por sus estados.",
  },
  {
    id: "verificacion",
    label: "Verificación y revisión",
    description:
      "Comprobar la coherencia del arnés, revisar el diff y abrir el visor local.",
  },
  {
    id: "mantenimiento",
    label: "Mantenimiento e integración",
    description:
      "Actualizar el binario y activar la integración opcional con GitHub.",
  },
];

export const COMMANDS: Command[] = [
  {
    id: "init",
    name: "rei init",
    summary:
      "Inicializa el arnés en el proyecto: esqueleto, estructura de estado y git si falta. No sobrescribe archivos existentes.",
    category: "proyecto",
    flags: [
      { flag: "--help", description: "Muestra la ayuda del comando." },
    ],
    example: "rei init",
  },
  {
    id: "init-status",
    name: "rei init status",
    summary: "Indica qué documentación del proyecto falta por personalizar.",
    category: "proyecto",
    flags: [],
    example: "rei init status",
  },
  {
    id: "init-opencode",
    name: "rei init opencode",
    summary:
      "Genera los subagentes nativos de OpenCode y el comando /personalize.",
    category: "proyecto",
    flags: [
      { flag: "--check", description: "Comprueba la deriva sin escribir nada." },
    ],
    example: "rei init opencode",
  },
  {
    id: "init-claude",
    name: "rei init claude",
    summary:
      "Genera los subagentes nativos de Claude Code, /personalize y CLAUDE.md.",
    category: "proyecto",
    flags: [
      { flag: "--check", description: "Comprueba la deriva sin escribir nada." },
    ],
    example: "rei init claude",
  },
  {
    id: "init-update",
    name: "rei init --update",
    summary:
      "Actualiza el arnés de un proyecto ya inicializado con detección de marcadores.",
    category: "proyecto",
    flags: [
      { flag: "--force", description: "Fuerza la actualización de los archivos generados." },
    ],
    example: "rei init --update",
  },
  {
    id: "doctor",
    name: "rei doctor",
    summary:
      "Diagnóstico de solo lectura del arnés, los roles y la personalización pendiente.",
    category: "proyecto",
    flags: [],
    example: "rei doctor",
  },
  {
    id: "new",
    name: "rei new <id> <feature|task> [title]",
    summary: "Crea un Work Item en estado pending con su identificador y tipo.",
    category: "work-items",
    flags: [],
    example:
      'rei new 2026-10-27_01-54__mi-feature feature "Mi primera feature"',
  },
  {
    id: "session",
    name: "rei session",
    summary: "Muestra la sesión activa y su Work Item.",
    category: "work-items",
    flags: [],
    example: "rei session status",
  },
  {
    id: "session-start",
    name: "rei session start <id> <tipo>",
    summary:
      "Inicia la sesión de un Work Item solo si existe, el tipo coincide y está en pending.",
    category: "work-items",
    flags: [],
    example: "rei session start 2026-10-27_01-54__mi-feature feature",
  },
  {
    id: "session-archive",
    name: "rei session archive",
    summary: "Archiva la sesión cuando el Work Item ya está cerrado.",
    category: "work-items",
    flags: [],
    example: "rei session archive",
  },
  {
    id: "session-reset",
    name: "rei session reset",
    summary: "Restablece current.md a su estado inicial.",
    category: "work-items",
    flags: [],
    example: "rei session reset",
  },
  {
    id: "commit-set",
    name: "rei commit set <id> <campo>",
    summary:
      "Registra el commit actual en base_commit o en last_review_commit.",
    category: "work-items",
    flags: [],
    example: "rei commit set 2026-10-27_01-54__mi-feature base_commit",
  },
  {
    id: "status-set",
    name: "rei status set <id> <estado>",
    summary:
      "Cambia el estado de un Work Item. done es terminal; salir de él requiere --force.",
    category: "work-items",
    flags: [
      {
        flag: "--force",
        description: "Permite una transición no estándar fuera de done.",
      },
    ],
    example: "rei status set 2026-10-27_01-54__mi-feature ready",
  },
  {
    id: "items-status",
    name: "rei items status",
    summary:
      "Lista cada Work Item con su tipo, estado, issue y base si existe enlace.",
    category: "work-items",
    flags: [],
    example: "rei items status",
  },
  {
    id: "item-show",
    name: "rei item show <id>",
    summary:
      "Muestra la ficha de un Work Item: metadatos, enlaces, documentos, sesión y validación.",
    category: "work-items",
    flags: [],
    example: "rei item show 2026-10-27_01-54__mi-feature",
  },
  {
    id: "validate",
    name: "rei validate [<id>]",
    summary:
      "Comprueba la consistencia interna de un Work Item. Un links.json inválido es un aviso recuperable.",
    category: "verificacion",
    flags: [],
    example: "rei validate 2026-10-27_01-54__mi-feature",
  },
  {
    id: "check",
    name: "rei check",
    summary:
      "Verifica el arnés y ejecuta los checks declarados en .rei/config.json.",
    category: "verificacion",
    flags: [],
    example: "rei check",
  },
  {
    id: "test",
    name: "rei test",
    summary: "Ejecuta los checks declarados en .rei/config.json.",
    category: "verificacion",
    flags: [],
    example: "rei test",
  },
  {
    id: "review-diff",
    name: "rei review-diff <id>",
    summary:
      "Genera el paquete de revisión con los cambios reales del Work Item.",
    category: "verificacion",
    flags: [],
    example: "rei review-diff 2026-10-27_01-54__mi-feature",
  },
  {
    id: "view",
    name: "rei view [<id>]",
    summary:
      "Abre el visor local de solo lectura: documentos, validación, sesión, TOC, diff y FICHA.",
    category: "verificacion",
    flags: [
      { flag: "--stop", description: "Detiene el servidor del visor." },
    ],
    example: "rei view 2026-10-27_01-54__mi-feature",
  },
  {
    id: "update",
    name: "rei update [--check]",
    summary:
      "Actualiza el binario desde GitHub Releases verificando el checksum SHA-256.",
    category: "mantenimiento",
    flags: [
      {
        flag: "--check",
        description: "Solo comprueba si hay una versión nueva; no modifica nada.",
      },
    ],
    example: "rei update --check",
  },
  {
    id: "github",
    name: "rei github <enable|disable|status>",
    summary:
      "Activa, desactiva o consulta la integración opcional con GitHub. El CLI nunca llama a GitHub.",
    category: "mantenimiento",
    flags: [
      { flag: "--repo owner/name", description: "Repositorio de destino." },
      { flag: "--base <rama>", description: "Rama base para los cambios." },
      {
        flag: "--strategy squash|merge|rebase",
        description: "Estrategia de merge del PR.",
      },
    ],
    example:
      "rei github enable --repo k1wi777/REI-Harness --base main --strategy squash",
  },
];

export function commandsByCategory(category: Command["category"]): Command[] {
  return COMMANDS.filter((command) => command.category === category);
}
