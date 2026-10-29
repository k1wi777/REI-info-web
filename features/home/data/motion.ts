/**
 * Contrato del sistema de entrada de la home. Solo datos compartidos entre el
 * bootstrap estático y el controlador cliente: sin React y sin lógica de UI.
 */
export const REVEAL_ATTRIBUTE = "data-reveal";
export const REVEALED_ATTRIBUTE = "data-revealed";
export const REVEAL_MOTION_ATTRIBUTE = "data-reveal-motion";
export const REVEAL_READY_ATTRIBUTE = "data-reveal-ready";

/** `data-reveal` solo pertenece a la home; el scope evita otras rutas. */
export const REVEAL_SCOPE_SELECTOR = `main#contenido [${REVEAL_ATTRIBUTE}]:not([${REVEALED_ATTRIBUTE}])`;

/**
 * Bootstrap previo a la hidratación: activa el estado inicial oculto solo si hay
 * `IntersectionObserver` y no se prefiere movimiento reducido, y retira el
 * atributo a los 4 s si el controlador no confirma la hidratación.
 */
export const REVEAL_BOOTSTRAP_SCRIPT = `(function () {
  var root = document.documentElement;
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  root.setAttribute("${REVEAL_MOTION_ATTRIBUTE}", "on");
  window.setTimeout(function () {
    if (!root.hasAttribute("${REVEAL_READY_ATTRIBUTE}")) {
      root.removeAttribute("${REVEAL_MOTION_ATTRIBUTE}");
    }
  }, 4000);
})();`;
