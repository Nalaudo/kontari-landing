import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import Eyebrow from "./Eyebrow";

const CIPHER_CHARS = "ABCDEF0123456789+/=";

/** Stable first frame so the prerendered HTML and the client match on mount. */
const INITIAL_CIPHER = "9F3A1C7E42B0D6F8A15C3E9047BD62A1F8E0C4D7"
  .padEnd(48, "0")
  .slice(0, 48);

function randomCipher(len: number) {
  let s = "";
  for (let i = 0; i < len; i++) {
    s += CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
  }
  return s;
}

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
  { value: "256-bit", label: "Cifrado" },
  { value: "600k", label: "Iteraciones" },
  { value: "0", label: "Claves en texto plano" },
];

export default function Security() {
  const [cipher, setCipher] = useState(INITIAL_CIPHER);

  useEffect(() => {
    setCipher(randomCipher(48));
    const id = setInterval(() => setCipher(randomCipher(48)), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="seguridad" className="py-24 md:py-36 border-t border-line">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 reveal-up">
            <Eyebrow n="04">Seguridad</Eyebrow>
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
          <ul className="lg:col-span-6 border-t border-line">
            {POINTS.map(({ title, desc }, i) => (
              <li
                key={title}
                className="reveal-up grid grid-cols-[3rem_1fr] gap-2 py-6 border-b border-line"
              >
                <span className="font-mono text-xs text-muted tabular-nums pt-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-lg font-medium tracking-tight">{title}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="reveal-up lg:col-span-6 lg:sticky lg:top-28">
            <div className="rounded-xl border border-line-strong bg-panel overflow-hidden font-mono text-sm shadow-[0_40px_120px_-40px_rgb(0_0_0/0.45)]">
              <div className="flex items-center justify-between px-5 h-11 border-b border-line">
                <span className="label-mono text-pos flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pos animate-pulse" />
                  Cifrado en vivo
                </span>
                <span className="label-mono text-muted">bóveda / claves</span>
              </div>
              <div className="p-5 sm:p-6 space-y-3">
                <p className="label-mono text-muted">Clave fiscal · texto plano</p>
                <div className="rounded-md border border-line bg-bg px-4 py-3 tracking-widest">
                  MiClaveFiscal2026!
                </div>
                <div className="flex items-center gap-3 py-1 text-muted">
                  <span className="h-px flex-1 bg-line" />
                  <ArrowDown aria-hidden className="w-4 h-4 text-accent" />
                  <span className="label-mono">AES-256-GCM · PBKDF2</span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <p className="label-mono text-muted">Almacenado (AES-256-GCM)</p>
                <div className="rounded-md border border-accent/40 bg-accent/5 px-4 py-3 text-accent break-all">
                  {cipher}
                </div>
              </div>
              <dl className="grid grid-cols-3 border-t border-line">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col-reverse px-4 py-5 border-r border-line last:border-r-0"
                  >
                    <dt className="mt-1 text-[11px] text-muted leading-tight">{s.label}</dt>
                    <dd className="font-sans text-2xl font-medium tracking-tight">{s.value}</dd>
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
