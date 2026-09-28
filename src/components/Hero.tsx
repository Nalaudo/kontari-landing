import { ArrowDownRight, ArrowRight } from "lucide-react";
import CtaLink from "./CtaLink";
import CuitDemo from "./CuitDemo";
import { CONTADORES_LOGIN_URL } from "../lib/urls";

const FACTS = [
  { value: "AES-256", label: "Claves fiscales cifradas" },
  { value: "ARCA", label: "Integración con AFIP/ARCA" },
  { value: "IA", label: "Asistente integrado" },
  { value: "14 días", label: "De prueba gratis" },
];

export default function Hero() {
  return (
    <section
      id="producto"
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden"
    >
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
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] w-[46rem] h-[46rem] rounded-full bg-accent/15 blur-[140px]"
      />

      <div className="relative wrap">
        <div className="reveal-up flex flex-wrap items-center gap-x-4 gap-y-2 label-mono text-muted">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-pos" />
            Hecho por y para contadores argentinos
          </span>
          <span aria-hidden className="hidden sm:block h-px w-10 bg-line-strong" />
          <span className="hidden sm:block">Software de gestión · Estudios contables</span>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">
          <div className="lg:col-span-7">
            <h1 className="reveal-up display text-[clamp(2.9rem,7vw,6.6rem)]">
              El software de gestión para tu <em>estudio contable</em>
            </h1>

            <p className="reveal-up mt-8 text-lg md:text-xl leading-relaxed text-muted max-w-xl">
              Kontari centraliza clientes, AFIP/ARCA, claves fiscales, IVA,
              contabilidad, honorarios, tareas y documentación en una sola
              plataforma, con un <span className="text-fg">asistente de IA</span>{" "}
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
              className="flex flex-col-reverse border-r border-b border-line px-5 py-5"
            >
              <dt className="mt-1 label-mono text-muted">{f.label}</dt>
              <dd className="text-3xl md:text-4xl font-medium tracking-tight">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
