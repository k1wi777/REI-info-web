import type { SheetMeta, SheetPhase } from "@/features/home/types";

/**
 * Hoja de ejemplo del primer viewport. Los valores describen un Work Item
 * real en la puerta de aprobación; no son métricas ni datos inventados. El
 * título y la etiqueta de aprobación salen de la copy del idioma.
 */
export const EXAMPLE_SHEET: SheetMeta = {
  code: "WI-014",
  revision: "REV. 03",
  type: "feature",
  state: "ready",
  checkpoints: "V1 · V4",
};

/**
 * Fases del ciclo que dibuja la matriz. El rol responsable sale de
 * `AGENT_ROLES`; no se duplican nombres ni responsabilidades. La etiqueta de
 * cada fase sale de la copy, por id.
 */
export const SHEET_PHASES: SheetPhase[] = [
  { id: "01", roleId: "leader" },
  { id: "02", roleId: "spec-author" },
  { id: "04", roleId: "implementer" },
  { id: "05", roleId: "reviewer" },
];
