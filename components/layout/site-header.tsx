import { BrandMark } from "@/components/layout/brand-mark";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks } from "@/components/layout/nav-links";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import {
  buildLanguageOptions,
  buildNavItems,
  buildPrimaryCta,
} from "@/content/i18n";
import { getCurrentDictionary } from "@/content/i18n/server";
import { PRODUCT_NAME } from "@/content/site";

/** Cabecera global: marca, navegación principal, idioma y CTA de instalación. */
export async function SiteHeader() {
  const dictionary = await getCurrentDictionary();
  const items = buildNavItems(dictionary);
  const cta = buildPrimaryCta(dictionary);
  const languageProps = {
    label: dictionary.language.label,
    options: buildLanguageOptions(dictionary),
  };

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas">
      <Container className="flex h-(--layout-header-height) items-center gap-4">
        <BrandMark
          label={`${PRODUCT_NAME} — ${dictionary.shell.brandHome}`}
          suffix={dictionary.shell.brandSuffix}
        />

        <nav
          aria-label={dictionary.shell.mainNavLabel}
          className="ml-6 hidden md:block"
        >
          <NavLinks items={items} className="gap-6" />
        </nav>

        <div className="relative ml-auto flex items-center gap-2">
          <LanguageSwitcher {...languageProps} className="hidden md:block" />
          <MobileNav
            items={items}
            menuLabel={dictionary.shell.menu}
            navLabel={dictionary.shell.mobileNavLabel}
          >
            <LanguageSwitcher {...languageProps} />
          </MobileNav>
          <ButtonLink href={cta.href} className="px-3 sm:px-4">
            {cta.label}
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
