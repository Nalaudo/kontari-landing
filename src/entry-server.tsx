/**
 * Build-time server entry.
 *
 * `scripts/prerender.mjs` builds this file with `vite build --ssr`, then calls
 * `render()` to get the full landing markup and injects it into
 * `dist/index.html`, so crawlers (Google, Bing, redes sociales) reciben el HTML
 * completo sin ejecutar JavaScript. En el cliente, `src/main.tsx` vuelve a
 * montar la app sobre ese contenido.
 *
 * `faqJsonLd` es el structured data `FAQPage` que el script inyecta en <head>.
 */
import { renderToString } from "react-dom/server";
import App from "./App";
import { FAQS } from "./lib/faqs";

export function render(): string {
  return renderToString(<App />);
}

export const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});
