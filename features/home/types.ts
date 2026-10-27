export type SheetMeta = {
  workItemId: string;
  title: string;
  type: string;
  state: string;
  documents: string;
  base: string;
};

export type HomeItem = {
  title: string;
  description: string;
};

export type HomeBlock = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  items?: HomeItem[];
  note?: string;
  link?: {
    label: string;
    href: string;
  };
};

export type FinalCta = {
  eyebrow: string;
  title: string;
  intro: string;
  primary: {
    label: string;
    href: string;
  };
  secondary: {
    label: string;
    href: string;
  };
};
