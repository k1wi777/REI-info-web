import type { ArchId, OsId } from "@/lib/release";

export type InstallerStatus = "loading" | "ready" | "unavailable";

export type Selection = {
  os: OsId;
  arch: ArchId;
};

export const DEFAULT_SELECTION: Selection = { os: "linux", arch: "amd64" };
