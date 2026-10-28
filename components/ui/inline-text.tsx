import { Fragment } from "react";
import { parseInline } from "@/lib/inline";

type InlineTextProps = {
  text: string;
};

/**
 * Renderiza texto con comandos entre backticks. No usa elementos de bloque:
 * se puede insertar dentro de párrafos, listas, celdas y términos de definición.
 */
export function InlineText({ text }: InlineTextProps) {
  return (
    <>
      {parseInline(text).map((segment, index) =>
        segment.type === "code" ? (
          <code
            key={index}
            className="rounded-xs border border-hairline bg-surface px-1 py-0.5 font-mono text-[0.92em] text-foreground normal-case"
          >
            {segment.value}
          </code>
        ) : (
          <Fragment key={index}>{segment.value}</Fragment>
        ),
      )}
    </>
  );
}
