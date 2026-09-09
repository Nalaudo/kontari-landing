import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
