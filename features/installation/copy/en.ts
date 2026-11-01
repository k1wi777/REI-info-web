import type { InstallCopy, InstallStepText } from "@/features/installation/copy/types";

const UNIX_STEPS: InstallStepText[] = [
  {
    title: "Extract the archive",
    text: "Extract the `rei` binary into the directory where you downloaded the file.",
  },
  {
    title: "Put it on your PATH",
    text: "You can move it to any directory on your PATH, such as `~/.local/bin`.",
  },
  {
    title: "Verify the installation",
    text: "It should reply with the installed version.",
  },
];

/** Textos de `/instalar` en inglés: mismo contenido que `es`, sin añadir afirmaciones. */
export const en: InstallCopy = {
  meta: {
    title: "Install REI",
    description:
      "Pick your operating system and architecture, download the rei binary from the latest GitHub release and verify it in minutes.",
  },
  hero: { section: "INSTALLATION" },
  sectionLabel: "Download and installation",
  installer: {
    osLegend: "Operating system",
    archLegend: "Architecture",
    installOn: "Install on",
    detected: "Detected",
    archDescriptions: {
      amd64: "Intel and AMD (x86_64)",
      arm64: {
        linux: "ARM servers and machines (aarch64)",
        macos: "Apple Silicon (aarch64)",
        windows: "Windows machines with an ARM processor",
      },
    },
    archHints: {
      linux: "Check yours with `uname -m`: x86_64 is amd64; aarch64 is arm64.",
      macos: "Check yours with `uname -m`: x86_64 is amd64; arm64 is arm64.",
      windows: "Choose your machine's architecture; it could not be detected.",
    },
    steps: {
      linux: UNIX_STEPS,
      macos: UNIX_STEPS,
      windows: [
        {
          title: "Extract the archive",
          text: "On Windows the archive is a .zip. Extract it to get rei.exe.",
        },
        {
          title: "Put it on your PATH",
          text: "Put rei.exe in a directory that is on the PATH.",
        },
        {
          title: "Verify the installation",
          text: "Open a new terminal; it should reply with the installed version.",
        },
      ],
    },
    stepLabel: "Step",
    stageFile: "File",
    download: {
      frameLabel: "Download",
      latest: "Latest",
      noAssetForSelection: "No archive for this combination",
      loadingRelease: "Latest release on GitHub",
      unavailableRelease: "Could not reach GitHub",
      documentedVersion: "Documented version",
      checksumsPre: "Verify integrity with the release's",
      checksumsPost: "file.",
      checksumsPublished: "Checksums are published with each release on GitHub.",
      download: "Download",
      allReleases: "See all releases",
      goToReleases: "Go to the releases page",
      unavailableNote:
        "GitHub did not respond, so there is no direct link. Download the archive from the releases page.",
      loadingNote:
        "The direct link to this file is resolved from the latest release. If it does not appear, download it from the releases page.",
      noAssetNote:
        "This release does not include the archive for the chosen combination. Download it from the releases page or choose another.",
    },
  },
  aside: {
    updateHeading: "Keep it up to date",
    updateText:
      "Once installed, the binary updates itself: `rei update` downloads the latest release, verifies the SHA-256 checksum and replaces the executable. `rei update --check` only checks whether a newer version exists.",
    limitsHeading: "What you should know",
    limits: [
      "The version, the date and the files come from the public GitHub Releases API; the website shows no download counts or sizes.",
      "The lookup runs on the server and is reused for a few hours. If GitHub does not respond, the page shows the link to the releases page.",
      "Detecting your system is only a help: if there is no evidence of the architecture, amd64 is kept and how to check it is explained.",
    ],
    docsLink: "Read the installation documentation",
  },
};
