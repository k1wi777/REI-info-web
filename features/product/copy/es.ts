import { AGENTES_ES } from "@/features/product/copy/pages/agentes.es";
import { COMO_FUNCIONA_ES } from "@/features/product/copy/pages/como-funciona.es";
import { GITHUB_ISSUES_ES } from "@/features/product/copy/pages/github-issues.es";
import { PRODUCTO_ES } from "@/features/product/copy/pages/producto.es";
import { VISOR_ES } from "@/features/product/copy/pages/visor.es";
import { WORK_ITEMS_ES } from "@/features/product/copy/pages/work-items.es";
import type { ProductCopy } from "@/features/product/copy/types";

/** Texto de `/producto` en español: el contenido original, sin cambios. */
export const es: ProductCopy = {
  pages: {
    producto: {
      label: "Producto",
      title: "Qué es REI",
      description:
        "Qué es REI Harness, qué problema resuelve y por qué el proceso importa antes que los comandos.",
    },
    "como-funciona": {
      label: "Cómo funciona",
      title: "Cómo funciona",
      description:
        "El flujo completo de un Work Item, la puerta de aprobación humana, los estados y el modo directo.",
    },
    agentes: {
      label: "Agentes",
      title: "Agentes",
      description:
        "Los cinco roles de REI Harness, su responsabilidad, su límite y el momento en que intervienen.",
    },
    "work-items": {
      label: "Work Items",
      title: "Work Items",
      description:
        "Feature frente a Task, ciclo de vida, aprobación previa y evidencia versionada con revisión por diff.",
    },
    visor: {
      label: "Visor",
      title: "Visor",
      description:
        "rei view: visor local de solo lectura, recarga en vivo, FICHA y límites.",
    },
    "github-issues": {
      label: "GitHub Issues",
      title: "GitHub Issues",
      description:
        "Integración opcional GitHub Issues: issue y rama para Features, PR y merge bajo orden, GitHub como proyección.",
    },
  },
  documents: {
    producto: PRODUCTO_ES,
    "como-funciona": COMO_FUNCIONA_ES,
    agentes: AGENTES_ES,
    "work-items": WORK_ITEMS_ES,
    visor: VISOR_ES,
    "github-issues": GITHUB_ISSUES_ES,
  },
  chrome: {
    bar: "REI HARNESS / DOSSIER DE PRODUCTO",
    sheetOf: "HOJA {folio} / {total}",
    langTag: "ES",
    factsTitle: "Ficha",
    factsNote: "Datos del arnés · no métricas de adopción",
    subnavLabel: "Secciones de producto",
    subnavTitle: "Dossier",
    pagerLabel: "Hojas del dossier de producto",
    pagerPrevious: "Hoja anterior · {folio}",
    pagerNext: "Hoja siguiente · {folio}",
    featuredSheet: "Hoja destacada",
  },
  gate: {
    label: "Aprobación de la planificación",
    status: "Pendiente",
    detail: "La firma humana libera la hoja. El silencio no aprueba.",
  },
  roles: {
    leader: {
      responsibility:
        "Comprende la solicitud, elige el workflow y coordina a los demás roles.",
      when: "Al recibir cada solicitud y durante la coordinación del workflow.",
      limit: "No implementa salvo en el modo directo autorizado.",
    },
    "spec-author": {
      responsibility:
        "Convierte un Work Item pendiente en una planificación técnica revisable.",
      when: "Cuando el Work Item está en pending y toca planificarlo.",
      limit: "Nunca implementa.",
    },
    implementer: {
      responsibility:
        "Implementa únicamente la planificación aprobada y deja evidencia de verificación.",
      when: "Cuando el Work Item está en in_progress con una planificación aprobada.",
      limit: "No cambia el alcance ni la planificación.",
    },
    reviewer: {
      responsibility:
        "Valida el trabajo contra la planificación y los checkpoints del proyecto.",
      when: "Cuando el Work Item está en review.",
      limit: "No implementa: aprueba o solicita cambios.",
    },
    initializer: {
      responsibility:
        "Conduce la personalización guiada de la documentación del proyecto tras rei init.",
      when: "Tras rei init, cuando quedan marcadores pendientes de personalización.",
      limit:
        "No implementa código ni escribe fuera de los documentos de personalización.",
    },
  },
  roleList: {
    limit: "Límite",
    outsideCycle: "Fuera del ciclo",
    initializerNote:
      "Prepara el repositorio; no aprueba ni implementa Work Items.",
  },
  states: {
    pending: "Work Item creado, pendiente de planificación.",
    ready: "Planificación terminada, esperando aprobación humana.",
    in_progress: "Implementación en curso. Solo puede haber uno a la vez.",
    review: "Implementación finalizada, pendiente de revisión.",
    done: "Completado y aprobado; estado terminal.",
    blocked: "El trabajo no puede continuar.",
    changes_requested: "La revisión rechazó la implementación y pide cambios.",
  },
  stateTable: {
    mapTitle: "Ciclo · recorrido",
    mapGate: "Puerta entre ready e in_progress",
    approval: "Aprobación",
    terminal: "terminal",
    humanSignature: "firma humana",
    branchesTitle: "Ramas · fuera del ciclo",
    branchesNote:
      "Ramas, no atajos: describen trabajo detenido o una revisión que exige correcciones.",
  },
  commands: {
    view: "Abre el visor local de solo lectura: documentos, validación, sesión, TOC, diff y FICHA.",
    "item-show":
      "Muestra la ficha de un Work Item: metadatos, enlaces, documentos, sesión y validación.",
    validate:
      "Comprueba la consistencia interna de un Work Item. Un links.json inválido es un aviso recuperable.",
    github:
      "Activa, desactiva o consulta la integración opcional GitHub Issues. El CLI nunca llama a GitHub.",
  },
  cycle: {
    groupLabel: "Simulación del ciclo de un Work Item",
    windowLabel: "ciclo · work item",
    windowMeta: "{total} paradas · 1 puerta",
    footer: "Simulación: no ejecuta comandos ni aprueba Work Items.",
    badge: "SIMULACIÓN",
    progressShort: "Progreso",
    progressLabel: "Progreso del ciclo",
    progressValue: "Paso {n} de {total}: {label}",
    stopsLabel: "Paradas del ciclo",
    stopButton: "Paso {n}: {label}",
    stepCounter: "Paso {n} / {total}",
    roleGate: "Firma humana",
    roleMissing: "Rol sin nombre",
    roleTerminal: "Estado terminal",
    terminalTag: "terminal",
    gateNote:
      "La firma es humana y se registra desde el CLI; esta página no aprueba.",
    gateSimulated: "Firma humana simulada.",
    approveButton: "Aprobar",
    outputs: "Salidas",
    transitionKinds: {
      cycle: "Ciclo",
      branch: "Rama",
      force: "Forzada (--force)",
    },
    transitionNotes: {
      "pending>ready": "El Spec Author termina la planificación.",
      "ready>in_progress": "Exige aprobación humana explícita.",
      "in_progress>review": "El Implementer cierra con su reporte.",
      "review>done": "Veredicto favorable del Reviewer.",
      "review>changes_requested": "El Reviewer rechaza la implementación.",
      "changes_requested>in_progress": "El Implementer aplica las correcciones.",
      "pending>blocked": "El trabajo no puede continuar.",
      "ready>blocked": "El trabajo no puede continuar.",
      "in_progress>blocked": "El trabajo no puede continuar.",
      "review>blocked": "El trabajo no puede continuar.",
      "changes_requested>blocked": "El trabajo no puede continuar.",
      "done>blocked":
        "Transición no estándar: exige --force y una orden explícita.",
    },
    controls: {
      previous: "Anterior",
      next: "Siguiente",
      pause: "Pausar",
      resume: "Reanudar",
      play: "Reproducir",
      restart: "Reiniciar",
      pauseLabel: "Pausar la simulación del ciclo",
      resumeLabel: "Reanudar la simulación del ciclo",
      reducedLabel:
        "La simulación automática está desactivada por movimiento reducido",
    },
    reducedNote: "Movimiento reducido: recorrido manual.",
    noscript:
      "La simulación necesita JavaScript: sin él queda la primera parada. La tabla de estados de más abajo mantiene el registro completo.",
    announce: {
      manualEnd:
        "Fin del recorrido manual. Paso {n} de {total}: {label}.",
      step: "Paso {n} de {total}: {label}. {detail}",
      paused: "Simulación en pausa en {label}.",
      resumed: "Simulación reanudada en {label}.",
    },
  },
  cli: {
    windowMeta: "instantánea · {date} · {count} comandos",
    snapshotFooter:
      "Instantánea del {date}: el estado de los Work Items cambia con el tiempo.",
    openHint:
      "La primera salida está abierta; el resto se despliega con Enter o un toque.",
    outputLanguageNote: null,
    lines: "{count} líneas",
    outputLabel: "Salida de {command}",
    scrollNote:
      "La salida se desplaza en vertical y en horizontal dentro de la ventana; el texto está completo.",
    completeNote: "Salida completa.",
    notes: {
      "item-show":
        "La ficha lista como «sí» la misma evidencia que dibuja el árbol.",
      validate: "Un Work Item cerrado valida OK sin hallazgos.",
      doctor: "El arnés completo: documentos, Work Items, git y HEAD detectados.",
    },
  },
  artifacts: {
    windowLabel: "árbol · .rei/",
    treeLabel: "Árbol de artefactos de .rei",
    footer:
      "{count} documentos. Cada documento aparece una vez y conserva su ruta real. La derecha dice quién lo escribe.",
    applies: {
      feature: "Feature",
      task: "Task",
      ambos: "Feature y Task",
      sesion: "sesión",
      opcional: "opcional",
      bloqueo: "solo bloqueo",
      estado: "estado",
    },
    groups: {
      specs: "Planificación",
      progress: "Sesión",
      "work-items": "Registro del Work Item",
    },
    entries: {
      meta: {
        note: "Tipo, estado, base_commit y last_review_commit.",
        owner: "Leader al crear y aprobar; Reviewer al rechazar",
      },
      requirements: {
        note: "Qué debe hacer la Feature y cómo se verifica.",
        owner: "Spec Author",
      },
      design: {
        note: "Cómo se implementa: decisiones, archivos y verificación.",
        owner: "Spec Author",
      },
      tasks: {
        note: "Tareas ordenadas con su R-id.",
        owner: "Spec Author",
      },
      plan: {
        note: "Plan breve de una Task, paso a paso.",
        owner: "Spec Author",
      },
      links: {
        note: "Issue, rama y base cuando la integración GitHub está activa.",
        owner: "Leader · integración GitHub",
      },
      current: {
        note: "Sesión viva: estado, bitácora y próximo paso.",
        owner: "Spec Author lo inicia; Implementer lo mantiene",
      },
      history: {
        note: "Resumen append-only de cada Work Item cerrado.",
        owner: "Reviewer al archivar la sesión",
      },
      impl: {
        note: "Resumen, archivos, cambios y verificación de la implementación.",
        owner: "Implementer",
      },
      review: {
        note: "Veredicto, verificaciones, observaciones y acciones requeridas.",
        owner: "Reviewer",
      },
      spec: {
        note: "Motivo del bloqueo, información faltante y decisiones que requieren intervención humana.",
        owner: "Spec Author",
      },
    },
  },
  evidence: {
    intro: "Evidencia externa citada · cada caso enlaza a su fuente",
    implication: "Implicación",
    sources: {
      replit: {
        title: "Incidente de Replit",
        date: "Julio de 2025",
        finding:
          "Un agente eliminó una base de datos de producción durante un code freeze, ejecutó comandos destructivos sin autorización y generó datos falsos.",
        implication:
          "Es el caso más claro de por qué hacen falta aprobación humana, entornos separados y límites de acción.",
      },
      metr: {
        title: "METR",
        date: "2025",
        finding:
          "Estudio aleatorizado con desarrolladores open source experimentados: con IA tardaron un 19 % más, aunque creían haber sido un 20 % más rápidos.",
        implication:
          "La percepción de productividad no es evidencia. Hay que medir y verificar.",
      },
      gitclear: {
        title: "GitClear",
        date: "2025–2026",
        finding:
          "Más duplicación, más copy/paste, más churn y menos refactorización a medida que crece la autoría de IA.",
        implication: "La velocidad sin diseño degrada el mantenimiento.",
      },
      veracode: {
        title: "Veracode",
        date: "2025–2026",
        finding:
          "Alrededor del 45 % de las tareas de generación de código introdujeron una vulnerabilidad conocida; la seguridad no mejora necesariamente con modelos más grandes.",
        implication: "La revisión y los guardarraíles no son opcionales.",
      },
      "dora-2025": {
        title: "DORA 2025",
        date: "2025",
        finding:
          "La adopción de IA se asocia a más throughput y a menor estabilidad de entrega: la IA amplifica las fortalezas y debilidades del sistema.",
        implication: "El proceso existente decide el resultado, no la herramienta.",
      },
      "stack-overflow-2025": {
        title: "Stack Overflow 2025",
        date: "2025",
        finding:
          "84 % usa o planea usar IA; 46 % desconfía de la exactitud de sus resultados y solo 3 % confía mucho.",
        implication:
          "Existe demanda de confianza verificable, no solo de velocidad.",
      },
      "github-copilot-2023": {
        title: "GitHub Copilot",
        date: "2023",
        finding:
          "En una tarea acotada, el grupo con Copilot terminó un 55,8 % más rápido.",
        implication:
          "La IA sí acelera tareas concretas; el problema es la falta de proceso.",
      },
    },
  },
  choices: {
    type: "Tipo",
    planning: "Planificación",
    criterion: "Criterio",
    documentOne: "documento",
    documentOther: "documentos",
  },
  viewer: {
    missingBefore: "No hay captura del visor en el manifiesto. Ejecuta",
    missingAfter: "para generarla.",
    windowMeta: "solo lectura",
    fichaCaption:
      "Tipo, estado y enlaces del Work Item. Sin botón ni ruta de aprobación.",
    footnote:
      "Captura real del visor servido en local. La aprobación se registra desde el CLI.",
    caption: "{caption} · {date}",
  },
  issue: {
    open: "Abrir la issue #{number} ↗",
    caption: "{caption} · captura del {date}",
  },
  initializer: {
    title: "Initializer · /personalize",
    footer:
      "Captura de un proyecto de ejemplo · el comando no se ejecuta en esta web",
    caption: "{caption} · captura del {date}",
    alt: "Terminal de Claude Code v2.1.312 con la lista de comandos de proyecto abierta: `/init` y `/personalize`, este descrito como la entrevista de personalización del proyecto (rol initializer).",
  },
  projection: {
    title: "Proyección, no fuente",
    source: "fuente de verdad",
    sourceNote:
      "Planificación, progreso e historial viven en el repositorio, no en la issue.",
    targets: {
      issue: {
        title: "Issue",
        text: "Existe, se asigna y se cierra como reflejo del Work Item.",
      },
      branch: {
        title: "Rama",
        text: "Contiene el trabajo que el Reviewer verifica.",
      },
      pr: {
        title: "PR",
        text: "Propone el cambio; `.rei` sigue mandando sobre el estado.",
      },
    },
    optionalBefore: "Integración opcional: se activa con",
    optionalAfter: "y el flujo funciona sin ella.",
  },
  captureLink: "Ver captura completa",
  captures: {
    "gh-2-head":
      "Cabecera de la GitHub Issue #2 «GitHub Issues v2: épicas, backlog y asignación» con estado Closed y etiquetas rei, rei:feature.",
    "gh-2-body":
      "Cuerpo de la GitHub Issue #2 «GitHub Issues v2: épicas, backlog y asignación».",
    "gh-3-head":
      "Cabecera de la GitHub Issue #3 «[prueba v2] Épica: módulo de prueba» con estado Closed y etiquetas rei, rei:epic.",
    "gh-3-body":
      "Cuerpo de la GitHub Issue #3 «[prueba v2] Épica: módulo de prueba» con su task list publicada.",
    "gh-5-head":
      "Cabecera de la GitHub Issue #5 «[prueba v2] Hija B: asignación y lote» con estado Closed y etiquetas rei, rei:backlog.",
    "gh-5-body":
      "Cuerpo de la GitHub Issue #5 «[prueba v2] Hija B: asignación y lote» con su task list publicada.",
    "view-2026-10-27_12-08__referencia-operacion-docs-desktop":
      "Visor local rei view con el Work Item «Referencia y operación de documentación» en escritorio: índice de documentos, documento activo y FICHA de validación.",
    "view-2026-10-27_12-08__referencia-operacion-docs-ficha":
      "FICHA del visor para el Work Item «Referencia y operación de documentación» con estado, checkpoints, sesión y validación.",
    "view-2026-10-27_12-08__referencia-operacion-docs-diff":
      "Diff mostrado por el visor para requirements.md del Work Item «Referencia y operación de documentación»: Cambios +48 / −0.",
    "view-2026-10-27_12-08__referencia-operacion-docs-mobile":
      "Visor local rei view con el Work Item «Referencia y operación de documentación» en móvil: índice de documentos y documento en una columna.",
  },
};
