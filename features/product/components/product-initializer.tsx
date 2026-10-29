import Image from "next/image";
import { InlineText } from "@/components/ui/inline-text";
import { CaptureLink } from "@/components/ui/capture-link";
import { WindowFrame } from "@/components/ui/window-frame";
import { INITIALIZER_CAPTURE } from "@/features/product/data/initializer";

type ProductInitializerProps = {
  text: string;
  caption: string;
};

/**
 * Captura real de `/personalize`: el comando lo resuelve el runtime del agente.
 * La web solo muestra la evidencia, no ejecuta nada.
 */
export function ProductInitializer({ text, caption }: ProductInitializerProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
      <div className="min-w-0 lg:col-span-6">
        <p className="type-meta-sm text-muted-strong">
          Initializer · /personalize
        </p>
        <p className="mt-2 max-w-[48ch] type-body text-secondary">
          <InlineText text={text} />
        </p>
      </div>

      <figure className="min-w-0 lg:col-span-6">
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
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="h-auto w-full"
          />
        </WindowFrame>

        <figcaption className="mt-3 type-caption text-muted-strong">
          {caption} · captura del {INITIALIZER_CAPTURE.capturedAt}
        </figcaption>
      </figure>
    </div>
  );
}
