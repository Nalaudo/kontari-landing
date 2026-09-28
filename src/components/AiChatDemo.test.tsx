import { describe, it, expect, vi, afterEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import AiChatDemo from "./AiChatDemo";

afterEach(() => vi.useRealTimers());

describe("<AiChatDemo>", () => {
  it("starts with a finished example exchange", () => {
    render(<AiChatDemo />);
    expect(screen.getByText(/tenés 3 vencimientos de iva/i)).toBeInTheDocument();
  });

  it("answers a suggestion after a short 'typing' pause", () => {
    vi.useFakeTimers();
    render(<AiChatDemo />);
    fireEvent.click(screen.getByRole("button", { name: /leé la factura/i }));
    expect(screen.getByText(/el asistente está escribiendo/i)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("factura_0003.pdf")).toBeInTheDocument();
  });

  it("never acts without confirmation: the action card waits for a click", () => {
    vi.useFakeTimers();
    render(<AiChatDemo />);
    fireEvent.click(screen.getByRole("button", { name: /creá una tarea/i }));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/requiere tu confirmación/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /^confirmar$/i }));
    expect(screen.getByText(/tarea creada/i)).toBeInTheDocument();
  });

  it("routes free text to a scripted answer", () => {
    vi.useFakeTimers();
    render(<AiChatDemo />);
    fireEvent.change(screen.getByLabelText(/escribí tu consulta/i), {
      target: { value: "hola, ¿qué tal?" },
    });
    fireEvent.click(screen.getByRole("button", { name: /enviar consulta/i }));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/en esta demo respondo con datos de ejemplo/i)).toBeInTheDocument();
  });
});
