import {
  COMMAND_CATEGORIES,
  COMMAND_EXIT_CODE_CONVENTION,
  COMMANDS,
  STATE_TRANSITIONS,
  WORK_ITEM_STATES,
} from "@/content/rei";
import { reiProseEn, reiProseEs, transitionKey } from "@/content/i18n/rei";

describe("capa de prosa de content/rei", () => {
  it("el español es exactamente content/rei", () => {
    for (const state of WORK_ITEM_STATES) {
      expect(reiProseEs.states[state.id]).toBe(state.meaning);
    }
    for (const transition of STATE_TRANSITIONS) {
      expect(reiProseEs.transitions[transitionKey(transition)]).toBe(
        transition.note ?? "",
      );
    }
    for (const command of COMMANDS) {
      const prose = reiProseEs.commands[command.id];
      expect(prose.summary).toBe(command.summary);
      expect(prose.notes).toEqual(command.notes ?? []);
    }
  });

  it("el inglés cubre los mismos estados, aristas y categorías", () => {
    expect(Object.keys(reiProseEn.states).sort()).toEqual(
      WORK_ITEM_STATES.map((state) => state.id).sort(),
    );
    expect(Object.keys(reiProseEn.transitions).sort()).toEqual(
      STATE_TRANSITIONS.map(transitionKey).sort(),
    );
    expect(Object.keys(reiProseEn.categories).sort()).toEqual(
      COMMAND_CATEGORIES.map((category) => category.id).sort(),
    );
    expect(Object.keys(reiProseEn.exitCodeConvention).sort()).toEqual(
      COMMAND_EXIT_CODE_CONVENTION.map((entry) => entry.code).sort(),
    );
  });

  it("el inglés cubre los mismos comandos, flags, notas y códigos", () => {
    expect(Object.keys(reiProseEn.commands).sort()).toEqual(
      COMMANDS.map((command) => command.id).sort(),
    );
    for (const command of COMMANDS) {
      const prose = reiProseEn.commands[command.id];

      expect(prose.summary.trim()).not.toBe("");
      expect(Object.keys(prose.flags).sort()).toEqual(
        command.flags.map((flag) => flag.flag).sort(),
      );
      expect(prose.notes).toHaveLength((command.notes ?? []).length);
      expect(Object.keys(prose.exitCodes).sort()).toEqual(
        (command.exitCodes ?? []).map((entry) => entry.code).sort(),
      );
    }
  });
});
