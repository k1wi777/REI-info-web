import type { InstallationDocCopy } from "@/features/installation/copy/types";
import { INSTALL_PATH } from "@/content/site";
import {
  ARCHIVE_TEMPLATE_TAR,
  COMMAND_EXTRACT_TAR,
  COMMAND_MOVE_BIN,
  COMMAND_UPDATE,
  COMMAND_UPDATE_CHECK,
  COMMAND_VERSION,
} from "@/features/installation/data/installation";

export const installationDocEn: InstallationDocCopy = {
  eyebrow: "Get started · Installation",
  description:
    "Download the rei binary, verify it and set it up to update itself. You need no runtime dependencies and no Go installation to use it.",
  articleMeta: "Linux · macOS · Windows",
  sections: [
    {
      id: "requisitos",
      title: "Requirements",
      blocks: [
        {
          kind: "paragraph",
          text: "The rei CLI ships as a precompiled binary. It needs neither Go nor any runtime dependency to run.",
        },
        {
          kind: "list",
          items: [
            "Linux, macOS or Windows.",
            "amd64 or arm64 architecture.",
            "A directory on your PATH where you can place the binary.",
          ],
        },
        {
          kind: "note",
          tone: "info",
          title: "Build from source",
          text: "If you work on the REI Harness repository and have Go installed, `make build` leaves the binary at `bin/rei`.",
        },
      ],
    },
    {
      id: "descargar",
      title: "Download and place the binary",
      blocks: [
        {
          kind: "note",
          tone: "info",
          title: "Guided download",
          text: "The install page detects your system, resolves the archive of the latest release and shows these same steps.",
        },
        {
          kind: "links",
          links: [{ label: "Install REI", href: INSTALL_PATH }],
        },
        {
          kind: "paragraph",
          text: `Go to the releases page and download the archive for your operating system and architecture: ${ARCHIVE_TEMPLATE_TAR}. The \`<versión>\` part stands for the release version.`,
        },
        {
          kind: "code",
          language: "Shell",
          code: `${COMMAND_EXTRACT_TAR}\n${COMMAND_MOVE_BIN}`,
        },
        {
          kind: "paragraph",
          text: "You can move it to any directory on your PATH, such as `~/.local/bin`.",
        },
        {
          kind: "note",
          tone: "info",
          title: "Windows",
          text: "On Windows the archive is a .zip. Extract rei.exe and place it in a directory on your PATH.",
        },
      ],
    },
    {
      id: "verificar",
      title: "Verify the installation",
      blocks: [
        {
          kind: "code",
          language: "Shell",
          code: COMMAND_VERSION,
        },
        {
          kind: "paragraph",
          text: "The command should print the installed version. If your shell cannot find the binary, check that its directory is on your PATH.",
        },
      ],
    },
    {
      id: "actualizar",
      title: "Update the CLI",
      blocks: [
        {
          kind: "paragraph",
          text: "The binary can update itself from GitHub Releases.",
        },
        {
          kind: "code",
          language: "Shell",
          code: `${COMMAND_UPDATE}\n${COMMAND_UPDATE_CHECK}`,
        },
        {
          kind: "paragraph",
          text: "`rei update` downloads the latest release, verifies the SHA-256 checksum and replaces the executable atomically. `rei update --check` only checks whether a newer version exists, without downloading or changing anything.",
        },
        {
          kind: "note",
          tone: "info",
          title: "Exit codes",
          text: "Both return 0 when there is nothing to update; 1 is reserved for real failures, such as network problems or an invalid checksum.",
        },
      ],
    },
  ],
};
