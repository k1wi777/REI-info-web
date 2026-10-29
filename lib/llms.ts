import {
  DOCS_SECTIONS,
  DOCUMENTED_VERSION,
  DOCUMENTED_VERSION_DATE,
  PRODUCT_NAME,
  PRODUCT_PAGES,
  RELEASES_URL,
  REPOSITORY_README_URL,
  REPOSITORY_URL,
  SITE_DESCRIPTION,
  getSiteUrl,
  type DocsPage,
  type DocsSection,
} from "@/content/site";
import { buildCanonicalUrl } from "@/lib/seo";

type LlmsEntry = {
  title: string;
  path: string;
  description: string;
};

const DOCS_INDEX_TITLE = "Documentación";
const DOCS_INDEX_PATH = "/docs";
const DOCS_INDEX_DESCRIPTION = `Índice de la documentación: ${DOCS_SECTIONS.map(
  (section) => section.label,
).join(", ")}.`;

function getSection(id: DocsSection["id"]): DocsSection {
  const section = DOCS_SECTIONS.find((candidate) => candidate.id === id);

  if (!section) {
    throw new Error(`Falta la sección de documentación: ${id}`);
  }

  return section;
}

function docsEntries(id: DocsSection["id"]): LlmsEntry[] {
  return getSection(id).pages.map((page: DocsPage) => ({
    title: page.title,
    path: page.path,
    description: page.description,
  }));
}

function section(title: string, entries: string[]): string {
  return [`## ${title}`, "", ...entries].join("\n");
}

function internalEntry(base: string, seen: Set<string>, entry: LlmsEntry): string {
  if (seen.has(entry.path)) {
    throw new Error(`Ruta duplicada en llms.txt: ${entry.path}`);
  }

  seen.add(entry.path);

  return `- [${entry.title}](${buildCanonicalUrl(base, entry.path)}): ${entry.description}`;
}

function externalEntry(title: string, url: string, description: string): string {
  return `- [${title}](${url}): ${description}`;
}

/**
 * Genera el índice `/llms.txt` desde los datos tipados del sitio.
 * Recibe la base para poder testearse sin depender del entorno.
 */
export function buildLlmsTxt(base: string = getSiteUrl()): string {
  const seen = new Set<string>();
  const render = (entry: LlmsEntry) => internalEntry(base, seen, entry);

  const header = [
    `# ${PRODUCT_NAME}`,
    SITE_DESCRIPTION,
    `Versión documentada: ${DOCUMENTED_VERSION} (${DOCUMENTED_VERSION_DATE}).`,
  ].join("\n\n");

  const product = section(
    "Producto",
    PRODUCT_PAGES.map((page) =>
      render({
        title: page.title,
        path: page.path,
        description: page.description,
      }),
    ),
  );

  const documentation = section("Documentación", [
    render({
      title: DOCS_INDEX_TITLE,
      path: DOCS_INDEX_PATH,
      description: DOCS_INDEX_DESCRIPTION,
    }),
    ...docsEntries("conceptos").map(render),
    ...docsEntries("guias").map(render),
  ]);

  const starting = section("Empezar", docsEntries("empezar").map(render));
  const reference = section("Referencia", docsEntries("referencia").map(render));
  const operation = section("Operación", docsEntries("operacion").map(render));

  const source = section("Fuente", [
    `- Versión documentada: ${DOCUMENTED_VERSION} (${DOCUMENTED_VERSION_DATE}).`,
    externalEntry(
      "Releases de REI Harness",
      RELEASES_URL,
      "fuente de verdad de las versiones publicadas.",
    ),
    externalEntry(
      "Repositorio de REI Harness",
      REPOSITORY_URL,
      "código y documentación canónica del CLI.",
    ),
    externalEntry(
      "README del repositorio",
      REPOSITORY_README_URL,
      "estado actual del proyecto.",
    ),
  ]);

  return [
    header,
    product,
    documentation,
    starting,
    reference,
    operation,
    source,
  ].join("\n\n").concat("\n");
}
