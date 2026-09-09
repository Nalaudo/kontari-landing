import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@vercel/analytics/react", () => ({ Analytics: () => null }));

import App from "./App";

describe("<App>", () => {
  it("mounts the whole landing page with every section anchor present", () => {
    const { container } = render(<App />);
    for (const id of [
      "top",
      "producto",
      "funcionalidades",
      "ia",
      "seguridad",
      "como-funciona",
      "precios",
      "faq",
    ]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it("renders navigation, footer and the cookie banner", () => {
    render(<App />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      screen.getByRole("dialog", { name: /aviso de cookies/i }),
    ).toBeInTheDocument();
  });
});
