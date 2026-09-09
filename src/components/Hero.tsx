import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Link,
  PlayCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Counter from "./Counter";
import CtaLink from "./CtaLink";
import { CONTADORES_LOGIN_URL } from "../lib/urls";

export default function Hero() {
  return (
    <section
      id="producto"
      className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-grid"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
      <div className="absolute top-10 -left-24 w-96 h-96 bg-brand-400/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-40 -right-10 w-96 h-96 bg-emerald-400/25 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-brand-300/20 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="reveal-up inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-600/10 text-brand-700 dark:bg-white/10 dark:text-brand-200 border border-brand-600/20">
            <Sparkles className="w-3.5 h-3.5" />
            Hecho por y para contadores argentinos
          </div>

          <h1 className="reveal-up mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight">
            El software de gestión para tu{" "}
            <span className="gradient-text">estudio contable</span>
          </h1>

          <p className="reveal-up mt-6 text-lg text-brand-950/70 dark:text-slate-300 max-w-xl">
            Kontari centraliza clientes, AFIP/ARCA, claves fiscales, IVA,
            contabilidad, honorarios, tareas y documentación de tu estudio
            contable en una sola plataforma, con un{" "}
            <span className="font-semibold text-brand-700 dark:text-brand-200">
              asistente de IA
            </span>{" "}
            que responde sobre tu cartera, lee tus documentos y redacta por vos.
          </p>

          <div className="reveal-up mt-9 flex flex-wrap items-center gap-4">
            <CtaLink
              href={CONTADORES_LOGIN_URL}
              className="group inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-full shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 hover:-translate-y-0.5 transition-all"
            >
              Empezar prueba gratis de 14 días
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </CtaLink>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-full border border-brand-950/15 dark:border-white/20 hover:bg-brand-950/5 dark:hover:bg-white/10 transition"
            >
              <PlayCircle className="w-4 h-4" />
              Ver cómo funciona
            </a>
          </div>

          <div className="reveal-up mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-brand-950/60 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Claves fiscales cifradas AES-256
            </div>
            <div className="flex items-center gap-2">
              <Link className="w-4 h-4 text-emerald-600" />
              Integrado con AFIP/ARCA
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Asistente de IA integrado
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              Pagos con Mercado Pago
            </div>
          </div>
        </div>

        {/* Hero mock dashboard */}
        <div className="reveal-up relative">
          <div className="absolute -inset-6 bg-gradient-to-tr from-brand-500/20 to-emerald-400/20 blur-2xl rounded-[2rem]" />
          <div className="relative rounded-2xl border border-brand-950/10 dark:border-white/10 bg-white/90 dark:bg-brand-900/60 backdrop-blur-xl shadow-2xl overflow-hidden animate-float">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-brand-950/10 dark:border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs opacity-50 font-mono">
                contadores.kontari.com.ar
              </span>
            </div>
            <div className="p-5 grid grid-cols-2 gap-3">
              <div className="col-span-2 grid grid-cols-4 gap-3">
                <div className="rounded-xl bg-brand-50 dark:bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-wide opacity-50">
                    Clientes
                  </p>
                  <p className="text-xl font-bold mt-1">
                    <Counter target={128} />
                  </p>
                </div>
                <div className="rounded-xl bg-brand-50 dark:bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-wide opacity-50">
                    Pendientes
                  </p>
                  <p className="text-xl font-bold mt-1">
                    <Counter target={9} />
                  </p>
                </div>
                <div className="rounded-xl bg-brand-50 dark:bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-wide opacity-50">
                    Vencimientos
                  </p>
                  <p className="text-xl font-bold mt-1">
                    <Counter target={4} />
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-500/10 p-3">
                  <p className="text-[10px] uppercase tracking-wide opacity-50">
                    Ingresos
                  </p>
                  <p className="text-xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">
                    $1.2M
                  </p>
                </div>
              </div>
              <div className="col-span-2 rounded-xl border border-brand-950/10 dark:border-white/10 p-4">
                <div className="flex items-end gap-2 h-24">
                  <div
                    className="w-full bg-gradient-to-t from-brand-500 to-brand-300 rounded-md animate-[float_5s_ease-in-out_infinite]"
                    style={{ height: "40%" }}
                  />
                  <div
                    className="w-full bg-gradient-to-t from-brand-500 to-brand-300 rounded-md"
                    style={{ height: "65%" }}
                  />
                  <div
                    className="w-full bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-md"
                    style={{ height: "50%" }}
                  />
                  <div
                    className="w-full bg-gradient-to-t from-brand-500 to-brand-300 rounded-md"
                    style={{ height: "85%" }}
                  />
                  <div
                    className="w-full bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-md"
                    style={{ height: "70%" }}
                  />
                  <div
                    className="w-full bg-gradient-to-t from-brand-500 to-brand-300 rounded-md"
                    style={{ height: "95%" }}
                  />
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-between rounded-xl bg-brand-50 dark:bg-white/5 p-3 text-xs">
                <span className="flex items-center gap-2 font-medium">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                  CUIT 30-71234567-9 verificado en AFIP/ARCA
                </span>
                <span className="opacity-50">hace 2s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
