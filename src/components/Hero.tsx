import { ArrowDownRight, ArrowRight } from "lucide-react";
import CtaLink from "./CtaLink";
import CuitDemo from "./CuitDemo";
import { CONTADORES_LOGIN_URL } from "../lib/urls";

const FACTS = [
  { value: "AES-256", label: "Claves fiscales cifradas", tone: "tone-emerald" },
  { value: "ARCA", label: "Integración con AFIP/ARCA", tone: "tone-indigo" },
  { value: "IA", label: "Asistente integrado", tone: "tone-violet" },
  { value: "14 días", label: "De prueba gratis", tone: "tone-amber" },
];

/** Lo que Kontari ordena (todo mencionado en la landing); cinta de colores. */
const TICKER = [
  ["Libro IVA Digital", "tone-amber"],
  ["Liquidación F2051", "tone-indigo"],
  ["SICORE", "tone-coral"],
  ["Monotributo", "tone-violet"],
  ["Mis Comprobantes", "tone-sky"],
  ["Facturación ARCA", "tone-emerald"],
  ["Claves fiscales", "tone-amber"],
  ["Honorarios", "tone-indigo"],
  ["Mercado Pago", "tone-sky"],
  ["Firma electrónica", "tone-violet"],
  ["Vencimientos", "tone-coral"],
  ["Asientos contables", "tone-emerald"],
] as const;

export default function Hero() {
  return (
    <section id="producto" className="tone-indigo relative pt-28 md:pt-36 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-ledger"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 70% 30%, black 10%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 70% 30%, black 10%, transparent 75%)",
        }}
      />
      {/* Colour field */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-48 right-[-8%] w-[38rem] h-[38rem] rounded-full bg-indigo/25 blur-[130px]" />
        <div className="absolute top-40 right-[22%] w-[26rem] h-[26rem] rounded-full bg-violet/20 blur-[120px]" />
        <div className="absolute top-[28rem] -left-40 w-[30rem] h-[30rem] rounded-full bg-amber/15 blur-[130px]" />
        <div className="absolute top-[36rem] right-[-6rem] w-[22rem] h-[22rem] rounded-full bg-emerald/15 blur-[120px]" />
      </div>

      <div className="relative wrap">
        <div className="reveal-up flex flex-wrap items-center gap-x-4 gap-y-2 label-mono text-muted">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald shadow-[0_0_10px_var(--k-emerald)]" />
            Hecho por y para contadores argentinos
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">
          <div className="lg:col-span-7">
            <h1 className="reveal-up display text-[clamp(2.9rem,7vw,6.6rem)]">
              El software de gestión para tu <em className="ink-gradient">estudio contable</em>
            </h1>

            <p className="reveal-up mt-8 text-lg md:text-xl leading-relaxed text-muted max-w-xl">
              Kontari centraliza clientes, AFIP/ARCA, claves fiscales, IVA,
              contabilidad, honorarios, tareas y documentación en una sola
              plataforma, con un <span className="text-violet">asistente de IA</span>{" "}
              que responde sobre tu cartera, lee tus documentos y redacta por
              vos.
            </p>

            <div className="reveal-up mt-10 flex flex-wrap items-center gap-3">
              <CtaLink href={CONTADORES_LOGIN_URL} className="btn btn-accent">
                Empezar prueba gratis de 14 días
                <ArrowRight className="w-4 h-4" />
              </CtaLink>
              <a href="#como-funciona" className="btn btn-ghost">
                Ver cómo funciona
                <ArrowDownRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="reveal-up lg:col-span-5">
            <CuitDemo />
          </div>
        </div>

        <dl className="reveal-up mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
          {FACTS.map((f) => (
            <div
              key={f.label}
              className={`${f.tone} group relative flex flex-col-reverse border-r border-b border-line px-5 py-5 overflow-hidden`}
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-[2px] w-10 bg-sec transition-all duration-500 group-hover:w-full"
              />
              <dt className="mt-1 label-mono text-muted">{f.label}</dt>
              <dd className="text-3xl md:text-4xl font-medium tracking-tight text-sec">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Ticker of what Kontari keeps in order; pauses on hover. */}
      <div className="marquee relative mt-16 md:mt-20 border-y border-line overflow-hidden py-4">
        <div className="marquee-track flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0">
              {TICKER.map(([name, tone]) => (
                <li
                  key={name}
                  className={`${tone} flex items-center gap-3 px-6 text-xl md:text-2xl font-medium tracking-tight whitespace-nowrap`}
                >
                  <span aria-hidden className="w-2.5 h-2.5 rounded-full bg-sec" />
                  <span className="hover:text-sec transition-colors">{name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
