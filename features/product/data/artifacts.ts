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
    entries: [
      {
        id: "meta",
        path: ".rei/specs/<id>/meta.json",
        appliesTo: "estado",
      },
      {
        id: "requirements",
        path: ".rei/specs/<id>/requirements.md",
        appliesTo: "feature",
      },
      {
        id: "design",
        path: ".rei/specs/<id>/design.md",
        appliesTo: "feature",
      },
      {
        id: "tasks",
        path: ".rei/specs/<id>/tasks.md",
        appliesTo: "feature",
      },
      {
        id: "plan",
        path: ".rei/specs/<id>/plan.md",
        appliesTo: "task",
      },
      {
        id: "links",
        path: ".rei/specs/<id>/links.json",
        appliesTo: "opcional",
      },
    ],
  },
  {
    id: "progress",
    root: ".rei/progress/",
    entries: [
      {
        id: "current",
        path: ".rei/progress/current.md",
        appliesTo: "sesion",
      },
      {
        id: "history",
        path: ".rei/progress/history.md",
        appliesTo: "sesion",
      },
    ],
  },
  {
    id: "work-items",
    root: ".rei/progress/work-items/<id>/",
    entries: [
      {
        id: "impl",
        path: ".rei/progress/work-items/<id>/impl.md",
        appliesTo: "ambos",
      },
      {
        id: "review",
        path: ".rei/progress/work-items/<id>/review.md",
        appliesTo: "ambos",
      },
      {
        id: "spec",
        path: ".rei/progress/work-items/<id>/spec.md",
        appliesTo: "bloqueo",
      },
    ],
  },
];

export const ARTIFACT_ENTRIES = ARTIFACT_GROUPS.flatMap((group) => group.entries);
