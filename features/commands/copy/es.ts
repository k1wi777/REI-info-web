import type { CommandsPageCopy } from "@/features/commands/copy/types";

export const es: CommandsPageCopy = {
  eyebrow: "Referencia",
  description:
    "Referencia del CLI rei agrupada por la tarea que resuelve. Todos los comandos aceptan rei <comando> --help.",
  metaTemplate: "{commands} comandos · {categories} categorías",
  exitCodes: {
    heading: "Códigos de salida",
    intro:
      "La convención general se aplica salvo que el comando documente sus propios códigos en el detalle. El código de salida es la señal que usa el workflow para saber si una verificación pasó.",
    caption: "Convención de códigos de salida del CLI",
    code: "Código",
    meaning: "Significado",
  },
  index: {
    captionTemplate: "{category}: comandos, qué hacen y flags",
    command: "Comando",
    whatItDoes: "Qué hace",
    flags: "Flags",
  },
  detail: {
    syntax: "Sintaxis",
    flags: "Flags",
    noFlags: "Sin flags propios.",
    example: "Ejemplo",
    exitCodes: "Códigos de salida",
    notes: "Notas",
  },
};
