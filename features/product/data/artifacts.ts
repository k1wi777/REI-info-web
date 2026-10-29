import type { ArtifactGroup } from "@/features/product/types";

/**
 * Árbol real de `.rei/` para un Work Item. `spec.md` vive en
 * `.rei/progress/work-items/<id>/` (bloqueo del Spec Author), no en `.rei/specs/`.
 * Ningún documento se repite.
 */
export const ARTIFACT_GROUPS: ArtifactGroup[] = [
  {
    id: "specs",
    root: ".rei/specs/<id>/",
    label: "Planificación",
    entries: [
      {
        id: "meta",
        path: ".rei/specs/<id>/meta.json",
        note: "Tipo, estado, base_commit y last_review_commit.",
        owner: "Leader al crear y aprobar; Reviewer al rechazar",
        appliesTo: "estado",
      },
      {
        id: "requirements",
        path: ".rei/specs/<id>/requirements.md",
        note: "Qué debe hacer la Feature y cómo se verifica.",
        owner: "Spec Author",
        appliesTo: "feature",
      },
      {
        id: "design",
        path: ".rei/specs/<id>/design.md",
        note: "Cómo se implementa: decisiones, archivos y verificación.",
        owner: "Spec Author",
        appliesTo: "feature",
      },
      {
        id: "tasks",
        path: ".rei/specs/<id>/tasks.md",
        note: "Tareas ordenadas con su R-id.",
        owner: "Spec Author",
        appliesTo: "feature",
      },
      {
        id: "plan",
        path: ".rei/specs/<id>/plan.md",
        note: "Plan breve de una Task, paso a paso.",
        owner: "Spec Author",
        appliesTo: "task",
      },
      {
        id: "links",
        path: ".rei/specs/<id>/links.json",
        note: "Issue, rama y base cuando la integración GitHub está activa.",
        owner: "Leader · integración GitHub",
        appliesTo: "opcional",
      },
    ],
  },
  {
    id: "progress",
    root: ".rei/progress/",
    label: "Sesión",
    entries: [
      {
        id: "current",
        path: ".rei/progress/current.md",
        note: "Sesión viva: estado, bitácora y próximo paso.",
        owner: "Spec Author lo inicia; Implementer lo mantiene",
        appliesTo: "sesion",
      },
      {
        id: "history",
        path: ".rei/progress/history.md",
        note: "Resumen append-only de cada Work Item cerrado.",
        owner: "Reviewer al archivar la sesión",
        appliesTo: "sesion",
      },
    ],
  },
  {
    id: "work-items",
    root: ".rei/progress/work-items/<id>/",
    label: "Registro del Work Item",
    entries: [
      {
        id: "impl",
        path: ".rei/progress/work-items/<id>/impl.md",
        note: "Resumen, archivos, cambios y verificación de la implementación.",
        owner: "Implementer",
        appliesTo: "ambos",
      },
      {
        id: "review",
        path: ".rei/progress/work-items/<id>/review.md",
        note: "Veredicto, verificaciones, observaciones y acciones requeridas.",
        owner: "Reviewer",
        appliesTo: "ambos",
      },
      {
        id: "spec",
        path: ".rei/progress/work-items/<id>/spec.md",
        note: "Motivo del bloqueo, información faltante y decisiones que requieren intervención humana.",
        owner: "Spec Author",
        appliesTo: "bloqueo",
      },
    ],
  },
];

export const ARTIFACT_ENTRIES = ARTIFACT_GROUPS.flatMap((group) => group.entries);
