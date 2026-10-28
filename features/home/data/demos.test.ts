import { AGENT_ROLES, CYCLE_STATES } from "@/content/rei";
import { HOME_ACTS, HOME_ANCHORS } from "./acts";
import {
  AGENT_NODES,
  ARTIFACT_TREE,
  GATE_DEMO,
  PROBLEM_DEMO,
  TERMINAL_SNAPSHOT,
} from "./demos";

const ORIGINAL_ANCHORS = [
  "problema",
  "solucion",
  "como-funciona",
  "agentes",
  "visor",
  "github",
  "limites",
];

describe("actos de la home", () => {
  it("define cuatro actos con anclas y tesis únicas", () => {
    expect(HOME_ACTS).toHaveLength(4);
    expect(new Set(HOME_ACTS.map((act) => act.anchor)).size).toBe(4);
    for (const act of HOME_ACTS) {
      expect(act.thesis.trim()).not.toBe("");
      expect(act.number).toMatch(/^0[1-4]$/);
      expect(["canvas", "deep", "surface"]).toContain(act.tone);
    }
  });

  it("conserva las siete anclas originales sin duplicarlas", () => {
    for (const anchor of ORIGINAL_ANCHORS) {
      expect(HOME_ANCHORS).toContain(anchor);
    }
    expect(new Set(HOME_ANCHORS).size).toBe(HOME_ANCHORS.length);
  });
});

describe("demo del problema", () => {
  it("contrasta sin REI y con REI sobre el mismo caso", () => {
    expect(PROBLEM_DEMO.map((column) => column.id)).toEqual([
      "sin-rei",
      "con-rei",
    ]);
    expect(PROBLEM_DEMO.every((column) => column.note.toLowerCase().includes("ejemplo"))).toBe(true);
  });

  it("numera pasos no vacíos y cada marca lleva etiqueta textual", () => {
    const ids = new Set<string>();
    for (const column of PROBLEM_DEMO) {
      expect(column.steps.length).toBeGreaterThan(0);
      for (const step of column.steps) {
        expect(step.title.trim()).not.toBe("");
        expect(step.detail.trim()).not.toBe("");
        expect(step.alertLabel.trim()).not.toBe("");
        expect(ids.has(step.id)).toBe(false);
        ids.add(step.id);
      }
    }
  });
});

describe("demo de la puerta", () => {
  it("respeta el orden de CYCLE_STATES", () => {
    const cycle = GATE_DEMO.flatMap((stage) => (stage.state ? [stage.state] : []));
    expect(cycle).toEqual(CYCLE_STATES.map((state) => state.id));
  });

  it("inserta una única puerta entre ready e in_progress", () => {
    const ids = GATE_DEMO.map((stage) => stage.id);
    expect(ids.indexOf("gate")).toBeGreaterThan(ids.indexOf("ready"));
    expect(ids.indexOf("gate")).toBeLessThan(ids.indexOf("in_progress"));
    expect(GATE_DEMO.filter((stage) => stage.gate)).toHaveLength(1);
  });

  it("revela los tres artefactos de planificación en ready", () => {
    const ready = GATE_DEMO.find((stage) => stage.id === "ready");
    expect(ready?.artifacts?.map((artifact) => artifact.name)).toEqual([
      "requirements.md",
      "design.md",
      "tasks.md",
    ]);
    for (const artifact of ready?.artifacts ?? []) {
      expect(artifact.note.trim()).not.toBe("");
    }
  });
});

describe("grafo de agentes", () => {
  it("incluye los cinco roles con el Initializer como rama", () => {
    expect(AGENT_NODES.map((node) => node.roleId).sort()).toEqual(
      AGENT_ROLES.map((role) => role.id).sort(),
    );
    expect(AGENT_NODES.filter((node) => !node.branch)).toHaveLength(4);
    expect(AGENT_NODES.find((node) => node.roleId === "initializer")?.branch).toBe(
      true,
    );
  });

  it("cada nodo declara un handoff no vacío", () => {
    for (const node of AGENT_NODES) {
      expect(node.handoff.trim()).not.toBe("");
    }
  });
});

describe("terminal y artefactos", () => {
  it("la instantánea no tiene ANSI ni líneas vacías", () => {
    expect(TERMINAL_SNAPSHOT.command).toBe("rei items status");
    expect(TERMINAL_SNAPSHOT.capturedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(TERMINAL_SNAPSHOT.lines.length).toBeGreaterThan(0);
    for (const line of TERMINAL_SNAPSHOT.lines) {
      expect(line.text.trim()).not.toBe("");
      expect(line.text).not.toMatch(/\u001b\[/);
      expect(["prompt", "output", "note"]).toContain(line.kind);
    }
  });

  it("el árbol usa rutas de .rei/specs/ y notas no vacías", () => {
    const ids = new Set<string>();
    for (const entry of ARTIFACT_TREE) {
      expect(entry.path.startsWith(".rei/specs/")).toBe(true);
      expect(entry.note.trim()).not.toBe("");
      expect(ids.has(entry.id)).toBe(false);
      ids.add(entry.id);
    }
    expect(ARTIFACT_TREE[0]?.depth).toBe(0);
    expect(ARTIFACT_TREE.some((entry) => entry.depth > 0)).toBe(true);
  });
});
