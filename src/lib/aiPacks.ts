/**
 * Lecturas de documentos con IA: cupo mensual de cada plan y packs adicionales.
 * Espejo de `contadores/src/lib/ai/lecturas.ts` (la fuente de verdad): si cambian
 * allá, actualizar acá.
 */

export const LECTURAS_POR_MES = {
  solo: 500,
  estudio: 2000,
  portal: 5000,
} as const;

export type AiPack = { id: string; units: number; price: number };

export const AI_PACKS: AiPack[] = [
  { id: "pack-500", units: 500, price: 5000 },
  { id: "pack-1000", units: 1000, price: 9000 },
  { id: "pack-3000", units: 3000, price: 24000 },
];

export function lecturasLabel(n: number) {
  return `${n.toLocaleString("es-AR")} lecturas de documentos con IA por mes`;
}
