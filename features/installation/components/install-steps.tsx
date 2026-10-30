import { CodeBlock } from "@/components/ui/code-block";
import { InlineText } from "@/components/ui/inline-text";
import {
  INSTALL_STEPS,
  fillArchiveName,
} from "@/features/installation/data/installation";
import type { OsId } from "@/lib/release";

type InstallStepsProps = {
  os: OsId;
  archiveName: string;
};

/** Pasos de instalación del sistema elegido, con el nombre real del archive. */
export function InstallSteps({ os, archiveName }: InstallStepsProps) {
  return (
    <ol className="grid gap-px border border-hairline-strong bg-hairline-strong lg:grid-cols-3">
      {INSTALL_STEPS[os].map((step, index) => (
        <li
          key={step.title}
          className="flex min-w-0 flex-col gap-3 bg-canvas px-5 py-5"
        >
          <span className="type-meta text-accent-text">
            Paso {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="type-ui font-medium text-foreground">{step.title}</h3>
          <p className="type-caption text-secondary">
            <InlineText text={step.text} />
          </p>
          {step.command ? (
            <CodeBlock
              code={fillArchiveName(step.command, archiveName)}
              language="Shell"
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
