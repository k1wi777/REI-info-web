import Image from "next/image";
import { CaptureLink } from "@/components/ui/capture-link";
import { WindowFrame } from "@/components/ui/window-frame";
import { DemoSection } from "@/features/home/components/demo-section";
import { getCurrentHomeCopy } from "@/features/home/copy/server";
import type { HomeCopy } from "@/features/home/copy/types";
import {
  EVIDENCE_ISSUES,
  EVIDENCE_MANIFEST,
  issueBody,
  issueHead,
  localizeCapture,
} from "@/features/home/data/evidence";
import type { EvidenceCapture } from "@/features/home/types";

const DAY = EVIDENCE_MANIFEST.generatedAt.slice(0, 10);

const stateLabel = (state: string | undefined) =>
  state === "closed" ? "Closed" : "Open";

/** Pie de la ventana: etiquetas publicadas y enlace a la issue real. */
function IssueFooter({
  head,
  issue,
  copy,
}: {
  head: EvidenceCapture;
  issue: number;
  copy: HomeCopy;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      {head.labels && head.labels.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {head.labels.map((label) => (
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
        <CaptureLink href={head.file} label={copy.ui.captureLink} />
        <a
          className="inline-flex -mt-1.5 border-b border-border-strong pb-0.5 pt-1.5 type-meta text-foreground transition-colors duration-(--duration-fast) hover:border-foreground"
          href={head.source}
          target="_blank"
          rel="noreferrer"
        >
          {copy.github.openIssue(issue)}
        </a>
      </div>
    </div>
  );
}

/** Capturas reales de GitHub Issues y diagrama de proyección desde `.rei`. */
export async function GithubIssuesDemo() {
  const copy = await getCurrentHomeCopy();
  const { github, captures } = copy;
  const issues = EVIDENCE_ISSUES.flatMap((issue) => {
    const head = issueHead(issue);
    return head ? [{ issue, head: localizeCapture(head, captures) }] : [];
  });

  const primary =
    issues.find(({ head }) => head.labels?.includes("rei:epic")) ?? issues[0];
  const secondary = issues.filter(
    ({ issue }) => issue !== primary?.issue,
  );
  const rawBody = primary ? issueBody(primary.issue) : undefined;
  const epicBody = rawBody && localizeCapture(rawBody, captures);

  return (
    <DemoSection
      id="github"
      eyebrow={github.eyebrow}
      title={github.title}
      intro={github.intro}
      note={github.note}
      link={{
        label: github.linkLabel,
        href: "/docs/guias/github-issues",
      }}
    >
      {primary ? (
        <figure data-reveal="up" className="min-w-0">
          <figcaption className="sr-only">{primary.head.description}</figcaption>

          <WindowFrame
            label={`github.com · issues/${primary.issue}`}
            meta={`${stateLabel(primary.head.state)} · ${DAY}`}
            footer={
              <IssueFooter
                head={primary.head}
                issue={primary.issue}
                copy={copy}
              />
            }
            bodyClassName="bg-canvas"
          >
            <Image
              src={primary.head.file}
              alt={primary.head.alt}
              width={primary.head.width}
              height={primary.head.height}
              sizes="(min-width: 1024px) 72vw, 100vw"
              className="h-auto w-full"
            />
          </WindowFrame>
        </figure>
      ) : null}

      {secondary.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {secondary.map(({ issue, head }, index) => (
            <figure
              key={issue}
              data-reveal="up"
              data-reveal-delay={String(Math.min(index + 1, 5))}
              className="min-w-0"
            >
              <figcaption className="sr-only">{head.description}</figcaption>
              <WindowFrame
                label={`issues/${issue}`}
                meta={stateLabel(head.state)}
                footer={
                  <IssueFooter head={head} issue={issue} copy={copy} />
                }
                bodyClassName="bg-canvas"
              >
                <Image
                  src={head.file}
                  alt={head.alt}
                  width={head.width}
                  height={head.height}
                  sizes="(min-width: 640px) 45vw, 100vw"
                  className="h-auto w-full"
                />
              </WindowFrame>
            </figure>
          ))}
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div
          data-reveal="up"
          className="min-w-0 border border-hairline-strong bg-surface-deep p-5 lg:col-span-7"
        >
          <p className="type-meta text-muted-strong">
            {github.projection.label}
          </p>

          <div className="mt-4 flex items-baseline justify-between gap-4">
            <p className="break-words type-code text-foreground">
              .rei/specs/&lt;id&gt;/
            </p>
            <span className="shrink-0 type-meta-sm text-muted-strong">
              {github.projection.truth}
            </span>
          </div>

          <p className="mt-2 max-w-[52ch] type-caption text-secondary">
            {github.projection.body}
          </p>

          <svg
            aria-hidden="true"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            className="mt-4 hidden h-5 w-full text-border-strong sm:block"
          >
            <path
              d="M50 0v8M16 8h68M16 8v12M50 8v12M84 8v12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ul className="mt-2 grid border-t border-hairline sm:grid-cols-3 sm:divide-x sm:divide-hairline">
            {github.targets.map((target, index) => (
              <li
                key={target.id}
                data-reveal="fade"
                data-reveal-delay={String(index + 1)}
                className="min-w-0 py-3 sm:px-3 sm:first:pl-0"
              >
                <p className="type-meta text-foreground">{target.title}</p>
                <p className="mt-1.5 type-caption text-secondary">
                  {target.text}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-4 border-t border-hairline pt-3 type-caption text-muted-strong">
            {github.projection.optionalPre}{" "}
            <code className="type-code text-foreground">rei github enable</code>{" "}
            {github.projection.optionalPost}
          </p>
        </div>

        {epicBody ? (
          <figure data-reveal="up" className="min-w-0 lg:col-span-5">
            <WindowFrame
              label={github.bodyFrame}
              meta={`#${primary?.issue}`}
              bodyClassName="bg-canvas"
            >
              <div className="fade-bottom h-80 overflow-hidden">
                <Image
                  src={epicBody.file}
                  alt={epicBody.alt}
                  width={epicBody.width}
                  height={epicBody.height}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </WindowFrame>
            <figcaption className="mt-3 flex flex-col items-start gap-1 type-caption text-muted-strong">
              <span>{github.bodyCaption}</span>
              <CaptureLink href={epicBody.file} label={copy.ui.captureLink} />
            </figcaption>
          </figure>
        ) : null}
      </div>
    </DemoSection>
  );
}
