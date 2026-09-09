import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BackToTop from "./BackToTop";

describe("<BackToTop>", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollY = 0;
  });

  it("renders the control hidden near the top of the page", () => {
    render(<BackToTop />);
    const btn = screen.getByRole("button", { name: /volver arriba/i });
    expect(btn.className).toMatch(/opacity-0/);
  });

  it("becomes visible after scrolling down past the threshold", () => {
    render(<BackToTop />);
    act(() => {
      window.scrollY = 900;
      window.dispatchEvent(new Event("scroll"));
    });
    expect(
      screen.getByRole("button", { name: /volver arriba/i }).className,
    ).toMatch(/opacity-100/);
  });

  it("scrolls back to the top when clicked", async () => {
    render(<BackToTop />);
    await userEvent.click(screen.getByRole("button", { name: /volver arriba/i }));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
