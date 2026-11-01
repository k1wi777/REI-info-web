import { LocaleLink } from "@/components/ui/locale-link";
import { CodeBlock } from "@/components/ui/code-block";
import { InlineText } from "@/components/ui/inline-text";
import { getCurrentInstallCopy } from "@/features/installation/copy/server";
import {
  COMMAND_UPDATE,
  COMMAND_UPDATE_CHECK,
  INSTALLATION_PATH,
} from "@/features/installation/data/installation";

/** Actualización con `rei update`, límites de la página y enlace a la documentación. */
export async function InstallAside() {
  const { aside } = await getCurrentInstallCopy();

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section aria-labelledby="actualizar-title" className="flex min-w-0 flex-col gap-4">
        <h2 id="actualizar-title" className="type-docs-heading text-foreground">
          {aside.updateHeading}
        </h2>
        <p className="max-w-(--container-reading) type-docs text-secondary">
          <InlineText text={aside.updateText} />
        </p>
        <CodeBlock
          code={`${COMMAND_UPDATE}\n${COMMAND_UPDATE_CHECK}`}
          language="Shell"
        />
      </section>

      <section aria-labelledby="limites-title" className="flex min-w-0 flex-col gap-4">
        <h2 id="limites-title" className="type-docs-heading text-foreground">
          {aside.limitsHeading}
        </h2>
        <ul className="flex max-w-(--container-reading) list-disc flex-col gap-2 pl-5 type-docs text-secondary">
          {aside.limits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <LocaleLink
          href={INSTALLATION_PATH}
          className="-mt-1.5 inline-flex w-fit border-b border-border-strong pb-0.5 pt-1.5 type-meta text-foreground transition-colors duration-(--duration-fast) hover:border-foreground"
        >
          {aside.docsLink}
        </LocaleLink>
      </section>
    </div>
  );
}
