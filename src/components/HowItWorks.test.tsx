import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HowItWorks from "./HowItWorks";

describe("<HowItWorks>", () => {
  it("is anchored as #como-funciona (Hero's CTA target)", () => {
    const { container } = render(<HowItWorks />);
    expect(container.querySelector("section#como-funciona")).not.toBeNull();
  });

  it("renders the four onboarding steps in order", () => {
    render(<HowItWorks />);
    for (const title of [
      "Creá tu cuenta",
      "Cargá tus clientes",
      "Asegurá las claves",
      "Gestioná todo",
    ]) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }
  });
});
