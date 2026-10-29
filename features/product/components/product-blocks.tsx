import { ProductProse } from "@/features/product/components/product-prose";
import { ProductSection } from "@/features/product/components/product-section";
import { ArtifactTree } from "@/features/product/components/artifact-tree";
import { CliEvidence } from "@/features/product/components/cli-evidence";
import { CycleSteps } from "@/features/product/components/cycle-steps";
import { CommandList } from "@/features/product/components/command-list";
import { EvidenceTable } from "@/features/product/components/evidence-table";
import { ProductAudiences } from "@/features/product/components/product-audiences";
import { ProductChoices } from "@/features/product/components/product-choices";
import { ProductIssue } from "@/features/product/components/product-issue";
import { ProductLinks } from "@/features/product/components/product-links";
import { ProductPoints } from "@/features/product/components/product-points";
import { ProductProjection } from "@/features/product/components/product-projection";
import { ProductViewer } from "@/features/product/components/product-viewer";
import { RoleList } from "@/features/product/components/role-list";
import { StateTable } from "@/features/product/components/state-table";
import type {
  ProductBlock,
  ProductSection as ProductSectionData,
} from "@/features/product/types";
import { cn } from "@/lib/cn";

/**
 * Las listas-registro del dossier comparten el mismo marco: borde superior en
 * la lista, laterales y cierre inferior en el contenedor, y padding interno
 * para que el contenido y las flechas no toquen los bordes.
 */
const PRODUCT_FRAME = cn(
  "[&>ol]:border-x [&>ol]:border-b [&>ol]:border-hairline-strong",
  "[&>ul]:border-x [&>ul]:border-b [&>ul]:border-hairline-strong",
  "[&>div>ol]:border-x [&>div>ol]:border-b [&>div>ol]:border-hairline-strong",
  "[&>div>ul]:border-x [&>div>ul]:border-b [&>div>ul]:border-hairline-strong",
  "[&>ol>li]:px-4 [&>ul>li]:px-4 [&>div>ol>li]:px-4 [&>div>ul>li]:px-4",
  "[&>ol>li:last-child]:border-b-0 [&>ul>li:last-child]:border-b-0",
  "[&>div>ol>li:last-child]:border-b-0 [&>div>ul>li:last-child]:border-b-0",
  "[&>ul>li:last-child>a]:border-b-0 [&>div>ul>li:last-child>a]:border-b-0",
);

function isFramedBlock(block: ProductBlock): boolean {
  switch (block.kind) {
    case "links":
    case "audiences":
    case "roles":
    case "states":
    case "evidence":
    case "commands":
      return true;
    case "points":
      return block.variant !== "manifesto" && block.variant !== "columns";
    default:
      return false;
  }
}

function ProductBlockView({ block }: { block: ProductBlock }) {
  switch (block.kind) {
    case "paragraph":
    case "list":
    case "code":
    case "table":
    case "note":
      return <ProductProse block={block} />;

    case "links":
      return <ProductLinks links={block.links} />;

    case "points":
      return <ProductPoints points={block.points} variant={block.variant} />;

    case "choices":
      return <ProductChoices choices={block.choices} />;

    case "audiences":
      return <ProductAudiences items={block.items} />;

    case "cycle":
      return <CycleSteps />;

    case "terminal":
      return (
        <div className="grid gap-4 lg:grid-cols-12 lg:items-start lg:gap-6">
          <div className="min-w-0 lg:col-span-7 xl:col-span-8">
            <CliEvidence />
          </div>
          <div className="min-w-0 lg:col-span-5 xl:col-span-4">
            <ArtifactTree />
          </div>
        </div>
      );

    case "roles":
      return <RoleList roleIds={block.roles} />;

    case "states":
      return <StateTable stateIds={block.states} />;

    case "evidence":
      return <EvidenceTable ids={block.ids} />;

    case "commands":
      return <CommandList ids={block.ids} />;

    case "viewer":
      return <ProductViewer caption={block.caption} />;

    case "issue":
      return <ProductIssue number={block.number} caption={block.caption} />;

    case "projection":
      return <ProductProjection />;
  }
}

type ProductBlocksProps = {
  sections: ProductSectionData[];
};

/** Hojas del dossier: cada sección aporta su peso y sus bloques propios. */
export function ProductBlocks({ sections }: ProductBlocksProps) {
  return (
    <div className="mt-12 flex flex-col gap-10 lg:mt-16 lg:gap-12">
      {sections.map((section, index) => (
        <ProductSection
          key={section.id}
          section={section}
          folio={`P.${String(index + 1).padStart(2, "0")}`}
        >
          {section.blocks.map((block, blockIndex) => (
            <div
              key={`${section.id}-${blockIndex}`}
              className={cn(
                "min-w-0",
                isFramedBlock(block) && PRODUCT_FRAME,
              )}
            >
              <ProductBlockView block={block} />
            </div>
          ))}
        </ProductSection>
      ))}
    </div>
  );
}
