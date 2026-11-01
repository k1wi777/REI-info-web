import Image from "next/image";
import { CaptureLink } from "@/components/ui/capture-link";
import { WindowFrame } from "@/components/ui/window-frame";
import { getCurrentProductCopy } from "@/features/product/copy/server";
import {
  PRODUCT_EVIDENCE_DAY,
  productViewerCapture,
} from "@/features/product/data/captures";
import type { ProductCaptureId } from "@/features/product/copy/types";
import { fillTemplate } from "@/lib/template";

type ProductViewerProps = {
  caption: string;
};

/**
 * Evidencia real del visor: la ventana principal y la FICHA. Las capturas
 * vienen del manifiesto; aquí solo se compone la lectura, no se simula nada.
 */
export async function ProductViewer({ caption }: ProductViewerProps) {
  const copy = await getCurrentProductCopy();
  const alt = (id: string) => copy.captures[id as ProductCaptureId];
  const desktop = productViewerCapture("desktop");
  const ficha = productViewerCapture("ficha");

  if (!desktop) {
    return (
      <p className="type-body text-secondary">
        {copy.viewer.missingBefore}{" "}
        <code className="type-code text-foreground">pnpm capture:evidence</code>{" "}
        {copy.viewer.missingAfter}
      </p>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
      <figure className="min-w-0 lg:col-span-8">
        <WindowFrame
          label="127.0.0.1 · rei view"
          meta={copy.viewer.windowMeta}
          bodyClassName="bg-canvas"
        >
          <Image
            src={desktop.file}
            alt={alt(desktop.id)}
            width={desktop.width}
            height={desktop.height}
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="h-auto w-full"
          />
        </WindowFrame>

        <figcaption className="mt-3 flex flex-col items-start gap-1 type-caption text-muted-strong">
          <span>
            {fillTemplate(copy.viewer.caption, {
              caption,
              date: PRODUCT_EVIDENCE_DAY,
            })}
          </span>
          <CaptureLink href={desktop.file} label={copy.captureLink} />
        </figcaption>
      </figure>

      <div className="flex min-w-0 flex-col gap-5 lg:col-span-4">
        {ficha ? (
          <figure className="min-w-0">
            <WindowFrame label="FICHA" bodyClassName="bg-canvas">
              <Image
                src={ficha.file}
                alt={alt(ficha.id)}
                width={ficha.width}
                height={ficha.height}
                sizes="(min-width: 1024px) 24vw, 100vw"
                className="h-auto w-full"
              />
            </WindowFrame>
            <figcaption className="mt-2 flex flex-col items-start gap-1 type-caption text-muted-strong">
              <span>
                {copy.viewer.fichaCaption}
              </span>
              <CaptureLink href={ficha.file} label={copy.captureLink} />
            </figcaption>
          </figure>
        ) : null}

        <p className="border-t border-hairline pt-4 type-caption text-muted-strong">
          {copy.viewer.footnote}
        </p>
      </div>
    </div>
  );
}
