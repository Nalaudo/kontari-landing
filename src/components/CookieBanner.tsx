import { useEffect, useState } from "react";

const STORAGE_KEY = "kontari-cookie-consent";
const CONSENT_VERSION = "1";

/**
 * Aviso de cookies para la landing. Kontari sólo usa cookies técnicas necesarias
 * (preferencia de tema y de este aviso), por lo que el banner es informativo y no
 * bloquea la navegación ni carga scripts de terceros.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored || !stored.startsWith(`v${CONSENT_VERSION}`)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, `v${CONSENT_VERSION}:${Date.now()}`);
    } catch {
      /* almacenamiento no disponible */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[999] p-3 sm:p-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-lg border border-line-strong bg-panel/95 p-4 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-muted">
          Usamos <strong className="font-medium text-fg">cookies técnicas necesarias</strong> para recordar tus
          preferencias y mantener la seguridad. No usamos cookies de analítica ni
          de publicidad.{" "}
          <a
            href="/legal/cookies.html"
            className="text-fg underline underline-offset-4 decoration-line-strong hover:decoration-accent"
          >
            Leer la política de cookies completa
          </a>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="btn btn-solid btn-sm shrink-0"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
