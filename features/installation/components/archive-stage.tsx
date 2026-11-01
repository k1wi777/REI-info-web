import { OsIcon } from "@/features/installation/components/os-icon";
import { splitArchiveName } from "@/features/installation/data/archive-name";
import { OS_LABELS } from "@/features/installation/data/choices";
import { cn } from "@/lib/cn";
import type { ArchId, OsId } from "@/lib/release";

type ArchiveStageProps = {
  fileHeading: string;
  os: OsId;
  arch: ArchId;
  /** Nombre real del archive, o la plantilla si aún no hay release. */
  fileLabel: string;
};

/**
 * Escenario del archivo: el nombre que se descargará, con el sistema y la
 * arquitectura elegidos resaltados. Al cambiar la elección, solo los segmentos
 * que cambian se vuelven a montar y entran con el fundido corto del sistema.
 */
export function ArchiveStage({
  fileHeading,
  os,
  arch,
  fileLabel,
}: ArchiveStageProps) {
  const segments = splitArchiveName(fileLabel);

  return (
    <div className="relative overflow-hidden border border-hairline-strong bg-canvas">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 sheet-grid sheet-grid-compact opacity-40"
      />
      <div className="relative flex items-center gap-4 p-4 sm:gap-6 sm:p-6">
        <span
          key={os}
          className="cycle-panel-in flex size-16 shrink-0 items-center justify-center border border-hairline-strong bg-surface-deep text-foreground sm:size-28"
        >
          <OsIcon os={os} className="size-9 sm:size-16" />
        </span>

        <div className="flex min-w-0 flex-col gap-2">
          <p className="type-meta-sm text-muted-strong">{fileHeading}</p>
          <p className="break-all font-mono text-body leading-snug sm:text-docs-heading">
            <span className="sr-only">{fileLabel}</span>
            <span aria-hidden="true">
              {segments
                ? segments.map((segment, index) => (
                    <span
                      key={`${index}-${segment.kind}-${segment.text}`}
                      className={cn(
                        segment.kind === "os" ||
                          segment.kind === "arch" ||
                          segment.kind === "version"
                          ? "cycle-panel-in inline-block"
                          : "",
                        segment.kind === "os" || segment.kind === "arch"
                          ? "text-foreground"
                          : "text-muted-strong",
                      )}
                      style={
                        segment.kind === "arch"
                          ? { animationDelay: "90ms" }
                          : undefined
                      }
                    >
                      {segment.text}
                    </span>
                  ))
                : fileLabel}
            </span>
          </p>
          <p className="type-meta-sm text-muted-strong">
            {OS_LABELS[os]} · {arch}
          </p>
        </div>
      </div>
    </div>
  );
}
