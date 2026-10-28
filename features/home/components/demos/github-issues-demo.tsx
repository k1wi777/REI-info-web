import Image from "next/image";
import { WindowFrame } from "@/components/ui/window-frame";
import { DemoSection } from "@/features/home/components/demo-section";
import {
  EVIDENCE_ISSUES,
  EVIDENCE_MANIFEST,
  issueBody,
  issueHead,
} from "@/features/home/data/evidence";
import type { EvidenceCapture } from "@/features/home/types";

const DAY = EVIDENCE_MANIFEST.generatedAt.slice(0, 10);

const TARGETS = [
  {
    id: "issue",
    title: "Issue",
    text: "Existe, se asigna y se cierra como reflejo del Work Item.",
  },
  {
    id: "rama",
    title: "Rama",
    text: "Contiene el trabajo que el Reviewer verifica.",
  },
  {
    id: "pr",
    title: "PR",
    text: "Propone el cambio; `.rei` sigue mandando sobre el estado.",
  },
];

const stateLabel = (state: string | undefined) =>
  state === "closed" ? "Closed" : "Open";

/** Pie de la ventana: etiquetas publicadas y enlace a la issue real. */
function IssueFooter({ head, issue }: { head: EvidenceCapture; issue: number }) {
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

      <a
        className="inline-flex border-b border-border-strong pb-0.5 type-meta text-foreground transition-colors duration-(--duration-fast) hover:border-foreground"
        href={head.source}
        target="_blank"
        rel="noreferrer"
      >
        Abrir la issue #{issue} ↗
      </a>
    </div>
  );
}

/** Capturas reales de GitHub Issues y diagrama de proyección desde `.rei`. */
export function GithubIssuesDemo() {
  const issues = EVIDENCE_ISSUES.flatMap((issue) => {
    const head = issueHead(issue);
    return head ? [{ issue, head }] : [];
  });

  const primary =
    issues.find(({ head }) => head.labels?.includes("rei:epic")) ?? issues[0];
  const secondary = issues.filter(
    ({ issue }) => issue !== primary?.issue,
  );
  const epicBody = primary
    ? issueBody(primary.issue)
    : undefined;

  return (
    <DemoSection
      id="github"
      eyebrow="GitHub Issues"
      title="GitHub Issues es una proyección, no la fuente de verdad"
      intro="La integración es opcional y no cambia dónde vive el estado. Estas son capturas reales de las issues públicas del repositorio de REI Harness: están cerradas y se muestran con su estado publicado."
      note="El CLI nunca llama a GitHub: lo hacen `gh` y `git` bajo orden explícita del Leader."
      link={{
        label: "Leer la guía de GitHub Issues",
        href: "/docs/guias/github-issues",
      }}
    >
      {primary ? (
        <figure className="min-w-0">
          <h3 className="sr-only">{primary.head.description}</h3>

          <WindowFrame
            label={`github.com · issues/${primary.issue}`}
            meta={`${stateLabel(primary.head.state)} · ${DAY}`}
            footer={
              <IssueFooter head={primary.head} issue={primary.issue} />
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
          {secondary.map(({ issue, head }) => (
            <figure key={issue} className="min-w-0">
              <h3 className="sr-only">{head.description}</h3>
              <WindowFrame
                label={`issues/${issue}`}
                meta={stateLabel(head.state)}
                footer={<IssueFooter head={head} issue={issue} />}
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
        <div className="min-w-0 border border-hairline-strong bg-surface-deep p-5 lg:col-span-7">
          <p className="type-meta text-muted-strong">Proyección, no fuente</p>

          <div className="mt-4 flex items-baseline justify-between gap-4">
            <p className="break-words type-code text-foreground">
              .rei/specs/&lt;id&gt;/
            </p>
            <span className="shrink-0 type-meta-sm text-muted-strong">
              fuente de verdad
            </span>
          </div>

          <p className="mt-2 max-w-[52ch] type-caption text-secondary">
            Planificación, progreso e historial viven en el repositorio, no en la
            issue.
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
            {TARGETS.map((target) => (
              <li key={target.id} className="min-w-0 py-3 sm:px-3 sm:first:pl-0">
                <p className="type-meta text-foreground">{target.title}</p>
                <p className="mt-1.5 type-caption text-secondary">
                  {target.text}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-4 border-t border-hairline pt-3 type-caption text-muted-strong">
            Integración opcional: se activa con{" "}
            <code className="type-code text-foreground">rei github enable</code>{" "}
            y el flujo funciona sin ella.
          </p>
        </div>

        {epicBody ? (
          <figure className="min-w-0 lg:col-span-5">
            <WindowFrame
              label="issue · cuerpo"
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
            <figcaption className="mt-3 type-caption text-muted-strong">
              Cuerpo publicado de la épica: la task list real, con sus hijas
              cerradas. El recorte muestra el inicio de la captura.
            </figcaption>
          </figure>
        ) : null}
      </div>
    </DemoSection>
  );
}
