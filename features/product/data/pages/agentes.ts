import { REPOSITORY_URL } from "@/content/site";
import type { ProductDocument } from "@/features/product/types";

export const AGENTES_DOCUMENT: ProductDocument = {
  id: "agentes",
  eyebrow: "Producto · Roles",
  meta: "Cinco roles · contratos explícitos",
  sections: [
    {
      id: "roles",
      title: "Cinco roles, cinco límites",
      blocks: [
        {
          kind: "paragraph",
          text: "REI separa coordinar, planificar, implementar, revisar y personalizar. Cada rol tiene un contrato propio con una responsabilidad, un límite y un momento de intervención; ninguno invade el trabajo del otro.",
        },
        {
          kind: "roles",
          roles: [
            "leader",
            "spec-author",
            "implementer",
            "reviewer",
            "initializer",
          ],
        },
      ],
    },
    {
      id: "ciclo",
      title: "Los cuatro roles del ciclo",
      blocks: [
        {
          kind: "paragraph",
          text: "Leader, Spec Author, Implementer y Reviewer recorren el Work Item de principio a fin. El Initializer queda fuera del ciclo: conduce la personalización guiada de la documentación del proyecto después de `rei init`, cuando quedan marcadores pendientes.",
        },
        {
          kind: "note",
          tone: "info",
          title: "Un ciclo, una firma",
          text: "La aprobación humana sigue siendo el punto de control entre ready e in_progress. Ningún rol puede omitirla.",
        },
      ],
    },
    {
      id: "contratos",
      title: "Contratos y adaptadores",
      blocks: [
        {
          kind: "paragraph",
          text: "El contrato canónico vive en `.rei/agents/`. Si el runtime dispone de adaptador nativo, `rei init opencode` o `rei init claude` generan un subagente por rol a partir de la sección `## Contrato`. Cursor y Codex funcionan por fallback: el Leader transmite únicamente ese contrato, sin configuración adicional.",
        },
        {
          kind: "paragraph",
          text: "Los archivos generados llevan la marca GENERATED y la instalación es idempotente: si ya están al día, no se modifican, y nunca se sobrescribe un archivo que no hayan generado. `rei init opencode --check` o `rei init claude --check` detectan la deriva sin escribir nada.",
        },
        {
          kind: "links",
          links: [
            { label: "Ver el ciclo de un Work Item", href: "/producto/work-items" },
            { label: "Referencia de comandos", href: "/docs/referencia/comandos" },
            { label: "Preguntas frecuentes", href: "/docs/operacion/faq" },
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
      id: "limites",
      title: "Lo que no cambia con el runtime",
      blocks: [
        {
          kind: "list",
          items: [
            "El contrato es la fuente; el adaptador es una capa opcional.",
            "Invocar un subagente directamente no elimina el workflow: el Work Item sigue necesitando planificación y aprobación.",
            "El Leader transmite al subagente solo el contrato del rol, nunca el archivo completo.",
            "La instalación de adaptadores es idempotente y no sobrescribe archivos ajenos.",
          ],
        },
      ],
    },
  ],
};
