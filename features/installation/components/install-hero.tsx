import { INSTALL_PAGE, PRODUCT_NAME } from "@/content/site";

/** Cabecera de la hoja de instalación. */
export function InstallHero() {
  return (
    <header className="relative overflow-hidden border border-hairline-strong">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 sheet-grid sheet-grid-compact opacity-75"
      />
      <div className="relative border-b border-hairline px-4 py-3 type-meta text-muted-strong">
        <p>{PRODUCT_NAME} / INSTALACIÓN</p>
      </div>
      <div className="relative px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <p data-reveal="fade" className="type-meta text-muted-strong">
          Binario precompilado · Linux · macOS · Windows
        </p>
        <h1
          data-reveal="up"
          className="mt-5 max-w-[18ch] text-balance type-title text-foreground"
        >
          {INSTALL_PAGE.title}
        </h1>
        <p
          data-reveal="fade"
          data-reveal-delay="1"
          className="mt-5 max-w-[56ch] type-body text-secondary"
        >
          {INSTALL_PAGE.description}
        </p>
      </div>
    </header>
  );
}
