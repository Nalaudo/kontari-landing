import { describe, it, expect } from "vitest";
import {
  CONTADORES_URL,
  CLIENTES_URL,
  LANDING_URL,
  CONTADORES_LOGIN_URL,
  CLIENTES_LOGIN_URL,
  contadoresLoginWithTier,
} from "./urls";

describe("lib/urls", () => {
  it("defaults point at the production kontari domains", () => {
    expect(CONTADORES_URL).toBe("https://contadores.kontari.com.ar");
    expect(CLIENTES_URL).toBe("https://clientes.kontari.com.ar");
    expect(LANDING_URL).toBe("https://kontari.com.ar");
  });

  it("has no trailing slash on any base URL", () => {
    for (const u of [CONTADORES_URL, CLIENTES_URL, LANDING_URL]) {
      expect(u.endsWith("/")).toBe(false);
    }
  });

  it("derives the login URLs from the base URLs", () => {
    expect(CONTADORES_LOGIN_URL).toBe(`${CONTADORES_URL}/auth/login`);
    expect(CLIENTES_LOGIN_URL).toBe(`${CLIENTES_URL}/auth/login`);
  });

  it("contadoresLoginWithTier appends an encoded tier query param", () => {
    expect(contadoresLoginWithTier("estudio")).toBe(
      `${CONTADORES_LOGIN_URL}?tier=estudio`,
    );
    expect(contadoresLoginWithTier("a b")).toContain("tier=a%20b");
  });
});
