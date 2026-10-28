import { InlineText } from "@/components/ui/inline-text";
import type { ProductChoice } from "@/features/product/types";

type ProductChoicesProps = {
  choices: ProductChoice[];
};

/**
 * Dos tipos de Work Item, lado a lado y separados por un hairline. No son
 * tarjetas: cada columna es una opción real con sus artefactos y su criterio.
 */
export function ProductChoices({ choices }: ProductChoicesProps) {
  return (
    <div className="grid gap-px border border-hairline-strong bg-hairline-strong sm:grid-cols-2">
      {choices.map((choice) => (
        <article
          key={choice.id}
          className="flex h-full flex-col bg-canvas p-5 sm:p-6"
        >
          <h3 className="type-docs-heading text-foreground">{choice.name}</h3>

          <p className="mt-5 type-meta-sm text-muted-strong">
            Planificación
          </p>
          <ul className="mt-2 border-t border-hairline">
            {choice.planning.map((artifact) => (
              <li
                key={artifact}
                className="border-b border-hairline py-2 type-code text-foreground"
              >
                {artifact}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <p className="type-meta-sm text-muted-strong">Cuándo usarlo</p>
            <p className="mt-2 type-body text-secondary">
              <InlineText text={choice.when} />
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
