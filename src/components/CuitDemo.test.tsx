import { describe, it, expect, vi, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import CuitDemo from "./CuitDemo";

afterEach(() => vi.useRealTimers());

describe("<CuitDemo>", () => {
  it("renders the first contribuyente fully autocompleted (stable for prerender)", () => {
    render(<CuitDemo />);
    expect(screen.getByText("30-71234567-9")).toBeInTheDocument();
    expect(screen.getByText("Panadería La Espiga SRL")).toBeInTheDocument();
    expect(screen.getByText(/ficha creada/i)).toBeInTheDocument();
  });

  it("types the next CUIT, queries ARCA and fills the card", () => {
    render(<CuitDemo />);
    vi.useFakeTimers();
    act(() => {
      screen.getByRole("button", { name: /probar otro cuit/i }).click();
    });
    expect(screen.getByText(/ingresando cuit/i)).toBeInTheDocument();
    expect(screen.queryByText("Pérez, Juan Martín")).not.toBeInTheDocument();

    // 13 characters typed one by one, then the ARCA lookup.
    for (let i = 0; i < 14; i++) {
      act(() => {
        vi.advanceTimersByTime(300);
      });
    }
    expect(screen.getByText(/consultando padrón/i)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("20-12345678-6")).toBeInTheDocument();
    expect(screen.getByText("Pérez, Juan Martín")).toBeInTheDocument();
  });

  it("cycles on its own after holding a completed card", () => {
    vi.useFakeTimers();
    render(<CuitDemo />);
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(screen.getByText(/ingresando cuit/i)).toBeInTheDocument();
  });

  it("is labelled as a demo", () => {
    render(<CuitDemo />);
    expect(screen.getByText(/^demo$/i)).toBeInTheDocument();
  });
});
