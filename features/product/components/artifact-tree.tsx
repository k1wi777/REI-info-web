import { Fragment } from "react";
import { getCurrentProductCopy } from "@/features/product/copy/server";
import { WindowFrame } from "@/components/ui/window-frame";
import { fillTemplate } from "@/lib/template";
import {
  ARTIFACT_ENTRIES,
  ARTIFACT_GROUPS,
} from "@/features/product/data/artifacts";

/** Rompe la ruta por sus barras, nunca por la mitad de un nombre de archivo. */
function PathText({ path }: { path: string }) {
  const parts = path.split("/");

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 ? (
            <>
              /<wbr />
            </>
          ) : null}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Árbol real de `.rei/` con conectores, qué deja cada documento y quién lo
 * escribe. El texto lleva la misma información que el dibujo.
 */
export async function ArtifactTree() {
  const copy = (await getCurrentProductCopy()).artifacts;
  return (
    <WindowFrame
      label={copy.windowLabel}
      meta={`${ARTIFACT_ENTRIES.length}`}
      footer={fillTemplate(copy.footer, { count: ARTIFACT_ENTRIES.length })}
    >
      <div
        aria-label={copy.treeLabel}
        tabIndex={0}
        className="scroll-code overflow-x-auto px-4 py-4 lg:max-h-[32.5rem] lg:overflow-y-auto lg:overscroll-contain xl:max-h-[30rem]"
      >
        {ARTIFACT_GROUPS.map((group) => (
          <div key={group.id} className="mb-6 last:mb-0">
            <p className="break-words type-code text-foreground">
              {group.root}
            </p>
            <p className="mt-0.5 type-meta-sm text-muted-strong">
              {copy.groups[group.id]}
            </p>

            <ul className="mt-2 border-l border-border-strong">
              {group.entries.map((entry) => (
                <li
                  key={entry.id}
                  className="relative border-b border-hairline py-3 pl-4 last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.7em] left-0 h-px w-3 bg-border-strong"
                  />

                  <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_6.5rem] lg:gap-3">
                    <div className="min-w-0">
                      <p className="break-words type-code text-foreground">
                        <PathText path={entry.path} />
                      </p>
                      <p className="mt-1 break-words type-caption text-secondary">
                        {copy.entries[entry.id].note}
                      </p>
                    </div>

                    <div className="min-w-0 lg:text-right">
                      <p className="type-meta-sm text-muted-strong">
                        {copy.applies[entry.appliesTo]}
                      </p>
                      <p className="mt-1 break-words type-caption text-secondary">
                        {copy.entries[entry.id].owner}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </WindowFrame>
  );
}
