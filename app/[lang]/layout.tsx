import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { FONT_CLASS_NAMES } from "@/app/fonts";
import { getDictionary } from "@/content/i18n";
import { PRODUCT_NAME, getSiteUrl } from "@/content/site";
import { DEFAULT_LOCALE, LOCALES, OG_LOCALES, isLocale, localizePath } from "@/lib/i18n";
import "@/app/globals.css";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang: requested } = await params;
  const lang = isLocale(requested) ? requested : DEFAULT_LOCALE;
  const { title, description } = getDictionary(lang).meta;

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: title,
      template: `%s — ${PRODUCT_NAME}`,
    },
    description,
    applicationName: "REI Web",
    openGraph: {
      type: "website",
      siteName: PRODUCT_NAME,
      locale: OG_LOCALES[lang],
      title,
      description,
      url: localizePath(lang, "/"),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return (
    <html lang={lang} className={`${FONT_CLASS_NAMES} h-full`}>
      <body className="min-h-full bg-canvas font-sans text-foreground antialiased">
        <a className="skip-link" href="#contenido">
          {getDictionary(lang).shell.skipLink}
        </a>
        {children}
      </body>
    </html>
  );
}
