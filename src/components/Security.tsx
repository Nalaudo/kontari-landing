import { useEffect, useState } from "react";
import { ArrowDown, EyeOff, KeyRound, Lock, Shield, ShieldCheck } from "lucide-react";

const CIPHER_CHARS = "ABCDEF0123456789+/=";

function randomCipher(len: number) {
  let s = "";
  for (let i = 0; i < len; i++) {
    s += CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
  }
  return s;
}

const POINTS = [
  {
    icon: Lock,
    tone: "emerald" as const,
    title: "Cifrado AES-256-GCM",
    desc: "Las claves fiscales se cifran en tu navegador antes de salir de tu equipo.",
  },
  {
    icon: KeyRound,
    tone: "brand" as const,
    title: "PBKDF2 con 600.000 iteraciones",
    desc: "Derivación de claves robusta, resistente a ataques de fuerza bruta.",
  },
  {
    icon: EyeOff,
    tone: "emerald" as const,
    title: "Arquitectura zero-knowledge",
    desc: "Ni siquiera el equipo de Klientfy puede leer las claves fiscales en texto plano.",
  },
  {
    icon: ShieldCheck,
    tone: "brand" as const,
    title: "Sesiones y accesos controlados",
    desc: "Autenticación segura y permisos granulares por rol de usuario.",
  },
];

const TONE_CLASS = {
  brand:
    "w-10 h-10 rounded-xl bg-brand-600/10 text-brand-600 dark:text-brand-300 flex items-center justify-center shrink-0",
  emerald:
    "w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center shrink-0",
} as const;

export default function Security() {
  const [cipher, setCipher] = useState(() => randomCipher(48));

  useEffect(() => {
    const id = setInterval(() => setCipher(randomCipher(48)), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="seguridad" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="reveal-up order-2 lg:order-1">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-300 uppercase tracking-widest">
            Seguridad
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Seguridad de nivel bancario para tus datos más sensibles
          </h2>
          <p className="mt-4 text-brand-950/60 dark:text-slate-400">
            Las claves fiscales de tus clientes son información crítica. Por eso
            las tratamos con arquitectura zero-knowledge.
          </p>

          <ul className="mt-8 space-y-5">
            {POINTS.map(({ icon: Icon, tone, title, desc }) => (
              <li key={title} className="flex items-start gap-4">
                <div className={TONE_CLASS[tone]}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm opacity-60">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal-up order-1 lg:order-2 relative">
          <div className="absolute -inset-6 bg-gradient-to-tr from-emerald-400/20 to-brand-500/20 blur-2xl rounded-[2rem]" />
          <div className="relative rounded-2xl border border-brand-950/10 dark:border-white/10 bg-brand-950 text-white p-8 shadow-2xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
              <Shield className="w-4 h-4" /> Cifrado en vivo
            </div>
            <div className="mt-6 space-y-3 encrypt-cell text-sm">
              <div className="flex items-center justify-between opacity-60">
                <span>Clave fiscal (texto plano)</span>
              </div>
              <div className="rounded-lg bg-white/5 px-4 py-3 tracking-widest">
                MiClaveFiscal2026!
              </div>
              <div className="flex justify-center py-1">
                <ArrowDown className="w-4 h-4 text-emerald-400 animate-bounce" />
              </div>
              <div className="flex items-center justify-between opacity-60">
                <span>Almacenado (AES-256-GCM)</span>
              </div>
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-emerald-300 break-all">
                {cipher}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xl font-bold">256-bit</p>
                <p className="text-[11px] opacity-50 mt-1">Cifrado</p>
              </div>
              <div>
                <p className="text-xl font-bold">600k</p>
                <p className="text-[11px] opacity-50 mt-1">Iteraciones</p>
              </div>
              <div>
                <p className="text-xl font-bold">0</p>
                <p className="text-[11px] opacity-50 mt-1">
                  Claves en texto plano
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
