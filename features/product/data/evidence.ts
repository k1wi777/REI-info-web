import type { EvidenceSource } from "@/features/product/types";

/**
 * Las siete fuentes externas de docs/product-strategy.md §3 y §20. Cada fila
 * conserva su enlace; no se añaden cifras ni fuentes nuevas.
 */
export const EVIDENCE: EvidenceSource[] = [
  {
    id: "replit",
    url: "https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure",
  },
  {
    id: "metr",
    url: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study",
  },
  {
    id: "gitclear",
    url: "https://www.gitclear.com/ai_assistant_code_quality_2025_research",
  },
  {
    id: "veracode",
    url: "https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report",
  },
  {
    id: "dora-2025",
    url: "https://dora.dev/dora-report-2025",
  },
  {
    id: "stack-overflow-2025",
    url: "https://survey.stackoverflow.co/2025/ai",
  },
  {
    id: "github-copilot-2023",
    url: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness",
  },
];
