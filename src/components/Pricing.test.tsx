import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pricing from "./Pricing";
import { contadoresLoginWithTier } from "../lib/urls";

describe("<Pricing>", () => {
  it("shows the three tiers", () => {
    render(<Pricing />);
    expect(screen.getByRole("heading", { name: "Solo" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Estudio" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Portal" })).toBeInTheDocument();
  });

  it("defaults to monthly pricing and each CTA carries its tier", () => {
    render(<Pricing />);
    expect(screen.getByText("$20.000")).toBeInTheDocument();
    expect(screen.getByText("$36.000")).toBeInTheDocument();
    expect(screen.getByText("$58.000")).toBeInTheDocument();

    const ctas = screen.getAllByRole("link", { name: /empezar prueba gratis/i });
    expect(ctas[0]).toHaveAttribute("href", contadoresLoginWithTier("solo"));
    expect(ctas[1]).toHaveAttribute("href", contadoresLoginWithTier("estudio"));
    expect(ctas[2]).toHaveAttribute("href", contadoresLoginWithTier("portal"));
  });

  it("switches to yearly pricing when the cycle toggle is used", async () => {
    render(<Pricing />);
    await userEvent.click(screen.getByRole("button", { name: /anual/i }));
    expect(screen.getByText("$200.000")).toBeInTheDocument();
    expect(screen.getByText("$360.000")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /anual/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("marks Estudio as the featured plan", () => {
    render(<Pricing />);
    expect(screen.getByText("Más elegido")).toBeInTheDocument();
  });
});
