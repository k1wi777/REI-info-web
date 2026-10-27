import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type StatusTone = "neutral" | "accent" | "success" | "warning" | "error";

type StatusTagProps = {
  tone?: StatusTone;
  children: ReactNode;
  className?: string;
};

const TONES: Record<StatusTone, string> = {
  neutral: "border-hairline-strong bg-surface text-secondary",
  accent: "border-accent/40 bg-accent/10 text-accent-text",
  success: "border-success/40 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/10 text-warning",
  error: "border-error/40 bg-error/10 text-error",
};

/**
 * Etiqueta de estado. Siempre lleva texto: warning y error nunca dependen
 * solo del color.
 */
export function StatusTag({
  tone = "neutral",
  children,
  className,
}: StatusTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs border px-2 py-1 type-meta",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
