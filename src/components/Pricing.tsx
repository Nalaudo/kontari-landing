import { useState } from "react";
import { ArrowRight, Check, Minus, Plus, Sparkles } from "lucide-react";
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
  tone: string;
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
    tone: "tone-emerald",
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
    tone: "tone-indigo",
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
    tone: "tone-amber",
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
      <Check aria-hidden className="w-4 h-4 mt-0.5 shrink-0 text-sec" />
      {children}
    </li>
  );
}

const PERIOD: Record<Cycle, string> = {
  monthly: "/ mes",
  quarterly: "/ 3 meses",
  yearly: "/ año",
};

/** Plan that fits a team size and whether clients get their own app. */
export function recommendTier(pros: number, portal: boolean): Tier["key"] {
  if (portal || pros > 3) return "portal";
  if (pros > 1) return "estudio";
  return "solo";
}

const MAX_PROS = 10;

export default function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const [pros, setPros] = useState(1);
  const [portal, setPortal] = useState(false);
  const [touched, setTouched] = useState(false);
  const recommended = touched ? recommendTier(pros, portal) : null;

  return (
    <section id="precios" className="tone-sky py-24 md:py-36 border-t border-line">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 reveal-up">
            <Eyebrow>Precios</Eyebrow>
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

        {/* Plan finder */}
        <div className="reveal-up mt-14 md:mt-20 rounded-xl border border-line-strong bg-panel p-5 md:p-6 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-10">
          <p className="flex items-center gap-2 font-medium">
            <Sparkles aria-hidden className="w-4 h-4 text-sky" />
            ¿Qué plan te conviene?
          </p>
          <div className="flex items-center gap-3">
            <span id="pros-label" className="text-sm text-muted">
              Profesionales en el estudio
            </span>
            <div
              role="group"
              aria-labelledby="pros-label"
              className="inline-flex items-center rounded-md border border-line-strong"
            >
              <button
                type="button"
                aria-label="Menos profesionales"
                disabled={pros <= 1}
                onClick={() => {
                  setTouched(true);
                  setPros((n) => Math.max(1, n - 1));
                }}
                className="w-9 h-9 flex items-center justify-center text-muted hover:text-fg disabled:opacity-30"
              >
                <Minus className="w-4 h-4" />
              </button>
              <output
                aria-live="polite"
                className="w-10 text-center font-mono text-lg tabular-nums text-sky"
              >
                {pros >= MAX_PROS ? `${MAX_PROS}+` : pros}
              </output>
              <button
                type="button"
                aria-label="Más profesionales"
                disabled={pros >= MAX_PROS}
                onClick={() => {
                  setTouched(true);
                  setPros((n) => Math.min(MAX_PROS, n + 1));
                }}
                className="w-9 h-9 flex items-center justify-center text-muted hover:text-fg disabled:opacity-30"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={portal}
            onClick={() => {
              setTouched(true);
              setPortal((v) => !v);
            }}
            className="flex items-center gap-3 text-sm text-muted hover:text-fg text-left"
          >
            <span
              aria-hidden
              className={`relative w-10 h-6 shrink-0 rounded-full transition-colors ${
                portal ? "bg-amber" : "bg-line-strong"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-bg transition-transform ${
                  portal ? "translate-x-4" : ""
                }`}
              />
            </span>
            Mis clientes tienen su propia app
          </button>
          <p aria-live="polite" className="lg:ml-auto text-sm">
            {recommended ? (
              <>
                Te conviene{" "}
                <span className="font-medium text-fg">
                  {TIERS.find((t) => t.key === recommended)!.name}
                </span>
              </>
            ) : (
              <span className="text-muted">Ajustá y te marcamos el plan</span>
            )}
          </p>
        </div>

        {/* Toggle mensual / trimestral / anual */}
        <div className="mt-8 reveal-up flex flex-wrap items-center justify-between gap-4">
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
                  <span className={cycle === c ? "ml-1.5" : "ml-1.5 text-emerald"}>
                    −{savingPct(TIERS[1], c)}%
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="label-mono text-muted">Precios en pesos argentinos (ARS)</p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 border-t border-l border-line">
          {TIERS.map((t) => {
            const price = priceFor(t, cycle);
            const perMonth = Math.round(price / CYCLE_MONTHS[cycle]);
            const isPick = recommended === t.key;
            const dimmed = recommended !== null && !isPick;

            return (
              <div
                key={t.key}
                className={`${t.tone} reveal-up relative flex flex-col border-r border-b border-line p-6 md:p-8 transition-all duration-500 ${
                  t.featured || isPick ? "bg-panel" : ""
                } ${isPick ? "shadow-[inset_0_0_0_2px_var(--k-sec)] z-10" : ""} ${
                  dimmed ? "opacity-55" : ""
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute -top-px -left-px -right-px bg-sec transition-all ${
                    t.featured || isPick ? "h-[3px]" : "h-px opacity-60"
                  }`}
                />
                <div className="h-6 flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 label-mono text-sec">
                    <span aria-hidden className="w-2 h-2 rounded-full bg-sec" />
                    {isPick ? "Recomendado para vos" : "Plan"}
                  </span>
                  {t.badge && (
                    <span className="label-mono text-[10px] bg-sec text-bg rounded px-2 py-0.5">
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
                  <p className="mt-3 font-mono text-xs text-emerald">
                    {ars(perMonth)}/mes · ahorrás {savingPct(t, cycle)}%
                  </p>
                ) : (
                  <p className="mt-3 font-mono text-xs text-muted">
                    o {ars(t.yearly)} por año (−{savingPct(t, "yearly")}%)
                  </p>
                )}

                <CtaLink
                  href={contadoresLoginWithTier(t.key)}
                  className={`btn mt-8 w-full ${t.featured || isPick ? "btn-tone" : "btn-solid"}`}
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
