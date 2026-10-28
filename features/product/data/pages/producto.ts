import { INSTALL_PATH, REPOSITORY_URL } from "@/content/site";
import type { ProductDocument } from "@/features/product/types";

export const PRODUCTO_DOCUMENT: ProductDocument = {
  id: "producto",
  eyebrow: "Producto · Spec Driven Development",
  meta: "Fuente: README.md, docs/product-strategy.md y .rei/docs/",
  facts: [
    { label: "Modelo", value: "Spec Driven Development" },
    { label: "Instalación", value: "Binario único" },
    { label: "Puerta", value: "Aprobación humana" },
    { label: "Registro", value: "`.rei/` en tu repositorio" },
    { label: "Alcance", value: "Runtime-agnóstico · local-first" },
  ],
  actions: [
    { label: "Instalar REI", href: INSTALL_PATH },
    { label: "Ver cómo funciona", href: "/producto/como-funciona" },
  ],
  sections: [
    {
      id: "problema",
      label: "Problema",
      title: "El problema: decidir, planificar y ejecutar en la misma conversación",
      blocks: [
        {
          kind: "paragraph",
          text: "Cuando decidir qué se construye, planificar cómo y ejecutar el cambio viven en la misma conversación, nada queda registrado y nadie puede revisar la decisión. La IA acelera la escritura, pero no garantiza que se esté construyendo lo correcto.",
        },
        {
          kind: "points",
          variant: "ledger",
          points: [
            {
              title: "Desarrollo a ciegas",
              detail: "Se escribe antes de que el alcance esté claro.",
            },
            {
              title: "Alucinaciones",
              detail: "APIs o datos inventados presentados como ciertos.",
            },
            {
              title: "Decisiones no autorizadas",
              detail: "Arquitectura o alcance cambiados sin aprobación.",
            },
            {
              title: "Acciones fuera de límite",
              detail: "Entornos y datos que no se deberían tocar.",
            },
            {
              title: "Retrabajo",
              detail: "Código rápido y caro de corregir.",
            },
          ],
        },
      ],
    },
    {
      id: "propuesta",
      label: "Mecanismo",
      title: "La propuesta: especificación, aprobación humana y evidencia",
      weight: "lead",
      blocks: [
        {
          kind: "paragraph",
          text: "REI Harness es un arnés de Spec Driven Development que se instala en cualquier repositorio y coordina agentes de IA con una puerta de aprobación humana obligatoria. Separa decidir, planificar y ejecutar, y deja el rastro en el propio repositorio.",
        },
        {
          kind: "points",
          variant: "ledger",
          points: [
            {
              title: "Especificación primero",
              detail:
                "La planificación existe antes de la primera línea de código.",
            },
            {
              title: "Aprobación humana",
              detail:
                "Ningún Work Item pasa a implementación sin una firma explícita; el silencio no aprueba.",
              gate: true,
            },
            {
              title: "Roles separados",
              detail:
                "Leader, Spec Author, Implementer y Reviewer tienen contrato propio; el Initializer personaliza la documentación del proyecto.",
            },
            {
              title: "Guardarraíles",
              detail:
                "Alcance definido, verificación obligatoria y reglas duras.",
            },
            {
              title: "Trazabilidad",
              detail:
                "Planificación, progreso, decisiones e historial viven en `.rei/`.",
            },
            {
              title: "Documentación viva",
              detail:
                "Lo que la web afirma se puede rastrear al repositorio o a una fuente citada.",
            },
            {
              title: "Runtime-agnóstico y local-first",
              detail:
                "El contrato de rol y el CLI son el valor; el adaptador es opcional.",
            },
          ],
        },
        {
          kind: "note",
          tone: "info",
          title: "El valor no es el agente",
          text: "REI no es un agente más listo ni un generador de código: es el proceso que lo rodea y la evidencia que deja.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Cómo funciona el ciclo completo",
              href: "/producto/como-funciona",
            },
            { label: "Instalar REI", href: INSTALL_PATH },
            {
              label: "Repositorio de REI Harness",
              href: REPOSITORY_URL,
              external: true,
            },
          ],
        },
      ],
    },
    {
      id: "evidencia",
      label: "Evidencia",
      title: "Evidencia externa",
      blocks: [
        {
          kind: "paragraph",
          text: "La adopción de IA es mayoritaria y la desconfianza en su exactitud también. La web no fabrica cifras propias: cada caso enlaza a su fuente y se limita a lo que el estudio muestra.",
        },
        {
          kind: "evidence",
          ids: [
            "replit",
            "metr",
            "gitclear",
            "veracode",
            "dora-2025",
            "stack-overflow-2025",
            "github-copilot-2023",
          ],
        },
      ],
    },
    {
      id: "principios",
      label: "Principios",
      title: "Principios de producto",
      blocks: [
        {
          kind: "points",
          variant: "manifesto",
          points: [
            {
              title: "El porqué antes del qué",
              detail: "El proceso y el problema justifican los comandos.",
            },
            {
              title: "La aprobación humana es el producto",
              detail: "El flujo hace visible la puerta, no la esconde.",
            },
            {
              title: "La documentación es la fuente de verdad",
              detail: "Cada afirmación se puede rastrear.",
            },
            {
              title: "Mostrar límites da confianza",
              detail:
                "El visor es de solo lectura, GitHub Issues es opcional y el modo directo tiene restricciones.",
            },
            {
              title: "Una sola fuente por dato y dependencias mínimas",
              detail: "Comandos, estados y roles se definen una vez.",
            },
          ],
        },
      ],
    },
    {
      id: "no-es",
      label: "Límites",
      title: "Lo que REI no es",
      blocks: [
        {
          kind: "points",
          variant: "limits",
          points: [
            {
              title: "No es un generador de código",
              detail: "Ni un agente autónomo que trabaja solo.",
            },
            {
              title: "No es el repositorio del CLI",
              detail:
                "El código vive en su propio repositorio y esta web lo documenta.",
            },
            {
              title: "No es el visor de specs",
              detail: "`rei view` es local y de solo lectura.",
            },
            {
              title: "No es un panel de control",
              detail: "La web no ejecuta comandos ni modifica Work Items.",
            },
            {
              title: "No es un escaparate de métricas",
              detail: "Sin clientes, testimonios ni cifras no demostrables.",
            },
          ],
        },
        {
          kind: "note",
          tone: "warning",
          title: "Lo que la web no afirma",
          text: "Que REI elimina por completo las alucinaciones, que la IA se vuelve autónoma, que sustituye al CLI o al visor, o que la aprobación humana se puede omitir. La web documenta el arnés; no lo sustituye.",
        },
      ],
    },
    {
      id: "audiencias",
      label: "Audiencias",
      title: "Para quién",
      weight: "fine",
      blocks: [
        {
          kind: "audiences",
          items: [
            {
              id: "desarrollador",
              who: "Desarrollador individual",
              seeks:
                "Dejar de improvisar con el agente sin montar un proceso pesado.",
              next: [
                { label: "Instalación", href: INSTALL_PATH },
                {
                  label: "Primer Work Item",
                  href: "/docs/empezar/primer-work-item",
                },
              ],
            },
            {
              id: "revisor",
              who: "Revisor o aprobador",
              seeks:
                "Ver qué se va a hacer antes de que se escriba y poder rechazarlo.",
              next: [
                { label: "Cómo funciona", href: "/producto/como-funciona" },
                { label: "Work Items", href: "/producto/work-items" },
              ],
            },
            {
              id: "equipo",
              who: "Equipo con varios runtimes",
              seeks:
                "Un contrato de rol común para OpenCode, Claude Code, Cursor y Codex.",
              next: [
                { label: "Agentes", href: "/producto/agentes" },
                { label: "Instalación", href: INSTALL_PATH },
              ],
            },
            {
              id: "mantenedor",
              who: "Mantenedor",
              seeks: "Referencia pública de comandos, estados y contratos.",
              next: [
                {
                  label: "Comandos",
                  href: "/docs/referencia/comandos",
                },
                { label: "Work Items", href: "/producto/work-items" },
              ],
            },
            {
              id: "esceptico",
              who: "Escéptico",
              seeks: "Límites y evidencia: qué hace y qué no hace.",
              next: [
                {
                  label: "Preguntas frecuentes",
                  href: "/docs/operacion/faq",
                },
                { label: "Visor", href: "/producto/visor" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "fortalezas",
      label: "Diferenciales",
      title: "Fortalezas diferenciales",
      blocks: [
        {
          kind: "points",
          variant: "columns",
          points: [
            {
              title: "SDD desde el minuto 0",
              detail:
                "El código no empieza hasta que existe una planificación aprobada.",
            },
            {
              title: "Aprobación humana obligatoria",
              detail:
                "Ningún Work Item pasa a implementación sin decisión explícita; el silencio no aprueba.",
            },
            {
              title: "Roles explícitos y separados",
              detail:
                "Cada rol tiene contrato y no invade el trabajo del otro.",
            },
            {
              title: "Guardarraíles",
              detail:
                "Alcance definido, verificación obligatoria, revisión por diff y reglas duras.",
            },
            {
              title: "Trazabilidad",
              detail:
                "Planificación, progreso y decisiones quedan en el repositorio, no en el chat.",
            },
            {
              title: "Documentación viva",
              detail:
                "La fuente de verdad es el repositorio y se actualiza con el trabajo.",
            },
            {
              title: "Runtime-agnóstico",
              detail:
                "El valor está en el contrato de rol y el CLI; el adaptador es opcional.",
            },
            {
              title: "GitHub Issues opcional",
              detail:
                "Issues, ramas y PR son una proyección del trabajo, no la fuente de verdad.",
            },
            {
              title: "Binario único",
              detail: "Un solo ejecutable sin dependencias de runtime.",
            },
            {
              title: "Local-first",
              detail:
                "Todo ocurre en la máquina y el repositorio del usuario; el CLI no llama a servicios externos.",
            },
            {
              title: "Dependencias mínimas",
              detail:
                "La plataforma y el código propio antes que librerías de terceros.",
            },
          ],
        },
        {
          kind: "links",
          links: [
            { label: "Ver los cinco roles", href: "/producto/agentes" },
            { label: "Entender los Work Items", href: "/producto/work-items" },
            { label: "Qué hace el visor", href: "/producto/visor" },
            {
              label: "Cómo encaja GitHub Issues",
              href: "/producto/github-issues",
            },
            {
              label: "Referencia de comandos",
              href: "/docs/referencia/comandos",
            },
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
