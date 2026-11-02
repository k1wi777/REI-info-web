import { getDictionary, type Dictionary } from "@/content/i18n";
import { getContentLocale } from "@/content/i18n/coverage";
import { getDocsNav, getDocsPageText } from "@/content/i18n/docs-nav";
import {
  DOCS_SECTIONS,
  DOCUMENTED_VERSION,
  DOCUMENTED_VERSION_DATE,
  INSTALL_PAGE,
  PRODUCT_NAME,
  PRODUCT_PAGES,
  RELEASES_URL,
  REPOSITORY_README_URL,
  REPOSITORY_URL,
  getSiteUrl,
  type DocsPage,
  type DocsSection,
} from "@/content/site";
import { localizePath, type Locale } from "@/lib/i18n";
import { getInstallCopy } from "@/features/installation/copy";
import { getProductCopy } from "@/features/product/copy";
import { buildCanonicalUrl } from "@/lib/seo";

type LlmsEntry = {
  title: string;
  path: string;
  description: string;
};

const DOCS_INDEX_PATH = "/docs";

function getSection(id: DocsSection["id"]): DocsSection {
  const section = DOCS_SECTIONS.find((candidate) => candidate.id === id);

  if (!section) {
    throw new Error(`Falta la sección de documentación: ${id}`);
  }

  return section;
}

/** Entradas de un modo: texto del overlay en inglés solo donde está traducido. */
function docsEntries(lang: Locale, id: DocsSection["id"]): LlmsEntry[] {
  return getSection(id).pages.map((page: DocsPage) => {
    const { title, description } = getDocsPageText(lang, page.path);
    return { title: title.text, path: page.path, description: description.text };
  });
}

function section(title: string, entries: string[]): string {
  return [`## ${title}`, "", ...entries].join("\n");
}

function internalEntry(
  lang: Locale,
  base: string,
  seen: Set<string>,
  entry: LlmsEntry,
): string {
  if (seen.has(entry.path)) {
    throw new Error(`Ruta duplicada en llms.txt: ${entry.path}`);
  }

  seen.add(entry.path);

  // Una página sin traducir enlaza su versión canónica en español.
  const url = buildCanonicalUrl(
    base,
    localizePath(getContentLocale(lang, entry.path), entry.path),
  );

  return `- [${entry.title}](${url}): ${entry.description}`;
}

function externalEntry(title: string, url: string, description: string): string {
  return `- [${title}](${url}): ${description}`;
}

/**
 * Genera el índice `/llms.txt` de un idioma desde los datos tipados del sitio.
 * Cabecera y títulos de sección salen del diccionario; el contenido de cada
 * página sigue en español hasta que se traduzca. Recibe la base para poder
 * testearse sin depender del entorno.
 */
export function buildLlmsTxt(
  lang: Locale,
  base: string = getSiteUrl(),
): string {
  const dictionary: Dictionary = getDictionary(lang);
  const { llms } = dictionary;
  const seen = new Set<string>();
  const render = (entry: LlmsEntry) => internalEntry(lang, base, seen, entry);

  const header = [
    `# ${PRODUCT_NAME}`,
    dictionary.meta.description,
    llms.version(DOCUMENTED_VERSION, DOCUMENTED_VERSION_DATE),
  ].join("\n\n");

  const product = section(
    llms.headings.product,
    PRODUCT_PAGES.map((page) => {
      const { title, description } = getProductCopy(
        getContentLocale(lang, page.path),
      ).pages[page.slug];
      return render({ title, path: page.path, description });
    }),
  );

  const documentation = section(llms.headings.documentation, [
    render({
      title: llms.docsIndexTitle,
      path: DOCS_INDEX_PATH,
      description: llms.docsIndexDescription(
        getDocsNav(lang)
          .map((mode) => mode.label.text)
          .join(", "),
      ),
    }),
    ...docsEntries(lang, "conceptos").map(render),
    ...docsEntries(lang, "guias").map(render),
  ]);

  const starting = section(llms.headings.start, [
    render({
      ...getInstallCopy(getContentLocale(lang, INSTALL_PAGE.path)).meta,
      path: INSTALL_PAGE.path,
    }),
    ...docsEntries(lang, "empezar").map(render),
  ]);
  const reference = section(
    llms.headings.reference,
    docsEntries(lang, "referencia").map(render),
  );
  const operation = section(
    llms.headings.operation,
    docsEntries(lang, "operacion").map(render),
  );

  const source = section(llms.headings.source, [
    `- ${llms.version(DOCUMENTED_VERSION, DOCUMENTED_VERSION_DATE)}`,
    externalEntry(llms.releasesTitle, RELEASES_URL, llms.releasesDescription),
    externalEntry(
      llms.repositoryTitle,
      REPOSITORY_URL,
      llms.repositoryDescription,
    ),
    externalEntry(
      llms.readmeTitle,
      REPOSITORY_README_URL,
      llms.readmeDescription,
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
