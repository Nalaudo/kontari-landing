import { ArrowRight } from "lucide-react";
import CtaLink from "./CtaLink";
import { CONTADORES_LOGIN_URL } from "../lib/urls";

export default function FinalCta() {
  return (
    <section className="relative py-28 md:py-44 border-t border-line overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-ledger"
        style={{
          maskImage: "radial-gradient(ellipse 60% 70% at 50% 100%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 70% at 50% 100%, black, transparent 75%)",
        }}
      />
      <div aria-hidden className="absolute inset-x-0 bottom-[-16rem] h-[34rem] pointer-events-none">
        <div className="absolute left-[8%] w-[30rem] h-[30rem] rounded-full bg-indigo/25 blur-[130px]" />
        <div className="absolute left-[35%] w-[30rem] h-[30rem] rounded-full bg-violet/20 blur-[130px]" />
        <div className="absolute right-[8%] w-[30rem] h-[30rem] rounded-full bg-amber/20 blur-[130px]" />
      </div>
      <div className="relative wrap text-center">
        <h2 className="reveal-up display text-[clamp(3rem,8.5vw,8rem)] max-w-5xl mx-auto">
          Empezá a ordenar tu estudio <em className="ink-gradient">hoy</em>
        </h2>
        <p className="reveal-up mt-8 text-lg md:text-xl text-muted max-w-xl mx-auto">
          Sumate a los estudios contables que ya digitalizaron su gestión con
          Kontari.
        </p>
        <div className="reveal-up mt-10 flex justify-center">
          <CtaLink href={CONTADORES_LOGIN_URL} className="btn btn-accent h-14 px-7 text-base">
            Empezar prueba gratis de 14 días
            <ArrowRight className="w-4 h-4" />
          </CtaLink>
        </div>
        <p className="reveal-up mt-6 label-mono text-muted">
          14 días gratis · Sin permanencia · Pagos con Mercado Pago
        </p>
      </div>
    </section>
  );
}
