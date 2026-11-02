import { StatusTag } from "@/components/ui/status-tag";
import type { Dictionary } from "@/content/i18n";

type ApprovalBandProps = {
  copy: Dictionary["docs"]["gate"];
};

/**
 * La misma puerta de la home, en versión sobria: ocupa el ancho del artículo
 * y recuerda que la aprobación se registra desde el CLI. El texto sale del
 * diccionario del idioma del contenido.
 */
export function ApprovalBand({ copy }: ApprovalBandProps) {
  return (
    <section
      aria-label={copy.label}
      className="mt-12 border border-accent/40 bg-accent/10 px-4 py-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="type-meta text-accent-text">{copy.label}</p>
        <StatusTag tone="accent">{copy.status}</StatusTag>
      </div>
      <p className="mt-3 type-docs text-secondary">{copy.detail}</p>
      <p className="mt-3 type-meta-sm text-muted-strong">{copy.note}</p>
    </section>
  );
}
