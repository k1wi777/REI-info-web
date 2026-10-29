import Image from "next/image";
import { CaptureLink } from "@/components/ui/capture-link";
import { WindowFrame } from "@/components/ui/window-frame";
import { INITIALIZER_CAPTURE } from "@/features/product/data/initializer";

type ProductInitializerProps = {
  caption: string;
};

/**
 * Captura real de `/personalize`: el comando lo resuelve el runtime del agente.
 * La web solo muestra la evidencia, no ejecuta nada.
 */
export function ProductInitializer({ caption }: ProductInitializerProps) {
  return (
    <figure className="min-w-0">
      <WindowFrame
        label={INITIALIZER_CAPTURE.label}
        meta={INITIALIZER_CAPTURE.meta}
        bodyClassName="bg-canvas"
        footer={
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <span>
              Captura de un proyecto de ejemplo · el comando no se ejecuta en
              esta web
            </span>
            <CaptureLink href={INITIALIZER_CAPTURE.file} />
          </div>
        }
      >
        <Image
          src={INITIALIZER_CAPTURE.file}
          alt={INITIALIZER_CAPTURE.alt}
          width={INITIALIZER_CAPTURE.width}
          height={INITIALIZER_CAPTURE.height}
          sizes="(min-width: 1024px) 72vw, 100vw"
          className="h-auto w-full"
        />
      </WindowFrame>

      <figcaption className="mt-3 type-caption text-muted-strong">
        {caption} · captura del {INITIALIZER_CAPTURE.capturedAt}
      </figcaption>
    </figure>
  );
}
