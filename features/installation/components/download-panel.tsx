import { ButtonLink } from "@/components/ui/button-link";
import { StatusTag } from "@/components/ui/status-tag";
import { WindowFrame } from "@/components/ui/window-frame";
import { DOCUMENTED_VERSION, RELEASES_URL } from "@/content/site";
import type { InstallerStatus } from "@/features/installation/types";
import {
  formatReleaseDate,
  type Release,
  type ReleaseAsset,
} from "@/lib/release";

type DownloadPanelProps = {
  status: InstallerStatus;
  release: Release | null;
  asset: ReleaseAsset | undefined;
  fileLabel: string;
  checksumsUrl: string | undefined;
};

function StatusLine({
  status,
  release,
  asset,
}: Pick<DownloadPanelProps, "status" | "release" | "asset">) {
  if (status === "ready" && release) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <StatusTag tone="success">Última release {release.tag}</StatusTag>
        <StatusTag>{formatReleaseDate(release.publishedAt)}</StatusTag>
        {asset ? null : (
          <StatusTag tone="warning">Sin archive para esta combinación</StatusTag>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <StatusTag tone={status === "loading" ? "neutral" : "warning"}>
        {status === "loading"
          ? "Última release en GitHub"
          : "No se pudo consultar GitHub"}
      </StatusTag>
      <StatusTag>Versión documentada {DOCUMENTED_VERSION}</StatusTag>
    </div>
  );
}

/** Panel de descarga: estado de la release, archivo, botón y respaldo. */
export function DownloadPanel({
  status,
  release,
  asset,
  fileLabel,
  checksumsUrl,
}: DownloadPanelProps) {
  return (
    <WindowFrame
      label="Descarga"
      meta={release ? release.tag : DOCUMENTED_VERSION}
      bodyClassName="flex flex-col gap-5 px-5 py-6"
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
      <StatusLine status={status} release={release} asset={asset} />

      <div className="flex flex-col gap-1.5">
        <p className="type-meta-sm text-muted-strong">Archivo</p>
        <p className="break-all type-code text-foreground">{fileLabel}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {asset ? (
          <>
            <ButtonLink href={asset.url}>Descargar</ButtonLink>
            <ButtonLink href={RELEASES_URL} variant="secondary">
              Ver todas las releases
            </ButtonLink>
          </>
        ) : status === "ready" ? (
          <>
            <span
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center justify-center rounded-xs border border-hairline-strong px-4 py-2.5 text-ui font-medium text-muted"
            >
              Descargar
            </span>
            <ButtonLink href={RELEASES_URL} variant="secondary">
              Ver todas las releases
            </ButtonLink>
          </>
        ) : (
          <ButtonLink href={RELEASES_URL}>Ir a la página de releases</ButtonLink>
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
        <p className="type-caption text-secondary">
          Esta release no incluye el archive de la combinación elegida.
          Descárgalo desde la página de releases o elige otra.
        </p>
      ) : null}
    </WindowFrame>
  );
}
