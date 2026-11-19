#!/usr/bin/env node
import { execFile, execFileSync, spawnSync } from "node:child_process";
import { promisify } from "node:util";
const execFileAsync = promisify(execFile);
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT_DIR = path.join(ROOT, "out");
const MANUAL_DIR = path.join(ROOT, "public", "assets", "brand", "manual");
const META_PATH = path.join(ROOT, "src", "lib", "brandManualPdf.json");
const LEGACY_PDF = path.join(ROOT, "public", "prism-darkroom-brand-manual.pdf");

const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const EXPECTED_PAGES = 9;
const LOCALES = ["en", "pt"];
const SKIP_BUILD = process.argv.includes("--skip-build");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
};

function hasBin(cmd) {
  return spawnSync("which", [cmd], { stdio: "ignore" }).status === 0;
}

function countPdfPages(pdfPath) {
  if (hasBin("pdfinfo")) {
    const out = execFileSync("pdfinfo", [pdfPath], { encoding: "utf8" });
    const match = out.match(/^Pages:\s+(\d+)/m);
    if (match) return Number(match[1]);
  }
  const raw = readFileSync(pdfPath, "latin1");
  const matches = raw.match(/\/Type\s*\/Page\b(?!s)/g);
  return matches ? matches.length : 0;
}

function generateCover(pdfPath, coverPath) {
  if (hasBin("pdftoppm")) {
    const tmpBase = path.join(os.tmpdir(), `bm-cover-${Date.now()}`);
    execFileSync("pdftoppm", ["-f", "1", "-l", "1", "-r", "96", "-jpeg", pdfPath, tmpBase]);
    const generated = `${tmpBase}-1.jpg`;
    const alt = `${tmpBase}-01.jpg`;
    const src = existsSync(generated) ? generated : alt;
    copyFileSync(src, coverPath);
    rmSync(src, { force: true });
    return;
  }
  if (hasBin("sips")) {
    execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "85", "--resampleWidth", "960", pdfPath, "--out", coverPath], {
      stdio: "ignore",
    });
    return;
  }
  throw new Error("Neither pdftoppm nor sips is available to generate cover thumbnails.");
}

function createStaticServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = new URL(req.url || "/", "http://127.0.0.1").pathname;
      const clean = decodeURIComponent(urlPath).replace(/^\/+/, "");
      const candidates = [
        path.join(OUT_DIR, clean),
        path.join(OUT_DIR, `${clean}.html`),
        path.join(OUT_DIR, clean, "index.html"),
      ];
      const filePath = candidates.find((c) => existsSync(c) && statSync(c).isFile());
      if (!filePath) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": MIME[ext] || "application/octet-stream",
        Connection: "close",
      });
      res.end(readFileSync(filePath));
    });
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      resolve({ server, port: typeof addr === "object" && addr ? addr.port : 3000 });
    });
  });
}

async function main() {
  if (!existsSync(CHROME)) {
    throw new Error(`Chrome not found at ${CHROME}. Set CHROME_PATH.`);
  }

  if (!SKIP_BUILD) {
    console.log("[pdf:brand] Building static export with PAGES_BASE_PATH=''...");
    execFileSync("npm", ["run", "build"], {
      cwd: ROOT,
      stdio: "inherit",
      env: { ...process.env, PAGES_BASE_PATH: "" },
    });
  }

  mkdirSync(MANUAL_DIR, { recursive: true });
  const { server, port } = await createStaticServer();
  const meta = {};

  try {
    for (const locale of LOCALES) {
      const pdfName = `prism-dark-room-brand-manual-${locale}.pdf`;
      const coverName = `cover-${locale}.jpg`;
      const pdfDest = path.join(MANUAL_DIR, pdfName);
      const coverDest = path.join(MANUAL_DIR, coverName);
      const tmpProfile = mkdtempSync(path.join(os.tmpdir(), `prism-chrome-${locale}-`));

      try {
        const url = `http://127.0.0.1:${port}/brand-manual?lang=${locale}`;
        console.log(`[pdf:brand] Printing ${url} -> ${pdfName}`);
        await execFileAsync(
          CHROME,
          [
            "--headless",
            "--disable-gpu",
            "--no-pdf-header-footer",
            "--virtual-time-budget=5000",
            `--user-data-dir=${tmpProfile}`,
            `--print-to-pdf=${pdfDest}`,
            url,
          ],
          { timeout: 45000 }
        );
      } finally {
        rmSync(tmpProfile, { recursive: true, force: true });
      }

      const pages = countPdfPages(pdfDest);
      const bytes = statSync(pdfDest).size;
      console.log(`[pdf:brand] ${pdfName}: ${pages} pages, ${(bytes / 1024).toFixed(0)} KB`);
      if (pages !== EXPECTED_PAGES) {
        throw new Error(`Expected ${EXPECTED_PAGES} pages for ${pdfName}, got ${pages}. Check print CSS overflow.`);
      }

      generateCover(pdfDest, coverDest);
      meta[locale] = {
        pdf: `/assets/brand/manual/${pdfName}`,
        cover: `/assets/brand/manual/${coverName}`,
        pages,
        bytes,
      };
    }
  } finally {
    server.close();
  }

  writeFileSync(META_PATH, `${JSON.stringify(meta, null, 2)}\n`, "utf8");
  copyFileSync(path.join(MANUAL_DIR, "prism-dark-room-brand-manual-pt.pdf"), LEGACY_PDF);
  console.log(`[pdf:brand] Updated ${path.relative(ROOT, META_PATH)} and synced legacy PDF.`);
}

main().catch((err) => {
  console.error("[pdf:brand] Failed:", err.message);
  process.exit(1);
});
