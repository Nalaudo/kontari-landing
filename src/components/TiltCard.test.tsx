import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TiltCard from "./TiltCard";

describe("<TiltCard>", () => {
  it("renders children and merges the passed className", () => {
    render(
      <TiltCard className="feature-card">
        <span>contenido</span>
      </TiltCard>,
    );
    const card = screen.getByText("contenido").parentElement!;
    expect(card).toHaveClass("tilt-card");
    expect(card).toHaveClass("feature-card");
  });

  it("applies a transform on mouse move and clears it on leave", () => {
    render(
      <TiltCard>
        <span>hover</span>
      </TiltCard>,
    );
    const card = screen.getByText("hover").parentElement!;
    // jsdom has no layout engine; give the card real dimensions so the tilt
    // maths produce a valid CSS transform instead of NaN.
    card.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 200, height: 120 }) as DOMRect;
    fireEvent.mouseMove(card, { clientX: 10, clientY: 10 });
    expect(card.style.transform).toContain("perspective(700px)");
    fireEvent.mouseLeave(card);
    expect(card.style.transform).toBe("");
  });
});
