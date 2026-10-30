import { detectPlatform } from "@/lib/platform";

const UA = {
  linux:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
  linuxArm:
    "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
  mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15",
  windows:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
  android:
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36",
  iphone:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1",
};

describe("detectPlatform", () => {
  it("detecta Linux amd64 y arm64 por el user agent", () => {
    expect(detectPlatform(UA.linux)).toEqual({ os: "linux", arch: "amd64" });
    expect(detectPlatform(UA.linuxArm)).toEqual({ os: "linux", arch: "arm64" });
  });

  it("detecta Windows amd64", () => {
    expect(detectPlatform(UA.windows)).toEqual({ os: "windows", arch: "amd64" });
  });

  it("no deduce arm64 en macOS sin evidencia", () => {
    expect(detectPlatform(UA.mac)).toEqual({ os: "macos", arch: undefined });
  });

  it("usa las pistas de alta entropía cuando existen", () => {
    expect(
      detectPlatform(UA.mac, { platform: "macOS", architecture: "arm", bitness: "64" }),
    ).toEqual({ os: "macos", arch: "arm64" });
    expect(
      detectPlatform(UA.windows, { platform: "Windows", architecture: "x86", bitness: "64" }),
    ).toEqual({ os: "windows", arch: "amd64" });
  });

  it("ignora arquitecturas de 32 bits", () => {
    expect(
      detectPlatform(UA.linux, { architecture: "arm", bitness: "32" }).arch,
    ).toBeUndefined();
  });

  it("no preselecciona nada en móviles ni en agentes desconocidos", () => {
    expect(detectPlatform(UA.android)).toEqual({});
    expect(detectPlatform(UA.iphone)).toEqual({});
    expect(detectPlatform("curl/8.0")).toEqual({});
    expect(detectPlatform("")).toEqual({});
  });
});
