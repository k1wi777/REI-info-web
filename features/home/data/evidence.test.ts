import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import {
  EVIDENCE_ISSUES,
  EVIDENCE_MANIFEST,
  ISSUE_CAPTURES,
  VIEWER_CAPTURES,
  issueBody,
  issueHead,
  viewerCapture,
} from "./evidence";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const EVIDENCE_DIR = path.join(PUBLIC_DIR, "evidence");
const EVIDENCE_FILE = /^(gh|view)-.*\.png$/;
const ISSUE_URL = (issue: number) =>
  `https://github.com/k1wi777/REI-Harness/issues/${issue}`;

const capturePath = (file: string) =>
  path.join(PUBLIC_DIR, file.replace(/^\//, ""));

describe("manifiesto de evidencia", () => {
  it("declara el repositorio y el Work Item del visor", () => {
    expect(EVIDENCE_MANIFEST.repository).toBe(
      "https://github.com/k1wi777/REI-Harness",
    );
    expect(EVIDENCE_MANIFEST.viewerWorkItem).not.toBe("");
    expect(Number.isNaN(Date.parse(EVIDENCE_MANIFEST.generatedAt))).toBe(false);
    expect(EVIDENCE_MANIFEST.captures.length).toBeGreaterThan(0);
  });

  it("cada captura tiene archivo, dimensiones, alt, fuente y fecha reales", () => {
    for (const capture of EVIDENCE_MANIFEST.captures) {
      const file = capturePath(capture.file);
      expect(() => readFileSync(file)).not.toThrow();
      const png = readFileSync(file);
      expect(png.toString("ascii", 1, 4)).toBe("PNG");
      expect(png.readUInt32BE(16)).toBe(capture.width);
      expect(png.readUInt32BE(20)).toBe(capture.height);
      expect(capture.width).toBeGreaterThan(0);
      expect(capture.height).toBeGreaterThan(0);
      expect(capture.alt.trim()).not.toBe("");
      expect(capture.description.trim()).not.toBe("");
      expect(capture.source.trim()).not.toBe("");
      expect(Number.isNaN(Date.parse(capture.capturedAt))).toBe(false);
    }
  });

  it("no repite identificadores ni archivos", () => {
    const ids = EVIDENCE_MANIFEST.captures.map((capture) => capture.id);
    const files = EVIDENCE_MANIFEST.captures.map((capture) => capture.file);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(files).size).toBe(files.length);
  });

  it("todo archivo publicado aparece en el manifiesto y viceversa", () => {
    const published = readdirSync(EVIDENCE_DIR)
      .filter((file) => EVIDENCE_FILE.test(file))
      .sort();
    const declared = EVIDENCE_MANIFEST.captures
      .map((capture) => path.basename(capture.file))
      .sort();
    expect(published).toEqual(declared);
  });
});

describe("capturas de GitHub Issues", () => {
  it("son las issues públicas, con labels y estado publicados", () => {
    expect(ISSUE_CAPTURES.length).toBeGreaterThan(0);
    for (const capture of ISSUE_CAPTURES) {
      expect([2, 3, 5, 9]).toContain(capture.issue ?? 0);
      expect(capture.source).toBe(ISSUE_URL(capture.issue ?? 0));
      expect(capture.labels?.length ?? 0).toBeGreaterThan(0);
      expect(["open", "closed"]).toContain(capture.state ?? "");
      expect(capture.kind).toBe("issue");
    }
  });

  it("incluye cabecera y cuerpo de las tres issues requeridas", () => {
    for (const issue of [2, 3, 5]) {
      expect(EVIDENCE_ISSUES).toContain(issue);
      expect(issueHead(issue)).toBeDefined();
      expect(issueBody(issue)).toBeDefined();
    }
  });
});

describe("capturas del visor", () => {
  it("apuntan al Work Item declarado y a vistas válidas", () => {
    expect(VIEWER_CAPTURES.length).toBeGreaterThan(0);
    for (const capture of VIEWER_CAPTURES) {
      expect(capture.workItem).toBe(EVIDENCE_MANIFEST.viewerWorkItem);
      expect(["desktop", "ficha", "mobile", "diff"]).toContain(capture.view ?? "");
      expect(capture.kind).toBe("viewer");
    }
  });

  it("incluye escritorio, FICHA y móvil; el diff es condicional", () => {
    expect(viewerCapture("desktop")).toBeDefined();
    expect(viewerCapture("ficha")).toBeDefined();
    expect(viewerCapture("mobile")).toBeDefined();
    if (viewerCapture("diff")) {
      expect(viewerCapture("diff")?.view).toBe("diff");
    }
  });
});
