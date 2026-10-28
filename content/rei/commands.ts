import type {
  Command,
  CommandCategory,
  CommandExitCode,
} from "./types";

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
      "Actualizar el binario y activar la integración opcional con GitHub Issues.",
  },
];

export const COMMAND_EXIT_CODE_CONVENTION: CommandExitCode[] = [
  { code: "0", meaning: "El comando terminó correctamente." },
  {
    code: "1",
    meaning: "Falló una comprobación o el comando no pudo completarse.",
  },
  {
    code: "2",
    meaning:
      "Uso incorrecto: flag desconocido, repetido, sin valor o inválido.",
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
    notes: [
      "Si AGENTS.md ya existe, avisa y lo conserva sin cambios.",
      "La personalización guiada se inicia con /personalize o invocando el rol initializer.",
    ],
    exitCodes: [
      { code: "0", meaning: "Instalación completada." },
      {
        code: "1",
        meaning:
          "No pudo crear un archivo del esqueleto o de la estructura, o falló la generación o verificación de OpenCode o Claude.",
      },
      { code: "2", meaning: "Uso incorrecto." },
    ],
  },
  {
    id: "init-status",
    name: "rei init status",
    summary: "Indica qué documentación del proyecto falta por personalizar.",
    category: "proyecto",
    flags: [],
    example: "rei init status",
    exitCodes: [
      { code: "0", meaning: "No queda ningún documento pendiente." },
      { code: "1", meaning: "Queda algún documento por personalizar." },
    ],
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
    notes: [
      "Los archivos llevan la marca GENERATED; no sobrescribe archivos ajenos y es idempotente.",
      "Genera /personalize con agent: initializer y subtask: true.",
    ],
    exitCodes: [
      { code: "0", meaning: "Todos los archivos coinciden con la generación canónica." },
      { code: "1", meaning: "Falta alguno, no lleva la marca o difiere." },
    ],
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
    notes: [
      "Los archivos llevan la marca GENERATED; no sobrescribe archivos ajenos y es idempotente.",
      "CLAUDE.md importa AGENTS.md con @AGENTS.md.",
    ],
    exitCodes: [
      { code: "0", meaning: "Todos los archivos coinciden con la generación canónica." },
      { code: "1", meaning: "Falta alguno, no lleva la marca o difiere." },
    ],
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
    notes: [
      "Solo archiva si meta.json está en done o blocked y el Estado de current.md coincide.",
      "Mueve el resumen a history.md y restablece current.md.",
    ],
    exitCodes: [
      { code: "0", meaning: "Sesión archivada y current.md restablecido." },
      {
        code: "1",
        meaning:
          "El Work Item no está en un estado terminal o current.md no es coherente.",
      },
    ],
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
    notes: [
      "Marca con << ACTIVO el Work Item en in_progress.",
      "Un links.json inválido se indica como nota y no impide el listado.",
    ],
    exitCodes: [
      { code: "0", meaning: "Listado correcto." },
      {
        code: "1",
        meaning: "Hay más de un Work Item en in_progress; el mensaje nombra los implicados.",
      },
    ],
  },
  {
    id: "item-show",
    name: "rei item show <id>",
    summary:
      "Muestra la ficha de un Work Item: metadatos, enlaces, documentos, sesión y validación.",
    category: "work-items",
    flags: [],
    example: "rei item show 2026-10-27_01-54__mi-feature",
    notes: [
      "La sección Enlaces muestra issue, URL, base (branch @ sha) y épica desde links.json.",
      "Si links.json falta es una nota; si es inválido se indica como nota y se ignora.",
    ],
    exitCodes: [
      { code: "0", meaning: "La ficha se muestra sin fallos de validación." },
      { code: "1", meaning: "Hay al menos un [FAIL] de validación." },
    ],
  },
  {
    id: "validate",
    name: "rei validate [<id>]",
    summary:
      "Comprueba la consistencia interna de un Work Item. Un links.json inválido es un aviso recuperable.",
    category: "verificacion",
    flags: [],
    example: "rei validate 2026-10-27_01-54__mi-feature",
    notes: [
      "Sin <id>, valida el Work Item de la sesión activa.",
      "Un links.json inválido se informa como WARN recuperable, nunca como FAIL.",
    ],
    exitCodes: [
      { code: "0", meaning: "No hay ningún [FAIL]." },
      { code: "1", meaning: "Hay al menos un [FAIL]." },
    ],
  },
  {
    id: "check",
    name: "rei check",
    summary:
      "Verifica el arnés y ejecuta los checks declarados en .rei/config.json.",
    category: "verificacion",
    flags: [
      {
        flag: "--quiet, -q",
        description: "Omite los [OK] y el resumen.",
      },
    ],
    example: "rei check",
    notes: [
      "Además de los checks, crea la estructura e inicializa git si falta.",
    ],
    exitCodes: [
      { code: "0", meaning: "Todo pasa." },
      { code: "1", meaning: "Hay al menos un [FAIL]." },
    ],
  },
  {
    id: "test",
    name: "rei test",
    summary: "Ejecuta los checks declarados en .rei/config.json.",
    category: "verificacion",
    flags: [],
    example: "rei test",
    notes: [
      "No es la suite de tests de REI; ejecuta solo los checks del proyecto.",
      "Sin checks configurados informa y sale 0.",
    ],
    exitCodes: [
      { code: "0", meaning: "No hay checks configurados o todos pasan." },
      { code: "1", meaning: "Algún check falla." },
    ],
  },
  {
    id: "review-diff",
    name: "rei review-diff <id>",
    summary:
      "Genera el paquete de revisión con los cambios reales del Work Item.",
    category: "verificacion",
    flags: [
      {
        flag: "--full",
        description: "Muestra el diff completo, no solo el resumen.",
      },
    ],
    example: "rei review-diff 2026-10-27_01-54__mi-feature",
  },
  {
    id: "view",
    name: "rei view [<id>]",
    summary:
      "Abre el visor local de solo lectura: documentos, validación, sesión, TOC, diff y FICHA.",
    category: "verificacion",
    flags: [
      {
        flag: "--open",
        description:
          "Arranca o reutiliza el servidor en segundo plano y abre el navegador sin bloquear.",
      },
      { flag: "--stop", description: "Detiene el servidor del visor." },
      {
        flag: "--enable",
        description: "Activa viewer.autoOpenOnReady en .rei/config.json.",
      },
      {
        flag: "--disable",
        description: "Desactiva viewer.autoOpenOnReady en .rei/config.json.",
      },
    ],
    example: "rei view 2026-10-27_01-54__mi-feature",
    notes: [
      "En segundo plano se cierra poco después de mostrar «terminado» (done); --stop, el tiempo de inactividad y Ctrl+C siguen funcionando.",
      "Es de solo lectura: no aprueba ni modifica documentos, meta.json ni el estado del Work Item.",
    ],
    exitCodes: [
      { code: "0", meaning: "El visor se abrió o se detuvo correctamente." },
      { code: "1", meaning: "No hay sesión activa o hubo un error de E/S." },
      { code: "2", meaning: "Uso incorrecto; los modos son mutuamente excluyentes." },
    ],
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
    notes: [
      "En Windows no se puede reemplazar el .exe en ejecución: informa y abre la página de releases.",
      "Un fallo de integridad SHA-256 aborta sin modificar el binario.",
    ],
    exitCodes: [
      {
        code: "0",
        meaning: "Está actualizado, --check funcionó o Windows guió la descarga.",
      },
      { code: "1", meaning: "Fallo de red, permisos, integridad o extracción." },
      { code: "2", meaning: "Uso incorrecto." },
    ],
  },
  {
    id: "github",
    name: "rei github <enable|disable|status>",
    summary:
      "Activa, desactiva o consulta la integración opcional GitHub Issues. El CLI nunca llama a GitHub.",
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
    notes: [
      "Sin flags, enable detecta el repositorio desde origin y la base desde origin/HEAD.",
      "disable y status no contactan con GitHub y rechazan flags.",
    ],
    exitCodes: [
      { code: "0", meaning: "Operación correcta, también con avisos y en status." },
      { code: "1", meaning: "Error operativo o de configuración." },
      { code: "2", meaning: "Uso incorrecto." },
    ],
  },
];

export function commandsByCategory(category: Command["category"]): Command[] {
  return COMMANDS.filter((command) => command.category === category);
}
