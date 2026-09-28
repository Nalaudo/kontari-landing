import { useEffect, useRef, useState } from "react";
import { ArrowDown, Check, RefreshCw } from "lucide-react";
import Eyebrow from "./Eyebrow";
import {
  PBKDF2_ITERATIONS,
  deriveVaultKey,
  encryptSecret,
  hasWebCrypto,
  toHex,
  type DerivedKey,
} from "../lib/vaultDemo";

/** Stable first frame so the prerendered HTML and the client match on mount. */
const INITIAL_CIPHER = "9F3A1C7E42B0D6F8A15C3E9047BD62A1F8E0C4D7".padEnd(48, "0");

const POINTS = [
  {
    title: "Cifrado AES-256-GCM",
    desc: "Las claves fiscales se cifran en tu navegador antes de salir de tu equipo.",
  },
  {
    title: "PBKDF2 con 600.000 iteraciones",
    desc: "Derivación de claves robusta, resistente a ataques de fuerza bruta.",
  },
  {
    title: "Arquitectura zero-knowledge",
    desc: "Ni siquiera el equipo de Kontari puede leer las claves fiscales en texto plano.",
  },
  {
    title: "Doble factor (2FA)",
    desc: "Verificación en dos pasos con app de autenticación y códigos de respaldo para blindar el acceso a la bóveda.",
  },
  {
    title: "Sesiones y accesos controlados",
    desc: "Autenticación segura, rate-limiting y permisos granulares por rol de usuario, con registro de eventos de seguridad.",
  },
];

const STATS = [
  { value: "256-bit", label: "Cifrado", tone: "tone-emerald" },
  { value: `${PBKDF2_ITERATIONS / 1000}k`, label: "Iteraciones", tone: "tone-sky" },
  { value: "0", label: "Claves en texto plano", tone: "tone-amber" },
];

export default function Security() {
  const [plain, setPlain] = useState("MiClaveFiscal2026!");
  const [derived, setDerived] = useState<DerivedKey | null>(null);
  const [deriving, setDeriving] = useState(false);
  const [out, setOut] = useState({ iv: "", cipher: INITIAL_CIPHER });
  const alive = useRef(true);

  const derive = async () => {
    if (!hasWebCrypto()) return;
    setDeriving(true);
    try {
      const d = await deriveVaultKey();
      if (alive.current) setDerived(d);
    } finally {
      if (alive.current) setDeriving(false);
    }
  };

  useEffect(() => {
    alive.current = true;
    void derive();
    return () => {
      alive.current = false;
    };
  }, []);

  // Re-encrypt on every change (fresh IV each time), lightly debounced.
  useEffect(() => {
    if (!derived) return;
    const t = setTimeout(async () => {
      const res = await encryptSecret(derived.key, plain);
      if (alive.current) setOut(res);
    }, 120);
    return () => clearTimeout(t);
  }, [plain, derived]);

  return (
    <section id="seguridad" className="tone-emerald relative py-24 md:py-36 border-t border-line overflow-hidden">
      <div
        aria-hidden
        className="absolute top-1/4 right-[-12rem] w-[36rem] h-[36rem] rounded-full bg-emerald/12 blur-[140px]"
      />
      <div className="relative wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 reveal-up">
            <Eyebrow>Seguridad</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <h2 className="reveal-up display text-[clamp(2.2rem,4.6vw,4.25rem)]">
              Seguridad de nivel bancario para{" "}
              <em>tus datos más sensibles</em>
            </h2>
            <p className="reveal-up mt-6 text-lg text-muted max-w-2xl">
              Las claves fiscales de tus clientes son información crítica. Por
              eso las tratamos con arquitectura zero-knowledge.
            </p>
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <ul className="lg:col-span-5 border-t border-line">
            {POINTS.map(({ title, desc }) => (
              <li
                key={title}
                className="reveal-up group grid grid-cols-[2.5rem_1fr] gap-2 py-6 border-b border-line"
              >
                <span className="mt-0.5 w-7 h-7 rounded-full bg-emerald/12 text-emerald flex items-center justify-center transition-transform group-hover:scale-110">
                  <Check aria-hidden className="w-3.5 h-3.5" />
                </span>
                <div>
                  <p className="text-lg font-medium tracking-tight">{title}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="reveal-up lg:col-span-7 lg:sticky lg:top-24">
            <p className="mb-3 label-mono text-muted">
              Probalo: escribí algo y miralo cifrarse en tu navegador
            </p>
            <div className="rounded-xl border border-line-strong bg-panel overflow-hidden text-sm shadow-[0_40px_120px_-40px_rgb(0_0_0/0.45)]">
              <div className="flex items-center justify-between px-5 h-11 border-b border-line">
                <span className="label-mono text-emerald flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                  Cifrado en vivo
                </span>
                <span className="label-mono text-[10px] text-emerald border border-emerald/40 rounded px-1.5">
                  Web Crypto real
                </span>
              </div>
              <div className="p-5 sm:p-6 space-y-3">
                <label htmlFor="vault-demo" className="block label-mono text-muted">
                  Clave fiscal · texto plano (no uses una real)
                </label>
                <input
                  id="vault-demo"
                  value={plain}
                  onChange={(e) => setPlain(e.target.value)}
                  maxLength={64}
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full h-12 px-4 rounded-md border border-line-strong bg-bg font-mono tracking-wider outline-none focus:border-emerald focus:ring-4 focus:ring-emerald/15"
                />
                <div className="flex items-center gap-3 py-1 text-muted">
                  <span className="h-px flex-1 bg-line" />
                  <ArrowDown aria-hidden className="w-4 h-4 text-emerald" />
                  <span className="label-mono text-[10px]">
                    {deriving
                      ? "derivando clave…"
                      : derived
                        ? `PBKDF2 · ${derived.ms} ms en tu equipo`
                        : "AES-256-GCM · PBKDF2"}
                  </span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <p className="label-mono text-muted">Almacenado (AES-256-GCM)</p>
                <div
                  aria-live="polite"
                  className="min-h-12 rounded-md border border-emerald/40 bg-emerald/5 px-4 py-3 font-mono text-emerald break-all"
                >
                  {out.cipher}
                </div>
                <dl className="grid grid-cols-[3rem_1fr] gap-x-3 gap-y-1 font-mono text-[11px] text-muted">
                  <dt>sal</dt>
                  <dd className="truncate text-sky">{derived ? toHex(derived.salt) : "—"}</dd>
                  <dt>iv</dt>
                  <dd className="truncate text-amber">{out.iv || "—"}</dd>
                </dl>
                <button
                  type="button"
                  onClick={() => void derive()}
                  disabled={deriving}
                  className="inline-flex items-center gap-1.5 label-mono text-[10px] text-fg hover:text-emerald disabled:opacity-50"
                >
                  <RefreshCw aria-hidden className={`w-3 h-3 ${deriving ? "animate-spin" : ""}`} />
                  Nueva sal y derivar de nuevo
                </button>
              </div>
              <dl className="grid grid-cols-3 border-t border-line">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className={`${s.tone} flex flex-col-reverse px-4 py-5 border-r border-line last:border-r-0`}
                  >
                    <dt className="mt-1 text-[11px] text-muted leading-tight font-mono">{s.label}</dt>
                    <dd className="text-2xl font-medium tracking-tight text-sec">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
