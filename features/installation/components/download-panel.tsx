import { ButtonLink } from "@/components/ui/button-link";
import { StatusTag } from "@/components/ui/status-tag";
import { WindowFrame } from "@/components/ui/window-frame";
import { ArchiveStage } from "@/features/installation/components/archive-stage";
import { DOCUMENTED_VERSION, RELEASES_URL } from "@/content/site";
import type { InstallerStatus } from "@/features/installation/types";
import {
  formatReleaseDate,
  type ArchId,
  type OsId,
  type Release,
  type ReleaseAsset,
} from "@/lib/release";

type DownloadPanelProps = {
  status: InstallerStatus;
  release: Release | null;
  asset: ReleaseAsset | undefined;
  os: OsId;
  arch: ArchId;
  fileLabel: string;
  checksumsUrl: string | undefined;
};

const PRIMARY_ACTION = "min-h-14 px-6";

function DownloadGlyph() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <path d="M10 3v10M6 9l4 4 4-4M4 16.5h12" />
    </svg>
  );
}

/** Versión grande con «Latest» y fecha; sin release, la versión documentada. */
function VersionLine({
  status,
  release,
  asset,
}: Pick<DownloadPanelProps, "status" | "release" | "asset">) {
  if (status === "ready" && release) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="type-title text-foreground">{release.tag}</p>
          <StatusTag tone="success">Latest</StatusTag>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusTag>{formatReleaseDate(release.publishedAt)}</StatusTag>
          {asset ? null : (
            <StatusTag tone="warning">Sin archive para esta combinación</StatusTag>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="type-title text-foreground">{DOCUMENTED_VERSION}</p>
      <div className="flex flex-wrap items-center gap-2">
        <StatusTag tone={status === "loading" ? "neutral" : "warning"}>
          {status === "loading"
            ? "Última release en GitHub"
            : "No se pudo consultar GitHub"}
        </StatusTag>
        <StatusTag>Versión documentada</StatusTag>
      </div>
    </div>
  );
}

/** Panel de descarga: estado de la release, archivo, botón y respaldo. */
export function DownloadPanel({
  status,
  release,
  asset,
  os,
  arch,
  fileLabel,
  checksumsUrl,
}: DownloadPanelProps) {
  return (
    <WindowFrame
      label="Descarga"
      meta={release ? release.tag : DOCUMENTED_VERSION}
      bodyClassName="flex flex-col gap-6 px-5 py-6 sm:px-7 sm:py-8"
      footer={
        checksumsUrl ? (
          <>
            Verifica la integridad con{" "}
            <a
              href={checksumsUrl}
              target="_blank"
              rel="noreferrer"
              className="border-b border-border-strong text-foreground transition-colors duration-(--duration-fast) hover:border-foreground"
            >
              checksums.txt
            </a>{" "}
            de la release.
          </>
        ) : (
          <>Los checksums se publican junto a cada release en GitHub.</>
        )
      }
    >
      <VersionLine status={status} release={release} asset={asset} />

      <ArchiveStage os={os} arch={arch} fileLabel={fileLabel} />

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {asset ? (
          <>
            <ButtonLink href={asset.url} className={PRIMARY_ACTION}>
              <DownloadGlyph />
              Descargar
            </ButtonLink>
            <ButtonLink
              href={RELEASES_URL}
              variant="secondary"
              className={PRIMARY_ACTION}
            >
              Ver todas las releases
            </ButtonLink>
          </>
        ) : status === "ready" ? (
          <>
            <span
              role="button"
              tabIndex={0}
              aria-disabled="true"
              aria-describedby="descarga-motivo"
              className="inline-flex min-h-14 cursor-not-allowed items-center justify-center rounded-xs border border-hairline-strong px-6 text-ui font-medium text-muted"
            >
              Descargar
            </span>
            <ButtonLink
              href={RELEASES_URL}
              variant="secondary"
              className={PRIMARY_ACTION}
            >
              Ver todas las releases
            </ButtonLink>
          </>
        ) : (
          <ButtonLink href={RELEASES_URL} className={PRIMARY_ACTION}>
            Ir a la página de releases
          </ButtonLink>
        )}
      </div>

      {status === "unavailable" ? (
        <p className="type-caption text-secondary">
          GitHub no respondió, así que no hay un enlace directo. Descarga el
          archive desde la página de releases.
        </p>
      ) : null}
      {status === "loading" ? (
        <p className="type-caption text-secondary">
          El enlace directo a este archivo se resuelve con la última release.
          Si no aparece, descárgalo desde la página de releases.
        </p>
      ) : null}
      {status === "ready" && !asset ? (
        <p id="descarga-motivo" className="type-caption text-secondary">
          Esta release no incluye el archive de la combinación elegida.
          Descárgalo desde la página de releases o elige otra.
        </p>
      ) : null}
    </WindowFrame>
  );
}
