import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
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

  it("filters the cards by category", () => {
    render(<Features />);
    fireEvent.click(screen.getByRole("button", { name: /ia y seguridad/i }));
    expect(screen.getByRole("heading", { name: "Asistente de IA integrado" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Dashboard y reportes" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /todas/i }));
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(19);
  });
});
