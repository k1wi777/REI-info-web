"use client";

import { useEffect, useRef, useState } from "react";
import { InlineText } from "@/components/ui/inline-text";
import { ArchSelector } from "@/features/installation/components/arch-selector";
import { DownloadPanel } from "@/features/installation/components/download-panel";
import { InstallSteps } from "@/features/installation/components/install-steps";
import { OsCard } from "@/features/installation/components/os-card";
import {
  ARCH_CHECKS,
  ARCH_HINTS,
  OS_CHOICES,
  OS_LABELS,
} from "@/features/installation/data/choices";
import {
  ARCHIVE_TEMPLATE_TAR,
  ARCHIVE_TEMPLATE_ZIP,
} from "@/features/installation/data/installation";
import {
  DEFAULT_SELECTION,
  type InstallerStatus,
  type Selection,
} from "@/features/installation/types";
import { detectPlatform, type PlatformHints } from "@/lib/platform";
import {
  ARCH_IDS,
  OS_IDS,
  checksumsAsset,
  findAsset,
  type ArchId,
  type OsId,
  type Release,
} from "@/lib/release";

type InstallerProps = {
  status: InstallerStatus;
  release: Release | null;
};

type UserAgentData = {
  platform?: string;
  getHighEntropyValues?: (hints: string[]) => Promise<{
    architecture?: string;
    bitness?: string;
  }>;
};

async function readHints(): Promise<PlatformHints> {
  const data = (navigator as Navigator & { userAgentData?: UserAgentData })
    .userAgentData;
  if (!data) return {};

  const hints: PlatformHints = { platform: data.platform };
  try {
    const values = await data.getHighEntropyValues?.(["architecture", "bitness"]);
    hints.architecture = values?.architecture;
    hints.bitness = values?.bitness;
  } catch {
    // Sin permiso para las pistas de alta entropía: se usa el user agent.
  }
  return hints;
}

function isOsId(value: string): value is OsId {
  return (OS_IDS as readonly string[]).includes(value);
}

function isArchId(value: string): value is ArchId {
  return (ARCH_IDS as readonly string[]).includes(value);
}

/**
 * Selector de sistema y arquitectura. Se renderiza en el servidor con la
 * selección por defecto (legible sin JavaScript); tras hidratar solo ajusta la
 * selección inicial con lo detectado, sin pisar una elección ya hecha.
 */
export function Installer({ status, release }: InstallerProps) {
  const [selection, setSelection] = useState<Selection>(DEFAULT_SELECTION);
  const [archUnknown, setArchUnknown] = useState(false);
  const [detectedOs, setDetectedOs] = useState<OsId | null>(null);
  const touched = useRef(false);

  useEffect(() => {
    let cancelled = false;

    void readHints().then((hints) => {
      if (cancelled) return;

      const detected = detectPlatform(navigator.userAgent, hints);
      if (!detected.os) return;

      const os = detected.os;
      setDetectedOs(os);
      if (touched.current) return;

      setSelection((current) => ({
        os,
        arch: detected.arch ?? current.arch,
      }));
      setArchUnknown(!detected.arch);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  function chooseOs(value: string) {
    if (!isOsId(value)) return;
    touched.current = true;
    setSelection((current) => ({ ...current, os: value }));
  }

  function chooseArch(value: ArchId) {
    if (!isArchId(value)) return;
    touched.current = true;
    setArchUnknown(false);
    setSelection((current) => ({ ...current, arch: value }));
  }

  const asset = release ? findAsset(release, selection.os, selection.arch) : undefined;
  const template =
    selection.os === "windows" ? ARCHIVE_TEMPLATE_ZIP : ARCHIVE_TEMPLATE_TAR;
  const archiveName = asset?.name ?? template;
  const checksums = release ? checksumsAsset(release) : undefined;

  return (
    <div className="flex flex-col gap-10 lg:gap-12">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="flex min-w-0 flex-col gap-8 lg:col-span-5">
          <fieldset className="min-w-0">
            <legend className="mb-3 type-ui font-medium text-foreground">
              Sistema operativo
            </legend>
            <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
              {OS_CHOICES.map((choice, index) => (
                <OsCard
                  key={choice.id}
                  index={index}
                  choice={choice}
                  checked={selection.os === choice.id}
                  detected={detectedOs === choice.id}
                  onSelect={chooseOs}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="flex min-w-0 flex-col">
            <legend className="mb-3 type-ui font-medium text-foreground">
              Arquitectura
            </legend>
            <ArchSelector
              os={selection.os}
              value={selection.arch}
              onSelect={chooseArch}
            />
            {archUnknown ? (
              <p role="status" className="mt-4 max-w-[52ch] type-caption text-secondary">
                <InlineText text={ARCH_HINTS[selection.os]} />
              </p>
            ) : ARCH_CHECKS[selection.os] ? (
              <p className="mt-4 max-w-[52ch] type-caption text-secondary">
                <InlineText text={ARCH_CHECKS[selection.os] ?? ""} />
              </p>
            ) : null}
          </fieldset>
        </div>

        <div className="min-w-0 lg:sticky lg:top-24 lg:col-span-7">
          <DownloadPanel
            status={status}
            release={release}
            asset={asset}
            os={selection.os}
            arch={selection.arch}
            fileLabel={archiveName}
            checksumsUrl={checksums?.url}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="type-docs-heading text-foreground">
          Instalar en {OS_LABELS[selection.os]}
        </h2>
        <div key={selection.os} className="cycle-panel-in">
          <InstallSteps os={selection.os} archiveName={archiveName} />
        </div>
      </div>
    </div>
  );
}
