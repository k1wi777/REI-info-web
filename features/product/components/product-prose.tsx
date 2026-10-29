import type { DocBlock } from "@/content/docs";
import { CodeBlock } from "@/components/ui/code-block";
import { InlineText } from "@/components/ui/inline-text";
import { cn } from "@/lib/cn";

/** Prosa del dossier: 17 px, medida corta y marcas textuales, sin filetes de color. */
export function ProductProse({ block }: { block: DocBlock }) {
  switch (block.kind) {
    case "paragraph":
      return (
        <p className="max-w-[62ch] type-body text-secondary">
          <InlineText text={block.text} />
        </p>
      );

    case "list": {
      if (block.ordered) {
        return (
          <ol className="grid max-w-[62ch] gap-2.5">
            {block.items.map((item, index) => (
              <li
                key={item}
                className="grid grid-cols-[2rem_1fr] items-baseline gap-3"
              >
                <span className="type-meta-sm text-muted-strong tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="type-body text-secondary">
                  <InlineText text={item} />
                </span>
              </li>
            ))}
          </ol>
        );
      }

      return (
        <ul className="grid max-w-[62ch] gap-2.5">
          {block.items.map((item) => (
            <li
              key={item}
              className="grid grid-cols-[1.25rem_1fr] items-baseline gap-3"
            >
              <span aria-hidden="true" className="type-code text-muted-strong">
                —
              </span>
              <span className="type-body text-secondary">
                <InlineText text={item} />
              </span>
            </li>
          ))}
        </ul>
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
                    className="border-b border-hairline-strong px-3 py-2.5 type-meta-sm text-muted-strong"
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
                      className="px-3 py-3 align-top type-docs text-secondary"
                    >
                      <InlineText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption ? (
            <p className="border-t border-hairline px-3 py-2 type-caption text-muted-strong">
              {block.caption}
            </p>
          ) : null}
        </div>
      );

    case "note":
      return (
        <aside
          className={cn(
            "max-w-[62ch] border bg-surface px-5 py-4",
            block.tone === "warning"
              ? "border-warning/40"
              : "border-hairline-strong",
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
            <InlineText text={block.title} />
          </p>
          <p className="mt-2 type-body text-secondary">
            <InlineText text={block.text} />
          </p>
        </aside>
      );

    case "links":
      return null;
  }
}
