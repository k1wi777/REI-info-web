import { BrandMark } from "@/components/layout/brand-mark";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks } from "@/components/layout/nav-links";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { NAV_ITEMS, PRIMARY_CTA } from "@/content/site";

/** Cabecera global: marca, navegación principal y CTA de instalación. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas">
      <Container className="flex h-(--layout-header-height) items-center gap-4">
        <BrandMark />

        <nav
          aria-label="Navegación principal"
          className="ml-6 hidden md:block"
        >
          <NavLinks items={NAV_ITEMS} className="gap-6" />
        </nav>

        <div className="relative ml-auto flex items-center gap-2">
          <MobileNav />
          <ButtonLink href={PRIMARY_CTA.href} className="px-3 sm:px-4">
            {PRIMARY_CTA.label}
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
