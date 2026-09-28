/**
 * Real, in-browser version of what the Kontari vault does, for the landing's
 * security demo: derive a key with PBKDF2 (600.000 iterations) and encrypt with
 * AES-256-GCM using a fresh IV per secret. Nothing leaves the browser.
 */

export const PBKDF2_ITERATIONS = 600_000;

/** Stand-in for the studio's master password; the demo never asks for a real one. */
const DEMO_MASTER = "clave-maestra-de-demo";

const toBase64 = (buf: ArrayBuffer | Uint8Array) => {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = "";
  bytes.forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s);
};

export const toHex = (bytes: Uint8Array) =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");

export const hasWebCrypto = () =>
  typeof globalThis.crypto !== "undefined" && !!globalThis.crypto.subtle;

export type DerivedKey = { key: CryptoKey; salt: Uint8Array; ms: number };

/** Derives the AES key from the demo master password with a random salt. */
export async function deriveVaultKey(): Promise<DerivedKey> {
  const { subtle } = globalThis.crypto;
  const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
  const start = performance.now();
  const base = await subtle.importKey(
    "raw",
    new TextEncoder().encode(DEMO_MASTER),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  const key = await subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"],
  );
  return { key, salt, ms: Math.round(performance.now() - start) };
}

/** Encrypts `plain` with a fresh 96-bit IV; returns IV and ciphertext. */
export async function encryptSecret(key: CryptoKey, plain: string) {
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
  const ct = await globalThis.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plain),
  );
  return { iv: toHex(iv), cipher: toBase64(ct) };
}
