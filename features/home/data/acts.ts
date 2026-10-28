import type { HomeAct } from "@/features/home/types";

/**
 * Los cuatro actos de la home. El tono solo elige entre tokens existentes:
 * `canvas`, `surface-deep` y `surface`.
 */
export const HOME_ACTS: HomeAct[] = [
  {
    id: "problema",
    anchor: "problema",
    number: "01",
    label: "Problema",
    thesis: "La IA escribe rápido; sin proceso, el retrabajo también.",
    tone: "canvas",
  },
  {
    id: "proceso",
    anchor: "como-funciona",
    number: "02",
    label: "Proceso",
    thesis: "Una hoja, una firma, evidencia: la persona decide antes de que se escriba código.",
    tone: "deep",
  },
  {
    id: "evidencia",
    anchor: "evidencia",
    number: "03",
    label: "Evidencia",
    thesis: "El producto real: el visor, las GitHub Issues y los límites del arnés.",
    tone: "surface",
  },
  {
    id: "cierre",
    anchor: "siguiente-paso",
    number: "04",
    label: "Cierre",
    thesis: "La evidencia queda en tu repositorio; el siguiente Work Item lo abres tú.",
    tone: "canvas",
  },
];

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
