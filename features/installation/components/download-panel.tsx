import { ButtonLink } from "@/components/ui/button-link";
import { StatusTag } from "@/components/ui/status-tag";
import { WindowFrame } from "@/components/ui/window-frame";
import { ArchiveStage } from "@/features/installation/components/archive-stage";
import { DOCUMENTED_VERSION, RELEASES_URL } from "@/content/site";
import type { InstallerCopy } from "@/features/installation/copy/types";
import type { InstallerStatus } from "@/features/installation/types";
import {
  formatReleaseDate,
  type ArchId,
  type OsId,
  type Release,
  type ReleaseAsset,
} from "@/lib/release";
import type { Locale } from "@/lib/i18n";

type DownloadPanelProps = {
  copy: InstallerCopy;
  lang: Locale;
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
  copy,
  lang,
  status,
  release,
  asset,
}: Pick<
  DownloadPanelProps,
  "copy" | "lang" | "status" | "release" | "asset"
>) {
  const text = copy.download;

  if (status === "ready" && release) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="type-title text-foreground">{release.tag}</p>
          <StatusTag tone="success">{text.latest}</StatusTag>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusTag>{formatReleaseDate(release.publishedAt, lang)}</StatusTag>
          {asset ? null : (
            <StatusTag tone="warning">{text.noAssetForSelection}</StatusTag>
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
            ? text.loadingRelease
            : text.unavailableRelease}
        </StatusTag>
        <StatusTag>{text.documentedVersion}</StatusTag>
      </div>
    </div>
  );
}

/** Panel de descarga: estado de la release, archivo, botón y respaldo. */
export function DownloadPanel({
  copy,
  lang,
  status,
  release,
  asset,
  os,
  arch,
  fileLabel,
  checksumsUrl,
}: DownloadPanelProps) {
  const text = copy.download;

  return (
    <WindowFrame
      label={text.frameLabel}
      meta={release ? release.tag : DOCUMENTED_VERSION}
      bodyClassName="flex flex-col gap-6 px-5 py-6 sm:px-7 sm:py-8"
      footer={
        checksumsUrl ? (
          <>
            {text.checksumsPre}{" "}
            <a
              href={checksumsUrl}
              target="_blank"
              rel="noreferrer"
              className="border-b border-border-strong text-foreground transition-colors duration-(--duration-fast) hover:border-foreground"
            >
              checksums.txt
            </a>{" "}
            {text.checksumsPost}
          </>
        ) : (
          <>{text.checksumsPublished}</>
        )
      }
    >
      <VersionLine
        copy={copy}
        lang={lang}
        status={status}
        release={release}
        asset={asset}
      />

      <ArchiveStage fileHeading={copy.stageFile} os={os} arch={arch} fileLabel={fileLabel} />

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {asset ? (
          <>
            <ButtonLink href={asset.url} className={PRIMARY_ACTION}>
              <DownloadGlyph />
              {text.download}
            </ButtonLink>
            <ButtonLink
              href={RELEASES_URL}
              variant="secondary"
              className={PRIMARY_ACTION}
            >
              {text.allReleases}
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
              {text.download}
            </span>
            <ButtonLink
              href={RELEASES_URL}
              variant="secondary"
              className={PRIMARY_ACTION}
            >
              {text.allReleases}
            </ButtonLink>
          </>
        ) : (
          <ButtonLink href={RELEASES_URL} className={PRIMARY_ACTION}>
            {text.goToReleases}
          </ButtonLink>
        )}
      </div>

      {status === "unavailable" ? (
        <p className="type-caption text-secondary">
          {text.unavailableNote}
        </p>
      ) : null}
      {status === "loading" ? (
        <p className="type-caption text-secondary">
          {text.loadingNote}
        </p>
      ) : null}
      {status === "ready" && !asset ? (
        <p id="descarga-motivo" className="type-caption text-secondary">
          {text.noAssetNote}
        </p>
      ) : null}
    </WindowFrame>
  );
}
