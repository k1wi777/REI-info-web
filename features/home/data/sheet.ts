import { APPROVAL_GATE } from "@/content/rei";
import type { SheetMeta, SheetPhase } from "@/features/home/types";

/**
 * Hoja de ejemplo del primer viewport. Los valores describen un Work Item
 * real en la puerta de aprobación; no son métricas ni datos inventados.
 */
export const EXAMPLE_SHEET: SheetMeta = {
  code: "WI-014",
  revision: "REV. 03",
  title: "Matriz de responsabilidades",
  type: "feature",
  state: "ready",
  checkpoints: "V1 · V4",
  approval: APPROVAL_GATE.status,
};

/**
 * Fases del ciclo que dibuja la matriz. El rol responsable sale de
 * `AGENT_ROLES`; no se duplican nombres ni responsabilidades.
 */
export const SHEET_PHASES: SheetPhase[] = [
  { id: "01", label: "Solicitud", roleId: "leader" },
  { id: "02", label: "Planificación", roleId: "spec-author" },
  { id: "04", label: "Implementación", roleId: "implementer" },
  { id: "05", label: "Revisión", roleId: "reviewer" },
];
