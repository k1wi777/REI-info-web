import { splitArchiveName } from "@/features/installation/data/archive-name";

describe("splitArchiveName", () => {
  it("separa un nombre real en segmentos que recomponen el original", () => {
    const name = "rei_0.3.0_linux_amd64.tar.gz";
    const segments = splitArchiveName(name);

    expect(segments?.map((s) => s.text).join("")).toBe(name);
    expect(segments?.find((s) => s.kind === "os")?.text).toBe("linux");
    expect(segments?.find((s) => s.kind === "arch")?.text).toBe("amd64");
    expect(segments?.find((s) => s.kind === "ext")?.text).toBe(".tar.gz");
  });

  it("reconoce el formato zip de Windows", () => {
    const segments = splitArchiveName("rei_0.3.0_windows_arm64.zip");

    expect(segments?.find((s) => s.kind === "os")?.text).toBe("windows");
    expect(segments?.find((s) => s.kind === "ext")?.text).toBe(".zip");
  });

  it("acepta la plantilla con marcadores", () => {
    const name = "rei_<versión>_<os>_<arch>.tar.gz";
    const segments = splitArchiveName(name);

    expect(segments?.map((s) => s.text).join("")).toBe(name);
    expect(segments?.find((s) => s.kind === "version")?.text).toBe("<versión>");
  });

  it("devuelve null si el nombre no sigue el patrón", () => {
    expect(splitArchiveName("checksums.txt")).toBeNull();
    expect(splitArchiveName("")).toBeNull();
  });
});
