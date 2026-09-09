import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCountUp } from "./useCountUp";

describe("useCountUp", () => {
  it("starts at 0 and exposes a ref plus formatted text", () => {
    const { result } = renderHook(() => useCountUp(500));
    expect(result.current.text).toBe("0");
    expect(result.current.ref).toBeTypeOf("object");
  });

  it("keeps the requested decimal precision in the initial text", () => {
    const { result } = renderHook(() => useCountUp(99.9, 1));
    expect(result.current.text).toBe("0.0");
  });
});
