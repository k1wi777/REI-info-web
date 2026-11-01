import { LocaleLink } from "@/components/ui/locale-link";

export type LinkListItem = {
  label: string;
  href: string;
  external?: boolean;
};

type LinkListProps = {
  links: LinkListItem[];
};

/** Lista de enlaces internos y externos con un mismo patrón visual. */
export function LinkList({ links }: LinkListProps) {
  return (
    <ul className="flex max-w-(--container-reading) flex-col gap-2">
      {links.map((link) => {
        const className =
          "inline-flex -mt-1.5 border-b border-border-strong pb-0.5 pt-1.5 type-meta text-foreground transition-colors duration-(--duration-fast) hover:border-foreground";
        const external = link.external ?? /^https?:\/\//.test(link.href);

        return (
          <li key={link.href}>
            {external ? (
              <a
                className={className}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <LocaleLink className={className} href={link.href}>
                {link.label}
              </LocaleLink>
            )}
          </li>
        );
      })}
    </ul>
  );
}
