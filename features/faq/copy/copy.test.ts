import { en } from "@/features/faq/copy/en";
import { es } from "@/features/faq/copy/es";
import { FAQ_THEME_IDS, buildFaqThemes, buildFaqToc } from "@/features/faq/data/faq";

const tokens = (text: string) => text.match(/`[^`]+`/g) ?? [];

describe("copy de la FAQ", () => {
  it("tiene los mismos temas y preguntas en el mismo orden en ambos idiomas", () => {
    expect(Object.keys(en.themes).sort()).toEqual([...FAQ_THEME_IDS].sort());
    for (const id of FAQ_THEME_IDS) {
      expect(en.themes[id].items).toHaveLength(es.themes[id].items.length);
    }
  });

  it("conserva los tokens entre backticks de cada respuesta", () => {
    for (const id of FAQ_THEME_IDS) {
      es.themes[id].items.forEach((item, index) => {
        expect(tokens(en.themes[id].items[index].answer)).toEqual(
          tokens(item.answer),
        );
      });
    }
  });

  it("no tiene campos vacíos", () => {
    for (const copy of [es, en]) {
      for (const text of [copy.eyebrow, copy.description, copy.metaTemplate]) {
        expect(text.trim()).not.toBe("");
      }
      for (const theme of buildFaqThemes(copy)) {
        expect(theme.title.trim()).not.toBe("");
        for (const item of theme.items) {
          expect(item.question.trim()).not.toBe("");
          expect(item.answer.trim()).not.toBe("");
        }
      }
    }
  });

  it("el índice usa anclas estables faq-<id> en ambos idiomas", () => {
    for (const copy of [es, en]) {
      expect(buildFaqToc(copy).map((item) => item.id)).toEqual(
        FAQ_THEME_IDS.map((id) => `faq-${id}`),
      );
    }
  });

  it("el español conserva el texto previo", () => {
    expect(es.themes["work-items"].items[0].question).toBe(
      "¿Puedo tener varios Work Items en paralelo?",
    );
    expect(es.metaTemplate).toBe("{questions} preguntas · {topics} temas");
  });
});
