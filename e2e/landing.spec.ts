import { test, expect } from "@playwright/test";
import {
  trackPageErrors,
  assertNoRealErrors,
  expectNoSeriousA11yViolations,
} from "./helpers";

const CONTADORES_LOGIN = "https://contadores.kontari.com.ar/auth/login";
const SECTION_IDS = [
  "producto",
  "funcionalidades",
  "ia",
  "seguridad",
  "como-funciona",
  "precios",
  "faq",
];

test.describe("landing page", () => {
  test("loads without console/page errors", async ({ page }) => {
    const errors = trackPageErrors(page);
    const res = await page.goto("/");
    expect(res?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/kontari/i);
    await page.waitForLoadState("networkidle");
    assertNoRealErrors(errors);
  });

  test("renders every section anchor", async ({ page }) => {
    await page.goto("/");
    for (const id of SECTION_IDS) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test("nav links jump to their sections", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "desktop nav is collapsed into the hamburger on mobile");
    await page.goto("/");
    const nav = page.locator("header nav").first();
    await nav.getByRole("link", { name: "Precios" }).first().click();
    await expect(page).toHaveURL(/#precios$/);
    await expect(page.locator("#precios")).toBeInViewport();
  });

  test("primary CTAs point at the contadores login", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "CTAs live inside the hamburger menu on mobile");
    await page.goto("/");
    const ctas = page.getByRole("link", { name: /empezar (gratis|prueba)/i });
    expect(await ctas.count()).toBeGreaterThan(0);
    for (const cta of await ctas.all()) {
      expect(await cta.getAttribute("href")).toContain(
        "contadores.kontari.com.ar",
      );
    }
    await expect(
      page.getByRole("link", { name: /empezar prueba gratis de 14 días/i }).first(),
    ).toHaveAttribute("href", CONTADORES_LOGIN);
  });

  test("pricing cycle toggle updates the displayed prices", async ({ page }) => {
    await page.goto("/");
    const pricing = page.locator("#precios");
    await expect(pricing.getByText("$20.000")).toBeVisible();
    await pricing.getByRole("button", { name: /anual/i }).click();
    await expect(pricing.getByText("$200.000")).toBeVisible();
  });

  test("FAQ entries expand on click", async ({ page }) => {
    await page.goto("/");
    const q = page
      .locator("#faq")
      .getByRole("button", { name: /¿qué es kontari\?/i });
    await expect(q).toHaveAttribute("aria-expanded", "false");
    await q.click();
    await expect(q).toHaveAttribute("aria-expanded", "true");
  });

  test("cookie banner is privacy-preserving and dismissible across reloads", async ({
    page,
  }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: /aviso de cookies/i });
    await expect(banner).toBeVisible();
    await expect(banner).toContainText(/no usamos cookies de analítica/i);
    await banner.getByRole("button", { name: /entendido/i }).click();
    await expect(banner).toBeHidden();
    await page.reload();
    await expect(
      page.getByRole("dialog", { name: /aviso de cookies/i }),
    ).toBeHidden();
  });

  test("footer exposes every legal document", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(
      footer.getByRole("link", { name: /términos y condiciones/i }),
    ).toHaveAttribute("href", "/legal/terminos.html");
    await expect(
      footer.getByRole("link", { name: /política de privacidad/i }),
    ).toHaveAttribute("href", "/legal/privacidad.html");
    await expect(
      footer.getByRole("link", { name: /política de cookies/i }),
    ).toHaveAttribute("href", "/legal/cookies.html");
  });

  test("theme toggle switches to dark mode", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /cambiar tema/i }).first().click();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("no serious accessibility violations", async ({ page }, testInfo) => {
    await page.goto("/");
    await expectNoSeriousA11yViolations(page, testInfo);
  });

  test("captures a full-page screenshot", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await testInfo.attach("landing.png", {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
  });
});

test.describe("mobile", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "chromium only");

  test("mobile menu opens and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "hamburger only shows below lg");
    await page.goto("/");
    await page.getByRole("button", { name: /abrir menú/i }).click();

    // The sliding panel holds a duplicate set of nav links; when open the first
    // one is on-screen, when closed the panel is translated off the viewport.
    const menuLink = page
      .locator("div.lg\\:hidden.fixed")
      .getByRole("link", { name: "Producto" });
    await expect(menuLink).toBeInViewport();

    await page.getByRole("button", { name: /cerrar menú/i }).click();
    await expect(menuLink).not.toBeInViewport();
  });
});
