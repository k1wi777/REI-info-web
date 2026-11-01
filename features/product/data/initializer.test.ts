import { readFileSync } from "node:fs";
import path from "node:path";
import { INITIALIZER_CAPTURE } from "@/features/product/data/initializer";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const MANIFESTED_FILE = /^(gh|view)-.*\.png$/;

const capturePath = (file: string) =>
  path.join(PUBLIC_DIR, file.replace(/^\//, ""));

describe("captura del Initializer", () => {
  it("declara un archivo publicado con firma PNG y dimensiones reales", () => {
    expect(INITIALIZER_CAPTURE.file.startsWith("/evidence/")).toBe(true);

    const file = capturePath(INITIALIZER_CAPTURE.file);
    expect(() => readFileSync(file)).not.toThrow();

    const png = readFileSync(file);
    expect(png.toString("ascii", 1, 4)).toBe("PNG");
    expect(png.readUInt32BE(16)).toBe(INITIALIZER_CAPTURE.width);
    expect(png.readUInt32BE(20)).toBe(INITIALIZER_CAPTURE.height);
    expect(INITIALIZER_CAPTURE.width).toBeGreaterThan(0);
    expect(INITIALIZER_CAPTURE.height).toBeGreaterThan(0);
  });

  it("fecha la captura y describe la ventana y el comando", () => {
    expect(
      Number.isNaN(Date.parse(INITIALIZER_CAPTURE.capturedAt)),
    ).toBe(false);
    expect(INITIALIZER_CAPTURE.label.trim()).not.toBe("");
    expect(INITIALIZER_CAPTURE.meta.trim()).not.toBe("");
  });

  it("queda fuera del manifiesto generado y del pipeline de captura", () => {
    const name = path.basename(INITIALIZER_CAPTURE.file);
    expect(MANIFESTED_FILE.test(name)).toBe(false);
  });
});
