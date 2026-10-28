import { parseInline } from "@/lib/inline";

describe("parseInline", () => {
  it("devuelve un solo segmento de texto para texto plano", () => {
    expect(parseInline("Sin comandos")).toEqual([
      { type: "text", value: "Sin comandos" },
    ]);
  });

  it("separa un fragmento de código y el texto que lo rodea", () => {
    expect(parseInline("Ejecuta `rei check` antes de revisar")).toEqual([
      { type: "text", value: "Ejecuta " },
      { type: "code", value: "rei check" },
      { type: "text", value: " antes de revisar" },
    ]);
  });

  it("admite varios fragmentos y comandos con <id> y flags", () => {
    expect(
      parseInline(
        "El Leader ejecuta `rei status set <id> in_progress` y luego `rei update --check`.",
      ),
    ).toEqual([
      { type: "text", value: "El Leader ejecuta " },
      { type: "code", value: "rei status set <id> in_progress" },
      { type: "text", value: " y luego " },
      { type: "code", value: "rei update --check" },
      { type: "text", value: "." },
    ]);
  });

  it("trata un backtick sin cerrar como texto desde ese carácter", () => {
    expect(parseInline("Comando `rei check")).toEqual([
      { type: "text", value: "Comando `rei check" },
    ]);
  });

  it("conserva un par vacío como texto para no generar código vacío", () => {
    expect(parseInline("Vacío: `` fin")).toEqual([
      { type: "text", value: "Vacío: `` fin" },
    ]);
  });

  it("devuelve una lista vacía para texto vacío", () => {
    expect(parseInline("")).toEqual([]);
  });

  it("reconstruye la entrada a partir de los segmentos", () => {
    const text =
      "Usa `rei view <id>` y `--open`; el resto queda como texto.";
    const rebuilt = parseInline(text)
      .map((segment) =>
        segment.type === "code" ? `\`${segment.value}\`` : segment.value,
      )
      .join("");

    expect(rebuilt).toBe(text);
  });
});
