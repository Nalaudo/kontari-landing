# Landing tests

Two layers:

| Layer | Tool | Location | Command |
|---|---|---|---|
| Component / hook / lib | Vitest + Testing Library (jsdom) | `src/**/*.test.{ts,tsx}` | `npm test` |
| E2E smoke | Playwright (built SPA via `vite preview`) | `e2e/*.spec.ts` | `npm run test:e2e` |

```bash
npm run test:all      # typecheck + vitest --coverage + playwright
npm run test           # vitest only
npm run test:coverage  # vitest + coverage/ report
npm run test:e2e       # playwright (auto-builds and previews)
npm run test:e2e:ui    # playwright interactive
```

## What the E2E covers (`e2e/landing.spec.ts`)

- Page loads with no console / pageerror / HTTP≥400 (ignore list in `helpers.ts`
  for the `@vercel/analytics` insights 404 and Google Fonts).
- Every section anchor present (`#producto … #faq`).
- Nav anchor links scroll to their section.
- Every primary CTA points at `contadores.kontari.com.ar` (trial CTA → `/auth/login`).
- Pricing cycle toggle recomputes prices.
- FAQ accordion expands.
- Cookie banner: privacy-preserving copy, dismiss persists across reload.
- Footer links to all legal docs.
- Theme toggle adds `.dark`.
- axe-core: fails on `critical`, and on `serious` not in `KNOWN_SERIOUS_A11Y`
  (`helpers.ts`). Current known debt: `color-contrast` on muted helper text.
- Full-page screenshot attached to the report.
- Mobile project (`--project=mobile`) re-runs the suite at Pixel-7 size and
  exercises the mobile menu.

## CI

`.github/workflows/test.yml` runs `unit` and `e2e` jobs on every push / PR and
uploads `coverage/` and `playwright-report/` as artifacts.
