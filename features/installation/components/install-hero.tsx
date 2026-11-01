import { PRODUCT_NAME } from "@/content/site";
import { getCurrentInstallCopy } from "@/features/installation/copy/server";

/**
 * Cabecera de la hoja de instalación. Compacta a propósito: la decisión y la
 * descarga viven justo debajo y deben verse en la primera pantalla.
 */
export async function InstallHero() {
  const { meta, hero } = await getCurrentInstallCopy();

  return (
    <header className="relative overflow-hidden border border-hairline-strong">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 sheet-grid sheet-grid-compact opacity-75"
      />
      <div className="relative border-b border-hairline px-4 py-3 type-meta text-muted-strong">
        <p>{PRODUCT_NAME} / {hero.section}</p>
      </div>
      <div className="relative grid items-end gap-4 px-5 py-8 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-10">
        <h1
          data-reveal="up"
          className="min-w-0 text-balance type-display text-foreground lg:col-span-7"
        >
          {meta.title}
        </h1>
        <p
          data-reveal="fade"
          data-reveal-delay="1"
          className="max-w-[46ch] type-body text-secondary lg:col-span-5 lg:pb-2"
        >
          {meta.description}
        </p>
      </div>
    </header>
  );
}
