import { WORK_ITEM_STATES } from "@/content/rei";
import type { WorkItemState, WorkItemStateId } from "@/content/rei";

type StateTableProps = {
  stateIds: WorkItemStateId[];
};

/** Estados canónicos; ciclo y ramas se distinguen por texto, no solo por color. */
export function StateTable({ stateIds }: StateTableProps) {
  const states = stateIds
    .map((id) => WORK_ITEM_STATES.find((state) => state.id === id))
    .filter((state): state is WorkItemState => Boolean(state));

  return (
    <div className="min-w-0 max-w-full overflow-x-auto border border-hairline">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="border-b border-hairline px-3 py-2 text-left type-meta-sm text-muted-strong">
          Estados de un Work Item
        </caption>
        <thead>
          <tr>
            {["Estado", "Tipo", "Qué significa"].map((column) => (
              <th
                key={column}
                scope="col"
                className="border-b border-hairline-strong px-3 py-2 type-meta text-muted-strong"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {states.map((state) => (
            <tr
              key={state.id}
              className="border-b border-hairline last:border-b-0"
            >
              <td className="px-3 py-2.5 align-top type-code text-foreground">
                {state.label}
              </td>
              <td className="px-3 py-2.5 align-top type-meta-sm text-muted-strong">
                {state.kind === "cycle" ? "Ciclo" : "Rama"}
                {state.terminal ? " · terminal" : ""}
              </td>
              <td className="px-3 py-2.5 align-top type-docs text-secondary">
                {state.meaning}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
