import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AiSection from "./AiSection";
import { CONTADORES_LOGIN_URL } from "../lib/urls";

describe("<AiSection>", () => {
  it("is anchored as #ia with its heading", () => {
    const { container } = render(<AiSection />);
    expect(container.querySelector("section#ia")).not.toBeNull();
    expect(
      screen.getByRole("heading", { name: /una ia que trabaja con los datos/i }),
    ).toBeInTheDocument();
  });

  it("states the privacy guarantees (opt-in, no training, user confirms)", () => {
    render(<AiSection />);
    expect(screen.getByText(/opt-in explícito/i)).toBeInTheDocument();
    expect(screen.getByText(/tus datos no entrenan modelos/i)).toBeInTheDocument();
    expect(screen.getByText(/vos tenés el control/i)).toBeInTheDocument();
  });

  it("has a trial CTA to the contadores login", () => {
    render(<AiSection />);
    expect(
      screen.getByRole("link", { name: /probá el asistente gratis/i }),
    ).toHaveAttribute("href", CONTADORES_LOGIN_URL);
  });
});
