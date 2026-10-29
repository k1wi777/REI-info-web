"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { WindowFrame } from "@/components/ui/window-frame";
import { AGENT_ROLES, APPROVAL_GATE } from "@/content/rei";
import {
  CYCLE_STOPS,
  nextStop,
  previousStop,
  stopTransitions,
} from "@/features/product/data/cycle";
import type { CycleStop } from "@/features/product/data/cycle";
import {
  nextSimulationIndex,
  simulationDurationMs,
  simulationStepFor,
} from "@/features/product/data/cycle-simulation";
import type { StateTransitionKind } from "@/content/rei";
import { cn } from "@/lib/cn";

const TRANSITION_LABELS: Record<StateTransitionKind, string> = {
  cycle: "Ciclo",
  branch: "Rama",
  force: "Forzada (--force)",
};

const ROLE_NAMES = new Map(AGENT_ROLES.map((role) => [role.id, role.name]));

const CONTROL =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xs border px-4 type-meta transition-colors duration-(--duration-fast)";

const CONTROL_SECONDARY = cn(
  CONTROL,
  "border-hairline-strong bg-surface text-foreground hover:border-border-strong hover:bg-surface-deep",
  "disabled:cursor-not-allowed disabled:border-hairline disabled:text-muted disabled:hover:bg-surface",
);

const CONTROL_QUIET = cn(
  CONTROL,
  "border-transparent text-muted-strong hover:border-hairline-strong hover:text-foreground",
);

const CONTROL_PRIMARY = cn(
  CONTROL,
  "border-foreground bg-foreground text-canvas hover:bg-foreground/85",
);

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void): () => void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }

  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return true;
  }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** En servidor y durante la hidratación no se anima hasta medir la preferencia. */
function getServerReducedMotion(): boolean {
  return true;
}

type Playback = "auto" | "paused" | "manual";

function roleLabel(stop: CycleStop): string {
  if (stop.gate) {
    return "Firma humana";
  }
  if (stop.roleId) {
    return ROLE_NAMES.get(stop.roleId) ?? "Rol sin nombre";
  }
  return "Estado terminal";
}

type NodeState = "past" | "active" | "future";

/** Marca de la parada: punto para los estados, barra violeta para la puerta. */
function NodeMark({ stop, state }: { stop: CycleStop; state: NodeState }) {
  if (stop.gate) {
    return (
      <span className="relative flex h-4 w-[9px] items-center justify-center">
        {state === "future" ? null : (
          <span
            aria-hidden="true"
            className="cycle-gate-breathe absolute -inset-x-1.5 -inset-y-1 bg-accent/60 blur-[7px]"
          />
        )}
        <span
          className={cn(
            "relative h-4 w-[3px] transition-colors duration-300",
            state === "future" ? "bg-accent/40" : "bg-accent/70",
          )}
        />
      </span>
    );
  }

  return (
    <span className="relative flex size-[9px] items-center justify-center">
      {state === "active" ? (
        <span
          aria-hidden="true"
          className="cycle-ping absolute inset-0 rounded-full border border-foreground/50"
        />
      ) : null}
      <span
        className={cn(
          "size-[7px] rounded-full border transition-colors duration-300",
          state === "future" && "border-border-strong bg-canvas",
          state === "past" && "border-foreground/60 bg-foreground/60",
          state === "active" && "border-foreground bg-foreground",
        )}
      />
    </span>
  );
}

/** Escena decorativa de la firma: cursor, botón visual, onda y check. */
function GateSignature() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative mt-3 flex min-h-24 items-center justify-center overflow-hidden rounded-xs border border-hairline bg-surface/70 select-none"
    >
      <span className="cycle-cursor absolute top-[18%] left-[52%] text-foreground">
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="currentColor">
          <path d="M2 1.2 13.4 8l-5.1.9 2.7 4.4-1.8 1.1-2.7-4.4L3 13.2z" />
        </svg>
      </span>

      <span className="relative inline-flex">
        <span className={cn(CONTROL_PRIMARY, "pointer-events-none")}>
          Aprobar
        </span>
        <span className="cycle-click-ring absolute inset-0 rounded-xs border-2 border-accent" />
        <span className="cycle-check absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-success text-canvas">
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            className="size-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 6.2 5 8.7l4.5-5" />
          </svg>
        </span>
      </span>
    </div>
  );
}

/**
 * Simulación del ciclo: seis paradas con la puerta entre ready e in_progress.
 * Empieza sola al entrar en viewport, se pausa al salir y se reanuda salvo que
 * la persona la haya pausado. La firma de la puerta es una escena simulada: la
 * aprobación real se registra en el CLI y esta página no ejecuta nada.
 */
export function CycleSteps() {
  const [stepIndex, setStepIndex] = useState(0);
  const [playback, setPlayback] = useState<Playback>("auto");
  const [runId, setRunId] = useState(0);
  const [announced, setAnnounced] = useState("");
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const groupRef = useRef<HTMLDivElement>(null);

  const lastIndex = CYCLE_STOPS.length - 1;
  const active = CYCLE_STOPS[stepIndex];
  const activeStep = simulationStepFor(active.id);
  const outgoing = stopTransitions(active).outgoing;
  const running = playback === "auto" && inView && !reducedMotion;
  const isPlaying = playback === "auto";

  useEffect(() => {
    const node = groupRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) {
      return;
    }

    const timer = window.setTimeout(() => {
      const nextIndex = nextSimulationIndex(stepIndex);
      setStepIndex(nextIndex);
      if (nextIndex === 0) {
        setRunId((value) => value + 1);
      }
    }, simulationDurationMs(CYCLE_STOPS[stepIndex].id));

    return () => window.clearTimeout(timer);
  }, [running, stepIndex]);

  function goTo(target: number) {
    if (target < 0 || target > lastIndex) {
      return;
    }

    setPlayback("manual");

    if (target === stepIndex) {
      return;
    }

    const stop = CYCLE_STOPS[target];
    setStepIndex(target);
    setAnnounced(
      target === lastIndex
        ? `Fin del recorrido manual. Paso ${target + 1} de ${CYCLE_STOPS.length}: ${stop.label}.`
        : `Paso ${target + 1} de ${CYCLE_STOPS.length}: ${stop.label}. ${stop.detail}`,
    );
  }

  function togglePlayback() {
    if (reducedMotion) {
      return;
    }

    if (playback === "auto") {
      setPlayback("paused");
      setAnnounced(`Simulación en pausa en ${active.label}.`);
      return;
    }

    setPlayback("auto");
    setAnnounced(`Simulación reanudada en ${active.label}.`);
  }

  return (
    <div
      ref={groupRef}
      role="group"
      aria-label="Simulación del ciclo de un Work Item"
      data-cycle-motion={running ? "on" : "off"}
      className="min-w-0"
    >
      <WindowFrame
        label="ciclo · work item"
        meta={`${CYCLE_STOPS.length} paradas · 1 puerta`}
        footer="Simulación: no ejecuta comandos ni aprueba Work Items."
      >
        <div className="flex items-center gap-2.5 border-b border-hairline px-4 py-2.5">
          <span className="shrink-0 rounded-xs border border-hairline-strong bg-surface px-2 py-0.5 type-meta-sm tracking-widest text-muted-strong">
            SIMULACIÓN
          </span>
          <span className="hidden shrink-0 type-meta-sm text-muted-strong sm:inline">
            Progreso
          </span>
          <div
            role="progressbar"
            aria-label="Progreso del ciclo"
            aria-valuemin={0}
            aria-valuemax={CYCLE_STOPS.length}
            aria-valuenow={stepIndex + 1}
            aria-valuetext={`Paso ${stepIndex + 1} de ${CYCLE_STOPS.length}: ${active.label}`}
            className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-hairline"
          >
            <div
              className={cn(
                "h-full rounded-full transition-[width] duration-(--duration-fast)",
                active.gate ? "bg-accent-text" : "bg-foreground",
              )}
              style={{
                width: `${((stepIndex + 1) / CYCLE_STOPS.length) * 100}%`,
              }}
            />
          </div>
          <span className="shrink-0 type-meta-sm text-muted-strong tabular-nums">
            {String(stepIndex + 1).padStart(2, "0")} /{" "}
            {String(CYCLE_STOPS.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid lg:grid-cols-12">
          <div className="border-b border-hairline p-3 sm:p-4 lg:col-span-5 lg:border-r lg:border-b-0">
            <ol aria-label="Paradas del ciclo" className="flex flex-col">
              {CYCLE_STOPS.map((stop, index) => {
                const state: NodeState =
                  index === stepIndex
                    ? "active"
                    : index < stepIndex
                      ? "past"
                      : "future";
                const topFilled = index <= stepIndex;
                const bottomFilled = index < stepIndex;
                const isGate = Boolean(stop.gate);

                return (
                  <li key={stop.id} className="relative">
                    {index > 0 ? (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute top-0 left-[4px] h-1/2 w-px transition-colors duration-300",
                          topFilled
                            ? isGate
                              ? "bg-accent/40"
                              : "bg-foreground/60"
                            : "bg-hairline-strong",
                        )}
                      />
                    ) : null}

                    {index < lastIndex ? (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute top-1/2 left-[4px] h-1/2 w-px transition-colors duration-300",
                          bottomFilled
                            ? isGate
                              ? "bg-accent/40"
                              : "bg-foreground/60"
                            : "bg-hairline-strong",
                        )}
                      />
                    ) : null}

                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-current={state === "active" ? "step" : undefined}
                      aria-label={`Paso ${index + 1}: ${stop.label}`}
                      disabled={state === "future"}
                      className={cn(
                        "relative flex min-h-11 w-full items-center gap-3 pl-6 text-left transition-colors duration-(--duration-fast)",
                        "hover:bg-surface/70 disabled:cursor-default disabled:hover:bg-transparent",
                        state === "active" && "bg-surface",
                      )}
                    >
                      <span className="absolute top-1/2 left-0 -translate-y-1/2">
                        <NodeMark stop={stop} state={state} />
                      </span>

                      <span
                        className={cn(
                          "min-w-0 flex-1 break-words type-code transition-colors duration-300",
                          isGate
                            ? "text-accent-text"
                            : state === "future"
                              ? "text-muted-strong"
                              : stop.id === "done"
                                ? "text-success"
                                : "text-foreground",
                        )}
                      >
                        {stop.label}
                      </span>

                      <span
                        className={cn(
                          "hidden shrink-0 type-meta-sm sm:block",
                          stop.id === "done"
                            ? "text-success"
                            : isGate
                              ? "text-accent-text"
                              : "text-muted-strong",
                        )}
                      >
                        {stop.id === "done" ? "terminal" : roleLabel(stop)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="flex min-h-[19rem] flex-col p-4 sm:p-5 lg:col-span-7 lg:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="type-meta-sm text-muted-strong tabular-nums">
                Paso {String(stepIndex + 1).padStart(2, "0")} /{" "}
                {String(CYCLE_STOPS.length).padStart(2, "0")}
              </p>
              <p
                className={cn(
                  "type-meta-sm",
                  active.gate
                    ? "text-accent-text"
                    : active.id === "done"
                      ? "text-success"
                      : "text-muted-strong",
                )}
              >
                {roleLabel(active)}
              </p>
            </div>

            <div
              key={`${active.id}-${runId}`}
              className="cycle-panel-in mt-3"
            >
              <p
                className={cn(
                  "type-docs-title",
                  active.gate
                    ? "text-accent-text"
                    : active.id === "done"
                      ? "text-success"
                      : "text-foreground",
                )}
              >
                {active.label}
              </p>

              <p className="mt-2 max-w-[54ch] type-body text-secondary">
                {active.detail}
              </p>

              {active.gate ? (
                <>
                  <div className="mt-5 border border-accent/40 bg-accent/10 px-4 py-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                      <span className="type-meta text-accent-text">
                        {APPROVAL_GATE.status}
                      </span>
                      <span className="type-code text-accent-text">
                        ready → in_progress
                      </span>
                    </div>
                    <p className="mt-2 max-w-[56ch] type-caption text-secondary">
                      La firma es humana y se registra desde el CLI; esta página
                      no aprueba.
                    </p>
                  </div>

                  <div className="mt-3 border border-accent/40 bg-accent/10 px-4 py-3">
                    {activeStep.cue === "gate-signature" && !reducedMotion ? (
                      <GateSignature />
                    ) : null}
                    <p className="type-caption text-secondary">
                      Firma humana simulada.
                    </p>
                  </div>
                </>
              ) : (
                <div className="mt-5">
                  <p className="type-meta-sm text-muted-strong">Salidas</p>
                  <ul className="mt-2 flex flex-col gap-2">
                    {outgoing.map((transition) => (
                      <li
                        key={`${transition.from}-${transition.to}-${transition.kind}`}
                        className="min-w-0"
                      >
                        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <span className="type-code text-foreground">
                            {transition.from} → {transition.to}
                          </span>
                          <span className="type-meta-sm text-muted-strong">
                            {TRANSITION_LABELS[transition.kind]}
                          </span>
                        </p>
                        {transition.note ? (
                          <p className="mt-0.5 type-caption text-secondary">
                            {transition.note}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-auto border-t border-hairline pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo(previousStop(CYCLE_STOPS, active.id))}
                  disabled={stepIndex === 0}
                  className={CONTROL_SECONDARY}
                >
                  Anterior
                </button>

                <button
                  type="button"
                  onClick={() => goTo(nextStop(CYCLE_STOPS, active.id))}
                  disabled={stepIndex === lastIndex}
                  className={CONTROL_SECONDARY}
                >
                  Siguiente
                </button>

                <button
                  type="button"
                  onClick={togglePlayback}
                  disabled={reducedMotion}
                  aria-describedby={reducedMotion ? "cycle-motion-note" : undefined}
                  aria-label={
                    reducedMotion
                      ? "La simulación automática está desactivada por movimiento reducido"
                      : isPlaying
                        ? "Pausar la simulación del ciclo"
                        : "Reanudar la simulación del ciclo"
                  }
                  className={cn(
                    CONTROL_PRIMARY,
                    "disabled:cursor-not-allowed disabled:opacity-50",
                  )}
                >
                  {isPlaying && !reducedMotion ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 10 10"
                      className="size-2.5"
                    >
                      <path
                        d="M2.5 1.5h1.5v7H2.5zM6 1.5h1.5v7H6z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 10 10"
                      className="size-2.5"
                    >
                      <path d="M2.5 1.5 8.5 5l-6 3.5z" fill="currentColor" />
                    </svg>
                  )}
                  {reducedMotion ? "Reproducir" : isPlaying ? "Pausar" : "Reanudar"}
                </button>

                <button
                  type="button"
                  onClick={() => goTo(0)}
                  className={cn(CONTROL_QUIET, "ml-auto")}
                >
                  Reiniciar
                </button>
              </div>

              {reducedMotion ? (
                <p
                  id="cycle-motion-note"
                  className="mt-2 type-meta-sm text-muted-strong"
                >
                  Movimiento reducido: recorrido manual.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </WindowFrame>

      <p aria-live="polite" className="sr-only">
        {announced}
      </p>

      <noscript>
        <p className="border-t border-hairline px-4 py-3 type-caption text-muted-strong sm:px-5">
          La simulación necesita JavaScript: sin él queda la primera parada. La
          tabla de estados de más abajo mantiene el registro completo.
        </p>
      </noscript>
    </div>
  );
}
