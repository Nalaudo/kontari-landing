import { describe, it, expect } from "vitest";
import { checkCuit, checkDigit, cuitDigits, formatCuit } from "./cuit";

describe("lib/cuit", () => {
  it("keeps at most 11 digits and formats partial input", () => {
    expect(cuitDigits("30-71.234 567-1xx9")).toBe("30712345671");
    expect(formatCuit("3")).toBe("3");
    expect(formatCuit("30712")).toBe("30-712");
    expect(formatCuit("30712345671")).toBe("30-71234567-1");
  });

  it("computes the modulo-11 check digit", () => {
    expect(checkDigit("3071234567")).toBe(1);
    expect(checkDigit("2012345678")).toBe(6);
  });

  it("classifies complete CUITs", () => {
    expect(checkCuit("30-7123")).toEqual({ status: "incomplete" });
    expect(checkCuit("30-71234567-1")).toEqual({
      status: "valid",
      tipo: "Persona jurídica",
      terminacion: 1,
    });
    expect(checkCuit("20-12345678-6")).toMatchObject({ tipo: "Persona humana" });
    expect(checkCuit("30-71234567-2")).toEqual({
      status: "invalid",
      reason: "Dígito verificador incorrecto",
    });
    expect(checkCuit("99-71234567-1")).toMatchObject({ status: "invalid" });
  });
});
