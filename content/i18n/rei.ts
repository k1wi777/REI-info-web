import {
  COMMAND_CATEGORIES,
  COMMAND_EXIT_CODE_CONVENTION,
  COMMANDS,
  STATE_TRANSITIONS,
  WORK_ITEM_STATES,
  type CommandCategoryId,
  type StateTransition,
  type WorkItemStateId,
} from "@/content/rei";
import type { Locale } from "@/lib/i18n";

/**
 * Prosa de `content/rei` por idioma, para las features que la muestran
 * traducida (docs y comandos). El español se deriva de `content/rei` (que no
 * se modifica: lo usan home y producto), así sigue siendo una sola fuente;
 * solo el inglés se escribe aquí. Los ids, los literales de comando, los
 * flags y los estados siguen saliendo de `content/rei`; los tests exigen que
 * el inglés cubra exactamente los mismos ids, flags y códigos.
 */
export type ReiCommandProse = {
  summary: string;
  /** Descripción de cada flag, por el literal del flag. */
  flags: Record<string, string>;
  notes: string[];
  /** Significado de los códigos de salida propios, por código. */
  exitCodes: Record<string, string>;
};

export type ReiProse = {
  /** Significado de cada estado del workflow. */
  states: Record<WorkItemStateId, string>;
  /** Nota de cada arista, por `transitionKey`. */
  transitions: Record<string, string>;
  categories: Record<CommandCategoryId, { label: string; description: string }>;
  /** Convención de códigos de salida, por código. */
  exitCodeConvention: Record<string, string>;
  /** Prosa de cada comando, por id. */
  commands: Record<string, ReiCommandProse>;
};

/** Clave estable de una arista del workflow. */
export function transitionKey(
  transition: Pick<StateTransition, "from" | "to">,
): string {
  return `${transition.from}>${transition.to}`;
}

export const reiProseEs: ReiProse = {
  states: Object.fromEntries(
    WORK_ITEM_STATES.map((state) => [state.id, state.meaning]),
  ) as Record<WorkItemStateId, string>,
  transitions: Object.fromEntries(
    STATE_TRANSITIONS.map((transition) => [
      transitionKey(transition),
      transition.note ?? "",
    ]),
  ),
  categories: Object.fromEntries(
    COMMAND_CATEGORIES.map(({ id, label, description }) => [
      id,
      { label, description },
    ]),
  ) as ReiProse["categories"],
  exitCodeConvention: Object.fromEntries(
    COMMAND_EXIT_CODE_CONVENTION.map(({ code, meaning }) => [code, meaning]),
  ),
  commands: Object.fromEntries(
    COMMANDS.map((command) => [
      command.id,
      {
        summary: command.summary,
        flags: Object.fromEntries(
          command.flags.map(({ flag, description }) => [flag, description]),
        ),
        notes: command.notes ?? [],
        exitCodes: Object.fromEntries(
          (command.exitCodes ?? []).map(({ code, meaning }) => [code, meaning]),
        ),
      },
    ]),
  ),
};

const OPENCODE_CLAUDE_NOTES = [
  "The files carry the GENERATED mark; it does not overwrite foreign files and it is idempotent.",
];

const GENERATED_MATCH = "All files match the canonical generation.";
const GENERATED_DRIFT = "One is missing, lacks the mark or differs.";
const DRIFT_FLAG = "Checks for drift without writing anything.";

export const reiProseEn: ReiProse = {
  states: {
    pending: "Work Item created, waiting for planning.",
    ready: "Planning finished, waiting for human approval.",
    in_progress: "Implementation under way. Only one at a time.",
    review: "Implementation finished, waiting for review.",
    done: "Completed and approved; terminal state.",
    blocked: "The work cannot continue.",
    changes_requested:
      "The review rejected the implementation and asks for changes.",
  },
  transitions: {
    "pending>ready": "The Spec Author finishes the planning.",
    "ready>in_progress": "Requires explicit human approval.",
    "in_progress>review": "The Implementer closes with its report.",
    "review>done": "Favorable verdict from the Reviewer.",
    "review>changes_requested": "The Reviewer rejects the implementation.",
    "changes_requested>in_progress": "The Implementer applies the corrections.",
    ...Object.fromEntries(
      STATE_TRANSITIONS.filter(
        ({ to, kind }) => to === "blocked" && kind === "branch",
      ).map((transition) => [
        transitionKey(transition),
        "The work cannot continue.",
      ]),
    ),
    "done>blocked":
      "Non-standard transition: requires --force and an explicit order.",
  },
  categories: {
    proyecto: {
      label: "Prepare the project",
      description:
        "Initialize the harness, generate native subagents and check the state of the customization.",
    },
    "work-items": {
      label: "Work Items and session",
      description:
        "Create, plan, approve and move a Work Item through its states.",
    },
    verificacion: {
      label: "Verification and review",
      description:
        "Check the consistency of the harness, review the diff and open the local viewer.",
    },
    mantenimiento: {
      label: "Maintenance and integration",
      description:
        "Update the binary and enable the optional GitHub Issues integration.",
    },
  },
  exitCodeConvention: {
    "0": "The command finished correctly.",
    "1": "A check failed or the command could not complete.",
    "2": "Incorrect usage: unknown, repeated, valueless or invalid flag.",
  },
  commands: {
    init: {
      summary:
        "Initializes the harness in the project: skeleton, state structure and git if missing. It does not overwrite existing files.",
      flags: { "--help": "Shows the command help." },
      notes: [
        "If AGENTS.md already exists, it warns and leaves it unchanged.",
        "Guided customization is started with /personalize or by invoking the initializer role.",
      ],
      exitCodes: {
        "0": "Installation completed.",
        "1": "It could not create a skeleton or structure file, or the OpenCode or Claude generation or verification failed.",
        "2": "Incorrect usage.",
      },
    },
    "init-status": {
      summary: "Tells you which project documentation is still to be customized.",
      flags: {},
      notes: [],
      exitCodes: {
        "0": "No document is pending.",
        "1": "Some document is still to be customized.",
      },
    },
    "init-opencode": {
      summary:
        "Generates the native OpenCode subagents and the /personalize command.",
      flags: { "--check": DRIFT_FLAG },
      notes: [
        ...OPENCODE_CLAUDE_NOTES,
        "Generates /personalize with agent: initializer and subtask: true.",
      ],
      exitCodes: { "0": GENERATED_MATCH, "1": GENERATED_DRIFT },
    },
    "init-claude": {
      summary:
        "Generates the native Claude Code subagents, /personalize and CLAUDE.md.",
      flags: { "--check": DRIFT_FLAG },
      notes: [
        ...OPENCODE_CLAUDE_NOTES,
        "CLAUDE.md imports AGENTS.md with @AGENTS.md.",
      ],
      exitCodes: { "0": GENERATED_MATCH, "1": GENERATED_DRIFT },
    },
    "init-update": {
      summary:
        "Updates the harness of an already initialized project with marker detection.",
      flags: { "--force": "Forces the update of the generated files." },
      notes: [],
      exitCodes: {},
    },
    doctor: {
      summary:
        "Read-only diagnosis of the harness, the roles and the pending customization.",
      flags: {},
      notes: [],
      exitCodes: {},
    },
    new: {
      summary:
        "Creates a Work Item in pending state with its identifier and type.",
      flags: {},
      notes: [],
      exitCodes: {},
    },
    session: {
      summary: "Shows the active session and its Work Item.",
      flags: {},
      notes: [],
      exitCodes: {},
    },
    "session-start": {
      summary:
        "Starts the session of a Work Item only if it exists, the type matches and it is in pending.",
      flags: {},
      notes: [],
      exitCodes: {},
    },
    "session-archive": {
      summary: "Archives the session once the Work Item is closed.",
      flags: {},
      notes: [
        "It only archives if meta.json is in done or blocked and the State in current.md matches.",
        "It moves the summary to history.md and resets current.md.",
      ],
      exitCodes: {
        "0": "Session archived and current.md reset.",
        "1": "The Work Item is not in a terminal state or current.md is not consistent.",
      },
    },
    "session-reset": {
      summary: "Resets current.md to its initial state.",
      flags: {},
      notes: [],
      exitCodes: {},
    },
    "commit-set": {
      summary: "Records the current commit in base_commit or last_review_commit.",
      flags: {},
      notes: [],
      exitCodes: {},
    },
    "status-set": {
      summary:
        "Changes the state of a Work Item. done is terminal; leaving it requires --force.",
      flags: {
        "--force": "Allows a non-standard transition other than from done.",
      },
      notes: [],
      exitCodes: {},
    },
    "items-status": {
      summary:
        "Lists each Work Item with its type, state, issue and base if there is a link.",
      flags: {},
      notes: [
        "It marks the Work Item in in_progress with << ACTIVO.",
        "An invalid links.json is reported as a note and does not prevent the listing.",
      ],
      exitCodes: {
        "0": "Listing correct.",
        "1": "More than one Work Item is in in_progress; the message names the ones involved.",
      },
    },
    "item-show": {
      summary:
        "Shows the card of a Work Item: metadata, links, documents, session and validation.",
      flags: {},
      notes: [
        "The Links section shows the issue, URL, base (branch @ sha) and epic from links.json.",
        "If links.json is missing it is a note; if it is invalid it is reported as a note and ignored.",
      ],
      exitCodes: {
        "0": "The card is shown with no validation failures.",
        "1": "There is at least one validation [FAIL].",
      },
    },
    validate: {
      summary:
        "Checks the internal consistency of a Work Item. An invalid links.json is a recoverable warning.",
      flags: {},
      notes: [
        "Without <id>, it validates the Work Item of the active session.",
        "An invalid links.json is reported as a recoverable WARN, never as a FAIL.",
      ],
      exitCodes: { "0": "There is no [FAIL].", "1": "There is at least one [FAIL]." },
    },
    check: {
      summary:
        "Verifies the harness and runs the checks declared in .rei/config.json.",
      flags: { "--quiet, -q": "Omits the [OK] lines and the summary." },
      notes: [
        "Besides the checks, it creates the structure and initializes git if missing.",
      ],
      exitCodes: { "0": "Everything passes.", "1": "There is at least one [FAIL]." },
    },
    test: {
      summary: "Runs the checks declared in .rei/config.json.",
      flags: {},
      notes: [
        "It is not REI's test suite; it runs only the project checks.",
        "With no checks configured it reports it and exits 0.",
      ],
      exitCodes: {
        "0": "There are no checks configured or all pass.",
        "1": "Some check fails.",
      },
    },
    "review-diff": {
      summary: "Generates the review package with the real changes of the Work Item.",
      flags: { "--full": "Shows the full diff, not just the summary." },
      notes: [],
      exitCodes: {},
    },
    view: {
      summary:
        "Opens the local read-only viewer: documents, validation, session, TOC, diff and FICHA.",
      flags: {
        "--open":
          "Starts or reuses the server in the background and opens the browser without blocking.",
        "--stop": "Stops the viewer server.",
        "--enable": "Turns on viewer.autoOpenOnReady in .rei/config.json.",
        "--disable": "Turns off viewer.autoOpenOnReady in .rei/config.json.",
      },
      notes: [
        "In the background it closes shortly after showing «finished» (done); --stop, the idle timeout and Ctrl+C keep working.",
        "It is read-only: it does not approve and does not modify documents, meta.json or the state of the Work Item.",
      ],
      exitCodes: {
        "0": "The viewer was opened or stopped correctly.",
        "1": "There is no active session or there was an I/O error.",
        "2": "Incorrect usage; the modes are mutually exclusive.",
      },
    },
    update: {
      summary:
        "Updates the binary from GitHub Releases, verifying the SHA-256 checksum.",
      flags: {
        "--check": "Only checks whether there is a new version; it changes nothing.",
      },
      notes: [
        "On Windows the running .exe cannot be replaced: it reports it and opens the releases page.",
        "A SHA-256 integrity failure aborts without modifying the binary.",
      ],
      exitCodes: {
        "0": "It is up to date, --check worked or Windows guided the download.",
        "1": "Network, permission, integrity or extraction failure.",
        "2": "Incorrect usage.",
      },
    },
    github: {
      summary:
        "Enables, disables or queries the optional GitHub Issues integration. The CLI never calls GitHub.",
      flags: {
        "--repo owner/name": "Target repository.",
        "--base <rama>": "Base branch for the changes.",
        "--strategy squash|merge|rebase": "Merge strategy of the PR.",
      },
      notes: [
        "Without flags, enable detects the repository from origin and the base from origin/HEAD.",
        "disable and status do not contact GitHub and reject flags.",
      ],
      exitCodes: {
        "0": "Operation correct, also with warnings and in status.",
        "1": "Operational or configuration error.",
        "2": "Incorrect usage.",
      },
    },
  },
};

const PROSE: Record<Locale, ReiProse> = { es: reiProseEs, en: reiProseEn };

/** Prosa de `content/rei` en el idioma pedido. */
export function getReiProse(lang: Locale): ReiProse {
  return PROSE[lang];
}
