import type { EvidenceSource } from "@/features/product/types";

/**
 * Las siete fuentes externas de docs/product-strategy.md §3 y §20. Cada fila
 * conserva su enlace; no se añaden cifras ni fuentes nuevas.
 */
export const EVIDENCE: EvidenceSource[] = [
  {
    id: "replit",
    title: "Incidente de Replit",
    date: "Julio de 2025",
    finding:
      "Un agente eliminó una base de datos de producción durante un code freeze, ejecutó comandos destructivos sin autorización y generó datos falsos.",
    implication:
      "Es el caso más claro de por qué hacen falta aprobación humana, entornos separados y límites de acción.",
    url: "https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure",
  },
  {
    id: "metr",
    title: "METR",
    date: "2025",
    finding:
      "Estudio aleatorizado con desarrolladores open source experimentados: con IA tardaron un 19 % más, aunque creían haber sido un 20 % más rápidos.",
    implication:
      "La percepción de productividad no es evidencia. Hay que medir y verificar.",
    url: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study",
  },
  {
    id: "gitclear",
    title: "GitClear",
    date: "2025–2026",
    finding:
      "Más duplicación, más copy/paste, más churn y menos refactorización a medida que crece la autoría de IA.",
    implication:
      "La velocidad sin diseño degrada el mantenimiento.",
    url: "https://www.gitclear.com/ai_assistant_code_quality_2025_research",
  },
  {
    id: "veracode",
    title: "Veracode",
    date: "2025–2026",
    finding:
      "Alrededor del 45 % de las tareas de generación de código introdujeron una vulnerabilidad conocida; la seguridad no mejora necesariamente con modelos más grandes.",
    implication:
      "La revisión y los guardarraíles no son opcionales.",
    url: "https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report",
  },
  {
    id: "dora-2025",
    title: "DORA 2025",
    date: "2025",
    finding:
      "La adopción de IA se asocia a más throughput y a menor estabilidad de entrega: la IA amplifica las fortalezas y debilidades del sistema.",
    implication:
      "El proceso existente decide el resultado, no la herramienta.",
    url: "https://dora.dev/dora-report-2025",
  },
  {
    id: "stack-overflow-2025",
    title: "Stack Overflow 2025",
    date: "2025",
    finding:
      "84 % usa o planea usar IA; 46 % desconfía de la exactitud de sus resultados y solo 3 % confía mucho.",
    implication:
      "Existe demanda de confianza verificable, no solo de velocidad.",
    url: "https://survey.stackoverflow.co/2025/ai",
  },
  {
    id: "github-copilot-2023",
    title: "GitHub Copilot",
    date: "2023",
    finding:
      "En una tarea acotada, el grupo con Copilot terminó un 55,8 % más rápido.",
    implication:
      "La IA sí acelera tareas concretas; el problema es la falta de proceso.",
    url: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness",
  },
];
