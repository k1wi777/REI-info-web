"use client";

import { useState } from "react";
import { AGENT_ROLES, APPROVAL_GATE } from "@/content/rei";
import { StatusTag } from "@/components/ui/status-tag";
import {
  CYCLE_BRANCHES,
  CYCLE_STOPS,
  nextStop,
  previousStop,
  stopTransitions,
} from "@/features/product/data/cycle";
import type { CycleStop } from "@/features/product/data/cycle";
import type { StateTransition, StateTransitionKind } from "@/content/rei";
import { cn } from "@/lib/cn";

const TRANSITION_LABELS: Record<StateTransitionKind, string> = {
  cycle: "Ciclo",
  branch: "Rama",
  force: "Forzada (--force)",
};

const ROLE_NAMES = new Map(AGENT_ROLES.map((role) => [role.id, role.name]));

function roleLabel(stop: CycleStop): string {
  if (stop.gate) {
    return "Firma humana";
  }
  if (stop.roleId) {
    return ROLE_NAMES.get(stop.roleId) ?? "Rol sin nombre";
  }
  return "Estado terminal";
}

type TransitionListProps = {
  transitions: StateTransition[];
  direction: "in" | "out";
};

type TransitionGroup = {
  key: string;
  kind: StateTransitionKind;
  note?: string;
  states: string[];
};

/** Agrupa aristas con el mismo tipo y nota para no repetir la condición. */
function groupTransitions(
  transitions: StateTransition[],
  direction: "in" | "out",
): TransitionGroup[] {
  const groups: TransitionGroup[] = [];

  for (const transition of transitions) {
    const state = direction === "in" ? transition.from : transition.to;
    const key = `${transition.kind}|${transition.note ?? ""}`;
    const existing = groups.find((group) => group.key === key);

    if (existing) {
      existing.states.push(state);
    } else {
      groups.push({
        key,
        kind: transition.kind,
        note: transition.note,
        states: [state],
      });
    }
  }

  return groups;
}

/** Aristas reales de STATE_TRANSITIONS; el estado se muestra como texto mono. */
function TransitionList({ transitions, direction }: TransitionListProps) {
  if (transitions.length === 0) {
    return (
      <p className="mt-2 type-caption text-muted-strong">
        Sin arista declarada en STATE_TRANSITIONS.
      </p>
    );
  }

  return (
    <ul className="mt-2 flex flex-col gap-2">
      {groupTransitions(transitions, direction).map((group) => (
        <li key={group.key} className="min-w-0">
          <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="break-words type-code text-foreground">
              {group.states.join(" · ")}
            </span>
            <span className="type-meta-sm text-muted-strong">
              {TRANSITION_LABELS[group.kind]}
            </span>
          </span>
          {group.note ? (
            <span className="mt-0.5 block type-caption text-secondary">
              {group.note}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/**
 * Recorrido manual del ciclo: seis paradas con la puerta entre ready e
 * in_progress. Sin autoplay ni atajos: solo los tres botones mueven la parada.
 */
export function CycleSteps() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [announced, setAnnounced] = useState("");

  const active = CYCLE_STOPS[activeIndex];
  const transitions = stopTransitions(active);

  function moveTo(target: number) {
    if (target < 0 || target >= CYCLE_STOPS.length || target === activeIndex) {
      return;
    }

    const stop = CYCLE_STOPS[target];
    setActiveIndex(target);
    setAnnounced(
      `Paso ${target + 1} de ${CYCLE_STOPS.length}: ${stop.label}. ${stop.detail}`,
    );
  }

  return (
    <div
      role="group"
      aria-label="Ciclo de un Work Item"
      className="border-y border-hairline-strong py-5"
    >
      <ol className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
        {CYCLE_STOPS.map((stop, index) => {
          const isActive = index === activeIndex;

          return (
            <li
              key={stop.id}
              aria-current={isActive ? "step" : undefined}
              className={cn(
                "min-w-0 border-t-2 px-2 py-3 transition-colors duration-(--duration-fast)",
                stop.gate
                  ? "border-accent/60"
                  : isActive
                    ? "border-foreground"
                    : "border-hairline",
                isActive && (stop.gate ? "bg-accent/10" : "bg-surface/60"),
              )}
            >
              <p className="type-meta-sm text-muted-strong tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p
                className={cn(
                  "mt-1 break-words type-code",
                  stop.gate
                    ? "text-accent-text"
                    : stop.id === "done"
                      ? "text-success"
                      : "text-foreground",
                )}
              >
                {stop.label}
              </p>
              <p className="mt-1 type-meta-sm text-muted-strong">
                {stop.gate
                  ? "firma humana"
                  : stop.id === "done"
                    ? "terminal"
                    : roleLabel(stop)}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="mt-7">
        <p className="type-meta-sm text-muted-strong">Ramas fuera del ciclo</p>
        <ul className="mt-3 grid gap-4 sm:grid-cols-2">
          {CYCLE_BRANCHES.map((branch) => (
            <li
              key={branch.state.id}
              className="min-w-0 border-t border-dashed border-border-strong pt-3"
            >
              <p className="type-code text-foreground">
                <span aria-hidden="true" className="text-muted-strong">
                  ↳{" "}
                </span>
                {branch.state.label}
              </p>
              <p className="mt-1 type-caption text-secondary">
                {branch.state.meaning}
              </p>

              <p className="mt-3 type-meta-sm text-muted-strong">Entra desde</p>
              <TransitionList transitions={branch.incoming} direction="in" />

              <p className="mt-3 type-meta-sm text-muted-strong">Sale hacia</p>
              <TransitionList transitions={branch.outgoing} direction="out" />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7 border-y border-hairline-strong bg-surface/60 px-4 py-5 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="type-meta text-muted-strong">
            Paso {activeIndex + 1} de {CYCLE_STOPS.length}
          </p>
          <p className="type-meta-sm text-muted-strong">{roleLabel(active)}</p>
        </div>

        <p className="mt-3 break-words type-docs-title text-foreground">
          {active.label}
        </p>
        {active.gate ? null : (
          <p className="mt-2 max-w-[58ch] type-body text-secondary">
            {active.detail}
          </p>
        )}

        {active.gate ? (
          <div className="mt-4 border border-accent/40 bg-accent/10 px-4 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <StatusTag tone="accent">{APPROVAL_GATE.status}</StatusTag>
            </div>
            <p className="mt-2 max-w-[58ch] type-body text-secondary">
              {APPROVAL_GATE.detail}
            </p>
            <p className="mt-2 max-w-[58ch] type-caption text-accent-text">
              La firma es humana y se registra desde el CLI; esta página no
              aprueba. El silencio no aprueba.
            </p>
          </div>
        ) : null}

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="min-w-0">
            <p className="type-meta-sm text-muted-strong">Entra desde</p>
            <TransitionList transitions={transitions.incoming} direction="in" />
          </div>
          <div className="min-w-0">
            <p className="type-meta-sm text-muted-strong">Sale hacia</p>
            <TransitionList transitions={transitions.outgoing} direction="out" />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => moveTo(previousStop(CYCLE_STOPS, active.id))}
          disabled={activeIndex === 0}
          className="inline-flex min-h-11 items-center justify-center rounded-xs border border-hairline-strong bg-surface px-4 type-meta text-foreground transition-colors duration-(--duration-fast) hover:border-border-strong hover:bg-surface-deep disabled:cursor-not-allowed disabled:border-hairline disabled:text-muted disabled:hover:bg-surface"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={() => moveTo(nextStop(CYCLE_STOPS, active.id))}
          disabled={activeIndex === CYCLE_STOPS.length - 1}
          className="inline-flex min-h-11 items-center justify-center rounded-xs border border-hairline-strong bg-surface px-4 type-meta text-foreground transition-colors duration-(--duration-fast) hover:border-border-strong hover:bg-surface-deep disabled:cursor-not-allowed disabled:border-hairline disabled:text-muted disabled:hover:bg-surface"
        >
          Siguiente
        </button>
        <button
          type="button"
          onClick={() => moveTo(0)}
          className="inline-flex min-h-11 items-center justify-center rounded-xs border border-transparent px-4 type-meta text-muted-strong transition-colors duration-(--duration-fast) hover:border-hairline-strong hover:text-foreground"
        >
          Reiniciar
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {announced}
      </p>

      <noscript>
        <p className="mt-4 type-caption text-muted-strong">
          Los controles recorren el ciclo con JavaScript; la tabla de estados de
          más abajo mantiene el registro completo.
        </p>
      </noscript>
    </div>
  );
}
