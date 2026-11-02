/** Textos de `/docs/referencia/comandos`; las anclas y los comandos no cambian. */
export type CommandsPageCopy = {
  eyebrow: string;
  description: string;
  /** Usa `{commands}` y `{categories}`. */
  metaTemplate: string;
  exitCodes: {
    heading: string;
    intro: string;
    caption: string;
    code: string;
    meaning: string;
  };
  /** Usa `{category}` en `captionTemplate`. */
  index: {
    captionTemplate: string;
    command: string;
    whatItDoes: string;
    flags: string;
  };
  detail: {
    syntax: string;
    flags: string;
    noFlags: string;
    example: string;
    exitCodes: string;
    notes: string;
  };
};
