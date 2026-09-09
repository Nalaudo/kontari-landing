// Generates public/og-image.png (1200x630) — the preview card for Google,
// WhatsApp, LinkedIn, X, Slack, etc. Run manually after changing the brand or
// the headline:  npm run build:og
//
// Uses the Chromium that Playwright already installs for the e2e suite, so it
// adds no dependency. It is NOT part of `npm run build` (the PNG is committed).
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "og-image.png");

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    font-family: "Segoe UI", -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif;
    background: #141833;
    color: #fff;
    position: relative;
    overflow: hidden;
  }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, rgba(255,255,255,.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px);
    background-size: 48px 48px;
    -webkit-mask-image: radial-gradient(ellipse 90% 80% at 30% 20%, #000 30%, transparent 100%);
  }
  .blob { position: absolute; border-radius: 9999px; filter: blur(90px); }
  .blob-1 { width: 520px; height: 520px; background: rgba(64,86,214,.45); top: -180px; left: -120px; }
  .blob-2 { width: 460px; height: 460px; background: rgba(16,185,129,.35); bottom: -200px; right: -100px; }
  .wrap { position: relative; height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 84px 90px; }
  .brand { display: flex; align-items: center; gap: 20px; }
  .brand svg { width: 58px; height: 52px; }
  .brand span { font-size: 44px; font-weight: 800; letter-spacing: -0.02em; }
  h1 {
    margin-top: 40px;
    font-size: 76px;
    line-height: 1.05;
    font-weight: 800;
    letter-spacing: -0.03em;
    max-width: 960px;
  }
  h1 .accent {
    background: linear-gradient(90deg, #6478e6 0%, #10b981 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  p { margin-top: 30px; font-size: 30px; font-weight: 500; color: rgba(255,255,255,.72); max-width: 900px; }
  .foot { position: absolute; left: 90px; right: 90px; bottom: 70px; display: flex; align-items: center; justify-content: space-between; }
  .foot .url { font-size: 26px; font-weight: 600; color: rgba(255,255,255,.55); }
  .pill {
    font-size: 24px; font-weight: 700;
    padding: 12px 26px; border-radius: 9999px;
    background: rgba(16,185,129,.15); color: #34d399;
    border: 1px solid rgba(16,185,129,.35);
  }
</style></head><body>
  <div class="grid"></div>
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="wrap">
    <div class="brand">
      <svg viewBox="11 13 42 38" xmlns="http://www.w3.org/2000/svg">
        <rect x="21" y="13" width="22" height="10" rx="5" fill="#6478E6"/>
        <rect x="16" y="27" width="32" height="10" rx="5" fill="#2887AB"/>
        <rect x="11" y="41" width="42" height="10" rx="5" fill="#10B981"/>
      </svg>
      <span>Kontari</span>
    </div>
    <h1>Software de gestión para <span class="accent">estudios contables</span></h1>
    <p>Clientes, AFIP/ARCA, claves fiscales cifradas, Libro IVA Digital, contabilidad y un asistente de IA.</p>
    <div class="foot">
      <span class="url">kontari.com.ar</span>
      <span class="pill">14 días gratis</span>
    </div>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.screenshot({ path: out });
await browser.close();
console.log(`[og] wrote ${out}`);
