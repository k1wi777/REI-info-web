export type ArchiveSegmentKind = "fixed" | "version" | "os" | "arch" | "ext";

export type ArchiveSegment = {
  text: string;
  kind: ArchiveSegmentKind;
};

const ARCHIVE_NAME = /^(rei)_([^_]+)_([^_]+)_([^_.]+)(\..+)$/;

/**
 * Parte el nombre de un archive (`rei_0.3.0_linux_amd64.tar.gz`, o la plantilla
 * con `<versión>`, `<os>` y `<arch>`) en segmentos, para resaltar los que
 * cambian con la elección. Devuelve `null` si el nombre no sigue el patrón.
 */
export function splitArchiveName(name: string): ArchiveSegment[] | null {
  const match = ARCHIVE_NAME.exec(name);
  if (!match) return null;

  const [, prefix, version, os, arch, ext] = match;

  return [
    { text: `${prefix}_`, kind: "fixed" },
    { text: version, kind: "version" },
    { text: "_", kind: "fixed" },
    { text: os, kind: "os" },
    { text: "_", kind: "fixed" },
    { text: arch, kind: "arch" },
    { text: ext, kind: "ext" },
  ];
}
