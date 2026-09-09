import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("<Footer>", () => {
  it("links to every legal document", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: /términos y condiciones/i }),
    ).toHaveAttribute("href", "/legal/terminos.html");
    expect(
      screen.getByRole("link", { name: /política de privacidad/i }),
    ).toHaveAttribute("href", "/legal/privacidad.html");
    expect(
      screen.getByRole("link", { name: /política de cookies/i }),
    ).toHaveAttribute("href", "/legal/cookies.html");
    expect(
      screen.getByRole("link", { name: /tratamiento de datos/i }),
    ).toHaveAttribute("href", "/legal/tratamiento-de-datos.html");
  });

  it("exposes the retraction and cancellation mailtos (ley 24.240)", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: /botón de arrepentimiento/i }),
    ).toHaveAttribute("href", expect.stringContaining("mailto:bajas@kontari.com"));
    expect(
      screen.getByRole("link", { name: /baja de suscripción/i }),
    ).toHaveAttribute("href", expect.stringContaining("mailto:bajas@kontari.com"));
  });

  it("shows the current copyright year", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 Kontari/i)).toBeInTheDocument();
  });
});
