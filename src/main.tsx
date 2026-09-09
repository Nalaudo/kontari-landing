import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const container = document.getElementById("root")!;

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production builds ship prerendered markup (scripts/prerender.mjs), so the
// content is visible and indexable on first paint and we hydrate it in place.
// The dev server serves an empty <div id="root">, so there we render fresh.
// A hydration mismatch on this purely presentational page is recoverable
// (React repaints the affected subtree); we swallow those and still surface
// any other recoverable error.
if (container.hasChildNodes()) {
  hydrateRoot(container, app, {
    onRecoverableError: (error) => {
      const message = error instanceof Error ? error.message : String(error);
      if (/hydrat/i.test(message)) return;
      console.error(error);
    },
  });
} else {
  createRoot(container).render(app);
}
