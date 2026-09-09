import { AxeBuilder } from "@axe-core/playwright";
import { expect, type Page, type TestInfo } from "@playwright/test";

/** URLs/messages that are noise in a static-preview context, not regressions. */
const IGNORED = [
  /favicon\.ico/i,
  /\/_vercel\//i, // @vercel/analytics insights script — 404 outside Vercel
  /vercel-insights|vitals\.vercel/i,
  /fonts\.gstatic\.com|fonts\.googleapis\.com/i,
  /net::ERR_(BLOCKED_BY_CLIENT|ABORTED)/i,
];
const ignored = (s: string) => IGNORED.some((re) => re.test(s));

/**
 * Collect console errors, uncaught page errors and failed HTTP responses for
 * the lifetime of a test. Resource-load console errors are enriched with the
 * offending URL so the ignore list can act on it.
 */
export function trackPageErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const url = msg.location()?.url ?? "";
    errors.push(`console.error: ${msg.text()} ${url}`.trim());
  });
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("requestfailed", (req) => {
    errors.push(`requestfailed: ${req.url()} (${req.failure()?.errorText ?? "?"})`);
  });
  page.on("response", (res) => {
    if (res.status() >= 400) errors.push(`http ${res.status()}: ${res.url()}`);
  });
  return errors;
}

export function assertNoRealErrors(errors: string[]): void {
  const real = [...new Set(errors)].filter((e) => !ignored(e));
  expect(real, `unexpected console/page/network errors:\n${real.join("\n")}`).toEqual(
    [],
  );
}

/** Run axe; fail on critical, and on serious violations not in the known list. */
export async function expectNoSeriousA11yViolations(
  page: Page,
  testInfo: TestInfo,
  knownSeriousRuleIds: string[] = KNOWN_SERIOUS_A11Y,
): Promise<void> {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  await testInfo.attach("axe-violations.json", {
    body: JSON.stringify(results.violations, null, 2),
    contentType: "application/json",
  });

  const critical = results.violations.filter((v) => v.impact === "critical");
  const seriousNew = results.violations.filter(
    (v) => v.impact === "serious" && !knownSeriousRuleIds.includes(v.id),
  );
  const blocking = [...critical, ...seriousNew];

  expect(
    blocking,
    `blocking a11y violations:\n${blocking
      .map((v) => `- [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`)
      .join("\n")}`,
  ).toEqual([]);
}

/**
 * Pre-existing serious violations on the landing, tracked as debt so the check
 * still guards against NEW regressions. Trim this list as issues get fixed.
 *  - color-contrast: low-contrast helper text (opacity-50 / muted greys)
 */
export const KNOWN_SERIOUS_A11Y = ["color-contrast"];
