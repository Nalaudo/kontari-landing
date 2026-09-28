import { describe, it, expect, vi, afterEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import CuitDemo from "./CuitDemo";

afterEach(() => vi.useRealTimers());

const input = () => screen.getByLabelText(/cuit del cliente/i) as HTMLInputElement;

describe("<CuitDemo>", () => {
  it("renders the first contribuyente fully autocompleted (stable for prerender)", () => {
    render(<CuitDemo />);
    expect(input().value).toBe("30-71234567-1");
    expect(screen.getByText("Panadería La Espiga SRL")).toBeInTheDocument();
    expect(screen.getByText(/ficha creada/i)).toBeInTheDocument();
  });

  it("types a sample contribuyente when its chip is picked", () => {
    vi.useFakeTimers();
    render(<CuitDemo />);
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /juan pérez/i }));
    });
    expect(screen.getByText(/ingresando cuit/i)).toBeInTheDocument();
    for (let i = 0; i < 14; i++) {
      act(() => {
        vi.advanceTimersByTime(300);
      });
    }
    expect(screen.getByText(/consultando padrón/i)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(input().value).toBe("20-12345678-6");
    expect(screen.getByText("Pérez, Juan Martín")).toBeInTheDocument();
  });

  it("formats and validates what the visitor types", () => {
    vi.useFakeTimers();
    render(<CuitDemo />);
    fireEvent.change(input(), { target: { value: "3071234" } });
    expect(input().value).toBe("30-71234");
    expect(screen.getByText(/faltan 4 dígitos/i)).toBeInTheDocument();

    fireEvent.change(input(), { target: { value: "30712345672" } });
    expect(input()).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(/dígito verificador incorrecto/i)).toBeInTheDocument();
  });

  it("accepts any valid CUIT without inventing its data", () => {
    vi.useFakeTimers();
    render(<CuitDemo />);
    fireEvent.change(input(), { target: { value: "20123456794" } });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("Persona humana")).toBeInTheDocument();
    expect(screen.getAllByText(/se completa desde arca en la app/i).length).toBe(2);
    expect(screen.getByText(/cuit válido/i)).toBeInTheDocument();
  });

  it("cycles on its own until the visitor interacts", () => {
    vi.useFakeTimers();
    render(<CuitDemo />);
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(screen.getByText(/ingresando cuit/i)).toBeInTheDocument();
  });

  it("stops autoplay once the input is focused", () => {
    vi.useFakeTimers();
    render(<CuitDemo />);
    fireEvent.focus(input());
    act(() => {
      vi.advanceTimersByTime(12000);
    });
    expect(input().value).toBe("30-71234567-1");
  });
});
