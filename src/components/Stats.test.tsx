import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Stats from "./Stats";

describe("<Stats>", () => {
  it("renders all four stat labels", () => {
    render(<Stats />);
    expect(screen.getByText(/clientes gestionados/i)).toBeInTheDocument();
    expect(screen.getByText(/horas ahorradas/i)).toBeInTheDocument();
    expect(screen.getByText(/iteraciones de cifrado pbkdf2/i)).toBeInTheDocument();
    expect(screen.getByText(/disponibilidad de la plataforma/i)).toBeInTheDocument();
  });
});
