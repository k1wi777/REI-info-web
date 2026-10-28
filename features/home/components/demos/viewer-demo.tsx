import Image from "next/image";
import { DemoSection } from "@/features/home/components/demo-section";
import {
  EVIDENCE_MANIFEST,
  VIEWER_DESKTOP,
  VIEWER_DIFF,
  VIEWER_FICHA,
  VIEWER_MOBILE,
} from "@/features/home/data/evidence";

const DAY = EVIDENCE_MANIFEST.generatedAt.slice(0, 10);

const ANNOTATIONS = [
  {
    id: "toc",
    title: "TOC del Work Item",
    text: "El índice lista los documentos del Work Item; los que no existen se marcan como «no existe».",
  },
  {
    id: "validacion",
    title: "Validación",
    text: "El visor muestra el resultado de los checkpoints junto a la FICHA, con el estado real del trabajo.",
  },
  {
    id: "ficha",
    title: "FICHA",
    text: "Tipo, estado, fecha y enlaces del Work Item. No hay botón ni ruta de aprobación.",
  },
  ...(VIEWER_DIFF
    ? [
        {
          id: "diff",
          title: "Diff",
          text: "Si hay cambios respecto de la base de revisión, el visor los publica; aquí aparecen como líneas añadidas.",
        },
      ]
    : []),
];

/** Marco de navegador con la captura real del visor y un rail de anotaciones. */
export function ViewerDemo() {
  return (
    <DemoSection
      id="visor"
      eyebrow="Visor"
      title="rei view muestra el Work Item, no lo aprueba"
      intro="Una captura real del visor local: documentos renderizados, tabla de contenidos, validación y FICHA. Es de solo lectura y no tiene botones que finjan aprobar."
      note={`Captura tomada con \`pnpm capture:evidence\` el ${DAY}; el visor se sirve en local y no forma parte de la web.`}
      link={{ label: "Ver la página del visor", href: "/producto/visor" }}
    >
      {VIEWER_DESKTOP ? (
        <>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <figure className="min-w-0 lg:col-span-8">
              <div className="border border-hairline-strong bg-surface-deep">
                <div className="flex items-center justify-between gap-3 border-b border-hairline px-3 py-2">
                  <span aria-hidden="true" className="flex gap-1.5">
                    <span className="size-2 rounded-full border border-border-strong" />
                    <span className="size-2 rounded-full border border-border-strong" />
                    <span className="size-2 rounded-full border border-border-strong" />
                  </span>
                  <span className="truncate type-meta-sm text-muted-strong">
                    127.0.0.1 · rei view · solo lectura
                  </span>
                </div>
                <Image
                  src={VIEWER_DESKTOP.file}
                  alt={VIEWER_DESKTOP.alt}
                  width={VIEWER_DESKTOP.width}
                  height={VIEWER_DESKTOP.height}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 type-meta-sm text-muted-strong">
                Captura real del visor · {DAY}
              </figcaption>
            </figure>

            <div className="min-w-0 lg:col-span-4">
              <ol className="space-y-4">
                {ANNOTATIONS.map((annotation, index) => (
                  <li
                    key={annotation.id}
                    className="grid grid-cols-[auto_1fr] gap-3 border-t border-hairline pt-3"
                  >
                    <span className="type-meta-sm text-muted-strong">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="type-meta text-foreground">
                        {annotation.title}
                      </h3>
                      <p className="mt-1 type-docs text-secondary">
                        {annotation.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {VIEWER_FICHA ? (
                  <figure className="min-w-0 border border-hairline bg-surface-deep">
                    <figcaption className="border-b border-hairline px-2 py-1.5 type-meta-sm text-muted-strong">
                      FICHA
                    </figcaption>
                    <Image
                      src={VIEWER_FICHA.file}
                      alt={VIEWER_FICHA.alt}
                      width={VIEWER_FICHA.width}
                      height={VIEWER_FICHA.height}
                      sizes="(min-width: 1024px) 18vw, 45vw"
                      className="h-auto w-full"
                    />
                  </figure>
                ) : null}

                {VIEWER_MOBILE ? (
                  <figure className="min-w-0 border border-hairline bg-surface-deep">
                    <figcaption className="border-b border-hairline px-2 py-1.5 type-meta-sm text-muted-strong">
                      390 × 844
                    </figcaption>
                    <Image
                      src={VIEWER_MOBILE.file}
                      alt={VIEWER_MOBILE.alt}
                      width={VIEWER_MOBILE.width}
                      height={VIEWER_MOBILE.height}
                      sizes="(min-width: 1024px) 18vw, 45vw"
                      className="h-auto w-full"
                    />
                  </figure>
                ) : null}
              </div>
            </div>
          </div>

          {VIEWER_DIFF ? (
            <figure className="mt-6 min-w-0 border border-hairline bg-surface-deep">
              <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-hairline px-3 py-2">
                <span className="type-meta-sm text-foreground">
                  Diff que muestra el visor
                </span>
                <span className="type-meta-sm text-muted-strong">
                  {VIEWER_DIFF.description}
                </span>
              </figcaption>
              <div className="overflow-x-auto">
                <Image
                  src={VIEWER_DIFF.file}
                  alt={VIEWER_DIFF.alt}
                  width={VIEWER_DIFF.width}
                  height={VIEWER_DIFF.height}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </figure>
          ) : null}
        </>
      ) : (
        <p className="type-docs text-secondary">
          No hay captura del visor en el manifiesto. Ejecuta{" "}
          <code className="type-code text-foreground">pnpm capture:evidence</code>{" "}
          para generarla.
        </p>
      )}
    </DemoSection>
  );
}
