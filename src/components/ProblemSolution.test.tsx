import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ProblemSolution from "./ProblemSolution";

describe("<ProblemSolution>", () => {
  it("contrasts the 'without' and 'with Kontari' columns", () => {
    render(<ProblemSolution />);
    expect(screen.getByRole("heading", { name: /sin kontari/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /con kontari/i })).toBeInTheDocument();
  });

  it("lists four pain points and four resolutions", () => {
    const { container } = render(<ProblemSolution />);
    expect(container.querySelectorAll("ul li").length).toBe(8);
  });

  it("highlights the matching resolution when hovering a pain point", () => {
    render(<ProblemSolution />);
    const pain = screen.getByText(/claves fiscales guardadas en post-its/i).closest("li")!;
    const fix = screen.getByText(/bóveda de claves fiscales cifrada/i).closest("li")!;
    fireEvent.mouseEnter(pain);
    expect(fix.className).toMatch(/bg-sec/);
    expect(pain.className).toMatch(/bg-sec/);
  });
});
