import { describe, it, expect } from "vitest";
import { PBKDF2_ITERATIONS, deriveVaultKey, encryptSecret, hasWebCrypto, toHex } from "./vaultDemo";

describe("lib/vaultDemo", () => {
  it("hex-encodes bytes", () => {
    expect(toHex(new Uint8Array([0, 15, 255]))).toBe("000fff");
  });

  it("uses the iteration count the landing advertises", () => {
    expect(PBKDF2_ITERATIONS).toBe(600_000);
  });

  it.runIf(hasWebCrypto())(
    "derives an AES-GCM key and encrypts with a fresh IV every time",
    async () => {
      const { key, salt, ms } = await deriveVaultKey();
      expect(salt).toHaveLength(16);
      expect(ms).toBeGreaterThanOrEqual(0);
      const a = await encryptSecret(key, "MiClaveFiscal2026!");
      const b = await encryptSecret(key, "MiClaveFiscal2026!");
      expect(a.iv).toMatch(/^[0-9a-f]{24}$/);
      expect(a.iv).not.toBe(b.iv);
      expect(a.cipher).not.toBe(b.cipher);
      // 18 bytes of plaintext + 16-byte GCM tag, base64-encoded.
      expect(atob(a.cipher)).toHaveLength(34);
    },
    20_000,
  );
});
