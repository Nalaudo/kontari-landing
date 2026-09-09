import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Component/hook/lib tests for the landing SPA. E2E lives under e2e/ (Playwright)
// and is intentionally excluded here.
export default defineConfig({
  plugins: [react()],
  // Test files are excluded from tsconfig.app.json (kept out of the prod build),
  // so pin the automatic JSX runtime here instead of relying on tsconfig lookup.
  esbuild: { jsx: "automatic", jsxImportSource: "react" },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.{test,spec}.{ts,tsx}",
        "src/test/**",
        "src/main.tsx",
        "src/vite-env.d.ts",
      ],
    },
  },
});
