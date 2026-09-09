import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";
import { CONTADORES_LOGIN_URL } from "../lib/urls";

describe("<Hero>", () => {
  it("renders the headline and value proposition", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /software de gestión para tu estudio contable/i,
      }),
    ).toBeInTheDocument();
  });

  it("has a trial CTA pointing at the contadores login", () => {
    render(<Hero />);
    expect(
      screen.getByRole("link", { name: /empezar prueba gratis de 14 días/i }),
    ).toHaveAttribute("href", CONTADORES_LOGIN_URL);
  });

  it("links 'Ver cómo funciona' to the how-it-works section", () => {
    render(<Hero />);
    expect(
      screen.getByRole("link", { name: /ver cómo funciona/i }),
    ).toHaveAttribute("href", "#como-funciona");
  });

  it("is anchored as the #producto section", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("section#producto")).not.toBeNull();
  });
});
