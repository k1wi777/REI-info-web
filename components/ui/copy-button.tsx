"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type CopyButtonProps = {
  code: string;
};

type CopyState = "idle" | "copied" | "error";

/** Único JavaScript de cliente del sitio además del botón de navegación. */
export function CopyButton({ code }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  async function handleCopy() {
    if (!navigator.clipboard) {
      setState("error");
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
    }
  }

  const label =
    state === "copied"
      ? "Copiado"
      : state === "error"
        ? "No se pudo copiar"
        : "Copiar";

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "inline-flex min-h-6 items-center px-1.5 -mr-1.5 type-meta-sm transition-colors duration-(--duration-fast)",
          state === "copied"
            ? "text-success"
            : state === "error"
              ? "text-error"
              : "text-secondary hover:text-foreground",
        )}
      >
        {label}
      </button>
      <span aria-live="polite" role="status" className="sr-only">
        {state === "copied"
          ? "Código copiado"
          : state === "error"
            ? "No se pudo copiar; selecciona el texto"
            : ""}
      </span>
    </span>
  );
}
