import { InlineText } from "@/components/ui/inline-text";
import type { ProductArtifact } from "@/features/product/types";

type ProductArtifactsProps = {
  items: ProductArtifact[];
};

/**
 * Los documentos que deja un Work Item, con su responsable. Se leen como un
 * registro encuadernado: nombre en mono, qué deja y quién lo escribe.
 */
export function ProductArtifacts({ items }: ProductArtifactsProps) {
  return (
    <div>
      <div className="hidden border-b border-hairline-strong py-2 lg:grid lg:grid-cols-[13rem_1fr_14rem] lg:gap-8">
        <p className="type-meta-sm text-muted-strong">Documento</p>
        <p className="type-meta-sm text-muted-strong">Qué deja</p>
        <p className="type-meta-sm text-muted-strong lg:text-right">
          Responsable
        </p>
      </div>

      <ol className="border-t border-hairline-strong lg:border-t-0">
        {items.map((item) => (
          <li
            key={item.id}
            className="grid gap-2 border-b border-hairline py-4 lg:grid-cols-[13rem_1fr_14rem] lg:items-baseline lg:gap-8"
          >
            <p className="type-code text-foreground">{item.name}</p>

            <p className="max-w-[52ch] type-body text-secondary">
              <InlineText text={item.detail} />
            </p>

            <p className="type-caption text-muted-strong lg:text-right">
              {item.owner}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
