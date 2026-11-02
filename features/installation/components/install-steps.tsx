import { CodeBlockView } from "@/components/ui/code-block-view";
import type { Dictionary } from "@/content/i18n/types";
import { InlineText } from "@/components/ui/inline-text";
import type { InstallerCopy } from "@/features/installation/copy/types";
import {
  buildInstallSteps,
  fillArchiveName,
} from "@/features/installation/data/installation";
import type { OsId } from "@/lib/release";

type InstallStepsProps = {
  copy: InstallerCopy;
  os: OsId;
  archiveName: string;
  copyLabels: Dictionary["copy"];
};

/** Pasos de instalación del sistema elegido, con el nombre real del archive. */
export function InstallSteps({ copy, os, archiveName, copyLabels }: InstallStepsProps) {
  const steps = buildInstallSteps(copy.steps);

  return (
    <ol className="grid gap-px border border-hairline-strong bg-hairline-strong lg:grid-cols-3">
      {steps[os].map((step, index) => (
        <li
          key={step.title}
          className="flex min-w-0 flex-col gap-3 bg-canvas px-5 py-5"
        >
          <span className="type-meta text-muted-strong">
            {copy.stepLabel} {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="type-ui font-medium text-foreground">{step.title}</h3>
          <p className="type-caption text-secondary">
            <InlineText text={step.text} />
          </p>
          {step.command ? (
            <CodeBlockView
            copyLabels={copyLabels}
              code={fillArchiveName(step.command, archiveName)}
              language="Shell"
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
