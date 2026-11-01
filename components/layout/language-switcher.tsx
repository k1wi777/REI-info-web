"use client";

import { LocaleLink } from "@/components/ui/locale-link";
import { useUnlocalizedPathname } from "@/components/ui/use-unlocalized-pathname";
import { cn } from "@/lib/cn";
import {
  DEFAULT_LOCALE,
  LOCALES,
  getLocaleFromPathname,
  type Locale,
} from "@/lib/i18n";
import { usePathname } from "next/navigation";

type LanguageSwitcherProps = {
  /** Propósito del selector, ya traducido. */
  label: string;
  /** Código corto y nombre en su propio idioma de cada opción. */
  options: Record<Locale, { code: string; name: string }>;
  className?: string;
};

function TranslateIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="size-5 shrink-0"
    >
      <path d="M4 5h9M8.5 3v2M6 5c.5 3 2.5 5.500 5.500 7M11.5 5c-.5 3-3 6-7 8" />
      <path d="m12.5 21 4-9 4 9M14 18h5" />
    </svg>
  );
}

/**
 * Selector de idioma como navegación pura: un enlace por idioma hacia la misma
 * página con otro prefijo. Sin estado, sin cookie y operable por teclado.
 */
export function LanguageSwitcher({
  label,
  options,
  className,
}: LanguageSwitcherProps) {
  const active = getLocaleFromPathname(usePathname()) ?? DEFAULT_LOCALE;
  const path = useUnlocalizedPathname();

  return (
    <nav aria-label={label} className={className}>
      <div className="inline-flex items-stretch rounded-xs border border-border-strong bg-surface-deep">
        <span
          aria-hidden="true"
          className="flex items-center border-r border-hairline-strong px-2 text-secondary"
        >
          <TranslateIcon />
        </span>
        <ul className="flex items-center gap-0.5 p-0.5">
          {LOCALES.map((lang) => {
            const isActive = lang === active;

            return (
              <li key={lang}>
                <LocaleLink
                  href={path}
                  locale={lang}
                  lang={lang}
                  hrefLang={lang}
                  aria-label={options[lang].name}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "inline-flex min-h-7 min-w-9 items-center justify-center rounded-xs px-2 type-meta transition-colors duration-(--duration-fast) motion-reduce:transition-none",
                    isActive
                      ? "cursor-default bg-foreground font-medium text-canvas"
                      : "cursor-pointer text-secondary hover:bg-hairline-strong hover:text-foreground",
                  )}
                >
                  {options[lang].code}
                </LocaleLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
