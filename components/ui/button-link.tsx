import { LocaleLink } from "@/components/ui/locale-link";
import type { ReactNode } from "react";
import { isExternal } from "@/content/site";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  /** Fuerza el idioma de un enlace interno; por defecto, el activo. */
  locale?: Locale;
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xs border px-4 py-2.5 text-ui font-medium transition-colors duration-(--duration-fast)";

const VARIANTS = {
  primary:
    "border-transparent bg-foreground text-canvas hover:bg-foreground/85",
  secondary:
    "border-muted bg-transparent text-foreground hover:border-muted-strong hover:bg-surface",
} as const;

/** Enlace con apariencia de botón; primario o secundario. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  locale,
}: ButtonLinkProps) {
  const classes = cn(BASE, VARIANTS[variant], className);

  if (isExternal(href)) {
    return (
      <a
        className={classes}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <LocaleLink className={classes} href={href} locale={locale}>
      {children}
    </LocaleLink>
  );
}
