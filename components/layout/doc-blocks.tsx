import type { DocBlock, DocSection } from "@/content/docs";
import { CodeBlock } from "@/components/ui/code-block";
import { cn } from "@/lib/cn";

type DocBlocksProps = {
  sections: DocSection[];
};

function Block({ block }: { block: DocBlock }) {
  switch (block.kind) {
    case "paragraph":
      return (
        <p className="max-w-(--container-reading) type-docs text-secondary">
          {block.text}
        </p>
      );

    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List
          className={cn(
            "flex max-w-(--container-reading) flex-col gap-2 pl-5 type-docs text-secondary",
            block.ordered ? "list-decimal" : "list-disc",
          )}
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      );
    }

    case "code":
      return (
        <CodeBlock
          code={block.code}
          language={block.language}
          title={block.title}
        />
      );

    case "table":
      return (
        <div className="min-w-0 max-w-full overflow-x-auto border border-hairline">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                {block.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="border-b border-hairline-strong px-3 py-2 type-meta text-muted-strong"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr
                  key={row.join("|")}
                  className="border-b border-hairline last:border-b-0"
                >
                  {row.map((cell) => (
                    <td
                      key={cell}
                      className="px-3 py-2.5 align-top type-docs text-secondary"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption ? (
            <p className="border-t border-hairline px-3 py-2 type-meta-sm text-muted-strong">
              {block.caption}
            </p>
          ) : null}
        </div>
      );

    case "note":
      return (
        <aside
          className={cn(
            "max-w-(--container-reading) border-l-2 py-1 pl-4",
            block.tone === "warning"
              ? "border-warning"
              : "border-border-strong",
          )}
        >
          <p
            className={cn(
              "type-meta",
              block.tone === "warning"
                ? "text-warning"
                : "text-muted-strong",
            )}
          >
            {block.title}
          </p>
          <p className="mt-1 type-docs text-secondary">{block.text}</p>
        </aside>
      );
  }
}

/** Renderiza las secciones tipadas de una página de prosa. */
export function DocBlocks({ sections }: DocBlocksProps) {
  return (
    <div className="flex flex-col gap-10">
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
              <Block key={`${section.id}-${index}`} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
