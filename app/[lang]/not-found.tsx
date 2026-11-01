import type { Metadata } from "next";
import { BrandMark } from "@/components/layout/brand-mark";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getCurrentDictionary } from "@/content/i18n/server";
import { PRODUCT_NAME } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const { notFound } = await getCurrentDictionary();

  return {
    title: notFound.metaTitle,
    description: notFound.metaDescription,
  };
}

export default async function NotFound() {
  const { shell, notFound } = await getCurrentDictionary();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-hairline">
        <Container className="flex h-(--layout-header-height) items-center">
          <BrandMark
            label={`${PRODUCT_NAME} — ${shell.brandHome}`}
            suffix={shell.brandSuffix}
          />
        </Container>
      </header>

      <main id="contenido" tabIndex={-1} className="flex flex-1 items-center">
        <Container className="py-20">
          <p className="type-meta text-muted-strong">{notFound.eyebrow}</p>
          <h1 className="type-display mt-4 max-w-[16ch] text-foreground">
            {notFound.title}
          </h1>
          <p className="mt-5 max-w-(--container-reading) type-body text-secondary">
            {notFound.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/">{notFound.home}</ButtonLink>
            <ButtonLink href="/docs" variant="secondary">
              {notFound.docs}
            </ButtonLink>
          </div>
        </Container>
      </main>
    </div>
  );
}
