import { ProductProse } from "@/features/product/components/product-prose";
import { ProductSection } from "@/features/product/components/product-section";
import { CommandList } from "@/features/product/components/command-list";
import { EvidenceTable } from "@/features/product/components/evidence-table";
import { FlowSteps } from "@/features/product/components/flow-steps";
import { ProductArtifacts } from "@/features/product/components/product-artifacts";
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

    case "artifacts":
      return <ProductArtifacts items={block.items} />;

    case "roles":
      return <RoleList roleIds={block.roles} />;

    case "states":
      return <StateTable stateIds={block.states} />;

    case "evidence":
      return <EvidenceTable ids={block.ids} />;

    case "flow":
      return <FlowSteps />;

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
            <ProductBlockView
              key={`${section.id}-${blockIndex}`}
              block={block}
            />
          ))}
        </ProductSection>
      ))}
    </div>
  );
}
