import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import confetti from "canvas-confetti";
import CtaLink from "./CtaLink";

describe("<CtaLink>", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders an anchor carrying through href and children", () => {
    render(
      <CtaLink href="https://example.test/go" className="cta">
        Empezar
      </CtaLink>,
    );
    const link = screen.getByRole("link", { name: "Empezar" });
    expect(link).toHaveAttribute("href", "https://example.test/go");
    expect(link).toHaveClass("cta");
  });

  it("fires confetti and still calls a supplied onClick", async () => {
    const onClick = vi.fn();
    render(
      <CtaLink href="#" onClick={onClick}>
        Go
      </CtaLink>,
    );
    await userEvent.click(screen.getByRole("link", { name: "Go" }));
    expect(confetti).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
