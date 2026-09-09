import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Faq from "./Faq";

describe("<Faq>", () => {
  it("renders every question collapsed by default", () => {
    render(<Faq />);
    const buttons = screen.getAllByRole("button", { expanded: false });
    expect(buttons.length).toBeGreaterThanOrEqual(10);
    expect(
      screen.getByRole("button", { name: /¿qué es kontari\?/i }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("expands a question on click and collapses it again", async () => {
    render(<Faq />);
    const q = screen.getByRole("button", { name: /¿qué es kontari\?/i });
    await userEvent.click(q);
    expect(q).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(q);
    expect(q).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps only one question open at a time", async () => {
    render(<Faq />);
    const first = screen.getByRole("button", { name: /¿qué es kontari\?/i });
    const second = screen.getByRole("button", { name: /¿cómo obtienen los datos/i });
    await userEvent.click(first);
    await userEvent.click(second);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");
  });
});
