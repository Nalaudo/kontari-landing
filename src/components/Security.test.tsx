import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Security from "./Security";

afterEach(() => vi.useRealTimers());

describe("<Security>", () => {
  it("is anchored as #seguridad", () => {
    const { container } = render(<Security />);
    expect(container.querySelector("section#seguridad")).not.toBeNull();
  });

  it("lists the crypto guarantees", () => {
    render(<Security />);
    expect(screen.getByText(/cifrado aes-256-gcm/i)).toBeInTheDocument();
    expect(screen.getByText(/pbkdf2 con 600\.000 iteraciones/i)).toBeInTheDocument();
    // Appears both in the intro copy and as a bullet title.
    expect(screen.getAllByText(/arquitectura zero-knowledge/i).length).toBeGreaterThan(0);
  });

  it("rotates the decorative cipher string on an interval without crashing", () => {
    vi.useFakeTimers();
    render(<Security />);
    vi.advanceTimersByTime(3000);
    expect(screen.getByText(/cifrado aes-256-gcm/i)).toBeInTheDocument();
  });
});
