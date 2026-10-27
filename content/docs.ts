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
