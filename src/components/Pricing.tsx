import { useState } from "react";
import { Check, TrendingDown } from "lucide-react";
import TiltCard from "./TiltCard";
import CtaLink from "./CtaLink";
import { contadoresLoginWithTier } from "../lib/urls";

type Cycle = "monthly" | "quarterly" | "yearly";

const CYCLE_MONTHS: Record<Cycle, number> = { monthly: 1, quarterly: 3, yearly: 12 };
const CYCLE_LABEL: Record<Cycle, string> = {
  monthly: "Mensual",
  quarterly: "Trimestral",
  yearly: "Anual",
};

type Tier = {
  key: string;
  name: string;
  tagline: string;
  monthly: number;
  quarterly: number;
  yearly: number;
  featured?: boolean;
  badge?: string;
  features: string[];
};

const TIERS: Tier[] = [
  {
    key: "solo",
    name: "Solo",
    tagline: "Para el contador que gestiona su propia cartera",
    monthly: 20000,
    quarterly: 57000,
    yearly: 200000,
    features: [
      "Cartera de clientes sin límite estricto",
      "Autocompletado AFIP/ARCA por CUIT",
      "Bóveda de claves fiscales cifradas",
      "Impuestos y vencimientos por cliente",
      "Libro IVA Digital, liquidación (F2051) y retenciones SICORE",
      "Contabilidad: diario, mayor, balances y cierre de ejercicio",
      "Facturación electrónica ARCA con CAE + honorarios con cobro online",
      "Tareas, plantillas recurrentes y calendario",
      "Documentos por cliente, vinculados a tareas e impuestos",
      "Firma electrónica de documentos",
      "Asistente de IA integrado (opt-in)",
      "Reportes de productividad y rentabilidad",
      "1 profesional",
    ],
  },
  {
    key: "estudio",
    name: "Estudio",
    tagline: "Para estudios que trabajan en equipo",
    monthly: 36000,
    quarterly: 102600,
    yearly: 360000,
    featured: true,
    badge: "Más elegido",
    features: [
      "Todo lo del plan Solo",
      "Hasta 3 profesionales con roles y permisos",
      "Organigrama: áreas, seniority y supervisores",
      "Registro de tiempos y tablero de capacidad",
      "Chat interno del equipo",
      "Catálogo de servicios y honorarios",
      "Campañas y comunicaciones a clientes",
    ],
  },
  {
    key: "portal",
    name: "Portal",
    tagline: "Sumá a tus clientes a la plataforma",
    monthly: 58000,
    quarterly: 165000,
    yearly: 580000,
    features: [
      "Todo lo del plan Estudio",
      "Profesionales ilimitados con roles y permisos",
      "App propia para tus clientes",
      "Chat con cada cliente",
      "Tus clientes suben documentación y ven sus vencimientos",
      "Reuniones con videollamada + feed de calendario iCal",
      "Onboarding de clientes guiado",
    ],
  },
];

function ars(n: number) {
  return `$${n.toLocaleString("es-AR")}`;
}

function priceFor(t: Tier, c: Cycle) {
  return c === "monthly" ? t.monthly : c === "quarterly" ? t.quarterly : t.yearly;
}

function savingPct(t: Tier, c: Cycle) {
  if (c === "monthly") return 0;
  return Math.round((1 - priceFor(t, c) / (t.monthly * CYCLE_MONTHS[c])) * 100);
}

function FeatureItem({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
      {children}
    </li>
  );
}

export default function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <section id="precios" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto reveal-up">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-300 uppercase tracking-widest">
            Precios
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Tres planes, según cómo trabaja tu estudio
          </h2>
          <p className="mt-4 text-brand-950/60 dark:text-slate-400">
            Empezás con 14 días de prueba gratis. Cancelá cuando quieras.
          </p>
        </div>

        {/* Toggle mensual / trimestral */}
        <div className="mt-10 flex justify-center reveal-up">
          <div className="inline-flex rounded-full border border-brand-950/10 dark:border-white/10 bg-brand-50/60 dark:bg-white/[0.04] p-1">
            {(["monthly", "quarterly", "yearly"] as Cycle[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCycle(c)}
                aria-pressed={cycle === c}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  cycle === c
                    ? "bg-brand-600 text-white shadow"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {CYCLE_LABEL[c]}
                {c !== "monthly" && (
                  <span className="ml-1.5 text-xs font-bold text-emerald-500">
                    −{savingPct(TIERS[1], c)}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
          {TIERS.map((t) => {
            const price = priceFor(t, cycle);
            const perMonth = Math.round(price / CYCLE_MONTHS[cycle]);

            const cardClass = t.featured
              ? "reveal-up relative glow-ring rounded-3xl border-2 border-brand-600 bg-white dark:bg-brand-950 p-8 flex flex-col lg:-translate-y-4"
              : "reveal-up rounded-3xl border border-brand-950/10 dark:border-white/10 bg-brand-50/40 dark:bg-white/[0.03] p-8 flex flex-col";

            const ctaClass = t.featured
              ? "mt-8 text-center bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-full shadow-lg shadow-brand-600/30 transition"
              : "mt-8 text-center bg-brand-950 dark:bg-white/10 hover:bg-brand-800 text-white font-semibold py-3.5 rounded-full transition";

            return (
              <TiltCard key={t.key} className={cardClass}>
                {t.badge && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    {t.badge}
                  </span>
                )}
                <h3 className="font-bold text-lg">{t.name}</h3>
                <p className="text-sm opacity-60 mt-1">{t.tagline}</p>

                <div className="mt-6 flex items-end gap-1">
                  <span className="text-4xl font-extrabold">{ars(price)}</span>
                  <span className="opacity-50 mb-1">
                    ARS{" "}
                    {cycle === "monthly"
                      ? "/ mes"
                      : cycle === "quarterly"
                        ? "/ 3 meses"
                        : "/ año"}
                  </span>
                </div>

                {cycle !== "monthly" ? (
                  <p className="mt-2 inline-flex w-fit items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    <TrendingDown className="w-3.5 h-3.5" />
                    {ars(perMonth)}/mes · ahorrás {savingPct(t, cycle)}%
                  </p>
                ) : (
                  <p className="mt-2 text-xs opacity-50">
                    o {ars(t.yearly)} por año (−{savingPct(t, "yearly")}%)
                  </p>
                )}

                <ul className="mt-7 space-y-3 text-sm flex-1">
                  {t.features.map((f) => (
                    <FeatureItem key={f}>{f}</FeatureItem>
                  ))}
                </ul>

                <CtaLink
                  href={contadoresLoginWithTier(t.key)}
                  className={ctaClass}
                >
                  Empezar prueba gratis
                </CtaLink>
              </TiltCard>
            );
          })}
        </div>

        <p className="reveal-up text-center text-sm opacity-50 mt-10">
          Todos los planes incluyen 14 días de prueba gratis · Pagos seguros con
          Mercado Pago · Sin permanencia ·{" "}
          <a
            href="mailto:contacto@kontari.com"
            className="underline hover:opacity-100"
          >
            ¿Más de 3 profesionales? Escribinos
          </a>
        </p>
        <p className="reveal-up text-center text-xs opacity-40 mt-2">
          Los precios se actualizan trimestralmente según la variación del
          IPC.
        </p>
      </div>
    </section>
  );
}
