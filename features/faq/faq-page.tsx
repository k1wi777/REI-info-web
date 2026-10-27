import { DocArticle } from "@/components/layout/doc-article";
import {
  FAQ_PATH,
  FAQ_THEMES,
  FAQ_TOC,
} from "@/features/faq/data/faq";

export function FaqPage() {
  return (
    <DocArticle
      path={FAQ_PATH}
      eyebrow="Operación"
      title="Preguntas frecuentes"
      description="Dudas reales sobre Work Items en paralelo, cambios directos, checks, git, historial y documentación necesaria."
      meta={`${FAQ_THEMES.reduce((total, theme) => total + theme.items.length, 0)} preguntas · ${FAQ_THEMES.length} temas`}
      toc={FAQ_TOC}
    >
      <div className="flex flex-col gap-10">
        {FAQ_THEMES.map((theme) => (
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
                    {item.answer}
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
