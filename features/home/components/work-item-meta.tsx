import { getCurrentHomeCopy } from "@/features/home/copy/server";
import type { HomeCopy } from "@/features/home/copy/types";
import { cn } from "@/lib/cn";
import { EXAMPLE_SHEET } from "@/features/home/data/sheet";

type MetaRow = {
  label: string;
  value: string;
  tone?: "accent" | "warning";
};

function buildRows(sheet: HomeCopy["sheet"]): MetaRow[] {
  return [
    { label: sheet.meta.state, value: EXAMPLE_SHEET.state, tone: "accent" },
    { label: sheet.meta.checkpoints, value: EXAMPLE_SHEET.checkpoints },
    { label: sheet.meta.approval, value: sheet.gate.status, tone: "warning" },
    { label: sheet.meta.type, value: EXAMPLE_SHEET.type },
  ];
}

/** Pie de la ficha: metadata de la hoja de ejemplo, sin métricas inventadas. */
export async function WorkItemMeta() {
  const { sheet } = await getCurrentHomeCopy();
  const rows = buildRows(sheet);

  return (
    <footer className="border-t border-hairline-strong px-4 py-4">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="type-meta-sm text-muted-strong">{row.label}</dt>
            <dd
              className={cn(
                "mt-1 type-meta",
                row.tone === "accent"
                  ? "text-accent-text"
                  : row.tone === "warning"
                    ? "text-warning"
                    : "text-foreground",
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </footer>
  );
}
