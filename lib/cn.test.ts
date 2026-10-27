import { cn } from "@/lib/cn";

describe("cn", () => {
  it("concatena las clases con un único espacio", () => {
    expect(cn("flex", "items-center")).toBe("flex items-center");
  });

  it("ignora los valores falsy", () => {
    expect(cn("flex", false, null, undefined, "gap-2")).toBe("flex gap-2");
  });

  it("devuelve una cadena vacía sin argumentos", () => {
    expect(cn()).toBe("");
  });

  it("no reordena ni deduplica clases", () => {
    expect(cn("b", "a", "b")).toBe("b a b");
  });
});
