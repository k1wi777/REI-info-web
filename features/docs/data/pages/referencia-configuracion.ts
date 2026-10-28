import type { DocContent, DocsContentPath } from "@/features/docs/types";

export const REFERENCIA_CONFIGURACION_PATH: DocsContentPath =
  "/docs/referencia/configuracion";

export const REFERENCIA_CONFIGURACION_DOCUMENT: DocContent = {
  path: REFERENCIA_CONFIGURACION_PATH,
  eyebrow: "Referencia · Configuración",
  meta: "checks · GitHub Issues · visor · códigos 0/1/2",
  sections: [
    {
      id: "archivo",
      title: "El archivo",
      blocks: [
        {
          kind: "paragraph",
          text: "`.rei/config.json` es la configuración del proyecto para el arnés: declara los checks rápidos que ejecuta `rei check`, la integración opcional con GitHub Issues y el comportamiento del visor. Vive en la raíz de `.rei/` y se escribe con `rei init`; después se edita a mano o con los comandos que lo modifican.",
        },
        {
          kind: "code",
          language: "json",
          title: ".rei/config.json",
          code: '{\n  "checks": [\n    {\n      "id": "V1",\n      "description": "ESLint del proyecto",\n      "command": ["pnpm", "lint"]\n    },\n    {\n      "id": "V4",\n      "description": "Tests de lógica y datos",\n      "command": ["pnpm", "test"]\n    }\n  ],\n  "integrations": {\n    "github": {\n      "enabled": true,\n      "repo": "owner/name",\n      "base": "main",\n      "mergeStrategy": "squash"\n    }\n  },\n  "viewer": {\n    "autoOpenOnReady": true\n  }\n}',
        },
        {
          kind: "paragraph",
          text: "Las tres claves son independientes: puedes declarar checks sin GitHub Issues y configurar el visor sin checks. La ausencia de `integrations.github` significa que la integración está desactivada.",
        },
      ],
    },
    {
      id: "checks",
      title: "checks",
      blocks: [
        {
          kind: "paragraph",
          text: "`checks` es un array de checkpoints rápidos. `rei check` los ejecuta, además de sus propias comprobaciones del arnés, y refleja el resultado en su código de salida.",
        },
        {
          kind: "table",
          columns: ["Campo", "Contenido"],
          rows: [
            ["`id`", "Identificador estable del checkpoint, como V1 o V4."],
            ["`description`", "Qué valida el check, en una frase."],
            [
              "`command`",
              "Array de argumentos del comando. Se ejecuta sin shell intermedio.",
            ],
          ],
        },
        {
          kind: "list",
          items: [
            "`command` no interpreta redirecciones, tuberías ni variables de shell: cada elemento del array es un argumento literal.",
            "Solo van aquí los checks rápidos. El build completo, e2e o la integración se documentan en `.rei/docs/project/verification.md` y se ejecutan al cerrar el Work Item.",
            "Los ids y los comandos deben coincidir con los checkpoints declarados en la documentación del proyecto.",
          ],
        },
      ],
    },
    {
      id: "github",
      title: "integrations.github",
      blocks: [
        {
          kind: "paragraph",
          text: "La integración con GitHub Issues es opcional y se configura bajo `integrations.github`. El CLI nunca llama a GitHub: los comandos solo escriben esta configuración y el agente ejecuta las acciones con `gh` y `git`.",
        },
        {
          kind: "table",
          columns: ["Campo", "Valor"],
          rows: [
            [
              "`enabled`",
              "true activa la integración; false la desactiva y conserva repo, base, mergeStrategy y los enlaces locales.",
            ],
            [
              "`repo`",
              "Repositorio de destino en formato owner/name. No tiene valor por defecto: sin flag ni valor previo se detecta desde el remoto origin.",
            ],
            [
              "`base`",
              "Rama base de respaldo. Usa main cuando no hay valor previo ni detección desde origin/HEAD.",
            ],
            [
              "`mergeStrategy`",
              "Estrategia de merge del PR: squash, merge o rebase. Usa squash por defecto.",
            ],
          ],
        },
        {
          kind: "paragraph",
          text: "`base` es solo el fallback: la base efectiva se decide por Work Item en la puerta y vive en `links.json`, no en `.rei/config.json`. `rei github status` es offline y no conoce la base efectiva de cada Work Item.",
        },
      ],
    },
    {
      id: "visor",
      title: "viewer",
      blocks: [
        {
          kind: "paragraph",
          text: "`viewer.autoOpenOnReady` es un booleano. Con true, el Leader abre el visor con `rei view <id> --open` en la puerta de aprobación, sin bloquear la conversación. Con false o sin la clave, no ejecuta nada y el flujo es idéntico.",
        },
        {
          kind: "list",
          items: [
            "`rei view --enable` activa `viewer.autoOpenOnReady` en `.rei/config.json`.",
            "`rei view --disable` lo desactiva.",
            "Ambos flags solo cambian esa clave y conservan el resto del archivo.",
            "El visor es de solo lectura: no aprueba ni modifica documentos, `meta.json` ni el estado del Work Item.",
          ],
        },
      ],
    },
    {
      id: "precedencia",
      title: "Precedencia de valores",
      blocks: [
        {
          kind: "paragraph",
          text: "`rei github enable` resuelve cada valor con la misma precedencia: flag explícito > valor previo de `integrations.github` > detección desde `git` > valor por defecto. Un enable sin flags no sobrescribe valores ya configurados.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "El flag explícito manda: `--repo owner/name`, `--base <rama>` o `--strategy squash|merge|rebase`.",
            "Si falta, se conserva el valor previo de `integrations.github`.",
            "Si tampoco existe, se detecta desde `git`: origin para `repo` y origin/HEAD para `base`.",
            "Si la detección falla, `base` usa main y `mergeStrategy` usa squash; `repo` no tiene default y exige un origin resoluble.",
          ],
        },
        {
          kind: "paragraph",
          text: "Un flag desconocido, repetido, sin valor o inválido es uso incorrecto (código 2) y no escribe la configuración. Los fallos operativos —configuración inválida, remoto no resoluble o error de escritura— salen con 1.",
        },
      ],
    },
    {
      id: "codigos-de-salida",
      title: "Códigos de salida",
      blocks: [
        {
          kind: "table",
          columns: ["Código", "Significado"],
          rows: [
            ["0", "La operación terminó correctamente, también cuando solo había avisos."],
            ["1", "Falló una comprobación o el comando no pudo completarse."],
            ["2", "Uso incorrecto: flag desconocido, repetido, sin valor o inválido."],
          ],
        },
        {
          kind: "paragraph",
          text: "En los checks, 0 significa que todo pasó y 1 que hay al menos un [FAIL] o un check del proyecto falló. rei test informa y sale 0 cuando no hay checks configurados. El código de salida es la señal que usa el workflow: no se desactiva un check para que pase.",
        },
        {
          kind: "note",
          tone: "info",
          title: "Avisos que no bloquean",
          text: "Los avisos de `gh` ausente o sin autenticar no bloquean `rei github enable`: sale 0. Un `links.json` inválido se informa como WARN recuperable, nunca como FAIL.",
        },
        {
          kind: "links",
          links: [
            { label: "Declarar checks paso a paso", href: "/docs/guias/checks" },
            { label: "Ver los campos de meta.json", href: "/docs/referencia/meta" },
            {
              label: "Resolver un check en rojo",
              href: "/docs/operacion/troubleshooting",
            },
          ],
        },
      ],
    },
  ],
};
