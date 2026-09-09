import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CookieBanner from "./CookieBanner";

describe("<CookieBanner>", () => {
  beforeEach(() => localStorage.clear());

  it("shows on first visit with a privacy-preserving message (no analytics/ads)", () => {
    render(<CookieBanner />);
    const dialog = screen.getByRole("dialog", { name: /aviso de cookies/i });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent(/cookies técnicas necesarias/i);
    expect(dialog).toHaveTextContent(/no usamos cookies de analítica ni/i);
  });

  it("dismisses and records consent when accepted", async () => {
    render(<CookieBanner />);
    await userEvent.click(screen.getByRole("button", { name: /entendido/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(localStorage.getItem("kontari-cookie-consent")).toMatch(/^v1:/);
  });

  it("stays hidden when a matching consent version is already stored", () => {
    localStorage.setItem("kontari-cookie-consent", `v1:${Date.now()}`);
    render(<CookieBanner />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("re-appears when the stored consent is from an older version", () => {
    localStorage.setItem("kontari-cookie-consent", `v0:${Date.now()}`);
    render(<CookieBanner />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
