import Image from "next/image";
import { CaptureLink } from "@/components/ui/capture-link";
import { WindowFrame } from "@/components/ui/window-frame";
import {
  PRODUCT_EVIDENCE_DAY,
  productViewerCapture,
} from "@/features/product/data/captures";

type ProductViewerProps = {
  caption: string;
};

/**
 * Evidencia real del visor: la ventana principal y la FICHA. Las capturas
 * vienen del manifiesto; aquí solo se compone la lectura, no se simula nada.
 */
export function ProductViewer({ caption }: ProductViewerProps) {
  const desktop = productViewerCapture("desktop");
  const ficha = productViewerCapture("ficha");

  if (!desktop) {
    return (
      <p className="type-body text-secondary">
        No hay captura del visor en el manifiesto. Ejecuta{" "}
        <code className="type-code text-foreground">pnpm capture:evidence</code>{" "}
        para generarla.
      </p>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
      <figure className="min-w-0 lg:col-span-8">
        <WindowFrame
          label="127.0.0.1 · rei view"
          meta="solo lectura"
          bodyClassName="bg-canvas"
        >
          <Image
            src={desktop.file}
            alt={desktop.alt}
            width={desktop.width}
            height={desktop.height}
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="h-auto w-full"
          />
        </WindowFrame>

        <figcaption className="mt-3 flex flex-col items-start gap-1 type-caption text-muted-strong">
          <span>
            {caption} · {PRODUCT_EVIDENCE_DAY}
          </span>
          <CaptureLink href={desktop.file} />
        </figcaption>
      </figure>

      <div className="flex min-w-0 flex-col gap-5 lg:col-span-4">
        {ficha ? (
          <figure className="min-w-0">
            <WindowFrame label="FICHA" bodyClassName="bg-canvas">
              <Image
                src={ficha.file}
                alt={ficha.alt}
                width={ficha.width}
                height={ficha.height}
                sizes="(min-width: 1024px) 24vw, 100vw"
                className="h-auto w-full"
              />
            </WindowFrame>
            <figcaption className="mt-2 flex flex-col items-start gap-1 type-caption text-muted-strong">
              <span>
                Tipo, estado y enlaces del Work Item. Sin botón ni ruta de
                aprobación.
              </span>
              <CaptureLink href={ficha.file} />
            </figcaption>
          </figure>
        ) : null}

        <p className="border-t border-hairline pt-4 type-caption text-muted-strong">
          Captura real del visor servido en local. La aprobación se registra
          desde el CLI.
        </p>
      </div>
    </div>
  );
}
