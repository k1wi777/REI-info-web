import { InlineText } from "@/components/ui/inline-text";
import { getCurrentProductCopy } from "@/features/product/copy/server";
import type { ProductCopy } from "@/features/product/copy/types";
import type { ProductChoice } from "@/features/product/types";

type ProductChoicesProps = {
  choices: ProductChoice[];
};

function documentCount(count: number, text: ProductCopy["choices"]): string {
  return `${String(count).padStart(2, "0")} ${
    count === 1 ? text.documentOne : text.documentOther
  }`;
}

/**
 * Feature y Task como dos filas del mismo registro: tipo, planificación y
 * criterio en columnas alineadas. La comparación se lee de un vistazo y la
 * lista de artefactos conserva la forma de árbol de `.rei/`.
 */
export async function ProductChoices({ choices }: ProductChoicesProps) {
  const { choices: text } = await getCurrentProductCopy();
  return (
    <div className="border border-hairline-strong">
      <div className="hidden grid-cols-12 gap-6 border-b border-hairline px-4 pb-2 pt-3 type-meta-sm text-muted-strong sm:grid">
        <p className="col-span-3">{text.type}</p>
        <p className="col-span-4">{text.planning}</p>
        <p className="col-span-5">{text.criterion}</p>
      </div>

      {choices.map((choice) => (
        <article
          key={choice.id}
          className="grid gap-4 border-b border-hairline px-4 py-5 last:border-b-0 sm:grid-cols-12 sm:gap-6 sm:py-6"
        >
          <div className="min-w-0 sm:col-span-3">
            <h3 className="type-docs-title text-foreground">{choice.name}</h3>
            <p className="mt-1 type-meta-sm text-muted-strong">
              {documentCount(choice.planning.length, text)}
            </p>
          </div>

          <div className="min-w-0 sm:col-span-4">
            <p className="type-meta-sm text-muted-strong sm:hidden">
              {text.planning}
            </p>
            <ul className="mt-2 border-l border-border-strong sm:mt-0">
              {choice.planning.map((artifact) => (
                <li
                  key={artifact}
                  className="relative border-b border-hairline py-1.5 pl-4 last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.95em] left-0 h-px w-3 bg-border-strong"
                  />
                  <span className="type-code text-foreground">{artifact}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 sm:col-span-5">
            <p className="type-meta-sm text-muted-strong sm:hidden">
              {text.criterion}
            </p>
            <p className="mt-2 max-w-[46ch] type-body text-secondary sm:mt-0">
              <InlineText text={choice.when} />
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
