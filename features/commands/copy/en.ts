import type { CommandsPageCopy } from "@/features/commands/copy/types";

export const en: CommandsPageCopy = {
  eyebrow: "Reference",
  description:
    "Reference for the rei CLI, grouped by the task each command solves. Every command accepts rei <command> --help.",
  metaTemplate: "{commands} commands · {categories} categories",
  exitCodes: {
    heading: "Exit codes",
    intro:
      "The general convention applies unless the command documents its own codes in its detail. The exit code is the signal the workflow uses to know whether a verification passed.",
    caption: "CLI exit code convention",
    code: "Code",
    meaning: "Meaning",
  },
  index: {
    captionTemplate: "{category}: commands, what they do and flags",
    command: "Command",
    whatItDoes: "What it does",
    flags: "Flags",
  },
  detail: {
    syntax: "Syntax",
    flags: "Flags",
    noFlags: "No flags of its own.",
    example: "Example",
    exitCodes: "Exit codes",
    notes: "Notes",
  },
};
