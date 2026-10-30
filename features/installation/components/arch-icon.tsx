type ArchIconProps = {
  className?: string;
};

/** Pictograma propio de procesador: encapsulado, núcleo y patillas. */
export function ArchIcon({ className }: ArchIconProps) {
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
      <rect x="11" y="11" width="26" height="26" rx="2.5" />
      <rect x="18" y="18" width="12" height="12" rx="1.5" />
      <path d="M17 11V5M24 11V5M31 11V5M17 43v-6M24 43v-6M31 43v-6M11 17H5M11 24H5M11 31H5M43 17h-6M43 24h-6M43 31h-6" />
    </svg>
  );
}
