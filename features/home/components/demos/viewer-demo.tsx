import Image from "next/image";
import { CaptureLink } from "@/components/ui/capture-link";
import { WindowFrame } from "@/components/ui/window-frame";
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
];

const DIFF_ANNOTATION = {
  title: "Diff",
  text: "Si hay cambios respecto de la base de revisión, el visor los publica; aquí aparecen como líneas añadidas.",
};

/** Capturas reales del visor, incrustadas en marcos y anotadas al margen. */
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
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
            <figure className="min-w-0 lg:col-span-8">
              <WindowFrame
                label="127.0.0.1 · rei view"
                meta="solo lectura"
                bodyClassName="bg-canvas"
              >
                <Image
                  src={VIEWER_DESKTOP.file}
                  alt={VIEWER_DESKTOP.alt}
                  width={VIEWER_DESKTOP.width}
                  height={VIEWER_DESKTOP.height}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="h-auto w-full"
                />
              </WindowFrame>
              <figcaption className="mt-3 flex flex-col items-start gap-1 type-caption text-muted-strong">
                <span>Captura real del visor · {DAY}</span>
                <CaptureLink href={VIEWER_DESKTOP.file} />
              </figcaption>
            </figure>

            <div className="flex min-w-0 flex-col gap-8 lg:col-span-4">
              <ol className="grid gap-4">
                {ANNOTATIONS.map((annotation, index) => (
                  <li
                    key={annotation.id}
                    className="grid grid-cols-[1.5rem_1fr] gap-3 border-t border-hairline pt-3"
                  >
                    <span className="type-meta-sm text-muted-strong tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="type-meta text-foreground">
                        {annotation.title}
                      </p>
                      <p className="mt-1.5 type-body text-secondary">
                        {annotation.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="grid grid-cols-2 gap-3">
                {VIEWER_FICHA ? (
                  <figure className="flex min-w-0 flex-col">
                    <WindowFrame label="FICHA" bodyClassName="bg-canvas">
                      <Image
                        src={VIEWER_FICHA.file}
                        alt={VIEWER_FICHA.alt}
                        width={VIEWER_FICHA.width}
                        height={VIEWER_FICHA.height}
                        sizes="(min-width: 1024px) 16vw, 45vw"
                        className="h-auto w-full"
                      />
                    </WindowFrame>
                    <figcaption className="mt-auto pt-2">
                      <CaptureLink href={VIEWER_FICHA.file} />
                    </figcaption>
                  </figure>
                ) : null}

                {VIEWER_MOBILE ? (
                  <figure className="flex min-w-0 flex-col">
                    <WindowFrame label="390 × 844" bodyClassName="bg-canvas">
                      <div className="fade-bottom h-60 overflow-hidden">
                        <Image
                          src={VIEWER_MOBILE.file}
                          alt={VIEWER_MOBILE.alt}
                          width={VIEWER_MOBILE.width}
                          height={VIEWER_MOBILE.height}
                          sizes="(min-width: 1024px) 16vw, 45vw"
                          className="h-auto w-full"
                        />
                      </div>
                    </WindowFrame>
                    <figcaption className="mt-auto pt-2">
                      <CaptureLink href={VIEWER_MOBILE.file} />
                    </figcaption>
                  </figure>
                ) : null}
              </div>
            </div>
          </div>

          {VIEWER_DIFF ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
              <figure className="min-w-0 lg:col-span-8">
                <WindowFrame
                  label="diff"
                  meta="requirements.md"
                  bodyClassName="bg-canvas"
                >
                  <div className="fade-bottom h-80 overflow-hidden">
                    <Image
                      src={VIEWER_DIFF.file}
                      alt={VIEWER_DIFF.alt}
                      width={VIEWER_DIFF.width}
                      height={VIEWER_DIFF.height}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                </WindowFrame>
              </figure>

              <div className="min-w-0 lg:col-span-4 lg:pt-2">
                <p className="type-meta text-foreground">
                  {DIFF_ANNOTATION.title}
                </p>
                <p className="mt-3 type-caption text-secondary">
                  {DIFF_ANNOTATION.text}
                </p>
                <p className="mt-4 border-t border-hairline pt-3 type-caption text-muted-strong">
                  {VIEWER_DIFF.description}
                </p>
                <p className="mt-3 type-caption text-muted-strong">
                  El recorte muestra el inicio del diff; la captura completa
                  queda en la evidencia del Work Item.{" "}
                  <CaptureLink href={VIEWER_DIFF.file} />
                </p>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <p className="type-body text-secondary">
          No hay captura del visor en el manifiesto. Ejecuta{" "}
          <code className="type-code text-foreground">pnpm capture:evidence</code>{" "}
          para generarla.
        </p>
      )}
    </DemoSection>
  );
}
