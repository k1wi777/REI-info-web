export type InlineSegment = {
  type: "text" | "code";
  value: string;
};

/**
 * Separa un texto con backticks en segmentos de texto y código.
 * Un par vacío se conserva como texto y un backtick sin cerrar se trata como
 * texto desde ese carácter; la concatenación siempre reproduce la entrada.
 */
export function parseInline(text: string): InlineSegment[] {
  if (text === "") {
    return [];
  }

  const segments: InlineSegment[] = [];
  let buffer = "";
  let index = 0;

  while (index < text.length) {
    if (text[index] !== "`") {
      buffer += text[index];
      index += 1;
      continue;
    }

    const close = text.indexOf("`", index + 1);

    if (close === -1) {
      buffer += text.slice(index);
      break;
    }

    if (close === index + 1) {
      buffer += "``";
      index += 2;
      continue;
    }

    if (buffer !== "") {
      segments.push({ type: "text", value: buffer });
      buffer = "";
    }

    segments.push({ type: "code", value: text.slice(index + 1, close) });
    index = close + 1;
  }

  if (buffer !== "") {
    segments.push({ type: "text", value: buffer });
  }

  return segments;
}
