import { APPROVAL_GATE } from "@/content/rei";
import { StatusTag } from "@/components/ui/status-tag";

/**
 * La misma puerta de la home, en versión sobria: ocupa el ancho del artículo
 * y recuerda que la aprobación se registra desde el CLI.
 */
export function ApprovalBand() {
  return (
    <section
      aria-label={APPROVAL_GATE.label}
      className="mt-12 border border-accent/40 bg-accent/10 px-4 py-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="type-meta text-accent-text">{APPROVAL_GATE.label}</h2>
        <StatusTag tone="accent">{APPROVAL_GATE.status}</StatusTag>
      </div>
      <p className="mt-3 type-docs text-secondary">{APPROVAL_GATE.detail}</p>
      <p className="mt-3 type-meta-sm text-muted-strong">
        La aprobación se registra desde el CLI; el visor no la sustituye.
      </p>
    </section>
  );
}
