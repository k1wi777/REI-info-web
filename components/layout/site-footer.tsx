import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  DOCUMENTED_VERSION,
  FOOTER_GROUPS,
  PRODUCT_NAME,
  RELEASES_URL,
  isExternal,
} from "@/content/site";

/** Pie global con enlaces reales a documentación, repositorio y releases. */
export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-surface-deep">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="type-brand text-foreground">
            REI
          </p>
          <p className="mt-3 type-docs text-secondary">
            {PRODUCT_NAME} convierte el trabajo con agentes de IA en un proceso
            con especificación, aprobación y evidencia, dentro de tu
            repositorio.
          </p>
          <p className="mt-4 type-meta text-muted-strong">
            Versión documentada {DOCUMENTED_VERSION}
          </p>
        </div>

        {FOOTER_GROUPS.map((group) => (
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
                    <Link
                      className="inline-flex min-h-6 items-center type-docs text-secondary transition-colors duration-(--duration-fast) hover:text-foreground"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
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
            Proyecto en fase inicial · Contenido estático y versionado
          </p>
          <a
            className="inline-flex min-h-6 items-center type-meta text-secondary transition-colors duration-(--duration-fast) hover:text-foreground"
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
          >
            La fuente de verdad de versiones son las releases
          </a>
        </Container>
      </div>
    </footer>
  );
}
