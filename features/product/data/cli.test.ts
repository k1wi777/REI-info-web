import { COMMANDS } from "@/content/rei";
import { CLI_SAMPLES, CLI_SNAPSHOT_DATE } from "@/features/product/data/cli";

describe("muestras del CLI", () => {
  it("declara tres comandos únicos y fechados", () => {
    expect(CLI_SAMPLES.map((sample) => sample.id)).toEqual([
      "item-show",
      "validate",
      "doctor",
    ]);

    const commands = CLI_SAMPLES.map((sample) => sample.command);
    expect(new Set(commands).size).toBe(commands.length);

    for (const sample of CLI_SAMPLES) {
      expect(sample.capturedAt).toBe(CLI_SNAPSHOT_DATE);
      expect(sample.lines[0]?.kind).toBe("prompt");
    }
  });

  it("usa ids reales de COMMANDS y la forma del example", () => {
    const commandIds = new Set(COMMANDS.map((command) => command.id));

    const examplePrefix = (example: string) => {
      const tokens = example.split(" ");
      const argument = tokens.findIndex(
        (token) =>
          token.startsWith("2026") ||
          token.startsWith("<") ||
          token.startsWith("["),
      );
      return (argument < 0 ? tokens : tokens.slice(0, argument)).join(" ");
    };

    for (const sample of CLI_SAMPLES) {
      expect(commandIds.has(sample.commandId)).toBe(true);

      const command = COMMANDS.find((candidate) => candidate.id === sample.commandId);
      expect(command).toBeDefined();

      const prefix = examplePrefix(command?.example ?? "");
      expect(prefix).not.toBe("");
      expect(sample.command.startsWith(prefix)).toBe(true);
      expect(sample.command.startsWith("rei ")).toBe(true);
      expect(sample.command.includes("\n")).toBe(false);
    }
  });

  it("fecha la instantánea con una fecha válida y no futura", () => {
    expect(CLI_SNAPSHOT_DATE).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    const captured = new Date(`${CLI_SNAPSHOT_DATE}T00:00:00`).getTime();
    expect(Number.isNaN(captured)).toBe(false);
    expect(captured).toBeLessThanOrEqual(Date.now());
  });

  it("abre cada muestra con su prompt y conserva la salida literal", () => {
    for (const sample of CLI_SAMPLES) {
      expect(sample.lines[0]).toEqual({
        kind: "prompt",
        text: sample.command,
      });

      for (const line of sample.lines) {
        expect(typeof line.text).toBe("string");
        if (line.kind !== "output") {
          expect(line.text.trim()).not.toBe("");
        }
      }

      const blanks = sample.lines.filter((line) => line.text === "");
      expect(blanks.every((line) => line.kind === "output")).toBe(true);
    }
  });

  it("mantiene los recuentos de líneas declarados en el diseño", () => {
    const counts = Object.fromEntries(
      CLI_SAMPLES.map((sample) => [
        sample.id,
        sample.lines.filter((line) => line.kind === "output").length,
      ]),
    );

    expect(counts).toEqual({ "item-show": 24, validate: 3, doctor: 43 });
  });
});
