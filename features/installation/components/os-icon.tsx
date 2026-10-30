import type { OsId } from "@/lib/release";

type OsIconProps = {
  os: OsId;
  className?: string;
};

/** Pingüino propio de líneas simples: sin reproducir ningún logotipo. */
function LinuxGlyph() {
  return (
    <>
      <path d="M24 5c-5 0-8 4-8 10 0 3-1 5-3 8-2 3-3 6-3 9 0 5 3 8 8 8h12c5 0 8-3 8-8 0-3-1-6-3-9-2-3-3-5-3-8 0-6-3-10-8-10Z" />
      <path d="M19.5 27c0 6 1.2 10 4.5 10s4.5-4 4.5-10c0-4-2-7-4.5-7s-4.5 3-4.5 7Z" />
      <path d="M22 15.5 24 18l2-2.5" />
      <path d="M14 41.5c-2.5.6-4 1.8-4 3.5h9M34 41.5c2.5.6 4 1.8 4 3.5h-9" />
      <circle cx="21" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="27" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  );
}

/** Equipo de escritorio genérico: pantalla, peana y barra de aplicaciones. */
function MacosGlyph() {
  return (
    <>
      <rect x="5" y="7" width="38" height="25" rx="2.5" />
      <path d="M5 26h38" />
      <path d="M18 41h12M24 32v9" />
      <path d="M12 13h5M12 17h9" />
      <circle cx="35" cy="15" r="3.5" />
    </>
  );
}

/** Ventana de cuatro paneles propia, con marco y separaciones. */
function WindowsGlyph() {
  return (
    <>
      <rect x="6" y="6" width="36" height="36" rx="2.5" />
      <path d="M24 6v36M6 24h36" />
      <path d="M11 11h8v8h-8zM29 11h8v8h-8z" />
      <path d="M11 29h8v8h-8zM29 29h8v8h-8z" />
    </>
  );
}

const GLYPHS: Record<OsId, () => React.JSX.Element> = {
  linux: LinuxGlyph,
  macos: MacosGlyph,
  windows: WindowsGlyph,
};

/**
 * Icono decorativo del sistema operativo: trazo único de 1,5 en una
 * retícula de 48, `currentColor` y `aria-hidden` (la etiqueta ya nombra el SO).
 */
export function OsIcon({ os, className }: OsIconProps) {
  const Glyph = GLYPHS[os];

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <Glyph />
    </svg>
  );
}
