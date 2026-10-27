import type { ReactNode } from "react";
import type { TocItem } from "@/content/docs";
import { ApprovalBand } from "@/components/layout/approval-band";
import { DocsPager } from "@/components/layout/docs-pager";
import { DocsToc } from "@/components/layout/docs-toc";

type DocArticleProps = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
  toc: TocItem[];
  children: ReactNode;
};

/** Artículo de documentación: encabezado, TOC, contenido, puerta y pager. */
export function DocArticle({
  path,
  eyebrow,
  title,
  description,
  meta,
  toc,
  children,
}: DocArticleProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_13rem]">
      <article aria-labelledby="doc-title" className="min-w-0">
        <header className="border-b border-hairline pb-6">
          <p className="type-meta text-muted-strong">{eyebrow}</p>
          <h1
            id="doc-title"
            className="type-docs-title mt-3 text-foreground"
          >
            {title}
          </h1>
          <p className="mt-3 max-w-(--container-reading) type-docs text-secondary">
            {description}
          </p>
          {meta ? (
            <p className="mt-4 type-meta-sm text-muted-strong">{meta}</p>
          ) : null}
        </header>

        <div className="mt-8">{children}</div>

        <ApprovalBand />
        <DocsPager path={path} />
      </article>

      <DocsToc items={toc} />
    </div>
  );
}
