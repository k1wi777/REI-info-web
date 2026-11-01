import {
  ARTIFACT_ENTRIES,
  ARTIFACT_GROUPS,
} from "@/features/product/data/artifacts";

const ROOTS = {
  specs: ".rei/specs/<id>/",
  progress: ".rei/progress/",
  "work-items": ".rei/progress/work-items/<id>/",
};

describe("árbol de artefactos", () => {
  it("declara las tres raíces reales de .rei/", () => {
    expect(ARTIFACT_GROUPS.map((group) => group.id)).toEqual([
      "specs",
      "progress",
      "work-items",
    ]);

    for (const group of ARTIFACT_GROUPS) {
      expect(group.root).toBe(ROOTS[group.id]);
      expect(group.entries.length).toBeGreaterThan(0);
    }
  });

  it("usa ids y rutas únicas, sin repetir ningún documento", () => {
    const ids = ARTIFACT_ENTRIES.map((entry) => entry.id);
    const paths = ARTIFACT_ENTRIES.map((entry) => entry.path);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("incluye la planificación de Feature y de Task", () => {
    const paths = new Set(ARTIFACT_ENTRIES.map((entry) => entry.path));

    for (const file of [
      "meta.json",
      "requirements.md",
      "design.md",
      "tasks.md",
      "plan.md",
      "links.json",
    ]) {
      expect(paths.has(`${ROOTS.specs}${file}`)).toBe(true);
    }

    for (const entry of ARTIFACT_ENTRIES) {
      expect(
        Object.values(ROOTS).some((root) => entry.path.startsWith(root)),
      ).toBe(true);
    }
  });

  it("coloca impl.md y review.md bajo work-items/<id>/", () => {
    for (const file of ["impl.md", "review.md"]) {
      const entry = ARTIFACT_ENTRIES.find(
        (candidate) => candidate.path === `${ROOTS["work-items"]}${file}`,
      );
      expect(entry).toBeDefined();
      expect(entry?.appliesTo).toBe("ambos");
    }
  });

  it("sitúa spec.md como bloqueo en el registro del Work Item", () => {
    const spec = ARTIFACT_ENTRIES.find((entry) => entry.id === "spec");
    expect(spec?.path).toBe(`${ROOTS["work-items"]}spec.md`);
    expect(spec?.appliesTo).toBe("bloqueo");
    expect(
      ARTIFACT_ENTRIES.some(
        (entry) => entry.path === `${ROOTS.specs}spec.md`,
      ),
    ).toBe(false);
  });

  it("documenta qué deja y quién escribe cada entrada", () => {
    const tags = new Set([
      "feature",
      "task",
      "ambos",
      "sesion",
      "opcional",
      "bloqueo",
      "estado",
    ]);

    for (const entry of ARTIFACT_ENTRIES) {
      expect(entry.path.trim()).not.toBe("");
      expect(tags.has(entry.appliesTo)).toBe(true);
    }
  });
});
