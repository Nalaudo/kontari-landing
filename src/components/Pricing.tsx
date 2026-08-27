import { Check, TrendingDown } from "lucide-react";
import TiltCard from "./TiltCard";
import CtaLink from "./CtaLink";

function FeatureItem({ children }: { children: string }) {
  return (
    <li className="flex items-center gap-2">
      <Check className="w-4 h-4 text-emerald-600" />
      {children}
    </li>
  );
}

const MONTHLY_FEATURES = [
  "Clientes sin límite estricto",
  "Autocompletado AFIP/ARCA",
  "Bóveda de claves cifradas",
  "Descargas ZIP masivas",
  "Hasta 3 usuarios de equipo",
  "Soporte por email",
];

const QUARTERLY_FEATURES = [
  "Todo lo del plan Mensual",
  "Importación de COE desde Excel",
  "Roles y permisos avanzados",
  "Soporte prioritario",
];

const STUDIO_FEATURES = [
  "Usuarios y permisos ilimitados",
  "Onboarding personalizado",
  "Soporte dedicado",
  "Acuerdos de nivel de servicio",
];

export default function Pricing() {
  return (
    <section id="precios" className="py-20 md:py-28 bg-white dark:bg-brand-900/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto reveal-up">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-300 uppercase tracking-widest">
            Precios
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Un precio simple, sin sorpresas
          </h2>
          <p className="mt-4 text-brand-950/60 dark:text-slate-400">
            Elegí el plan que se adapta a tu estudio. Cancelá cuando quieras.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
          {/* Mensual */}
          <TiltCard className="reveal-up rounded-3xl border border-brand-950/10 dark:border-white/10 bg-brand-50/40 dark:bg-white/[0.03] p-8 flex flex-col">
            <h3 className="font-bold text-lg">Mensual</h3>
            <p className="text-sm opacity-60 mt-1">Ideal para empezar</p>
            <div className="mt-6 flex items-end gap-1">
              <span className="text-4xl font-extrabold">$9.900</span>
              <span className="opacity-50 mb-1">ARS / mes</span>
            </div>
            <ul className="mt-8 space-y-3 text-sm flex-1">
              {MONTHLY_FEATURES.map((f) => (
                <FeatureItem key={f}>{f}</FeatureItem>
              ))}
            </ul>
            <CtaLink
              href="/checkout"
              className="mt-8 text-center bg-brand-950 dark:bg-white/10 hover:bg-brand-800 text-white font-semibold py-3.5 rounded-full transition"
            >
              Empezar prueba gratis
            </CtaLink>
          </TiltCard>

          {/* Trimestral (destacado) */}
          <TiltCard className="reveal-up relative glow-ring rounded-3xl border-2 border-brand-600 bg-white dark:bg-brand-950 p-8 flex flex-col lg:-translate-y-4">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
              Más elegido
            </span>
            <h3 className="font-bold text-lg">Trimestral</h3>
            <p className="text-sm opacity-60 mt-1">Ahorrá pagando por trimestre</p>
            <div className="mt-6 flex items-end gap-1">
              <span className="text-4xl font-extrabold">$24.900</span>
              <span className="opacity-50 mb-1">ARS / 3 meses</span>
            </div>
            <p className="mt-2 inline-flex w-fit items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full">
              <TrendingDown className="w-3.5 h-3.5" /> Ahorrás ~16% vs. mensual
            </p>
            <ul className="mt-6 space-y-3 text-sm flex-1">
              {QUARTERLY_FEATURES.map((f) => (
                <FeatureItem key={f}>{f}</FeatureItem>
              ))}
            </ul>
            <CtaLink
              href="/checkout"
              className="mt-8 text-center bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-full shadow-lg shadow-brand-600/30 transition"
            >
              Empezar prueba gratis
            </CtaLink>
          </TiltCard>

          {/* Estudio / Enterprise */}
          <TiltCard className="reveal-up rounded-3xl border border-brand-950/10 dark:border-white/10 bg-brand-50/40 dark:bg-white/[0.03] p-8 flex flex-col">
            <h3 className="font-bold text-lg">Estudio</h3>
            <p className="text-sm opacity-60 mt-1">
              Para estudios con equipos grandes
            </p>
            <div className="mt-6 flex items-end gap-1">
              <span className="text-4xl font-extrabold">A medida</span>
            </div>
            <ul className="mt-8 space-y-3 text-sm flex-1">
              {STUDIO_FEATURES.map((f) => (
                <FeatureItem key={f}>{f}</FeatureItem>
              ))}
            </ul>
            <a
              href="mailto:contacto@klientfy.com"
              className="mt-8 text-center border-2 border-brand-950/15 dark:border-white/20 hover:bg-brand-950/5 dark:hover:bg-white/10 font-semibold py-3.5 rounded-full transition"
            >
              Contactar ventas
            </a>
          </TiltCard>
        </div>

        <p className="reveal-up text-center text-sm opacity-50 mt-10">
          Todos los planes incluyen 7 días de prueba gratuita · Pagos seguros con
          Mercado Pago · Cancelá cuando quieras
        </p>
      </div>
    </section>
  );
}
