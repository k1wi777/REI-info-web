import { AGENTES_EN } from "@/features/product/copy/pages/agentes.en";
import { COMO_FUNCIONA_EN } from "@/features/product/copy/pages/como-funciona.en";
import { GITHUB_ISSUES_EN } from "@/features/product/copy/pages/github-issues.en";
import { PRODUCTO_EN } from "@/features/product/copy/pages/producto.en";
import { VISOR_EN } from "@/features/product/copy/pages/visor.en";
import { WORK_ITEMS_EN } from "@/features/product/copy/pages/work-items.en";
import type { ProductCopy } from "@/features/product/copy/types";

/**
 * Product text in English. Commands, states, role names, file paths and the
 * simulated terminal output are not translated: they are the real thing.
 */
export const en: ProductCopy = {
  pages: {
    producto: {
      label: "Product",
      title: "What REI is",
      description:
        "What REI Harness is, what problem it solves and why the process matters before the commands.",
    },
    "como-funciona": {
      label: "How it works",
      title: "How it works",
      description:
        "The full flow of a Work Item, the human approval gate, the states and direct mode.",
    },
    agentes: {
      label: "Agents",
      title: "Agents",
      description:
        "The five REI Harness roles, their responsibility, their limit and when they step in.",
    },
    "work-items": {
      label: "Work Items",
      title: "Work Items",
      description:
        "Feature vs Task, lifecycle, prior approval and versioned evidence with review by diff.",
    },
    visor: {
      label: "Viewer",
      title: "Viewer",
      description:
        "rei view: a local read-only viewer with live reload, FICHA and its limits.",
    },
    "github-issues": {
      label: "GitHub Issues",
      title: "GitHub Issues",
      description:
        "Optional GitHub Issues integration: issue and branch for Features, PR and merge on order, GitHub as a projection.",
    },
  },
  documents: {
    producto: PRODUCTO_EN,
    "como-funciona": COMO_FUNCIONA_EN,
    agentes: AGENTES_EN,
    "work-items": WORK_ITEMS_EN,
    visor: VISOR_EN,
    "github-issues": GITHUB_ISSUES_EN,
  },
  chrome: {
    bar: "REI HARNESS / PRODUCT DOSSIER",
    sheetOf: "SHEET {folio} / {total}",
    langTag: "EN",
    factsTitle: "Fact sheet",
    factsNote: "Harness data · not adoption metrics",
    subnavLabel: "Product sections",
    subnavTitle: "Dossier",
    pagerLabel: "Product dossier sheets",
    pagerPrevious: "Previous sheet · {folio}",
    pagerNext: "Next sheet · {folio}",
    featuredSheet: "Featured sheet",
  },
  gate: {
    label: "Planning approval",
    status: "Pending",
    detail: "A human sign-off releases the sheet. Silence is not approval.",
  },
  roles: {
    leader: {
      responsibility:
        "Understands the request, picks the workflow and coordinates the other roles.",
      when: "On every request and while coordinating the workflow.",
      limit: "Does not implement, except in the authorized direct mode.",
    },
    "spec-author": {
      responsibility:
        "Turns a pending Work Item into a technical plan that can be reviewed.",
      when: "When the Work Item is in pending and it is time to plan it.",
      limit: "Never implements.",
    },
    implementer: {
      responsibility:
        "Implements only the approved plan and leaves verification evidence.",
      when: "When the Work Item is in in_progress with an approved plan.",
      limit: "Does not change the scope or the plan.",
    },
    reviewer: {
      responsibility:
        "Validates the work against the plan and the project checkpoints.",
      when: "When the Work Item is in review.",
      limit: "Does not implement: approves or requests changes.",
    },
    initializer: {
      responsibility:
        "Guides the customization of the project documentation after rei init.",
      when: "After rei init, while customization placeholders remain.",
      limit:
        "Does not implement code or write outside the customization documents.",
    },
  },
  roleList: {
    limit: "Limit",
    outsideCycle: "Outside the cycle",
    initializerNote:
      "Prepares the repository; does not approve or implement Work Items.",
  },
  states: {
    pending: "Work Item created, waiting to be planned.",
    ready: "Planning finished, waiting for human approval.",
    in_progress: "Implementation under way. Only one can exist at a time.",
    review: "Implementation finished, waiting for review.",
    done: "Completed and approved; terminal state.",
    blocked: "The work cannot continue.",
    changes_requested: "The review rejected the implementation and asks for changes.",
  },
  stateTable: {
    mapTitle: "Cycle · path",
    mapGate: "Gate between ready and in_progress",
    approval: "Approval",
    terminal: "terminal",
    humanSignature: "human sign-off",
    branchesTitle: "Branches · outside the cycle",
    branchesNote:
      "Branches, not shortcuts: they describe stopped work or a review that demands corrections.",
  },
  commands: {
    view: "Opens the local read-only viewer: documents, validation, session, TOC, diff and FICHA.",
    "item-show":
      "Shows a Work Item's record: metadata, links, documents, session and validation.",
    validate:
      "Checks the internal consistency of a Work Item. An invalid links.json is a recoverable warning.",
    github:
      "Enables, disables or checks the optional GitHub Issues integration. The CLI never calls GitHub.",
  },
  cycle: {
    groupLabel: "Simulation of a Work Item's cycle",
    windowLabel: "cycle · work item",
    windowMeta: "{total} stops · 1 gate",
    footer: "Simulation: it does not run commands or approve Work Items.",
    badge: "SIMULATION",
    progressShort: "Progress",
    progressLabel: "Cycle progress",
    progressValue: "Step {n} of {total}: {label}",
    stopsLabel: "Cycle stops",
    stopButton: "Step {n}: {label}",
    stepCounter: "Step {n} / {total}",
    roleGate: "Human sign-off",
    roleMissing: "Unnamed role",
    roleTerminal: "Terminal state",
    terminalTag: "terminal",
    gateNote:
      "The sign-off is human and is recorded from the CLI; this page does not approve.",
    gateSimulated: "Simulated human sign-off.",
    approveButton: "Approve",
    outputs: "Exits",
    transitionKinds: {
      cycle: "Cycle",
      branch: "Branch",
      force: "Forced (--force)",
    },
    transitionNotes: {
      "pending>ready": "The Spec Author finishes the plan.",
      "ready>in_progress": "Requires explicit human approval.",
      "in_progress>review": "The Implementer closes with their report.",
      "review>done": "Favorable verdict from the Reviewer.",
      "review>changes_requested": "The Reviewer rejects the implementation.",
      "changes_requested>in_progress": "The Implementer applies the corrections.",
      "pending>blocked": "The work cannot continue.",
      "ready>blocked": "The work cannot continue.",
      "in_progress>blocked": "The work cannot continue.",
      "review>blocked": "The work cannot continue.",
      "changes_requested>blocked": "The work cannot continue.",
      "done>blocked":
        "Non-standard transition: requires --force and an explicit order.",
    },
    controls: {
      previous: "Previous",
      next: "Next",
      pause: "Pause",
      resume: "Resume",
      play: "Play",
      restart: "Restart",
      pauseLabel: "Pause the cycle simulation",
      resumeLabel: "Resume the cycle simulation",
      reducedLabel:
        "Automatic simulation is turned off because of reduced motion",
    },
    reducedNote: "Reduced motion: manual walkthrough.",
    noscript:
      "The simulation needs JavaScript: without it, only the first stop is shown. The state table below keeps the full record.",
    announce: {
      manualEnd: "End of the manual walkthrough. Step {n} of {total}: {label}.",
      step: "Step {n} of {total}: {label}. {detail}",
      paused: "Simulation paused at {label}.",
      resumed: "Simulation resumed at {label}.",
    },
  },
  cli: {
    windowMeta: "snapshot · {date} · {count} commands",
    snapshotFooter:
      "Snapshot from {date}: the state of Work Items changes over time.",
    openHint:
      "The first output is open; the rest expand with Enter or a tap.",
    outputLanguageNote:
      "Outputs are transcribed from the CLI as captured, so some words are in Spanish.",
    lines: "{count} lines",
    outputLabel: "Output of {command}",
    scrollNote:
      "The output scrolls vertically and horizontally inside the window; the text is complete.",
    completeNote: "Complete output.",
    notes: {
      "item-show":
        "The record lists as \"sí\" (yes) the same evidence the tree draws.",
      validate: "A closed Work Item validates OK with no findings.",
      doctor: "The whole harness: documents, Work Items, git and HEAD detected.",
    },
  },
  artifacts: {
    windowLabel: "tree · .rei/",
    treeLabel: "Tree of .rei artifacts",
    footer:
      "{count} documents. Each document appears once and keeps its real path. The right column says who writes it.",
    applies: {
      feature: "Feature",
      task: "Task",
      ambos: "Feature and Task",
      sesion: "session",
      opcional: "optional",
      bloqueo: "block only",
      estado: "state",
    },
    groups: {
      specs: "Planning",
      progress: "Session",
      "work-items": "Work Item record",
    },
    entries: {
      meta: {
        note: "Type, status, base_commit and last_review_commit.",
        owner: "Leader on create and approve; Reviewer on reject",
      },
      requirements: {
        note: "What the Feature must do and how it is verified.",
        owner: "Spec Author",
      },
      design: {
        note: "How it is implemented: decisions, files and verification.",
        owner: "Spec Author",
      },
      tasks: {
        note: "Ordered tasks with their R-id.",
        owner: "Spec Author",
      },
      plan: {
        note: "Short step-by-step plan for a Task.",
        owner: "Spec Author",
      },
      links: {
        note: "Issue, branch and base when the GitHub integration is active.",
        owner: "Leader · GitHub integration",
      },
      current: {
        note: "Live session: state, log and next step.",
        owner: "Spec Author starts it; Implementer maintains it",
      },
      history: {
        note: "Append-only summary of each closed Work Item.",
        owner: "Reviewer when archiving the session",
      },
      impl: {
        note: "Summary, files, changes and verification of the implementation.",
        owner: "Implementer",
      },
      review: {
        note: "Verdict, verifications, observations and required actions.",
        owner: "Reviewer",
      },
      spec: {
        note: "Reason for the block, missing information and decisions that need human intervention.",
        owner: "Spec Author",
      },
    },
  },
  evidence: {
    intro: "Cited external evidence · each case links to its source",
    implication: "Implication",
    sources: {
      replit: {
        title: "Replit incident",
        date: "July 2025",
        finding:
          "An agent deleted a production database during a code freeze, ran destructive commands without authorization and generated fake data.",
        implication:
          "The clearest case of why human approval, separate environments and limits on actions are needed.",
      },
      metr: {
        title: "METR",
        date: "2025",
        finding:
          "Randomized study with experienced open source developers: with AI they took 19% longer, although they believed they had been 20% faster.",
        implication:
          "Perceived productivity is not evidence. You have to measure and verify.",
      },
      gitclear: {
        title: "GitClear",
        date: "2025–2026",
        finding:
          "More duplication, more copy/paste, more churn and less refactoring as AI authorship grows.",
        implication: "Speed without design degrades maintainability.",
      },
      veracode: {
        title: "Veracode",
        date: "2025–2026",
        finding:
          "About 45% of code generation tasks introduced a known vulnerability; security does not necessarily improve with larger models.",
        implication: "Review and guardrails are not optional.",
      },
      "dora-2025": {
        title: "DORA 2025",
        date: "2025",
        finding:
          "AI adoption is associated with higher throughput and lower delivery stability: AI amplifies a system's strengths and weaknesses.",
        implication: "The existing process decides the outcome, not the tool.",
      },
      "stack-overflow-2025": {
        title: "Stack Overflow 2025",
        date: "2025",
        finding:
          "84% use or plan to use AI; 46% distrust the accuracy of its results and only 3% highly trust them.",
        implication:
          "There is demand for verifiable trust, not just for speed.",
      },
      "github-copilot-2023": {
        title: "GitHub Copilot",
        date: "2023",
        finding:
          "On a bounded task, the group with Copilot finished 55.8% faster.",
        implication:
          "AI does speed up specific tasks; the problem is the lack of process.",
      },
    },
  },
  choices: {
    type: "Type",
    planning: "Planning",
    criterion: "Criterion",
    documentOne: "document",
    documentOther: "documents",
  },
  viewer: {
    missingBefore: "There is no viewer capture in the manifest. Run",
    missingAfter: "to generate it.",
    windowMeta: "read-only",
    fichaCaption:
      "Type, state and links of the Work Item. No approval button or route.",
    footnote:
      "Real capture of the viewer served locally, captured in Spanish. Approval is recorded from the CLI.",
    caption: "{caption} · {date}",
  },
  issue: {
    open: "Open issue #{number} ↗",
    caption: "{caption} · captured {date}",
  },
  initializer: {
    title: "Initializer · /personalize",
    footer:
      "Capture from a sample project · the command does not run on this site",
    caption: "{caption} · captured {date}",
    alt: "Claude Code v2.1.312 terminal with the project command list open: `/init` and `/personalize`, the latter described as the project customization interview (initializer role).",
  },
  projection: {
    title: "Projection, not source",
    source: "source of truth",
    sourceNote:
      "Planning, progress and history live in the repository, not in the issue.",
    targets: {
      issue: {
        title: "Issue",
        text: "It exists, is assigned and is closed as a reflection of the Work Item.",
      },
      branch: {
        title: "Branch",
        text: "It holds the work the Reviewer verifies.",
      },
      pr: {
        title: "PR",
        text: "It proposes the change; `.rei` still rules the state.",
      },
    },
    optionalBefore: "Optional integration: enabled with",
    optionalAfter: "and the flow works without it.",
  },
  captureLink: "View full capture",
  captures: {
    "gh-2-head":
      "Header of GitHub Issue #2 \"GitHub Issues v2: épicas, backlog y asignación\" with state Closed and labels rei, rei:feature. The capture is in Spanish.",
    "gh-2-body":
      "Body of GitHub Issue #2 \"GitHub Issues v2: épicas, backlog y asignación\". The capture is in Spanish.",
    "gh-3-head":
      "Header of GitHub Issue #3 \"[prueba v2] Épica: módulo de prueba\" with state Closed and labels rei, rei:epic. The capture is in Spanish.",
    "gh-3-body":
      "Body of GitHub Issue #3 \"[prueba v2] Épica: módulo de prueba\" with its published task list. The capture is in Spanish.",
    "gh-5-head":
      "Header of GitHub Issue #5 \"[prueba v2] Hija B: asignación y lote\" with state Closed and labels rei, rei:backlog. The capture is in Spanish.",
    "gh-5-body":
      "Body of GitHub Issue #5 \"[prueba v2] Hija B: asignación y lote\" with its published task list. The capture is in Spanish.",
    "view-2026-10-27_12-08__referencia-operacion-docs-desktop":
      "The local rei view viewer on desktop, showing the Work Item \"Referencia y operación de documentación\": document index, active document and validation FICHA. The interface is in Spanish.",
    "view-2026-10-27_12-08__referencia-operacion-docs-ficha":
      "The viewer's FICHA for the Work Item \"Referencia y operación de documentación\", with state, checkpoints, session and validation. The interface is in Spanish.",
    "view-2026-10-27_12-08__referencia-operacion-docs-diff":
      "Diff shown by the viewer for requirements.md of the Work Item \"Referencia y operación de documentación\": Cambios +48 / −0. The interface is in Spanish.",
    "view-2026-10-27_12-08__referencia-operacion-docs-mobile":
      "The local rei view viewer on mobile, showing the Work Item \"Referencia y operación de documentación\": document index and document in a single column. The interface is in Spanish.",
  },
};
