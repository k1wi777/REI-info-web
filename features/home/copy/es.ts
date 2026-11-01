import { EVIDENCE_MANIFEST } from "@/features/home/data/evidence";
import type { HomeCopy } from "@/features/home/copy/types";

/**
 * Textos de la home en español: el texto original, movido sin cambios. El
 * texto alternativo de las capturas sale del manifiesto generado por
 * `pnpm capture:evidence`, que es su única fuente en español.
 */
export const es: HomeCopy = {
  ui: {
    exampleTag: "Ejemplo de mecanismo",
    captureLink: "Ver captura completa",
  },
  acts: {
    problema: {
      label: "Problema",
      thesis: "La IA escribe rápido; sin proceso, el retrabajo también.",
    },
    proceso: {
      label: "Proceso",
      thesis:
        "Una hoja, una firma, evidencia: la persona decide antes de que se escriba código.",
    },
    evidencia: {
      label: "Evidencia",
      thesis:
        "El producto real: el visor, las GitHub Issues y los límites del arnés.",
    },
    cierre: {
      label: "Cierre",
      thesis:
        "La evidencia queda en tu repositorio; el siguiente Work Item lo abres tú.",
    },
  },
  hero: {
    brand: "REI HARNESS / ARNÉS SDD",
    kicker: "Spec Driven Development · Arnés de agentes de IA",
    titleLine: "Tu agente escribe.",
    titleEmphasis: "Tú decides",
    lede: "REI Harness convierte el trabajo con agentes de IA en un proceso con especificación, aprobación humana y evidencia, dentro de tu propio repositorio.",
    install: "Instalar REI",
    flow: "Ver el flujo",
    approvalNote: "La aprobación se registra desde el CLI. El silencio no aprueba.",
  },
  sheet: {
    title: "Matriz de responsabilidades",
    summary: "4 roles · 1 firma",
    exampleTag: "Hoja de ejemplo",
    matrixLabel: (title) => `${title}: matriz de roles y fases`,
    caption: "Matriz de responsabilidades por rol y fase",
    phaseColumn: "Fase",
    responsible: "Responsable",
    notInvolved: "No interviene",
    phases: {
      "01": "Solicitud",
      "02": "Planificación",
      "04": "Implementación",
      "05": "Revisión",
    },
    meta: {
      state: "Estado",
      checkpoints: "Checkpoints",
      approval: "Aprobación",
      type: "Tipo",
    },
    gate: {
      label: "Aprobación de la planificación",
      status: "Pendiente",
      detail: "La firma humana libera la hoja. El silencio no aprueba.",
    },
  },
  states: {
    heading: "Estados del ciclo",
    current: (state) => `actual: ${state}`,
    currentSr: " (estado actual)",
    oneAtATime: "Solo un Work Item puede estar en in_progress a la vez.",
  },
  process: {
    eyebrow: "Proceso",
    title: "Una hoja, una firma, evidencia",
    intro:
      "REI no frena al agente: le da un proceso. Separa decidir, planificar y ejecutar; cada etapa deja un artefacto que se puede leer y revisar.",
    items: [
      {
        title: "Especificación primero",
        description:
          "La planificación existe antes de que el agente escriba la primera línea.",
      },
      {
        title: "Aprobación humana",
        description:
          "Ningún Work Item pasa a implementación sin una firma explícita.",
      },
      {
        title: "Roles separados",
        description:
          "Leader, Spec Author, Implementer y Reviewer no invaden su trabajo.",
      },
      {
        title: "Evidencia versionada",
        description:
          "Planificación, progreso e historial viven en `.rei/`, no en el chat.",
      },
    ],
    linkLabel: "Recorrer el primer Work Item",
  },
  limits: {
    eyebrow: "Límites",
    title: "Lo que la web no hace",
    intro:
      "Mostrar los límites forma parte de la propuesta: la web documenta el arnés, no lo sustituye.",
    items: [
      {
        title: "Sin búsqueda ni selector de versiones",
        description:
          "La navegación, el TOC y una estructura de URLs predecible cubren el volumen actual.",
      },
      {
        title: "El visor es de solo lectura",
        description:
          "La aprobación se registra desde el CLI, no desde el navegador.",
      },
      {
        title: "GitHub Issues es opcional",
        description:
          "No es la fuente de verdad del Work Item ni un requisito para trabajar.",
      },
      {
        title: "El modo directo está restringido",
        description:
          "Solo aplica a cambios triviales solicitados explícitamente.",
      },
      {
        title: "La web no ejecuta comandos",
        description: "No modifica Work Items ni sustituye al CLI o al visor.",
      },
    ],
    linkLabel: "Consultar los comandos",
  },
  problem: {
    eyebrow: "Sin REI / Con REI",
    title: "El mismo caso, dos resultados",
    intro:
      "Los agentes de IA y los LLM escriben código a partir de una conversación. Cuando decidir, planificar y ejecutar viven en la misma conversación, nada queda registrado y nadie puede revisar la decisión. El arnés separa esas tres cosas y deja la decisión por escrito.",
    cases: {
      "sin-rei": {
        label: "Sin REI",
        title: "La conversación decide por ti",
        intro:
          "Mismo caso: «añade un filtro por estado al listado». Sin alcance escrito, el agente empieza por el código.",
        note: "Ejemplo de mecanismo; no reproduce una conversación real.",
      },
      "con-rei": {
        label: "Con REI",
        title: "La hoja decide antes del código",
        intro:
          "El mismo caso entra en un Work Item: planificación revisable, firma humana y evidencia en el repositorio.",
        note: "Ejemplo de mecanismo construido con los estados y roles reales del arnés.",
      },
    },
    steps: {
      "sin-rei-1": {
        title: "Alcance tardío",
        detail:
          "El LLM escribe el filtro antes de que el alcance esté claro: nadie acordó dónde entra ni qué estados cubre.",
        alertLabel: "Riesgo",
      },
      "sin-rei-2": {
        title: "Alucinaciones",
        detail: "Inventa una API o un dato y lo presenta como cierto.",
        alertLabel: "Fallo",
      },
      "sin-rei-3": {
        title: "Decisiones no autorizadas",
        detail:
          "Cambia la arquitectura o el alcance sin una aprobación que lo respalde.",
        alertLabel: "Fallo",
      },
      "sin-rei-4": {
        title: "Acciones fuera de límite",
        detail:
          "Toca datos o entornos que no le corresponden para probar el cambio.",
        alertLabel: "Fallo",
      },
      "sin-rei-5": {
        title: "Retrabajo",
        detail:
          "El código rápido es caro de corregir; la decisión solo existió en el chat.",
        alertLabel: "Coste",
      },
      "con-rei-1": {
        title: "Work Item",
        detail:
          "El Leader registra el alcance, el tipo y el estado pending antes de escribir código.",
        alertLabel: "Paso",
      },
      "con-rei-2": {
        title: "Planificación",
        detail:
          "El Spec Author entrega requirements, design y tasks revisables.",
        alertLabel: "Artefactos",
      },
      "con-rei-3": {
        title: "Aprobación",
        detail:
          "La persona revisa y firma; el CLI registra el paso a in_progress. El silencio no aprueba.",
        alertLabel: "Puerta",
      },
      "con-rei-4": {
        title: "Implementación",
        detail:
          "El Implementer ejecuta solo la planificación aprobada y deja evidencia de verificación.",
        alertLabel: "Límite",
      },
      "con-rei-5": {
        title: "Revisión",
        detail:
          "El Reviewer verifica contra la planificación; done exige un veredicto favorable.",
        alertLabel: "Hecho",
      },
    },
  },
  gate: {
    eyebrow: "Ciclo y puerta",
    title: "La aprobación no es un trámite",
    intro:
      "Un Work Item recorre cinco estados. La puerta no está antes ni después del trabajo: está entre la planificación y el código. Ningún control de esta página aprueba; la firma se registra desde el CLI.",
    note: "Los artefactos de la puerta son legibles sin JavaScript; el ciclo se lee de arriba abajo en móvil.",
    stages: {
      pending: "El Leader registra el Work Item y acuerda el alcance.",
      ready: "El Spec Author entrega requisitos, diseño y tareas revisables.",
      gate: "La firma humana libera la hoja. El silencio no aprueba.",
      in_progress: "El Implementer ejecuta solo la planificación aprobada.",
      review:
        "El Reviewer verifica contra la planificación y los checkpoints.",
      done: "Estado terminal: trabajo aprobado y evidencia en el repositorio.",
    },
    gateLabel: "Aprobación de la planificación",
    artifacts: {
      "requirements.md": "Qué debe cumplirse y cómo se verifica.",
      "design.md": "Cómo se resuelve y qué alternativas se descartaron.",
      "tasks.md": "Orden de ejecución con tareas marcables.",
    },
    signNote: "La firma se registra desde el CLI; esta página no aprueba.",
    branches: {
      blocked: "El trabajo no puede continuar.",
      changes_requested:
        "La revisión rechazó la implementación y pide cambios.",
    },
    footnote:
      "Ramas, no atajos. Solo un Work Item puede estar in_progress a la vez.",
  },
  agents: {
    eyebrow: "Roles",
    title: "Roles explícitos, límites explícitos",
    intro:
      "Cada rol recibe un contrato propio y no invade el trabajo de otro. Abre cualquier rol —también con teclado— para leer su responsabilidad y su límite.",
    note: "La puerta ocupa el lugar entre Spec Author e Implementer; el Initializer es una rama lateral que no recorre el ciclo del Work Item. Los adaptadores nativos de OpenCode y Claude Code son opcionales; Cursor y Codex funcionan por fallback.",
    gateTag: "La puerta",
    gateSigned: "· firma humana",
    openLabel: "Responsabilidad y límite",
    detailHeading: (role) => `${role} · Responsabilidad y límite`,
    responsibility: "Responsabilidad",
    limit: "Límite",
    initializerNote:
      "El Initializer prepara el repositorio; no aprueba ni implementa Work Items.",
    handoffs: {
      leader: "Recibe la solicitud",
      "spec-author": "Recibe el Work Item",
      implementer: "Recibe la planificación aprobada",
      reviewer: "Recibe la implementación",
      initializer: "Rama lateral tras rei init",
    },
    roles: {
      leader: {
        responsibility:
          "Comprende la solicitud, elige el workflow y coordina a los demás roles.",
        limit: "No implementa salvo en el modo directo autorizado.",
      },
      "spec-author": {
        responsibility:
          "Convierte un Work Item pendiente en una planificación técnica revisable.",
        limit: "Nunca implementa.",
      },
      implementer: {
        responsibility:
          "Implementa únicamente la planificación aprobada y deja evidencia de verificación.",
        limit: "No cambia el alcance ni la planificación.",
      },
      reviewer: {
        responsibility:
          "Valida el trabajo contra la planificación y los checkpoints del proyecto.",
        limit: "No implementa: aprueba o solicita cambios.",
      },
      initializer: {
        responsibility:
          "Conduce la personalización guiada de la documentación del proyecto tras rei init.",
        limit:
          "No implementa código ni escribe fuera de los documentos de personalización.",
      },
    },
    summaryLabel: (role, handoff) =>
      `${role}. ${handoff}. Ver responsabilidad y límite.`,
  },
  terminal: {
    eyebrow: "CLI y artefactos",
    title: "La terminal deja lo que el chat no deja",
    intro:
      "Una instantánea real de `rei items status` junto al árbol de planificación del Work Item. No hay vídeo ni reproducción simulada: el texto es el que produjo el CLI.",
    note: (date) =>
      `La captura está fechada (${date}); los estados cambian con el tiempo.`,
    caption:
      "Instantánea real de `rei items status` en este repositorio. El estado de los Work Items cambia con el tiempo.",
    snapshotMeta: (date) => `instantánea · ${date}`,
    scrollHint: "Desliza o usa las flechas para ver la línea completa.",
    outputLabel: (command) => `Salida de ${command}`,
    treeLabel: (root) => `árbol · ${root}`,
    treeMeta: (count) => `${count} archivos`,
    snapshotNote: "Solo un Work Item puede estar in_progress a la vez.",
    artifacts: {
      root: "Un directorio por Work Item; el id es fecha y slug.",
      requirements: "Qué debe cumplirse y cómo se verifica.",
      design: "Cómo se resuelve; alternativas descartadas.",
      tasks: "Orden de ejecución con tareas marcables.",
      meta: "id, tipo, estado, commit base y revisión.",
    },
  },
  viewer: {
    eyebrow: "Visor",
    title: "rei view muestra el Work Item, no lo aprueba",
    intro:
      "Una captura real del visor local: documentos renderizados, tabla de contenidos, validación y FICHA. Es de solo lectura y no tiene botones que finjan aprobar.",
    note: (day) =>
      `Captura tomada con \`pnpm capture:evidence\` el ${day}; el visor se sirve en local y no forma parte de la web.`,
    linkLabel: "Ver la página del visor",
    frameMeta: "solo lectura",
    caption: (day) => `Captura real del visor · ${day}`,
    annotations: [
      {
        id: "toc",
        title: "TOC del Work Item",
        text: "El índice lista los documentos del Work Item; los que no existen se marcan como «no existe».",
      },
      {
        id: "validacion",
        title: "Validación",
        text: "El visor muestra el resultado de los checkpoints junto a la FICHA, con el estado real del trabajo.",
      },
      {
        id: "ficha",
        title: "FICHA",
        text: "Tipo, estado, fecha y enlaces del Work Item. No hay botón ni ruta de aprobación.",
      },
    ],
    diff: {
      title: "Diff",
      text: "Si hay cambios respecto de la base de revisión, el visor los publica; aquí aparecen como líneas añadidas.",
      crop: "El recorte muestra el inicio del diff; la captura completa queda en la evidencia del Work Item.",
    },
    missingPre: "No hay captura del visor en el manifiesto. Ejecuta",
    missingPost: "para generarla.",
  },
  github: {
    eyebrow: "GitHub Issues",
    title: "GitHub Issues es una proyección, no la fuente de verdad",
    intro:
      "La integración es opcional y no cambia dónde vive el estado. Estas son capturas reales de las issues públicas del repositorio de REI Harness: están cerradas y se muestran con su estado publicado.",
    note: "El CLI nunca llama a GitHub: lo hacen `gh` y `git` bajo orden explícita del Leader.",
    linkLabel: "Leer la guía de GitHub Issues",
    openIssue: (issue) => `Abrir la issue #${issue} ↗`,
    targets: [
      {
        id: "issue",
        title: "Issue",
        text: "Existe, se asigna y se cierra como reflejo del Work Item.",
      },
      {
        id: "rama",
        title: "Rama",
        text: "Contiene el trabajo que el Reviewer verifica.",
      },
      {
        id: "pr",
        title: "PR",
        text: "Propone el cambio; `.rei` sigue mandando sobre el estado.",
      },
    ],
    projection: {
      label: "Proyección, no fuente",
      truth: "fuente de verdad",
      body: "Planificación, progreso e historial viven en el repositorio, no en la issue.",
      optionalPre: "Integración opcional: se activa con",
      optionalPost: "y el flujo funciona sin ella.",
    },
    bodyFrame: "issue · cuerpo",
    bodyCaption:
      "Cuerpo publicado de la épica: la task list real, con sus hijas cerradas. El recorte muestra el inicio de la captura.",
  },
  captures: Object.fromEntries(
    EVIDENCE_MANIFEST.captures.map((capture) => [
      capture.id,
      { alt: capture.alt, description: capture.description },
    ]),
  ),
  cta: {
    eyebrow: "Siguiente paso",
    title: "Instala REI y abre tu primer Work Item",
    intro:
      "Tu agente escribe; tú decides. Un binario, un comando y una planificación aprobada antes de implementar. La evidencia queda en tu repositorio.",
    primary: "Instalar REI",
    secondary: "Explorar el producto",
  },
};
