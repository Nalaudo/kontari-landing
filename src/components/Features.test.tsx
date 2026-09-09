import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Features from "./Features";

describe("<Features>", () => {
  it("is anchored as #funcionalidades", () => {
    const { container } = render(<Features />);
    expect(container.querySelector("section#funcionalidades")).not.toBeNull();
  });

  it("renders the headline feature cards", () => {
    render(<Features />);
    for (const title of [
      "Cartera de clientes centralizada",
      "Autocompletado AFIP/ARCA",
      "Asistente de IA integrado",
      "Bóveda de claves fiscales",
      "Dashboard y reportes",
    ]) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }
  });
});
