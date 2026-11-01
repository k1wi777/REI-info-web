import type { Metadata } from "next";
import { FONT_CLASS_NAMES } from "@/app/fonts";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/content/i18n";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n";
import "@/app/globals.css";

const dictionary = getDictionary(DEFAULT_LOCALE);

export const metadata: Metadata = {
  title: dictionary.notFound.metaTitle,
  description: dictionary.notFound.metaDescription,
};

/**
 * 404 para URLs sin idioma válido, donde no hay layout de idioma. Es bilingüe
 * porque no se puede saber qué idioma prefiere la persona.
 */
export default function GlobalNotFound() {
  return (
    <html lang={DEFAULT_LOCALE} className={`${FONT_CLASS_NAMES} h-full`}>
      <body className="min-h-full bg-canvas font-sans text-foreground antialiased">
        <main className="flex min-h-dvh items-center">
          <Container className="py-20">
            <p className="type-meta text-muted-strong">404</p>
            {LOCALES.map((lang, index) => {
              const { notFound } = getDictionary(lang);
              const Heading = index === 0 ? "h1" : "h2";

              return (
                <section key={lang} lang={lang} className="mt-6">
                  <Heading className="type-display max-w-[16ch] text-foreground">
                    {notFound.title}
                  </Heading>
                  <div className="mt-5">
                    <ButtonLink href={`/${lang}`} locale={lang}>
                      {notFound.home}
                    </ButtonLink>
                  </div>
                </section>
              );
            })}
          </Container>
        </main>
      </body>
    </html>
  );
}
