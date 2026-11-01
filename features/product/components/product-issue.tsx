import Image from "next/image";
import { CaptureLink } from "@/components/ui/capture-link";
import { WindowFrame } from "@/components/ui/window-frame";
import { getCurrentProductCopy } from "@/features/product/copy/server";
import type { ProductCaptureId } from "@/features/product/copy/types";
import { fillTemplate } from "@/lib/template";
import {
  PRODUCT_EVIDENCE_DAY,
  issueStateLabel,
  productIssueCapture,
} from "@/features/product/data/captures";

type ProductIssueProps = {
  number: number;
  caption: string;
};

/**
 * Una issue pública real, con su estado y sus labels. Es una proyección del
 * trabajo: el enlace de origen permite comprobar que existe.
 */
export async function ProductIssue({ number, caption }: ProductIssueProps) {
  const copy = await getCurrentProductCopy();
  const capture = productIssueCapture(number);

  if (!capture) {
    return null;
  }

  return (
    <figure className="min-w-0">
      <WindowFrame
        label={`github.com · issues/${number}`}
        meta={`${issueStateLabel(capture.state)} · ${PRODUCT_EVIDENCE_DAY}`}
        bodyClassName="bg-canvas"
        footer={
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            {capture.labels && capture.labels.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5">
                {capture.labels.map((label) => (
                  <li
                    key={label}
                    className="rounded-xs border border-border-strong px-1.5 py-0.5 type-meta-sm text-muted-strong"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            ) : (
              <span />
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <CaptureLink href={capture.file} label={copy.captureLink} />
              <a
                className="inline-flex min-h-6 items-center border-b border-border-strong pb-0.5 type-meta text-foreground transition-colors duration-(--duration-fast) hover:border-foreground"
                href={capture.source}
                target="_blank"
                rel="noreferrer"
              >
                {fillTemplate(copy.issue.open, { number })}
              </a>
            </div>
          </div>
        }
      >
        <Image
          src={capture.file}
          alt={copy.captures[capture.id as ProductCaptureId]}
          width={capture.width}
          height={capture.height}
          sizes="(min-width: 1024px) 72vw, 100vw"
          className="h-auto w-full"
        />
      </WindowFrame>

      <figcaption className="mt-3 type-caption text-muted-strong">
        {fillTemplate(copy.issue.caption, {
          caption,
          date: PRODUCT_EVIDENCE_DAY,
        })}
      </figcaption>
    </figure>
  );
}
