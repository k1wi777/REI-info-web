import { DocArticle } from "@/components/layout/doc-article";
import { InlineText } from "@/components/ui/inline-text";
import { getDocsPageText } from "@/content/i18n/docs-nav";
import { getCurrentLocale } from "@/content/i18n/server";
import { getFaqCopy } from "@/features/faq/copy";
import { FAQ_PATH, buildFaqThemes, buildFaqToc } from "@/features/faq/data/faq";
import { fillTemplate } from "@/lib/template";

export async function FaqPage() {
  const lang = await getCurrentLocale();
  const copy = getFaqCopy(lang);
  const themes = buildFaqThemes(copy);

  return (
    <DocArticle
      path={FAQ_PATH}
      eyebrow={copy.eyebrow}
      title={getDocsPageText(lang, FAQ_PATH).title.text}
      description={copy.description}
      meta={fillTemplate(copy.metaTemplate, {
        questions: themes.reduce((total, theme) => total + theme.items.length, 0),
        topics: themes.length,
      })}
      toc={buildFaqToc(copy)}
    >
      <div className="flex flex-col gap-10">
        {themes.map((theme) => (
          <section
            key={theme.id}
            id={`faq-${theme.id}`}
            aria-labelledby={`faq-${theme.id}-heading`}
          >
            <h2
              id={`faq-${theme.id}-heading`}
              className="type-docs-heading text-foreground"
            >
              {theme.title}
            </h2>

            <div className="mt-3 border-t border-hairline">
              {theme.items.map((item) => (
                <details
                  key={item.question}
                  className="group border-b border-hairline"
                >
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 py-4 type-docs text-foreground transition-colors duration-(--duration-fast) hover:text-secondary [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <span
                      aria-hidden="true"
                      className="type-meta-sm text-muted-strong transition-transform duration-(--duration-fast) group-open:rotate-180"
                    >
                      ▾
                    </span>
                  </summary>
                  <p className="max-w-(--container-reading) pb-4 type-docs text-secondary">
                    <InlineText text={item.answer} />
                  </p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </DocArticle>
  );
}
