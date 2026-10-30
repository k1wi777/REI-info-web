"use client";

import { useEffect, useLayoutEffect } from "react";
import {
  REVEAL_MOTION_ATTRIBUTE,
  REVEAL_READY_ATTRIBUTE,
  REVEAL_SCOPE_SELECTOR,
  REVEALED_ATTRIBUTE,
} from "@/lib/motion";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * En el servidor no hay `document`: `useEffect` evita romper el render. En el
 * cliente, `useLayoutEffect` corre antes del paint y permite activar el estado
 * oculto sin destello cuando la navegación es de cliente.
 */
const useBeforePaintEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Confirma la hidratación y revela una sola vez cada `[data-reveal]` de la
 * página. No envuelve contenido ni mantiene estado: toda la animación vive en CSS
 * y el observer se desconecta cuando no quedan elementos pendientes.
 */
export function RevealController() {
  useBeforePaintEffect(() => {
    const root = document.documentElement;
    root.setAttribute(REVEAL_READY_ATTRIBUTE, "on");

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SCOPE_SELECTOR),
    );

    const canAnimate =
      typeof IntersectionObserver !== "undefined" &&
      !window.matchMedia(REDUCED_MOTION_QUERY).matches;

    // Sin observer o con movimiento reducido nada puede quedar oculto, aunque
    // la preferencia cambie después de montar.
    if (!canAnimate) {
      for (const target of targets) {
        target.setAttribute(REVEALED_ATTRIBUTE, "");
      }
      return;
    }

    // Carga directa: el script de arranque ya encendió el estado oculto. En
    // navegación cliente ese script no se ejecuta, así que se enciende aquí,
    // antes del paint, sin repetirlo si ya estaba activo.
    if (!root.hasAttribute(REVEAL_MOTION_ATTRIBUTE)) {
      root.setAttribute(REVEAL_MOTION_ATTRIBUTE, "on");
    }

    if (targets.length === 0) return;

    const pending = new Set<Element>(targets);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          entry.target.setAttribute(REVEALED_ATTRIBUTE, "");
          pending.delete(entry.target);
          observer.unobserve(entry.target);
        }

        if (pending.size === 0) observer.disconnect();
      },
      // Umbral 0: un elemento más alto que el viewport también entra. El margen
      // inferior retrasa la entrada lo justo para que el movimiento se lea.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    for (const target of targets) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return null;
}
