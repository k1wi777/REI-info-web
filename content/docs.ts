export type DocBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | {
      kind: "code";
      code: string;
      language?: string;
      title?: string;
    }
  | {
      kind: "table";
      columns: string[];
      rows: string[][];
      caption?: string;
    }
  | {
      kind: "note";
      tone: "info" | "warning";
      title: string;
      text: string;
    }
  | {
      kind: "links";
      links: { label: string; href: string; external?: boolean }[];
    };

export type DocSection = {
  id: string;
  title: string;
  blocks: DocBlock[];
};

export type TocItem = {
  id: string;
  title: string;
};

/** Deriva la tabla de contenidos del orden real de las secciones. */
export function sectionsToToc(sections: DocSection[]): TocItem[] {
  return sections.map((section) => ({
    id: section.id,
    title: section.title,
  }));
}
