import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Counter from "./Counter";

describe("<Counter>", () => {
  it("renders a numeric value starting at zero", () => {
    render(<Counter target={128} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("honours the decimals prop", () => {
    render(<Counter target={99.9} decimals={1} />);
    expect(screen.getByText("0.0")).toBeInTheDocument();
  });
});
