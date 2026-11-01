import { LocaleLink } from "@/components/ui/locale-link";
import { Container } from "@/components/ui/container";
import { buildFooterGroups } from "@/content/i18n";
import { getCurrentDictionary } from "@/content/i18n/server";
import {
  DOCUMENTED_VERSION,
  PRODUCT_NAME,
  RELEASES_URL,
  isExternal,
} from "@/content/site";

/** Pie global con enlaces reales a documentación, repositorio y releases. */
export async function SiteFooter() {
  const dictionary = await getCurrentDictionary();
  const { footer } = dictionary;

  return (
    <footer className="border-t border-hairline bg-surface-deep">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="type-brand text-foreground">
            REI
          </p>
          <p className="mt-3 type-docs text-secondary">
            {footer.tagline(PRODUCT_NAME)}
          </p>
          <p className="mt-4 type-meta text-muted-strong">
            {footer.documentedVersion(DOCUMENTED_VERSION)}
          </p>
        </div>

        {buildFooterGroups(dictionary).map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="type-meta text-muted-strong">{group.title}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {group.items.map((item) => (
                <li key={item.href}>
                  {isExternal(item.href) ? (
                    <a
                      className="inline-flex min-h-6 items-center type-docs text-secondary transition-colors duration-(--duration-fast) hover:text-foreground"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <LocaleLink
                      className="inline-flex min-h-6 items-center type-docs text-secondary transition-colors duration-(--duration-fast) hover:text-foreground"
                      href={item.href}
                    >
                      {item.label}
                    </LocaleLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-hairline">
        <Container className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-meta text-muted-strong">
            {footer.status}
          </p>
          <a
            className="inline-flex min-h-6 items-center type-meta text-secondary transition-colors duration-(--duration-fast) hover:text-foreground"
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
          >
            {footer.releasesNote}
          </a>
        </Container>
      </div>
    </footer>
  );
}
