import { EXAMPLE_SHEET } from "@/features/home/data/sheet";

const ROWS: Array<{ label: string; value: string }> = [
  { label: "Tipo", value: EXAMPLE_SHEET.type },
  { label: "Estado", value: EXAMPLE_SHEET.state },
  { label: "Documentos", value: EXAMPLE_SHEET.documents },
  { label: "Base", value: EXAMPLE_SHEET.base },
];

/** Panel de metadata de la hoja: el Work Item como ficha, no como tarjeta. */
export function WorkItemMeta() {
  return (
    <div>
      <p className="type-meta text-muted-strong">Hoja de ejemplo</p>
      <p className="mt-2 type-docs text-foreground">
        {EXAMPLE_SHEET.title}
      </p>
      <p className="mt-1 type-meta-sm text-muted-strong">
        {EXAMPLE_SHEET.workItemId}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
        {ROWS.map((row) => (
          <div key={row.label}>
            <dt className="type-meta-sm text-muted-strong">{row.label}</dt>
            <dd className="mt-1 type-meta text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
