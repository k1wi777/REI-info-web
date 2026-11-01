import type { HomeCopy } from "@/features/home/copy/types";
import type { HomeAct, HomeActId, HomeActTone } from "@/features/home/types";

type ActBase = {
  id: HomeActId;
  anchor: string;
  number: string;
  tone: HomeActTone;
};

/**
 * Los cuatro actos de la home. El tono solo elige entre tokens existentes:
 * `canvas`, `surface-deep` y `surface`. Etiqueta y tesis salen de la copy.
 */
const ACT_BASES: ActBase[] = [
  { id: "problema", anchor: "problema", number: "01", tone: "canvas" },
  { id: "proceso", anchor: "como-funciona", number: "02", tone: "deep" },
  { id: "evidencia", anchor: "evidencia", number: "03", tone: "surface" },
  { id: "cierre", anchor: "siguiente-paso", number: "04", tone: "canvas" },
];

export function buildActs(copy: HomeCopy["acts"]): HomeAct[] {
  return ACT_BASES.map((act) => ({ ...act, ...copy[act.id] }));
}

/**
 * Anclas públicas de la home. Las siete originales se conservan y las nuevas
 * se añaden sin retirar ninguna: el hero enlaza a `#como-funciona`.
 */
export const HOME_ANCHORS = [
  "problema",
  "solucion",
  "como-funciona",
  "agentes",
  "visor",
  "github",
  "evidencia",
  "limites",
  "siguiente-paso",
] as const;
