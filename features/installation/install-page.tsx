import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { RevealController } from "@/components/ui/reveal-controller";
import { getCurrentLocale } from "@/content/i18n/server";
import { getCurrentInstallCopy } from "@/features/installation/copy/server";
import { InstallAside } from "@/features/installation/components/install-aside";
import { InstallHero } from "@/features/installation/components/install-hero";
import { Installer } from "@/features/installation/components/installer";
import { ReleaseSection } from "@/features/installation/components/release-section";
import { REVEAL_BOOTSTRAP_SCRIPT } from "@/lib/motion";

/**
 * Página de instalación. Los `data-reveal` van en contenedores fuera de
 * `Suspense`: el controlador observa el DOM al montar y un nodo que llega
 * después por streaming quedaría oculto.
 */
export async function InstallPage() {
  const lang = await getCurrentLocale();
  const { installer, sectionLabel } = await getCurrentInstallCopy();

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOTSTRAP_SCRIPT }} />
      <RevealController />

      <Container className="flex flex-col gap-12 py-8 lg:gap-16 lg:py-12">
        <InstallHero />

        <section
          aria-label={sectionLabel}
          data-reveal="up"
          data-reveal-delay="1"
        >
          <Suspense
            fallback={
              <Installer
                status="loading"
                release={null}
                copy={installer}
                lang={lang}
              />
            }
          >
            <ReleaseSection />
          </Suspense>
        </section>

        <section data-reveal="up">
          <InstallAside />
        </section>
      </Container>
    </>
  );
}
