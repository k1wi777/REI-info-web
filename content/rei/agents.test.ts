import {
  AGENT_ROLES,
  APPROVAL_GATE,
  WORK_ITEM_ROLES,
} from "@/content/rei/agents";
import type { AgentRoleId } from "@/content/rei/types";

const ROLE_IDS: AgentRoleId[] = [
  "leader",
  "spec-author",
  "implementer",
  "reviewer",
  "initializer",
];

const CYCLE_ROLE_IDS: AgentRoleId[] = [
  "leader",
  "spec-author",
  "implementer",
  "reviewer",
];

describe("roles del arnés", () => {
  it("declara los cinco roles canónicos una sola vez", () => {
    expect(AGENT_ROLES.map((role) => role.id)).toEqual(ROLE_IDS);
  });

  it("rellena nombre, responsabilidad, momento y límite de cada rol", () => {
    for (const role of AGENT_ROLES) {
      expect(role.name.trim()).not.toBe("");
      expect(role.responsibility.trim()).not.toBe("");
      expect(role.when.trim()).not.toBe("");
      expect(role.limit.trim()).not.toBe("");
    }
  });

  it("expone los cuatro roles del ciclo sin el Initializer", () => {
    expect(WORK_ITEM_ROLES.map((role) => role.id)).toEqual(CYCLE_ROLE_IDS);
    expect(WORK_ITEM_ROLES.map((role) => role.id)).not.toContain(
      "initializer",
    );
  });
});

describe("puerta de aprobación", () => {
  it("rellena identificador, etiqueta, estado y detalle", () => {
    expect(APPROVAL_GATE.id.trim()).not.toBe("");
    expect(APPROVAL_GATE.label.trim()).not.toBe("");
    expect(APPROVAL_GATE.status.trim()).not.toBe("");
    expect(APPROVAL_GATE.detail.trim()).not.toBe("");
  });
});
