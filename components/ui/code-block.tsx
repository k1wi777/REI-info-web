import { CopyButton } from "@/components/ui/copy-button";

type CodeBlockProps = {
  code: string;
  language?: string;
  title?: string;
};

/**
 * Bloque de código servido en HTML y legible sin JavaScript. El botón de
 * copiar es una mejora; el contenido nunca depende de él.
 */
export function CodeBlock({ code, language, title }: CodeBlockProps) {
  return (
    <div className="min-w-0 max-w-full overflow-hidden rounded-sm border border-hairline-strong">
      <div className="flex items-center justify-between gap-3 border-b border-hairline bg-surface px-3 py-1.5">
        <span className="type-meta-sm text-muted-strong">
          {title ?? language ?? "Shell"}
        </span>
        <CopyButton code={code} />
      </div>
      <pre className="max-w-full overflow-x-auto bg-surface-deep px-4 py-3 type-code text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}
