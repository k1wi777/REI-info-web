import { EVIDENCE } from "@/features/product/data/evidence";
import type { EvidenceSourceId } from "@/features/product/types";

const EVIDENCE_IDS: EvidenceSourceId[] = [
  "replit",
  "metr",
  "gitclear",
  "veracode",
  "dora-2025",
  "stack-overflow-2025",
  "github-copilot-2023",
];

describe("evidencia externa de producto", () => {
  it("declara las siete fuentes canónicas en orden", () => {
    expect(EVIDENCE.map((source) => source.id)).toEqual(EVIDENCE_IDS);
  });

  it("usa identificadores y URLs únicas", () => {
    const ids = EVIDENCE.map((source) => source.id);
    const urls = EVIDENCE.map((source) => source.url);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("enlaza cada fuente con una URL https válida", () => {
    for (const source of EVIDENCE) {
      const url = new URL(source.url);
      expect(url.protocol).toBe("https:");
    }
  });

  it("rellena título, fecha, hallazgo e implicación", () => {
    for (const source of EVIDENCE) {
      expect(source.title.trim()).not.toBe("");
      expect(source.date.trim()).not.toBe("");
      expect(source.finding.trim()).not.toBe("");
      expect(source.implication.trim()).not.toBe("");
    }
  });
});
