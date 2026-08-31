/**
 * URLs oficiales de las apps de Kontari.
 *
 * La landing (kontari.com.ar) es un sitio estático sin backend: todos los
 * botones de "Empezar" / "Ingresar" redirigen al panel de contadores, y los
 * accesos directos van a cada app por su subdominio.
 *
 * Se pueden pisar en build con variables VITE_* (útil para previews/staging).
 */

const stripSlash = (url: string) => url.replace(/\/$/, "");

/** Panel de contadores. */
export const CONTADORES_URL = stripSlash(
  import.meta.env.VITE_CONTADORES_URL ?? "https://contadores.kontari.com.ar",
);

/** Portal de clientes. */
export const CLIENTES_URL = stripSlash(
  import.meta.env.VITE_CLIENTES_URL ?? "https://clientes.kontari.com.ar",
);

/** Landing principal. */
export const LANDING_URL = stripSlash(
  import.meta.env.VITE_LANDING_URL ?? "https://kontari.com.ar",
);

/** Alta / login del panel de contadores (destino de todos los CTA). */
export const CONTADORES_LOGIN_URL = `${CONTADORES_URL}/auth/login`;

/** Login del portal de clientes. */
export const CLIENTES_LOGIN_URL = `${CLIENTES_URL}/auth/login`;

/** Igual que {@link CONTADORES_LOGIN_URL} pero preseleccionando un plan. */
export const contadoresLoginWithTier = (tier: string) =>
  `${CONTADORES_LOGIN_URL}?tier=${encodeURIComponent(tier)}`;
