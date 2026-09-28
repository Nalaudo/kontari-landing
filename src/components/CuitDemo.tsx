import { useCallback, useEffect, useRef, useState } from "react";
import { BadgeCheck, RotateCw } from "lucide-react";

type Contribuyente = {
  cuit: string;
  razonSocial: string;
  condicion: string;
  actividad: string;
  domicilio: string;
  vencimientos: [string, string][];
};

/** Datos ficticios, solo para la demo. */
const CONTRIBUYENTES: Contribuyente[] = [
  {
    cuit: "30-71234567-9",
    razonSocial: "Panadería La Espiga SRL",
    condicion: "Responsable inscripto",
    actividad: "Elaboración de productos de panadería",
    domicilio: "Rosario, Santa Fe",
    vencimientos: [
      ["IVA · DDJJ mensual", "18/10"],
      ["SICORE · retenciones", "20/10"],
      ["Ganancias · anticipo", "13/11"],
    ],
  },
  {
    cuit: "20-12345678-6",
    razonSocial: "Pérez, Juan Martín",
    condicion: "Monotributo · Cat. D",
    actividad: "Servicios de consultoría informática",
    domicilio: "CABA",
    vencimientos: [
      ["Monotributo · cuota", "20/10"],
      ["Recategorización", "20/01"],
      ["IIBB · convenio", "15/10"],
    ],
  },
  {
    cuit: "30-70123456-4",
    razonSocial: "Estudio Norte SRL",
    condicion: "Responsable inscripto",
    actividad: "Servicios inmobiliarios",
    domicilio: "Córdoba, Córdoba",
    vencimientos: [
      ["IVA · DDJJ mensual", "17/10"],
      ["F931 · cargas sociales", "10/10"],
      ["IIBB · mensual", "16/10"],
    ],
  },
];

type Phase = "typing" | "loading" | "done";

const TYPE_MS = 70;
const LOADING_MS = 800;
const HOLD_MS = 5200;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Hero demo: a client card that "types" a CUIT and autocompletes the tax data
 * the way the real app does against ARCA. The first render is the completed
 * first record, so the prerendered HTML and the client agree on mount.
 */
export default function CuitDemo() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(CONTRIBUYENTES[0].cuit.length);
  const [phase, setPhase] = useState<Phase>("done");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const record = CONTRIBUYENTES[index];

  const next = useCallback(() => {
    clearTimeout(timer.current);
    setIndex((i) => (i + 1) % CONTRIBUYENTES.length);
    if (prefersReducedMotion()) {
      setTyped(99);
      setPhase("done");
    } else {
      setTyped(0);
      setPhase("typing");
    }
  }, []);

  useEffect(() => {
    if (phase === "typing") {
      if (typed < record.cuit.length) {
        timer.current = setTimeout(() => setTyped((t) => t + 1), TYPE_MS);
      } else {
        timer.current = setTimeout(() => setPhase("loading"), 250);
      }
    } else if (phase === "loading") {
      timer.current = setTimeout(() => setPhase("done"), LOADING_MS);
    } else if (!prefersReducedMotion()) {
      timer.current = setTimeout(next, HOLD_MS);
    }
    return () => clearTimeout(timer.current);
  }, [phase, typed, record.cuit.length, next]);

  const done = phase === "done";
  const fields: [string, string][] = [
    ["Razón social", record.razonSocial],
    ["Condición IVA", record.condicion],
    ["Actividad", record.actividad],
    ["Domicilio fiscal", record.domicilio],
  ];

  return (
    <div className="relative rounded-xl border border-line-strong bg-panel shadow-[0_40px_120px_-40px_rgb(0_0_0/0.45)] overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center justify-between gap-3 px-4 h-11 border-b border-line">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
          <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
          <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
        </div>
        <span className="font-mono text-[11px] text-muted truncate">
          contadores.kontari.com.ar/clientes/nuevo
        </span>
        <span className="label-mono text-[10px] text-accent border border-accent/40 rounded px-1.5">
          Demo
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {/* CUIT input */}
        <p className="label-mono text-muted">CUIT del cliente</p>
        <div className="mt-2 flex items-center gap-3">
          <div
            aria-live="polite"
            className="flex-1 h-12 flex items-center px-4 rounded-md border border-line-strong bg-bg font-mono text-lg tracking-wider tabular-nums"
          >
            {record.cuit.slice(0, typed)}
            {phase === "typing" && (
              <span aria-hidden className="ml-0.5 w-[2px] h-5 bg-accent animate-blink" />
            )}
          </div>
          <div
            className={`h-12 px-3 rounded-md flex items-center gap-2 label-mono border transition-colors ${
              done
                ? "border-pos/40 text-pos"
                : "border-line text-muted"
            }`}
          >
            {phase === "loading" ? (
              <>
                <RotateCw aria-hidden className="w-3.5 h-3.5 animate-spin" />
                ARCA
              </>
            ) : done ? (
              <>
                <BadgeCheck aria-hidden className="w-4 h-4" />
                ARCA
              </>
            ) : (
              "ARCA"
            )}
          </div>
        </div>

        {/* Autocompleted fields */}
        <dl className="mt-5 border-t border-line">
          {fields.map(([label, value], i) => (
            <div
              key={label}
              className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[8.5rem_1fr] gap-3 items-center py-2.5 border-b border-line text-sm min-h-11"
            >
              <dt className="label-mono text-[10px] sm:text-[11px] text-muted">{label}</dt>
              <dd className="min-w-0">
                {done ? (
                  <span
                    key={`${index}-${label}`}
                    className="block sm:truncate animate-rise"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    {value}
                  </span>
                ) : (
                  <span
                    aria-hidden
                    className={`block h-3 ${phase === "loading" ? "skeleton" : "bg-line rounded-[3px]"}`}
                    style={{ width: `${55 + ((i * 17) % 35)}%` }}
                  />
                )}
              </dd>
            </div>
          ))}
        </dl>

        {/* Upcoming deadlines, ledger style */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="label-mono text-muted">Próximos vencimientos</p>
            <p className="label-mono text-muted">Fecha</p>
          </div>
          <ul className="mt-2 space-y-1.5 font-mono text-[13px]">
            {record.vencimientos.map(([name, date], i) => (
              <li
                key={`${index}-${name}`}
                className={`flex items-baseline gap-2 ${done ? "animate-rise" : "opacity-30"}`}
                style={done ? { animationDelay: `${280 + i * 70}ms` } : undefined}
              >
                <span className="truncate">{name}</span>
                <span
                  aria-hidden
                  className="flex-1 border-b border-dotted border-line-strong translate-y-[-3px]"
                />
                <span className="tabular-nums text-accent">{date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-5 sm:px-6 h-12 border-t border-line bg-bg/40">
        <span className="font-mono text-[11px] text-muted truncate">
          {done
            ? `✓ Ficha creada · ${record.vencimientos.length} vencimientos agendados`
            : phase === "loading"
              ? "Consultando padrón de ARCA…"
              : "Ingresando CUIT…"}
        </span>
        <button
          type="button"
          onClick={next}
          className="shrink-0 label-mono inline-flex items-center gap-1.5 text-fg hover:text-accent transition-colors"
        >
          <RotateCw aria-hidden className="w-3 h-3" />
          Probar otro CUIT
        </button>
      </div>
    </div>
  );
}
