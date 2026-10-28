import Image from "next/image";
import { StatusTag } from "@/components/ui/status-tag";
import { DemoSection } from "@/features/home/components/demo-section";
import {
  EVIDENCE_ISSUES,
  EVIDENCE_MANIFEST,
  issueBody,
  issueHead,
} from "@/features/home/data/evidence";

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

/** Capturas reales de GitHub Issues y diagrama de proyección desde `.rei`. */
export function GithubIssuesDemo() {
  const epicIssue = EVIDENCE_ISSUES.find((issue) =>
    issueHead(issue)?.labels?.includes("rei:epic"),
  );
  const epicBody = epicIssue ? issueBody(epicIssue) : undefined;

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
      <ul className="space-y-4">
        {EVIDENCE_ISSUES.map((issue) => {
          const head = issueHead(issue);
          if (!head) return null;

          return (
            <li
              key={issue}
              className="min-w-0 border border-hairline-strong bg-surface-deep lg:grid lg:grid-cols-[minmax(0,1fr)_20rem]"
            >
              <figure className="min-w-0 border-b border-hairline lg:border-b-0 lg:border-r">
                <Image
                  src={head.file}
                  alt={head.alt}
                  width={head.width}
                  height={head.height}
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  className="h-auto w-full"
                />
              </figure>

              <div className="flex min-w-0 flex-col p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="type-meta text-muted-strong">
                    GitHub Issues · #{issue}
                  </p>
                  <StatusTag>{stateLabel(head.state)}</StatusTag>
                </div>

                <h3 className="mt-3 type-docs-heading text-foreground">
                  {head.description}
                </h3>

                {head.labels && head.labels.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {head.labels.map((label) => (
                      <li
                        key={label}
                        className="rounded-xs border border-border-strong px-1.5 py-0.5 type-meta-sm text-muted-strong"
                      >
                        {label}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <a
                  className="mt-4 inline-flex w-fit border-b border-border-strong pb-0.5 type-meta text-foreground transition-colors duration-(--duration-fast) hover:border-foreground"
                  href={head.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir la issue #{issue} ↗
                </a>

                <p className="mt-auto pt-4 type-meta-sm text-muted-strong">
                  Captura real · {DAY}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {epicBody ? (
        <figure className="mt-4 min-w-0 border border-hairline bg-surface-deep">
          <figcaption className="border-b border-hairline px-4 py-2 type-meta-sm text-muted-strong">
            Cuerpo publicado de la épica: la task list real, con sus hijas
            cerradas
          </figcaption>
          <Image
            src={epicBody.file}
            alt={epicBody.alt}
            width={epicBody.width}
            height={epicBody.height}
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="h-auto w-full"
          />
        </figure>
      ) : null}

      <div className="mt-6 border border-hairline-strong bg-surface-deep">
        <p className="border-b border-hairline px-4 py-3 type-meta text-muted-strong">
          Proyección, no fuente · .rei → issue / rama / PR
        </p>

        <div className="grid gap-4 p-4 lg:grid-cols-12 lg:items-center">
          <div className="border border-hairline p-4 lg:col-span-4">
            <p className="type-meta-sm text-muted-strong">
              Fuente de verdad
            </p>
            <p className="mt-2 break-words type-code text-foreground">
              .rei/specs/&lt;id&gt;/
            </p>
            <p className="mt-2 type-docs text-secondary">
              Planificación, progreso e historial viven en el repositorio, no en
              la issue.
            </p>
          </div>

          <p
            aria-hidden="true"
            className="hidden type-meta text-muted-strong lg:col-span-1 lg:block lg:text-center"
          >
            →
          </p>

          <ul className="grid gap-2 sm:grid-cols-3 lg:col-span-7">
            {TARGETS.map((target) => (
              <li key={target.id} className="border border-hairline p-3">
                <h3 className="type-meta text-foreground">{target.title}</h3>
                <p className="mt-2 type-docs text-secondary">{target.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="border-t border-hairline px-4 py-3 type-meta-sm text-muted-strong">
          Integración opcional: se activa con{" "}
          <code className="type-code text-foreground">rei github enable</code> y
          el flujo funciona sin ella.
        </p>
      </div>
    </DemoSection>
  );
}
