import { CodeBlockView } from "@/components/ui/code-block-view";
import { getCurrentDictionary } from "@/content/i18n/server";

type CodeBlockProps = {
  code: string;
  language?: string;
  title?: string;
};

/**
 * Bloque de código para Server Components: toma los textos del botón de copiar
 * del idioma de la ruta. Los componentes de cliente usan `CodeBlockView`.
 */
export async function CodeBlock(props: CodeBlockProps) {
  const dictionary = await getCurrentDictionary();

  return <CodeBlockView {...props} copyLabels={dictionary.copy} />;
}
