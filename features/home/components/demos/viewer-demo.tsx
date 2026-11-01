import Image from "next/image";
import { CaptureLink } from "@/components/ui/capture-link";
import { WindowFrame } from "@/components/ui/window-frame";
import { DemoSection } from "@/features/home/components/demo-section";
import { getCurrentHomeCopy } from "@/features/home/copy/server";
import {
  EVIDENCE_MANIFEST,
  VIEWER_DESKTOP,
  VIEWER_DIFF,
  VIEWER_FICHA,
  VIEWER_MOBILE,
  localizeCapture,
} from "@/features/home/data/evidence";

const DAY = EVIDENCE_MANIFEST.generatedAt.slice(0, 10);

/** Capturas reales del visor, incrustadas en marcos y anotadas al margen. */
export async function ViewerDemo() {
  const { viewer, captures, ui } = await getCurrentHomeCopy();
  const desktop = VIEWER_DESKTOP && localizeCapture(VIEWER_DESKTOP, captures);
  const ficha = VIEWER_FICHA && localizeCapture(VIEWER_FICHA, captures);
  const mobile = VIEWER_MOBILE && localizeCapture(VIEWER_MOBILE, captures);
  const diff = VIEWER_DIFF && localizeCapture(VIEWER_DIFF, captures);

  return (
    <DemoSection
      id="visor"
      eyebrow={viewer.eyebrow}
      title={viewer.title}
      intro={viewer.intro}
      note={viewer.note(DAY)}
      link={{ label: viewer.linkLabel, href: "/producto/visor" }}
    >
      {desktop ? (
        <>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
            <figure data-reveal="left" className="min-w-0 lg:col-span-8">
              <WindowFrame
                label="127.0.0.1 · rei view"
                meta={viewer.frameMeta}
                bodyClassName="bg-canvas"
              >
                <Image
                  src={desktop.file}
                  alt={desktop.alt}
                  width={desktop.width}
                  height={desktop.height}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="h-auto w-full"
                />
              </WindowFrame>
              <figcaption className="mt-3 flex flex-col items-start gap-1 type-caption text-muted-strong">
                <span>{viewer.caption(DAY)}</span>
                <CaptureLink href={desktop.file} label={ui.captureLink} />
              </figcaption>
            </figure>

            <div
              data-reveal="right"
              className="flex min-w-0 flex-col gap-8 lg:col-span-4"
            >
              <ol className="grid gap-4">
                {viewer.annotations.map((annotation, index) => (
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
                {ficha ? (
                  <figure className="flex min-w-0 flex-col">
                    <WindowFrame label="FICHA" bodyClassName="bg-canvas">
                      <Image
                        src={ficha.file}
                        alt={ficha.alt}
                        width={ficha.width}
                        height={ficha.height}
                        sizes="(min-width: 1024px) 16vw, 45vw"
                        className="h-auto w-full"
                      />
                    </WindowFrame>
                    <figcaption className="mt-auto pt-2">
                      <CaptureLink href={ficha.file} label={ui.captureLink} />
                    </figcaption>
                  </figure>
                ) : null}

                {mobile ? (
                  <figure className="flex min-w-0 flex-col">
                    <WindowFrame label="390 × 844" bodyClassName="bg-canvas">
                      <div className="fade-bottom h-60 overflow-hidden">
                        <Image
                          src={mobile.file}
                          alt={mobile.alt}
                          width={mobile.width}
                          height={mobile.height}
                          sizes="(min-width: 1024px) 16vw, 45vw"
                          className="h-auto w-full"
                        />
                      </div>
                    </WindowFrame>
                    <figcaption className="mt-auto pt-2">
                      <CaptureLink href={mobile.file} label={ui.captureLink} />
                    </figcaption>
                  </figure>
                ) : null}
              </div>
            </div>
          </div>

          {diff ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
              <figure data-reveal="up" className="min-w-0 lg:col-span-8">
                <WindowFrame
                  label="diff"
                  meta="requirements.md"
                  bodyClassName="bg-canvas"
                >
                  <div className="fade-bottom h-80 overflow-hidden">
                    <Image
                      src={diff.file}
                      alt={diff.alt}
                      width={diff.width}
                      height={diff.height}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                </WindowFrame>
              </figure>

              <div
                data-reveal="right"
                data-reveal-delay="1"
                className="min-w-0 lg:col-span-4 lg:pt-2"
              >
                <p className="type-meta text-foreground">
                  {viewer.diff.title}
                </p>
                <p className="mt-3 type-caption text-secondary">
                  {viewer.diff.text}
                </p>
                <p className="mt-4 border-t border-hairline pt-3 type-caption text-muted-strong">
                  {diff.description}
                </p>
                <p className="mt-3 type-caption text-muted-strong">
                  {viewer.diff.crop}{" "}
                  <CaptureLink href={diff.file} label={ui.captureLink} />
                </p>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <p className="type-body text-secondary">
          {viewer.missingPre}{" "}
          <code className="type-code text-foreground">pnpm capture:evidence</code>{" "}
          {viewer.missingPost}
        </p>
      )}
    </DemoSection>
  );
}
