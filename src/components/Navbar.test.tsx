import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import { CONTADORES_LOGIN_URL, CONTADORES_URL, CLIENTES_URL } from "../lib/urls";

describe("<Navbar>", () => {
  beforeEach(() => document.documentElement.classList.remove("dark"));

  it("renders the section anchor links", () => {
    render(<Navbar />);
    for (const label of ["Producto", "Funcionalidades", "IA", "Seguridad", "Precios", "FAQ"]) {
      expect(screen.getAllByRole("link", { name: label }).length).toBeGreaterThan(0);
    }
  });

  it("points the primary CTA at the contadores login and the access links at each app", () => {
    render(<Navbar />);
    expect(screen.getAllByRole("link", { name: /empezar gratis/i })[0]).toHaveAttribute(
      "href",
      CONTADORES_LOGIN_URL,
    );
    expect(screen.getAllByRole("link", { name: /contadores/i })[0]).toHaveAttribute(
      "href",
      CONTADORES_URL,
    );
    expect(screen.getAllByRole("link", { name: /clientes/i })[0]).toHaveAttribute(
      "href",
      CLIENTES_URL,
    );
  });

  it("toggles the dark theme from the theme button", async () => {
    render(<Navbar />);
    await userEvent.click(screen.getByRole("button", { name: /cambiar tema/i }));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("opens and closes the mobile menu", async () => {
    render(<Navbar />);
    await userEvent.click(screen.getByRole("button", { name: /abrir menú/i }));
    const close = screen.getByRole("button", { name: /cerrar menú/i });
    expect(close).toBeInTheDocument();
    await userEvent.click(close);
  });
});
