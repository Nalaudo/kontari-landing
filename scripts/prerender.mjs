// Prerenders the landing to static HTML so crawlers get the full content
// without executing JavaScript. Runs after `vite build` (see package.json):
//
//   1. builds src/entry-server.tsx with `vite build --ssr`
//   2. calls its render() to get the landing markup
//   3. injects that markup into dist/index.html's <div id="root">
//   4. injects the FAQPage JSON-LD into <head>
//
// The client (src/main.tsx) hydrates this markup in place.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distHtml = join(root, "dist", "index.html");
const ssrDir = join(root, "dist", ".ssr");
const ssrEntry = join(ssrDir, "entry-server.js");
const viteBin = join(root, "node_modules", "vite", "bin", "vite.js");

function fail(msg, err) {
  console.error(`\n[prerender] ${msg}`);
  if (err) console.error(err);
  process.exit(1);
}

if (!existsSync(distHtml)) {
  fail("dist/index.html not found — run `vite build` first.");
}

console.log("[prerender] building SSR bundle…");
try {
  execFileSync(
    process.execPath,
    [
      viteBin,
      "build",
      "--ssr",
      "src/entry-server.tsx",
      "--outDir",
      "dist/.ssr",
      "--logLevel",
      "warn",
    ],
    { cwd: root, stdio: "inherit" },
  );
} catch (err) {
  fail("SSR build failed.", err);
}

let render, faqJsonLd;
try {
  ({ render, faqJsonLd } = await import(pathToFileURL(ssrEntry).href));
} catch (err) {
  fail("could not import the SSR bundle.", err);
}

let appHtml;
try {
  appHtml = render();
} catch (err) {
  fail("render() threw while prerendering <App />.", err);
}

if (!appHtml || appHtml.length < 500) {
  fail(`render() produced suspiciously small output (${appHtml?.length ?? 0} chars).`);
}

// React 19 emits <link rel="preload"> hoistables (e.g. for <img>) at the start
// of the string render since it can't reach <head>. Relocate them so the built
// HTML keeps resource hints where they belong.
const headHints = [];
appHtml = appHtml.replace(
  /^(?:<link\b[^>]*\/?>|<meta\b[^>]*\/?>)+/i,
  (match) => {
    headHints.push(...(match.match(/<(?:link|meta)\b[^>]*\/?>/gi) ?? []));
    return "";
  },
);

let html = readFileSync(distHtml, "utf8");
if (headHints.length) {
  html = html.replace("</head>", `  ${headHints.join("\n  ")}\n  </head>`);
}

const rootRe = /<div id=["']?root["']?>\s*<\/div>/;
if (!rootRe.test(html)) {
  fail("could not find an empty <div id=\"root\"></div> in dist/index.html.");
}
html = html.replace(rootRe, `<div id="root">${appHtml}</div>`);

if (faqJsonLd) {
  const faqTag = `<script type="application/ld+json">${faqJsonLd}</script>`;
  html = html.replace("</head>", `  ${faqTag}\n  </head>`);
}

writeFileSync(distHtml, html);
rmSync(ssrDir, { recursive: true, force: true });

const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
console.log(`[prerender] done — dist/index.html is now ${kb} kB with prerendered content.`);
