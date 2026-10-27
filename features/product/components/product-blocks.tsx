import { DocBlockView } from "@/components/layout/doc-blocks";
import { LinkList } from "@/components/ui/link-list";
import { CommandList } from "@/features/product/components/command-list";
import { EvidenceTable } from "@/features/product/components/evidence-table";
import { FlowSteps } from "@/features/product/components/flow-steps";
import { RoleList } from "@/features/product/components/role-list";
import { StateTable } from "@/features/product/components/state-table";
import type {
  ProductBlock,
  ProductSection,
} from "@/features/product/types";

function ProductBlockView({ block }: { block: ProductBlock }) {
  switch (block.kind) {
    case "paragraph":
    case "list":
    case "code":
    case "table":
    case "note":
      return <DocBlockView block={block} />;

    case "links":
      return <LinkList links={block.links} />;

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
  }
}

type ProductBlocksProps = {
  sections: ProductSection[];
};

/** Secciones de producto con los bloques genéricos delegados a docs. */
export function ProductBlocks({ sections }: ProductBlocksProps) {
  return (
    <div className="mt-8 flex flex-col gap-10">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
        >
          <h2
            id={`${section.id}-heading`}
            className="type-docs-heading text-foreground"
          >
            {section.title}
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            {section.blocks.map((block, index) => (
              <ProductBlockView
                key={`${section.id}-${index}`}
                block={block}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
