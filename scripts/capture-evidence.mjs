#!/usr/bin/env node
/**
 * Regenera la evidencia de producto de la home.
 *
 * Captura GitHub Issues públicas y el visor `rei view` real, y escribe
 * `public/evidence/manifest.json` al final, de forma atómica. Todas las
 * capturas viven primero en un directorio temporal: si algo falla, el
 * manifiesto anterior y las imágenes publicadas no se tocan.
 *
 * Requisitos: Chrome del sistema (canal `chrome`), `rei` en el PATH y red.
 */
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rename,
  rm,
  unlink,
  writeFile,
} from "node:fs/promises";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const OUTPUT_DIR = path.join(ROOT, "public", "evidence");
const MANIFEST_FILE = path.join(OUTPUT_DIR, "manifest.json");

/** Política de origen: repositorio público, sin autenticación. */
const REPOSITORY = "https://github.com/k1wi777/REI-Harness";
const ISSUE_NUMBERS = [2, 3, 5];

/** Work Item que se sirve en el visor; el más largo de los disponibles. */
const VIEWER_WORK_ITEM = "2026-10-27_12-08__referencia-operacion-docs";

const VIEWPORT = { width: 1440, height: 900 };
const MOBILE_VIEWPORT = { width: 390, height: 844 };
const DEVICE_SCALE_FACTOR = 2;
const BODY_MAX_HEIGHT = 900;
const PAGE_TIMEOUT_MS = 20_000;
const VIEWER_TIMEOUT_MS = 15_000;

const issueUrl = (number) => `${REPOSITORY}/issues/${number}`;
const publicFile = (name) => `/evidence/${name}`;
const evidencePath = (name) => path.join(OUTPUT_DIR, name);
const pad = (value) => String(Math.floor(Math.abs(value))).padStart(2, "0");

/** Fecha ISO con el desfase local, como el resto de la evidencia del proyecto. */
function localIso(date = new Date()) {
  const offset = -date.getTimezoneOffset();
  const local = new Date(date.getTime() + offset * 60_000)
    .toISOString()
    .slice(0, -1);
  return `${local}${offset >= 0 ? "+" : "-"}${pad(offset / 60)}:${pad(offset % 60)}`;
}

/** Dimensiones reales del PNG (cabecera IHDR), no las esperadas. */
async function pngDimensions(file) {
  const buffer = await readFile(file);
  if (buffer.toString("ascii", 1, 4) !== "PNG") {
    throw new Error(`${path.basename(file)} no es un PNG válido`);
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

async function screenshot(page, tmpDir, name, clip, { fullPage = Boolean(clip) } = {}) {
  const file = path.join(tmpDir, name);
  await page.screenshot({ path: file, clip, fullPage });
  const { width, height } = await pngDimensions(file);
  return { file: publicFile(name), width, height, tmpFile: file };
}

/** Acota un recorte al viewport y a un alto máximo. */
function clampClip(
  box,
  viewport,
  maxHeight = viewport.height,
  margin = 0,
  limitToViewport = false,
  maxBottom = Number.POSITIVE_INFINITY,
) {
  const x = Math.max(0, box.x - margin);
  const y = Math.max(0, box.y - margin);
  const right = Math.min(viewport.width, box.x + box.width + margin);
  const bottom = Math.min(
    y + maxHeight,
    box.y + box.height + margin,
    limitToViewport ? viewport.height : Number.POSITIVE_INFINITY,
    maxBottom,
  );
  const width = Math.floor(right - x);
  const height = Math.floor(bottom - y);
  if (width <= 0 || height <= 0) {
    throw new Error("el recorte calculado está fuera del viewport");
  }
  return { x: Math.floor(x), y: Math.floor(y), width, height };
}

async function waitForHeading(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: PAGE_TIMEOUT_MS });
  await page.locator("h1").first().waitFor({ state: "visible", timeout: PAGE_TIMEOUT_MS });
}

/** Texto visible de la etiqueta, sin la descripción oculta del chip. */
const LABEL_SELECTOR =
  'a[href*="/labels/"], a[href*="label%3A"], a[class*="labelLink"]';

/**
 * Captura una GitHub Issue pública: cabecera (título, número, estado y
 * labels) y cuerpo publicado, recortado a 1440×900 como máximo.
 */
async function captureIssue(page, number, tmpDir) {
  const source = issueUrl(number);
  try {
    await waitForHeading(page, source);
    await page.waitForTimeout(1000);

    const title = (
      await page.locator('h1 [data-testid="issue-title"]').first().textContent()
    )?.trim();
    if (!title) throw new Error("la página no muestra el título de la issue");

    const state = (
      await page.locator('span[class*="StateLabel"]').filter({ visible: true }).first().textContent()
    )?.trim().toLowerCase();
    if (!state) throw new Error("la página no muestra el estado de la issue");

    // Los chips de la cabecera son los visibles sin desplazar la página; el
    // cuerpo puede repetir labels más abajo y no forman parte del recorte.
    const headerLabels = await page
      .locator(LABEL_SELECTOR)
      .evaluateAll((anchors) =>
        anchors
          .filter((anchor) => {
            const rect = anchor.getBoundingClientRect();
            return rect.width > 0 && rect.y < window.innerHeight;
          })
          .map((anchor) => {
            const name = (
              anchor.querySelector('[class*="TokenTextContainer"]') ?? anchor
            ).textContent?.trim();
            return { name, box: anchor.getBoundingClientRect().toJSON() };
          })
          .filter((label) => Boolean(label.name)),
      );

    const labels = [...new Set(headerLabels.map((label) => label.name))];
    if (labels.length === 0) {
      throw new Error("la página no muestra labels");
    }

    const h1Box = await page.locator("h1").first().boundingBox();
    const labelBoxes = headerLabels.map((label) => label.box);
    if (!h1Box) throw new Error("no se pudo medir el título");

    const headerBox = {
      x: h1Box.x,
      y: h1Box.y,
      width: Math.max(
        h1Box.x + h1Box.width,
        ...labelBoxes.map((box) => box.x + box.width),
      ) - h1Box.x,
      height: Math.max(
        h1Box.y + h1Box.height,
        ...labelBoxes.map((box) => box.y + box.height),
      ) - h1Box.y,
    };

    const capturedAt = localIso();
    const labelList = labels.join(", ");
    const head = await screenshot(
      page,
      tmpDir,
      `gh-${number}-head.png`,
      clampClip(headerBox, VIEWPORT, 320, 24),
    );

    const bodyBox = await page.locator(".markdown-body").first().boundingBox();
    if (!bodyBox) throw new Error("no se encontró el cuerpo de la issue");
    const hasTaskList =
      (await page
        .locator(".markdown-body")
        .first()
        .locator('input[type="checkbox"]')
        .count()) > 0;
    const body = await screenshot(
      page,
      tmpDir,
      `gh-${number}-body.png`,
      clampClip(bodyBox, VIEWPORT, BODY_MAX_HEIGHT, 16),
    );

    const common = {
      kind: "issue",
      source,
      capturedAt,
      issue: number,
      labels,
      state,
    };

    return [
      {
        ...common,
        ...head,
        id: `gh-${number}-head`,
        description: title,
        alt: `Cabecera de la GitHub Issue #${number} «${title}» con estado ${
          state === "closed" ? "Closed" : "Open"
        } y etiquetas ${labelList}.`,
      },
      {
        ...common,
        ...body,
        id: `gh-${number}-body`,
        description: `Cuerpo publicado de la GitHub Issue #${number} «${title}»${
          hasTaskList ? " con su task list" : ""
        }.`,
        alt: `Cuerpo de la GitHub Issue #${number} «${title}»${
          hasTaskList ? " con su task list publicada" : ""
        }.`,
      },
    ];
  } catch (error) {
    throw new Error(`captura de la issue #${number}: ${error.message}`);
  }
}

/**
 * Arranca `rei view` en primer plano y espera la URL con token del stdout.
 * El proceso hijo se cierra con SIGINT al terminar las capturas.
 */
async function startViewer(workItem) {
  const child = spawn("rei", ["view", workItem], {
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stdout = "";
  let stderr = "";

  child.stdout.on("data", (chunk) => {
    stdout += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  const url = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(
        new Error(
          `el visor no anunció su URL en ${VIEWER_TIMEOUT_MS} ms${
            stderr ? `: ${stderr.trim()}` : ""
          }`,
        ),
      );
    }, VIEWER_TIMEOUT_MS);

    child.stdout.on("data", () => {
      const clean = stdout.replace(/\u001b\[[0-9;]*m/g, "");
      const match = clean.match(/Visor disponible en (http:\/\/\S+)/);
      if (match) {
        clearTimeout(timer);
        resolve(match[1]);
      }
    });

    child.once("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`el visor terminó antes de anunciar la URL (código ${code})`));
    });
    child.once("error", (error) => {
      clearTimeout(timer);
      reject(new Error(`no se pudo ejecutar rei view: ${error.message}`));
    });
  });

  return { child, url };
}

async function stopViewer(child) {
  if (child.exitCode !== null) return;
  const exited = new Promise((resolve) => child.once("exit", resolve));
  child.kill("SIGINT");
  await Promise.race([
    exited,
    new Promise((resolve) => setTimeout(resolve, 5000)),
  ]);
  if (child.exitCode === null) child.kill("SIGKILL");
}

/** Captura el visor real: escritorio, FICHA, diff si lo muestra y móvil. */
async function captureViewer(page, tmpDir, workItem) {
  const { child, url } = await startViewer(workItem);

  try {
    await page.setViewportSize(VIEWPORT);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: PAGE_TIMEOUT_MS });
    await page.locator("aside.meta").waitFor({ state: "visible", timeout: PAGE_TIMEOUT_MS });
    await page.waitForTimeout(600);

    const title = (await page.locator("h1").first().textContent())?.trim();
    if (!title) throw new Error("el visor no muestra el título del Work Item");

    const capturedAt = localIso();
    const source = `rei view ${workItem}`;
    const desktop = await screenshot(page, tmpDir, `view-${workItem}-desktop.png`);

    // La FICHA ocupa todo el alto del panel; se recorta a su contenido real.
    const meta = page.locator("aside.meta").first();
    const metaBox = await meta.boundingBox();
    if (!metaBox) throw new Error("no se pudo medir la FICHA");
    const metaBottom = await meta.evaluate((aside) => {
      const children = [...aside.children];
      const last = children[children.length - 1];
      return last
        ? last.getBoundingClientRect().bottom
        : aside.getBoundingClientRect().bottom;
    });
    const ficha = await screenshot(
      page,
      tmpDir,
      `view-${workItem}-ficha.png`,
      {
        x: Math.floor(metaBox.x),
        y: Math.floor(metaBox.y),
        width: Math.floor(metaBox.width),
        height: Math.min(
          Math.ceil(metaBox.height),
          Math.ceil(metaBottom - metaBox.y) + 12,
        ),
      },
      { fullPage: false },
    );

    const captures = [
      {
        ...desktop,
        id: `view-${workItem}-desktop`,
        kind: "viewer",
        view: "desktop",
        workItem,
        source,
        capturedAt,
        description: `Visor rei view del Work Item ${workItem}: índice, documento activo y FICHA.`,
        alt: `Visor local rei view con el Work Item «${title}» en escritorio: índice de documentos, documento activo y FICHA de validación.`,
      },
      {
        ...ficha,
        id: `view-${workItem}-ficha`,
        kind: "viewer",
        view: "ficha",
        workItem,
        source,
        capturedAt,
        description: `FICHA del visor para el Work Item ${workItem}.`,
        alt: `FICHA del visor para el Work Item «${title}» con estado, checkpoints, sesión y validación.`,
      },
    ];

    const toggle = page
      .locator("button.changes-toggle")
      .filter({ visible: true })
      .first();
    if ((await toggle.count()) > 0) {
      const toggleText = (await toggle.textContent())?.trim() ?? "cambios";
      const activeDoc =
        (
          (await page.locator(".doc.active").first().innerText()) ?? ""
        ).match(/[\w.-]+\.md/)?.[0] ?? "";
      const reader = page.locator("section.reader").first();
      const readerBox = await reader.boundingBox();
      if (!readerBox) throw new Error("no se pudo medir el panel del visor");

      await toggle.click();
      const diff = page.locator("div.doc-diff").filter({ visible: true }).first();
      await diff.waitFor({ state: "visible", timeout: 5000 });
      // El visor desplaza el documento dentro de su propio panel: se alinea el
      // diff con el borde superior para recortarlo dentro del panel visible.
      await diff.evaluate((element) => {
        const scroller = element.closest(".reader") ?? element.parentElement;
        if (!scroller) return;
        scroller.scrollTop +=
          element.getBoundingClientRect().top -
          scroller.getBoundingClientRect().top;
      });
      await page.waitForTimeout(200);
      const diffBox = await diff.boundingBox();
      if (!diffBox) throw new Error("el diff no se pudo medir");
      const shot = await screenshot(
        page,
        tmpDir,
        `view-${workItem}-diff.png`,
        clampClip(
          diffBox,
          VIEWPORT,
          BODY_MAX_HEIGHT,
          12,
          true,
          readerBox.y + readerBox.height,
        ),
        { fullPage: false },
      );
      captures.push({
        ...shot,
        id: `view-${workItem}-diff`,
        kind: "viewer",
        view: "diff",
        workItem,
        source,
        capturedAt,
        description: `Diff del visor para ${activeDoc || "el documento activo"}: ${toggleText}.`,
        alt: `Diff mostrado por el visor para ${
          activeDoc || "el documento activo"
        } del Work Item «${title}»: ${toggleText}.`,
      });
    }

    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.waitForTimeout(600);
    const mobile = await screenshot(page, tmpDir, `view-${workItem}-mobile.png`);
    captures.push({
      ...mobile,
      id: `view-${workItem}-mobile`,
      kind: "viewer",
      view: "mobile",
      workItem,
      source,
      capturedAt,
      description: `Visor rei view en móvil (390×844) para el Work Item ${workItem}.`,
      alt: `Visor local rei view con el Work Item «${title}» en móvil: índice de documentos y documento en una columna.`,
    });

    return captures;
  } catch (error) {
    throw new Error(`captura del visor ${workItem}: ${error.message}`);
  } finally {
    await stopViewer(child);
  }
}

/** Escribe el manifiesto al final y solo si todas las capturas existen. */
async function publish(tmpDir, captures, meta) {
  if (captures.length === 0) {
    throw new Error("no se generó ninguna captura");
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  for (const capture of captures) {
    await copyFile(capture.tmpFile, evidencePath(path.basename(capture.file)));
  }

  const manifest = {
    generatedAt: localIso(),
    repository: REPOSITORY,
    viewerWorkItem: meta.viewerWorkItem,
    captures: captures.map((capture) => {
      const entry = { ...capture };
      delete entry.tmpFile;
      return entry;
    }),
  };

  const tmpManifest = path.join(OUTPUT_DIR, ".manifest.json.tmp");
  await writeFile(tmpManifest, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  await rename(tmpManifest, MANIFEST_FILE);

  await removeOrphans(manifest.captures);
}

/** Elimina capturas antiguas que ya no aparecen en el manifiesto. */
async function removeOrphans(captures) {
  const keep = new Set(captures.map((capture) => path.basename(capture.file)));
  const files = await readdir(OUTPUT_DIR);
  for (const file of files) {
    if (!/^(gh|view)-.*\.png$/.test(file) || keep.has(file)) continue;
    await unlink(path.join(OUTPUT_DIR, file));
  }
}

async function main() {
  if (ISSUE_NUMBERS.length === 0 && VIEWER_WORK_ITEM === "") {
    throw new Error(
      "no hay fuentes de captura definidas: configura ISSUE_NUMBERS o VIEWER_WORK_ITEM",
    );
  }

  const tmpDir = await mkdtemp(path.join(tmpdir(), "rei-evidence-"));
  let browser;

  try {
    try {
      browser = await chromium.launch({ channel: "chrome", headless: true });
    } catch (error) {
      throw new Error(
        `no se pudo lanzar el Chrome del sistema (channel: "chrome"): ${error.message}`,
      );
    }

    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
      colorScheme: "dark",
    });
    const page = await context.newPage();

    const captures = [];

    for (const number of ISSUE_NUMBERS) {
      captures.push(...(await captureIssue(page, number, tmpDir)));
    }

    if (VIEWER_WORK_ITEM) {
      captures.push(...(await captureViewer(page, tmpDir, VIEWER_WORK_ITEM)));
    }

    await context.close();

    await publish(tmpDir, captures, { viewerWorkItem: VIEWER_WORK_ITEM });
    console.log(
      `Evidencia generada: ${captures.length} capturas en public/evidence/`,
    );
  } finally {
    await browser?.close();
    await rm(tmpDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(`capture:evidence falló: ${error.message}`);
  process.exitCode = 1;
});
