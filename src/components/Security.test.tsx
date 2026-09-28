import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
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

  it("renders the live cipher panel without crashing while time passes", () => {
    vi.useFakeTimers();
    render(<Security />);
    vi.advanceTimersByTime(3000);
    expect(screen.getByText(/cifrado aes-256-gcm/i)).toBeInTheDocument();
  });

  it("lets the visitor type the secret that gets encrypted", () => {
    render(<Security />);
    const input = screen.getByLabelText(/clave fiscal · texto plano/i);
    fireEvent.change(input, { target: { value: "otra-clave" } });
    expect(input).toHaveValue("otra-clave");
  });
});
