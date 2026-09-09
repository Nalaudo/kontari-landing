import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FinalCta from "./FinalCta";
import { CONTADORES_LOGIN_URL } from "../lib/urls";

describe("<FinalCta>", () => {
  it("renders the closing pitch and CTA", () => {
    render(<FinalCta />);
    expect(
      screen.getByRole("heading", { name: /empezá a ordenar tu estudio hoy/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /empezar prueba gratis de 14 días/i }),
    ).toHaveAttribute("href", CONTADORES_LOGIN_URL);
  });
});
