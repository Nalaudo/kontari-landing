import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });

  it("reports the current theme from the <html> class", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
  });

  it("toggle flips the dark class and persists the choice", () => {
    const { result } = renderHook(() => useTheme());

    act(() => result.current.toggle());
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(result.current.theme).toBe("dark");
    expect(localStorage.getItem("kontari-landing-theme")).toBe("dark");

    act(() => result.current.toggle());
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("kontari-landing-theme")).toBe("light");
  });
});
