import type { DocsLandingCopyEn } from "@/features/docs/copy/types";

export const en: DocsLandingCopyEn = {
  meta: {
    title: "Documentation",
    description:
      "REI Harness guides and reference: installation, your first Work Item, commands and frequently asked questions.",
  },
  eyebrow: "Documentation",
  title: "What do you want to do?",
  intro:
    "The REI Harness documentation explains the process before the commands. Pick where to start; every route leads to real content.",
  recommended: {
    heading: "Recommended path",
    text: "If this is your first time, install the binary and open a Work Item. Once the flow feels familiar, the command reference and the frequently asked questions cover the rest.",
    install: "Start with the installation",
    firstWorkItem: "See the first Work Item",
  },
  entries: {
    install: {
      title: "Install REI",
      mode: "Get started · Installation",
      description:
        "Download the binary, verify it and prepare it to update itself, with no runtime dependencies.",
    },
    "first-work-item": {
      title: "Open your first Work Item",
      mode: "Get started · Tutorial",
      description:
        "Walk through rei init, customization, planning, approval, implementation and review.",
    },
  },
};
