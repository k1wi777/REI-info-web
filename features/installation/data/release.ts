import { cacheLife } from "next/cache";
import { LATEST_RELEASE_API_URL } from "@/content/site";
import { parseRelease, type Release } from "@/lib/release";

const REQUEST_TIMEOUT_MS = 5000;

/**
 * Última release publicada en GitHub. El resultado se reutiliza durante horas;
 * los fallos se lanzan para que nunca queden cacheados y los captura quien
 * renderiza (`ReleaseSection`), que muestra el enlace de respaldo.
 */
export async function getLatestRelease(): Promise<Release> {
  "use cache";
  cacheLife("hours");

  const response = await fetch(LATEST_RELEASE_API_URL, {
    headers: { Accept: "application/vnd.github+json" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`GitHub respondió ${response.status}.`);
  }

  const parsed = parseRelease(await response.json());

  if (!parsed.ok) {
    throw new Error(parsed.error);
  }

  return parsed.release;
}
