import { INSTALL_PATH, REPOSITORY_URL } from "@/content/site";
import type { ProductDocument } from "@/features/product/types";

export const PRODUCTO_DOCUMENT: ProductDocument = {
  id: "producto",
  eyebrow: "Producto · Spec Driven Development",
  meta: "Fuente: README.md, docs/product-strategy.md y .rei/docs/",
  sections: [
    {
      id: "problema",
      title: "El problema: decidir, planificar y ejecutar en la misma conversación",
      blocks: [
        {
          kind: "paragraph",
          text: "Cuando decidir qué se construye, planificar cómo y ejecutar el cambio viven en la misma conversación, nada queda registrado y nadie puede revisar la decisión. La IA acelera la escritura, pero no garantiza que se esté construyendo lo correcto.",
        },
        {
          kind: "list",
          items: [
            "Desarrollo a ciegas: se escribe antes de que el alcance esté claro.",
            "Alucinaciones: APIs o datos inventados presentados como ciertos.",
            "Decisiones no autorizadas: arquitectura o alcance cambiados sin aprobación.",
            "Acciones fuera de límite: entornos y datos que no se deberían tocar.",
            "Retrabajo: código rápido y caro de corregir.",
          ],
        },
      ],
    },
    {
      id: "propuesta",
      title: "La propuesta: especificación, aprobación humana y evidencia",
      blocks: [
        {
          kind: "paragraph",
          text: "REI Harness es un arnés de Spec Driven Development que se instala en cualquier repositorio y coordina agentes de IA con una puerta de aprobación humana obligatoria. Separa decidir, planificar y ejecutar, y deja el rastro en el propio repositorio.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Especificación primero: la planificación existe antes de la primera línea de código.",
            "Aprobación humana: ningún Work Item pasa a implementación sin una firma explícita; el silencio no aprueba.",
            "Roles separados: Leader, Spec Author, Implementer y Reviewer tienen contrato propio; el Initializer personaliza la documentación del proyecto.",
            "Guardarraíles: alcance definido, verificación obligatoria y reglas duras.",
            "Trazabilidad: planificación, progreso, decisiones e historial viven en `.rei/`.",
            "Documentación viva: lo que la web afirma se puede rastrear al repositorio o a una fuente citada.",
            "Runtime-agnóstico y local-first: el contrato de rol y el CLI son el valor; el adaptador es opcional.",
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
            { label: "Cómo funciona el ciclo completo", href: "/producto/como-funciona" },
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
      title: "Principios de producto",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "El porqué antes del qué: el proceso y el problema justifican los comandos.",
            "La aprobación humana es el producto: el flujo hace visible la puerta, no la esconde.",
            "La documentación es la fuente de verdad: cada afirmación se puede rastrear.",
            "Mostrar límites da confianza: el visor es de solo lectura, GitHub Issues es opcional y el modo directo tiene restricciones.",
            "Una sola fuente por dato y dependencias mínimas: comandos, estados y roles se definen una vez.",
          ],
        },
      ],
    },
    {
      id: "no-es",
      title: "Lo que REI no es",
      blocks: [
        {
          kind: "list",
          items: [
            "No es un generador de código ni un agente autónomo que trabaja solo.",
            "No es el repositorio del CLI: el código vive en su propio repositorio y esta web lo documenta.",
            "No es el visor de specs: `rei view` es local y de solo lectura.",
            "No es un panel de control: la web no ejecuta comandos ni modifica Work Items.",
            "No es un escaparate de métricas: sin clientes, testimonios ni cifras no demostrables.",
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
      title: "Para quién",
      blocks: [
        {
          kind: "table",
          columns: ["Audiencia", "Qué busca", "Dónde seguir"],
          rows: [
            [
              "Desarrollador individual",
              "Dejar de improvisar con el agente sin montar un proceso pesado.",
              "Instalación → Primer Work Item",
            ],
            [
              "Revisor o aprobador",
              "Ver qué se va a hacer antes de que se escriba y poder rechazarlo.",
              "Cómo funciona → Work Items",
            ],
            [
              "Equipo con varios runtimes",
              "Un contrato de rol común para OpenCode, Claude Code, Cursor y Codex.",
              "Agentes → Instalación",
            ],
            [
              "Mantenedor",
              "Referencia pública de comandos, estados y contratos.",
              "Comandos → Work Items",
            ],
            [
              "Escéptico",
              "Límites y evidencia: qué hace y qué no hace.",
              "Producto → Preguntas frecuentes",
            ],
          ],
        },
        {
          kind: "links",
          links: [
            { label: "Empezar por la instalación", href: INSTALL_PATH },
            {
              label: "Abrir el primer Work Item",
              href: "/docs/empezar/primer-work-item",
            },
            { label: "Consultar la FAQ", href: "/docs/operacion/faq" },
          ],
        },
      ],
    },
    {
      id: "fortalezas",
      title: "Fortalezas diferenciales",
      blocks: [
        {
          kind: "table",
          columns: ["Diferenciador", "Qué significa"],
          rows: [
            [
              "SDD desde el minuto 0",
              "El código no empieza hasta que existe una planificación aprobada.",
            ],
            [
              "Aprobación humana obligatoria",
              "Ningún Work Item pasa a implementación sin decisión explícita; el silencio no aprueba.",
            ],
            [
              "Roles explícitos y separados",
              "Cada rol tiene contrato y no invade el trabajo del otro.",
            ],
            [
              "Guardarraíles",
              "Alcance definido, verificación obligatoria, revisión por diff y reglas duras.",
            ],
            [
              "Trazabilidad",
              "Planificación, progreso y decisiones quedan en el repositorio, no en el chat.",
            ],
            [
              "Documentación viva",
              "La fuente de verdad es el repositorio y se actualiza con el trabajo.",
            ],
            [
              "Runtime-agnóstico",
              "El valor está en el contrato de rol y el CLI; el adaptador es opcional.",
            ],
            [
              "GitHub Issues opcional",
              "Issues, ramas y PR son una proyección del trabajo, no la fuente de verdad.",
            ],
            [
              "Binario único",
              "Un solo ejecutable sin dependencias de runtime.",
            ],
            [
              "Local-first",
              "Todo ocurre en la máquina y el repositorio del usuario; el CLI no llama a servicios externos.",
            ],
            [
              "Dependencias mínimas",
              "La plataforma y el código propio antes que librerías de terceros.",
            ],
          ],
        },
        {
          kind: "links",
          links: [
            { label: "Ver los cinco roles", href: "/producto/agentes" },
            { label: "Entender los Work Items", href: "/producto/work-items" },
            { label: "Qué hace el visor", href: "/producto/visor" },
            { label: "Cómo encaja GitHub Issues", href: "/producto/github-issues" },
            { label: "Referencia de comandos", href: "/docs/referencia/comandos" },
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
