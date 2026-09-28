/**
 * CUIT/CUIL helpers for the landing's interactive demo. Pure client-side:
 * nothing is sent anywhere, it only checks the number's own structure.
 */

const WEIGHTS = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

/** Keeps up to 11 digits. */
export function cuitDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

/** "30712345671" → "30-71234567-1", also for partial input. */
export function formatCuit(value: string): string {
  const d = cuitDigits(value);
  if (d.length <= 2) return d;
  if (d.length <= 10) return `${d.slice(0, 2)}-${d.slice(2)}`;
  return `${d.slice(0, 2)}-${d.slice(2, 10)}-${d.slice(10)}`;
}

/** Expected check digit for the first 10 digits, or null when none is valid. */
export function checkDigit(first10: string): number | null {
  const sum = WEIGHTS.reduce((acc, w, i) => acc + w * Number(first10[i]), 0);
  const r = 11 - (sum % 11);
  if (r === 11) return 0;
  if (r === 10) return null;
  return r;
}

export type CuitCheck =
  | { status: "incomplete" }
  | { status: "invalid"; reason: string }
  | { status: "valid"; tipo: "Persona humana" | "Persona jurídica"; terminacion: number };

const HUMANA = ["20", "23", "24", "25", "26", "27"];
const JURIDICA = ["30", "33", "34"];

export function checkCuit(value: string): CuitCheck {
  const d = cuitDigits(value);
  if (d.length < 11) return { status: "incomplete" };
  const prefix = d.slice(0, 2);
  const tipo = HUMANA.includes(prefix)
    ? "Persona humana"
    : JURIDICA.includes(prefix)
      ? "Persona jurídica"
      : null;
  if (!tipo) return { status: "invalid", reason: `Prefijo ${prefix} no válido` };
  if (checkDigit(d.slice(0, 10)) !== Number(d[10])) {
    return { status: "invalid", reason: "Dígito verificador incorrecto" };
  }
  return { status: "valid", tipo, terminacion: Number(d[10]) };
}
