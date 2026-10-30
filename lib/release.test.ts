import {
  ARCH_IDS,
  OS_IDS,
  assetName,
  checksumsAsset,
  findAsset,
  formatReleaseDate,
  parseRelease,
  type Release,
} from "@/lib/release";

const BASE = "https://github.com/k1wi777/REI-Harness/releases/download/v0.3.0/";

function payload(overrides: Record<string, unknown> = {}) {
  return {
    tag_name: "v0.3.0",
    published_at: "2026-10-26T08:17:41Z",
    assets: [
      "checksums.txt",
      "rei_0.3.0_linux_amd64.tar.gz",
      "rei_0.3.0_darwin_arm64.tar.gz",
      "rei_0.3.0_windows_amd64.zip",
    ].map((name) => ({ name, browser_download_url: `${BASE}${name}` })),
    ...overrides,
  };
}

function release(): Release {
  const result = parseRelease(payload());
  if (!result.ok) throw new Error(result.error);
  return result.release;
}

describe("parseRelease", () => {
  it("acepta una respuesta válida y deriva la versión sin la v", () => {
    const result = parseRelease(payload());

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.release.tag).toBe("v0.3.0");
      expect(result.release.version).toBe("0.3.0");
      expect(result.release.assets).toHaveLength(4);
    }
  });

  it("rechaza formas inesperadas", () => {
    for (const value of [null, "x", [], {}, payload({ tag_name: 3 })]) {
      expect(parseRelease(value).ok).toBe(false);
    }
    expect(parseRelease(payload({ published_at: "no es fecha" })).ok).toBe(
      false,
    );
    expect(parseRelease(payload({ assets: "nada" })).ok).toBe(false);
  });

  it("descarta assets de otro host o mal formados", () => {
    const result = parseRelease(
      payload({
        assets: [
          { name: "rei_0.3.0_linux_amd64.tar.gz", browser_download_url: "https://evil.example/x" },
          { name: "otro" },
          null,
        ],
      }),
    );

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.release.assets).toEqual([]);
  });

  it("acepta una release sin assets", () => {
    expect(parseRelease(payload({ assets: [] })).ok).toBe(true);
  });
});

describe("assetName y findAsset", () => {
  it("compone los seis nombres esperados", () => {
    const names = OS_IDS.flatMap((os) =>
      ARCH_IDS.map((arch) => assetName("0.3.0", os, arch)),
    );

    expect(names).toEqual([
      "rei_0.3.0_linux_amd64.tar.gz",
      "rei_0.3.0_linux_arm64.tar.gz",
      "rei_0.3.0_darwin_amd64.tar.gz",
      "rei_0.3.0_darwin_arm64.tar.gz",
      "rei_0.3.0_windows_amd64.zip",
      "rei_0.3.0_windows_arm64.zip",
    ]);
  });

  it("resuelve el asset presente y devuelve undefined si falta", () => {
    const current = release();

    expect(findAsset(current, "linux", "amd64")?.url).toBe(
      `${BASE}rei_0.3.0_linux_amd64.tar.gz`,
    );
    expect(findAsset(current, "macos", "arm64")?.name).toBe(
      "rei_0.3.0_darwin_arm64.tar.gz",
    );
    expect(findAsset(current, "windows", "arm64")).toBeUndefined();
  });
});

describe("checksumsAsset", () => {
  it("encuentra checksums.txt", () => {
    expect(checksumsAsset(release())?.url).toBe(`${BASE}checksums.txt`);
  });

  it("devuelve undefined si no está", () => {
    expect(checksumsAsset({ ...release(), assets: [] })).toBeUndefined();
  });
});

describe("formatReleaseDate", () => {
  it("formatea en español y en UTC", () => {
    expect(formatReleaseDate("2026-10-26T08:17:41Z")).toBe("26 de octubre de 2026");
    expect(formatReleaseDate("2026-10-26T23:59:00Z")).toBe("26 de octubre de 2026");
  });
});
