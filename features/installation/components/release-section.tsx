import { Installer } from "@/features/installation/components/installer";
import { getLatestRelease } from "@/features/installation/data/release";
import type { Release } from "@/lib/release";

/**
 * Consulta la última release (cacheada) y delega en el selector. Un fallo de
 * GitHub no rompe la página: se muestra el respaldo con el enlace a releases.
 */
export async function ReleaseSection() {
  let release: Release | null = null;

  try {
    release = await getLatestRelease();
  } catch {
    // El fallo es esperado (red, límite de la API) y se comunica en la UI.
    release = null;
  }

  return (
    <Installer
      status={release ? "ready" : "unavailable"}
      release={release}
    />
  );
}
