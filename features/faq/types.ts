export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqTheme = {
  id: string;
  title: string;
  items: FaqItem[];
};
