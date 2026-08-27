import { useCallback, useEffect, useRef, useState } from "react";
import { BadgeCheck, Hash, Search } from "lucide-react";

const DEMO_CUIT = "20-18106963-6";

const RESULT_FIELDS: { label: string; value: string; className: string }[] = [
  {
    label: "Razón social",
    value: "Estudio Contable Rivadavia S.R.L.",
    className: "",
  },
  { label: "Estado", value: "Activo", className: "" },
  { label: "Categoría IVA", value: "Responsable Inscripto", className: "" },
  {
    label: "Actividad principal",
    value: "692000 — Servicios de contabilidad, auditoría y asesoría fiscal",
    className: "sm:col-span-2",
  },
  { label: "Inicio de actividades", value: "03/2015", className: "" },
  {
    label: "Domicilio fiscal",
    value: "Av. Rivadavia 1234, CABA",
    className: "sm:col-span-2 lg:col-span-3",
  },
];

export default function Demo() {
  const [cuit, setCuit] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasRun = useRef(false);

  const runDemo = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setShowResult(false);
    setCuit("");

    let i = 0;
    const typing = setInterval(() => {
      i += 1;
      setCuit(DEMO_CUIT.slice(0, i));
      if (i >= DEMO_CUIT.length) {
        clearInterval(typing);
        const reveal = setTimeout(() => {
          setShowResult(true);
          setLoading(false);
        }, 1100);
        timers.current.push(reveal);
      }
    }, 60);
    timers.current.push(typing);
  }, [loading]);

  // Autoplay once when the section scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            const t = setTimeout(runDemo, 600);
            timers.current.push(t);
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [runDemo]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="py-20 md:py-28 bg-white dark:bg-brand-900/30"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto reveal-up">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-300 uppercase tracking-widest">
            Probalo vos mismo
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Así de simple es cargar un cliente nuevo
          </h2>
          <p className="mt-4 text-brand-950/60 dark:text-slate-400">
            Solo hace falta el CUIT. Klientfy hace el resto consultando a
            AFIP/ARCA.
          </p>
        </div>

        <div className="reveal-up mt-12 rounded-3xl border border-brand-950/10 dark:border-white/10 bg-brand-50/50 dark:bg-white/[0.03] p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-stretch gap-3 max-w-xl mx-auto">
            <div className="flex-1 flex items-center gap-2 bg-white dark:bg-brand-950 rounded-xl border border-brand-950/10 dark:border-white/10 px-4 py-3.5">
              <Hash className="w-4 h-4 opacity-40 shrink-0" />
              <input
                type="text"
                readOnly
                value={cuit}
                placeholder="Ingresá un CUIT, ej: 30-71234567-9"
                className="w-full bg-transparent outline-none font-mono text-sm"
              />
            </div>
            <button
              type="button"
              onClick={runDemo}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-3.5 rounded-xl transition shrink-0"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full inline-block animate-spin" />
                  Consultando…
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" /> Buscar en AFIP/ARCA
                </>
              )}
            </button>
          </div>

          <div
            className={`mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden transition-all duration-700 ${
              showResult ? "opacity-100" : "opacity-0 max-h-0"
            }`}
            style={showResult ? { maxHeight: "600px" } : undefined}
          >
            {RESULT_FIELDS.map((field) => (
              <div
                key={field.label}
                className={`rounded-xl bg-white dark:bg-brand-950 border border-brand-950/10 dark:border-white/10 p-4 ${field.className}`}
              >
                <p className="text-[11px] uppercase tracking-wide opacity-50">
                  {field.label}
                </p>
                {field.label === "Estado" ? (
                  <p className="mt-1 font-semibold flex items-center gap-1.5 text-emerald-600">
                    <BadgeCheck className="w-4 h-4" /> {field.value}
                  </p>
                ) : (
                  <p className="mt-1 font-semibold">{field.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
