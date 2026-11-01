import type { HomeCopy } from "@/features/home/copy/types";

/**
 * Textos de la home en inglés. Mismo contenido que `es`, en tono directo y sin
 * añadir datos ni afirmaciones. Las capturas del visor y de GitHub muestran
 * interfaz y títulos en español: los textos alternativos lo dicen.
 */
export const en: HomeCopy = {
  ui: {
    exampleTag: "Illustrative example",
    captureLink: "View full capture",
  },
  acts: {
    problema: {
      label: "Problem",
      thesis: "AI writes fast; without a process, so does the rework.",
    },
    proceso: {
      label: "Process",
      thesis:
        "One sheet, one sign-off, evidence: a person decides before any code is written.",
    },
    evidencia: {
      label: "Evidence",
      thesis:
        "The real product: the viewer, GitHub Issues and the limits of the harness.",
    },
    cierre: {
      label: "Close",
      thesis:
        "The evidence stays in your repository; you open the next Work Item.",
    },
  },
  hero: {
    brand: "REI HARNESS / SDD HARNESS",
    kicker: "Spec Driven Development · Harness for AI agents",
    titleLine: "Your agent writes.",
    titleEmphasis: "You decide",
    lede: "REI Harness turns work with AI agents into a process with a specification, human approval and evidence, inside your own repository.",
    install: "Install REI",
    flow: "See the flow",
    approvalNote: "Approval is recorded from the CLI. Silence is not approval.",
  },
  sheet: {
    title: "Responsibility matrix",
    summary: "4 roles · 1 sign-off",
    exampleTag: "Example sheet",
    matrixLabel: (title) => `${title}: matrix of roles and phases`,
    caption: "Responsibility matrix by role and phase",
    phaseColumn: "Phase",
    responsible: "Responsible",
    notInvolved: "Not involved",
    phases: {
      "01": "Request",
      "02": "Planning",
      "04": "Implementation",
      "05": "Review",
    },
    meta: {
      state: "State",
      checkpoints: "Checkpoints",
      approval: "Approval",
      type: "Type",
    },
    gate: {
      label: "Planning approval",
      status: "Pending",
      detail: "A human sign-off releases the sheet. Silence is not approval.",
    },
  },
  states: {
    heading: "Cycle states",
    current: (state) => `current: ${state}`,
    currentSr: " (current state)",
    oneAtATime: "Only one Work Item can be in in_progress at a time.",
  },
  process: {
    eyebrow: "Process",
    title: "One sheet, one sign-off, evidence",
    intro:
      "REI does not slow the agent down: it gives it a process. It separates deciding, planning and executing; each stage leaves an artifact you can read and review.",
    items: [
      {
        title: "Specification first",
        description:
          "The plan exists before the agent writes the first line.",
      },
      {
        title: "Human approval",
        description:
          "No Work Item moves to implementation without an explicit sign-off.",
      },
      {
        title: "Separate roles",
        description:
          "Leader, Spec Author, Implementer and Reviewer stay within their own work.",
      },
      {
        title: "Versioned evidence",
        description:
          "Planning, progress and history live in `.rei/`, not in the chat.",
      },
    ],
    linkLabel: "Walk through the first Work Item",
  },
  limits: {
    eyebrow: "Limits",
    title: "What the website does not do",
    intro:
      "Showing the limits is part of the proposal: the website documents the harness, it does not replace it.",
    items: [
      {
        title: "No search or version selector",
        description:
          "The navigation, the table of contents and a predictable URL structure cover the current volume.",
      },
      {
        title: "The viewer is read-only",
        description:
          "Approval is recorded from the CLI, not from the browser.",
      },
      {
        title: "GitHub Issues is optional",
        description:
          "It is not the source of truth for the Work Item nor a requirement to work.",
      },
      {
        title: "Direct mode is restricted",
        description:
          "It only applies to trivial changes that are explicitly requested.",
      },
      {
        title: "The website does not run commands",
        description:
          "It does not modify Work Items nor replace the CLI or the viewer.",
      },
    ],
    linkLabel: "Check the commands",
  },
  problem: {
    eyebrow: "Without REI / With REI",
    title: "The same case, two outcomes",
    intro:
      "AI agents and LLMs write code from a conversation. When deciding, planning and executing all happen in the same conversation, nothing is recorded and nobody can review the decision. The harness separates those three things and puts the decision in writing.",
    cases: {
      "sin-rei": {
        label: "Without REI",
        title: "The conversation decides for you",
        intro:
          "Same case: “add a status filter to the list”. With no written scope, the agent starts with the code.",
        note: "Illustrative example of the mechanism; it does not reproduce a real conversation.",
      },
      "con-rei": {
        label: "With REI",
        title: "The sheet decides before the code",
        intro:
          "The same case becomes a Work Item: a reviewable plan, a human sign-off and evidence in the repository.",
        note: "Illustrative example built with the harness's real states and roles.",
      },
    },
    steps: {
      "sin-rei-1": {
        title: "Late scope",
        detail:
          "The LLM writes the filter before the scope is clear: nobody agreed where it applies or which states it covers.",
        alertLabel: "Risk",
      },
      "sin-rei-2": {
        title: "Hallucinations",
        detail: "It invents an API or a piece of data and presents it as true.",
        alertLabel: "Failure",
      },
      "sin-rei-3": {
        title: "Unauthorized decisions",
        detail:
          "It changes the architecture or the scope without an approval to back it.",
        alertLabel: "Failure",
      },
      "sin-rei-4": {
        title: "Out-of-bounds actions",
        detail:
          "It touches data or environments that are not its own to test the change.",
        alertLabel: "Failure",
      },
      "sin-rei-5": {
        title: "Rework",
        detail:
          "Fast code is expensive to fix; the decision only ever existed in the chat.",
        alertLabel: "Cost",
      },
      "con-rei-1": {
        title: "Work Item",
        detail:
          "The Leader records the scope, the type and the pending state before any code is written.",
        alertLabel: "Step",
      },
      "con-rei-2": {
        title: "Planning",
        detail:
          "The Spec Author delivers reviewable requirements, design and tasks.",
        alertLabel: "Artifacts",
      },
      "con-rei-3": {
        title: "Approval",
        detail:
          "The person reviews and signs; the CLI records the move to in_progress. Silence is not approval.",
        alertLabel: "Gate",
      },
      "con-rei-4": {
        title: "Implementation",
        detail:
          "The Implementer executes only the approved plan and leaves verification evidence.",
        alertLabel: "Limit",
      },
      "con-rei-5": {
        title: "Review",
        detail:
          "The Reviewer verifies against the plan; done requires a favorable verdict.",
        alertLabel: "Done",
      },
    },
  },
  gate: {
    eyebrow: "Cycle and gate",
    title: "Approval is not a formality",
    intro:
      "A Work Item goes through five states. The gate is not before or after the work: it sits between the plan and the code. No control on this page approves anything; the sign-off is recorded from the CLI.",
    note: "The gate's artifacts are readable without JavaScript; on mobile the cycle reads top to bottom.",
    stages: {
      pending: "The Leader records the Work Item and agrees the scope.",
      ready:
        "The Spec Author delivers reviewable requirements, design and tasks.",
      gate: "A human sign-off releases the sheet. Silence is not approval.",
      in_progress: "The Implementer executes only the approved plan.",
      review: "The Reviewer verifies against the plan and the checkpoints.",
      done: "Terminal state: approved work and evidence in the repository.",
    },
    gateLabel: "Planning approval",
    artifacts: {
      "requirements.md": "What must be met and how it is verified.",
      "design.md": "How it is solved and which alternatives were discarded.",
      "tasks.md": "Execution order with checkable tasks.",
    },
    signNote: "The sign-off is recorded from the CLI; this page does not approve.",
    branches: {
      blocked: "The work cannot continue.",
      changes_requested:
        "The review rejected the implementation and asks for changes.",
    },
    footnote:
      "Branches, not shortcuts. Only one Work Item can be in in_progress at a time.",
  },
  agents: {
    eyebrow: "Roles",
    title: "Explicit roles, explicit limits",
    intro:
      "Each role gets its own contract and does not step into another's work. Open any role, keyboard included, to read its responsibility and its limit.",
    note: "The gate sits between Spec Author and Implementer; the Initializer is a side branch that does not go through the Work Item cycle. The native OpenCode and Claude Code adapters are optional; Cursor and Codex work through a fallback.",
    gateTag: "The gate",
    gateSigned: "· human sign-off",
    openLabel: "Responsibility and limit",
    detailHeading: (role) => `${role} · Responsibility and limit`,
    responsibility: "Responsibility",
    limit: "Limit",
    initializerNote:
      "The Initializer prepares the repository; it neither approves nor implements Work Items.",
    handoffs: {
      leader: "Receives the request",
      "spec-author": "Receives the Work Item",
      implementer: "Receives the approved plan",
      reviewer: "Receives the implementation",
      initializer: "Side branch after rei init",
    },
    roles: {
      leader: {
        responsibility:
          "Understands the request, chooses the workflow and coordinates the other roles.",
        limit: "Does not implement, except in the authorized direct mode.",
      },
      "spec-author": {
        responsibility:
          "Turns a pending Work Item into a reviewable technical plan.",
        limit: "Never implements.",
      },
      implementer: {
        responsibility:
          "Implements only the approved plan and leaves verification evidence.",
        limit: "Does not change the scope or the plan.",
      },
      reviewer: {
        responsibility:
          "Validates the work against the plan and the project's checkpoints.",
        limit: "Does not implement: approves or requests changes.",
      },
      initializer: {
        responsibility:
          "Guides the customization of the project documentation after rei init.",
        limit:
          "Does not implement code nor write outside the customization documents.",
      },
    },
    summaryLabel: (role, handoff) =>
      `${role}. ${handoff}. See responsibility and limit.`,
  },
  terminal: {
    eyebrow: "CLI and artifacts",
    title: "The terminal leaves what the chat does not",
    intro:
      "A real snapshot of `rei items status` next to the Work Item's planning tree. There is no video or simulated playback: the text is what the CLI produced.",
    note: (date) =>
      `The capture is dated (${date}); the states change over time.`,
    caption:
      "Real snapshot of `rei items status` in this repository. The state of the Work Items changes over time.",
    snapshotMeta: (date) => `snapshot · ${date}`,
    scrollHint: "Swipe or use the arrow keys to see the full line.",
    outputLabel: (command) => `Output of ${command}`,
    treeLabel: (root) => `tree · ${root}`,
    treeMeta: (count) => `${count} files`,
    snapshotNote: "Only one Work Item can be in in_progress at a time.",
    artifacts: {
      root: "One directory per Work Item; the id is date and slug.",
      requirements: "What must be met and how it is verified.",
      design: "How it is solved; discarded alternatives.",
      tasks: "Execution order with checkable tasks.",
      meta: "id, type, state, base commit and review.",
    },
  },
  viewer: {
    eyebrow: "Viewer",
    title: "rei view shows the Work Item, it does not approve it",
    intro:
      "A real capture of the local viewer: rendered documents, table of contents, validation and FICHA. It is read-only and has no buttons that pretend to approve.",
    note: (day) =>
      `Capture taken with \`pnpm capture:evidence\` on ${day}; the viewer is served locally and is not part of this website.`,
    linkLabel: "See the viewer page",
    frameMeta: "read-only",
    caption: (day) => `Real capture of the viewer · ${day}`,
    annotations: [
      {
        id: "toc",
        title: "Work Item table of contents",
        text: "The index lists the Work Item's documents; those that do not exist are marked «no existe».",
      },
      {
        id: "validacion",
        title: "Validation",
        text: "The viewer shows the checkpoint results next to the FICHA, with the real state of the work.",
      },
      {
        id: "ficha",
        title: "FICHA",
        text: "The Work Item's type, state, date and links. There is no approval button or route.",
      },
    ],
    diff: {
      title: "Diff",
      text: "If there are changes against the review base, the viewer publishes them; here they appear as added lines.",
      crop: "The crop shows the start of the diff; the full capture stays in the Work Item's evidence.",
    },
    missingPre: "There is no viewer capture in the manifest. Run",
    missingPost: "to generate it.",
  },
  github: {
    eyebrow: "GitHub Issues",
    title: "GitHub Issues is a projection, not the source of truth",
    intro:
      "The integration is optional and does not change where the state lives. These are real captures of the public issues in the REI Harness repository: they are closed and shown with their published state.",
    note: "The CLI never calls GitHub: `gh` and `git` do, under the Leader's explicit order.",
    linkLabel: "Read the GitHub Issues guide",
    openIssue: (issue) => `Open issue #${issue} ↗`,
    targets: [
      {
        id: "issue",
        title: "Issue",
        text: "It exists, is assigned and is closed as a reflection of the Work Item.",
      },
      {
        id: "rama",
        title: "Branch",
        text: "It holds the work the Reviewer verifies.",
      },
      {
        id: "pr",
        title: "PR",
        text: "It proposes the change; `.rei` still rules over the state.",
      },
    ],
    projection: {
      label: "Projection, not source",
      truth: "source of truth",
      body: "Planning, progress and history live in the repository, not in the issue.",
      optionalPre: "Optional integration: enable it with",
      optionalPost: "and the flow works without it.",
    },
    bodyFrame: "issue · body",
    bodyCaption:
      "Published body of the epic: the real task list, with its child issues closed. The crop shows the start of the capture.",
  },
  captures: {
    "gh-2-head": {
      alt: "Header of GitHub Issue #2 «GitHub Issues v2: épicas, backlog y asignación» (the title is in Spanish) with state Closed and labels rei, rei:feature.",
      description: "GitHub Issues v2: epics, backlog and assignment (issue title in Spanish)",
    },
    "gh-2-body": {
      alt: "Body of GitHub Issue #2 «GitHub Issues v2: épicas, backlog y asignación» (content in Spanish).",
      description:
        "Published body of GitHub Issue #2 «GitHub Issues v2: épicas, backlog y asignación».",
    },
    "gh-3-head": {
      alt: "Header of GitHub Issue #3 «[prueba v2] Épica: módulo de prueba» (the title is in Spanish) with state Closed and labels rei, rei:epic.",
      description: "[prueba v2] Épica: módulo de prueba (issue title in Spanish)",
    },
    "gh-3-body": {
      alt: "Body of GitHub Issue #3 «[prueba v2] Épica: módulo de prueba» (content in Spanish) with its published task list.",
      description:
        "Published body of GitHub Issue #3 «[prueba v2] Épica: módulo de prueba» with its task list.",
    },
    "gh-5-head": {
      alt: "Header of GitHub Issue #5 «[prueba v2] Hija B: asignación y lote» (the title is in Spanish) with state Closed and labels rei, rei:backlog.",
      description: "[prueba v2] Hija B: asignación y lote (issue title in Spanish)",
    },
    "gh-5-body": {
      alt: "Body of GitHub Issue #5 «[prueba v2] Hija B: asignación y lote» (content in Spanish) with its published task list.",
      description:
        "Published body of GitHub Issue #5 «[prueba v2] Hija B: asignación y lote» with its task list.",
    },
    "view-2026-10-27_12-08__referencia-operacion-docs-desktop": {
      alt: "Local rei view viewer with the Work Item «Referencia y operación de documentación» on desktop (interface in Spanish): document index, active document and validation FICHA.",
      description:
        "rei view viewer for Work Item 2026-10-27_12-08__referencia-operacion-docs: index, active document and FICHA.",
    },
    "view-2026-10-27_12-08__referencia-operacion-docs-ficha": {
      alt: "Viewer FICHA for the Work Item «Referencia y operación de documentación» (interface in Spanish) with state, checkpoints, session and validation.",
      description:
        "Viewer FICHA for Work Item 2026-10-27_12-08__referencia-operacion-docs.",
    },
    "view-2026-10-27_12-08__referencia-operacion-docs-diff": {
      alt: "Diff shown by the viewer for requirements.md of the Work Item «Referencia y operación de documentación» (interface in Spanish): Cambios +48 / −0, that is, 48 lines added and none removed.",
      description:
        "Viewer diff for requirements.md: Cambios +48 / −0 (48 lines added, none removed).",
    },
    "view-2026-10-27_12-08__referencia-operacion-docs-mobile": {
      alt: "Local rei view viewer with the Work Item «Referencia y operación de documentación» on mobile (interface in Spanish): document index and document in a single column.",
      description:
        "rei view viewer on mobile (390×844) for Work Item 2026-10-27_12-08__referencia-operacion-docs.",
    },
  },
  cta: {
    eyebrow: "Next step",
    title: "Install REI and open your first Work Item",
    intro:
      "Your agent writes; you decide. One binary, one command and a plan approved before implementation. The evidence stays in your repository.",
    primary: "Install REI",
    secondary: "Explore the product",
  },
};
