import { fillTemplate } from "@/lib/template";

describe("fillTemplate", () => {
  it("sustituye cada marcador, también repetido", () => {
    expect(fillTemplate("{a} de {b} y {a}", { a: 1, b: "dos" })).toBe(
      "1 de dos y 1",
    );
  });

  it("deja intacto un marcador sin valor", () => {
    expect(fillTemplate("Paso {n}", {})).toBe("Paso {n}");
  });

  it("no toca texto sin marcadores", () => {
    expect(fillTemplate("sin marcadores", { n: 1 })).toBe("sin marcadores");
  });
});
