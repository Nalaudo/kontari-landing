import { ArrowRight } from "lucide-react";
import CtaLink from "./CtaLink";
import { CONTADORES_LOGIN_URL } from "../lib/urls";

export default function FinalCta() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="reveal-up relative overflow-hidden rounded-3xl bg-brand-950 px-8 py-16 md:py-20 text-center">
          <div className="absolute top-0 left-0 w-72 h-72 bg-brand-500/30 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-500/25 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Empezá a ordenar tu estudio hoy
            </h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">
              Sumate a los estudios contables que ya digitalizaron su gestión con
              Kontari.
            </p>
            <CtaLink
              href={CONTADORES_LOGIN_URL}
              className="mt-8 inline-flex items-center gap-2 bg-white text-brand-950 font-bold px-7 py-4 rounded-full hover:-translate-y-0.5 hover:shadow-2xl transition-all"
            >
              Empezar prueba gratis de 14 días
              <ArrowRight className="w-4 h-4" />
            </CtaLink>
            <p className="mt-4 text-xs text-white/40">
              14 días gratis · Sin permanencia · Pagos con Mercado Pago
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
