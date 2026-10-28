import type { DocContent, DocsContentPath } from "@/features/docs/types";

export const GUIAS_CHECKS_PATH: DocsContentPath = "/docs/guias/checks";

export const GUIAS_CHECKS_DOCUMENT: DocContent = {
  path: GUIAS_CHECKS_PATH,
  eyebrow: "Guías · Checks",
  meta: "Checks rápidos · código de salida 0/1",
  sections: [
    {
      id: "cuando-usarla",
      title: "Cuándo usarla",
      blocks: [
        {
          kind: "paragraph",
          text: "Usa esta guía cuando quieras que `rei check` ejecute las verificaciones rápidas de tu proyecto —lint, tests de lógica, type-check— y te devuelva un resultado único antes de implementar o de solicitar una revisión.",
        },
      ],
    },
    {
      id: "requisitos",
      title: "Requisitos",
      blocks: [
        {
          kind: "list",
          items: [
            "Un proyecto inicializado con `.rei/config.json`.",
            "Los checkpoints rápidos definidos en `.rei/docs/project/verification.md`.",
            "Los comandos disponibles en el PATH del proyecto.",
            "Ningún check lento: el build completo, e2e o integración no van en la configuración.",
          ],
        },
      ],
    },
    {
      id: "pasos",
      title: "Pasos",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Identifica los checkpoints rápidos de `verification.md` y su identificador estable, por ejemplo V1 o V4.",
            "Declara cada uno en `checks` dentro de `.rei/config.json` con `id`, `description` y `command`. El comando es un array de argumentos y se ejecuta sin shell intermedio.",
            "Ejecuta `rei check` para verificar el arnés y correr los checks declarados. Añade `--quiet` si quieres omitir los [OK] y el resumen.",
            "Ejecuta `rei test` cuando solo quieras los checks de `.rei/config.json`, sin el resto de comprobaciones del arnés.",
            "Si algún check falla, corrige la causa y vuelve a ejecutarlo antes de solicitar revisión.",
          ],
        },
        {
          kind: "code",
          language: "json",
          title: ".rei/config.json",
          code: '{\n  "checks": [\n    {\n      "id": "V1",\n      "description": "ESLint del proyecto",\n      "command": ["pnpm", "lint"]\n    },\n    {\n      "id": "V4",\n      "description": "Tests de lógica y datos",\n      "command": ["pnpm", "test"]\n    }\n  ]\n}',
        },
        {
          kind: "code",
          language: "Shell",
          title: "Ejecución",
          code: "rei check\nrei check --quiet\nrei test",
        },
      ],
    },
    {
      id: "verificacion",
      title: "Verificación",
      blocks: [
        {
          kind: "table",
          columns: ["Resultado", "Código", "Qué significa"],
          rows: [
            ["Todo pasa", "0", "Los checks declarados terminaron sin fallos."],
            ["Algún fallo", "1", "Hay al menos un [FAIL] o un check del proyecto falló."],
            ["Sin checks", "0", "rei test informa de que no hay checks configurados."],
          ],
        },
        {
          kind: "paragraph",
          text: "Corrige el fallo y repite el comando. No solicites revisión con un check en rojo ni lo desactives para que pase: el código de salida es la señal que usa el workflow.",
        },
        {
          kind: "note",
          tone: "info",
          title: "Dos suites distintas",
          text: "`rei test` ejecuta solo los checks de `.rei/config.json`; no es la suite de tests del propio REI. Si el check V4 invoca `pnpm test`, ese comando sí ejecuta la suite del proyecto.",
        },
      ],
    },
    {
      id: "limites",
      title: "Límites",
      blocks: [
        {
          kind: "list",
          items: [
            "Los checkpoints lentos, como el build de producción, se documentan en `verification.md` y se ejecutan al cerrar el Work Item.",
            "`rei check` ejecuta los comandos sin shell intermedio: no interpreta redirecciones, tuberías ni variables de shell.",
            "La configuración no sustituye `verification.md` ni justifica checks que no demuestren nada.",
            "Un check que tarda demasiado no se añade a la configuración: convierte la verificación diaria en una espera.",
          ],
        },
      ],
    },
    {
      id: "siguiente-paso",
      title: "Siguiente paso",
      blocks: [
        {
          kind: "paragraph",
          text: "Con los checks en verde, el Work Item puede ir a revisión. Si quieres actualizar el arnés o el binario, la guía de actualización explica el orden.",
        },
        {
          kind: "links",
          links: [
            {
              label: "Actualizar el arnés y el binario",
              href: "/docs/guias/actualizar",
            },
            {
              label: "Consultar los comandos",
              href: "/docs/referencia/comandos",
            },
            {
              label: "Entender los estados del Work Item",
              href: "/docs/conceptos/work-items-y-estados",
            },
            {
              label: "Resolver dudas sobre checks",
              href: "/docs/operacion/faq",
            },
          ],
        },
      ],
    },
  ],
};
