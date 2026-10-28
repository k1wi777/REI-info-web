import { cn } from "@/lib/cn";
import { EXAMPLE_SHEET } from "@/features/home/data/sheet";

type MetaRow = {
  label: string;
  value: string;
  tone?: "accent" | "warning";
};

const ROWS: MetaRow[] = [
  { label: "Estado", value: EXAMPLE_SHEET.state, tone: "accent" },
  { label: "Checkpoints", value: EXAMPLE_SHEET.checkpoints },
  { label: "Aprobación", value: EXAMPLE_SHEET.approval, tone: "warning" },
  { label: "Tipo", value: EXAMPLE_SHEET.type },
];

/** Pie de la ficha: metadata de la hoja de ejemplo, sin métricas inventadas. */
export function WorkItemMeta() {
  return (
    <footer className="border-t border-hairline-strong px-4 py-4">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
        {ROWS.map((row) => (
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
