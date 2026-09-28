import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import CtaLink from "./CtaLink";
import Eyebrow from "./Eyebrow";
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
    <li className="flex items-start gap-3 py-2.5 border-b border-line last:border-b-0">
      <Check aria-hidden className="w-4 h-4 mt-0.5 shrink-0 text-pos" />
      {children}
    </li>
  );
}

const PERIOD: Record<Cycle, string> = {
  monthly: "/ mes",
  quarterly: "/ 3 meses",
  yearly: "/ año",
};

export default function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <section id="precios" className="py-24 md:py-36 border-t border-line">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 reveal-up">
            <Eyebrow n="07">Precios</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <h2 className="reveal-up display text-[clamp(2.2rem,4.6vw,4.25rem)]">
              Tres planes, según <em>cómo trabaja tu estudio</em>
            </h2>
            <p className="reveal-up mt-6 text-lg text-muted max-w-2xl">
              Empezás con 14 días de prueba gratis. Cancelá cuando quieras.
            </p>
          </div>
        </div>

        {/* Toggle mensual / trimestral / anual */}
        <div className="mt-14 md:mt-20 reveal-up flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-md border border-line-strong p-1">
            {(["monthly", "quarterly", "yearly"] as Cycle[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCycle(c)}
                aria-pressed={cycle === c}
                className={`label-mono rounded-[4px] px-3 sm:px-4 py-2.5 transition-colors ${
                  cycle === c ? "bg-fg text-bg" : "text-muted hover:text-fg"
                }`}
              >
                {CYCLE_LABEL[c]}
                {c !== "monthly" && (
                  <span className={cycle === c ? "ml-1.5" : "ml-1.5 text-pos"}>
                    −{savingPct(TIERS[1], c)}%
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="label-mono text-muted">Precios en pesos argentinos (ARS)</p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 border-t border-l border-line">
          {TIERS.map((t, i) => {
            const price = priceFor(t, cycle);
            const perMonth = Math.round(price / CYCLE_MONTHS[cycle]);

            return (
              <div
                key={t.key}
                className={`reveal-up relative flex flex-col border-r border-b border-line p-6 md:p-8 ${
                  t.featured ? "bg-panel" : ""
                }`}
              >
                {t.featured && (
                  <span aria-hidden className="absolute -top-px -left-px -right-px h-[3px] bg-accent" />
                )}
                <div className="h-5 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t.badge && (
                    <span className="label-mono text-[10px] bg-accent text-on-accent rounded px-2 py-0.5">
                      {t.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-8 text-3xl font-medium tracking-tight">{t.name}</h3>
                <p className="mt-2 text-[15px] text-muted min-h-12">{t.tagline}</p>

                <div className="mt-8 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-[2.75rem] leading-none font-medium tracking-[-0.04em] tabular-nums">
                    {ars(price)}
                  </span>
                  <span className="label-mono text-muted">ARS {PERIOD[cycle]}</span>
                </div>

                {cycle !== "monthly" ? (
                  <p className="mt-3 font-mono text-xs text-pos">
                    {ars(perMonth)}/mes · ahorrás {savingPct(t, cycle)}%
                  </p>
                ) : (
                  <p className="mt-3 font-mono text-xs text-muted">
                    o {ars(t.yearly)} por año (−{savingPct(t, "yearly")}%)
                  </p>
                )}

                <CtaLink
                  href={contadoresLoginWithTier(t.key)}
                  className={`btn mt-8 w-full ${t.featured ? "btn-accent" : "btn-solid"}`}
                >
                  Empezar prueba gratis
                  <ArrowRight className="w-4 h-4" />
                </CtaLink>

                <ul className="mt-8 text-[15px] flex-1 border-t border-line">
                  {t.features.map((f) => (
                    <FeatureItem key={f}>{f}</FeatureItem>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="reveal-up mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-muted">
          <p>
            Todos los planes incluyen 14 días de prueba gratis · Pagos seguros
            con Mercado Pago · Sin permanencia
          </p>
          <a
            href="mailto:contacto@kontari.com"
            className="text-fg underline underline-offset-4 decoration-line-strong hover:decoration-accent"
          >
            ¿Más de 3 profesionales? Escribinos
          </a>
        </div>
        <p className="reveal-up mt-2 text-xs text-muted">
          Los precios se actualizan trimestralmente según la variación del IPC.
        </p>
      </div>
    </section>
  );
}
