import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CursorGlow from "./CursorGlow";

describe("<CursorGlow>", () => {
  it("renders the glow and dot nodes, hidden on touch (md:block)", () => {
    const { container } = render(<CursorGlow />);
    expect(container.querySelector("#cursor-glow")).not.toBeNull();
    expect(container.querySelector("#cursor-dot")).not.toBeNull();
    expect(container.querySelector("#cursor-glow")?.className).toContain("hidden");
  });

  it("tracks the pointer without throwing", () => {
    render(<CursorGlow />);
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 40, clientY: 60 }));
    expect(document.querySelector("#cursor-dot")).not.toBeNull();
  });
});
