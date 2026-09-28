import { useCallback, useEffect, useState } from "react";
import { BadgeCheck, CircleAlert, RotateCw } from "lucide-react";
import { checkCuit, cuitDigits, formatCuit } from "../lib/cuit";

type Contribuyente = {
  cuit: string;
  corto: string;
  tone: string;
  razonSocial: string;
  condicion: string;
  actividad: string;
  domicilio: string;
  vencimientos: [string, string, string][];
};

/** Datos ficticios, solo para la demo (CUITs de relleno con dígito válido). */
const CONTRIBUYENTES: Contribuyente[] = [
  {
    cuit: "30-71234567-1",
    corto: "La Espiga SRL",
    tone: "tone-amber",
    razonSocial: "Panadería La Espiga SRL",
    condicion: "Responsable inscripto",
    actividad: "Elaboración de productos de panadería",
    domicilio: "Rosario, Santa Fe",
    vencimientos: [
      ["IVA · DDJJ mensual", "18/10", "text-amber"],
      ["SICORE · retenciones", "20/10", "text-coral"],
      ["Ganancias · anticipo", "13/11", "text-sky"],
    ],
  },
  {
    cuit: "20-12345678-6",
    corto: "Juan Pérez",
    tone: "tone-violet",
    razonSocial: "Pérez, Juan Martín",
    condicion: "Monotributo · Cat. D",
    actividad: "Servicios de consultoría informática",
    domicilio: "CABA",
    vencimientos: [
      ["Monotributo · cuota", "20/10", "text-violet"],
      ["Recategorización", "20/01", "text-amber"],
      ["IIBB · convenio", "15/10", "text-sky"],
    ],
  },
  {
    cuit: "30-70123456-8",
    corto: "Estudio Norte",
    tone: "tone-sky",
    razonSocial: "Estudio Norte SRL",
    condicion: "Responsable inscripto",
    actividad: "Servicios inmobiliarios",
    domicilio: "Córdoba, Córdoba",
    vencimientos: [
      ["IVA · DDJJ mensual", "17/10", "text-amber"],
      ["F931 · cargas sociales", "10/10", "text-coral"],
      ["IIBB · mensual", "16/10", "text-emerald"],
    ],
  },
];

const findDemo = (value: string) =>
  CONTRIBUYENTES.find((c) => cuitDigits(c.cuit) === cuitDigits(value)) ?? null;

type Phase = "idle" | "typing" | "loading" | "invalid" | "done";

const TYPE_MS = 70;
const LOADING_MS = 800;
const HOLD_MS = 5200;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Hero demo: a new-client card. It plays by itself (types a CUIT and
 * "autocompletes" the tax data like the app does against ARCA) until the
 * visitor types their own CUIT or picks one of the sample contribuyentes.
 * The CUIT check (prefix + modulo-11 digit) is real and runs locally; the
 * contribuyentes are made up. The first render is the completed first
 * record, so the prerendered HTML and the client agree on mount.
 */
export default function CuitDemo() {
  const [value, setValue] = useState(CONTRIBUYENTES[0].cuit);
  const [phase, setPhase] = useState<Phase>("done");
  const [record, setRecord] = useState<Contribuyente | null>(CONTRIBUYENTES[0]);
  const [typing, setTyping] = useState<string | null>(null);
  const [auto, setAuto] = useState(true);
  const [autoIndex, setAutoIndex] = useState(0);

  const settle = useCallback((v: string) => {
    const check = checkCuit(v);
    setPhase(
      check.status === "valid"
        ? "loading"
        : check.status === "invalid"
          ? "invalid"
          : "idle",
    );
  }, []);

  const startTyping = useCallback((cuit: string) => {
    setRecord(null);
    if (prefersReducedMotion()) {
      setTyping(null);
      setValue(cuit);
      setPhase("loading");
      return;
    }
    setValue("");
    setTyping(cuitDigits(cuit));
    setPhase("typing");
  }, []);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    if (phase === "typing" && typing) {
      const n = cuitDigits(value).length;
      if (n < typing.length) {
        t = setTimeout(() => setValue(formatCuit(typing.slice(0, n + 1))), TYPE_MS);
      } else {
        t = setTimeout(() => {
          setTyping(null);
          settle(value);
        }, 250);
      }
    } else if (phase === "loading") {
      t = setTimeout(() => {
        setRecord(findDemo(value));
        setPhase("done");
      }, LOADING_MS);
    } else if (phase === "done" && auto && !prefersReducedMotion()) {
      t = setTimeout(() => {
        const next = (autoIndex + 1) % CONTRIBUYENTES.length;
        setAutoIndex(next);
        startTyping(CONTRIBUYENTES[next].cuit);
      }, HOLD_MS);
    }
    return () => clearTimeout(t);
  }, [phase, value, typing, auto, autoIndex, settle, startTyping]);

  const onInput = (raw: string) => {
    setAuto(false);
    setTyping(null);
    setRecord(null);
    const v = formatCuit(raw);
    setValue(v);
    settle(v);
  };

  const pick = (c: Contribuyente) => {
    setAuto(false);
    startTyping(c.cuit);
  };

  const check = checkCuit(value);
  const done = phase === "done";
  const unknown = done && !record && check.status === "valid";

  const fields: [string, string, boolean?][] = record
    ? [
        ["Razón social", record.razonSocial],
        ["Condición IVA", record.condicion],
        ["Actividad", record.actividad],
        ["Domicilio fiscal", record.domicilio],
      ]
    : unknown && check.status === "valid"
      ? [
          ["Tipo", check.tipo],
          ["Terminación", String(check.terminacion)],
          ["Razón social", "Se completa desde ARCA en la app", true],
          ["Condición IVA", "Se completa desde ARCA en la app", true],
        ]
      : [
          ["Razón social", ""],
          ["Condición IVA", ""],
          ["Actividad", ""],
          ["Domicilio fiscal", ""],
        ];

  const status =
    phase === "typing"
      ? "Ingresando CUIT…"
      : phase === "loading"
        ? "CUIT válido · consultando padrón de ARCA…"
        : phase === "invalid" && check.status === "invalid"
          ? `✗ ${check.reason}`
          : phase === "idle"
            ? `Faltan ${11 - cuitDigits(value).length} dígitos`
            : record
              ? `✓ Ficha creada · ${record.vencimientos.length} vencimientos agendados`
              : "✓ CUIT válido · probá uno de ejemplo para ver la ficha";

  return (
    <div className="relative rounded-xl border border-line-strong bg-panel shadow-[0_40px_120px_-40px_rgb(0_0_0/0.45)] overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center justify-between gap-3 px-4 h-11 border-b border-line">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="w-2.5 h-2.5 rounded-full bg-coral" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald" />
        </div>
        <span className="font-mono text-[11px] text-muted truncate">
          contadores.kontari.com.ar/clientes/nuevo
        </span>
        <span className="label-mono text-[10px] text-violet border border-violet/40 rounded px-1.5">
          Demo
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {/* CUIT input */}
        <label className="label-mono text-muted" htmlFor="cuit-demo">
          CUIT del cliente · probá con el tuyo
        </label>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex-1">
            <input
              id="cuit-demo"
              value={value}
              onChange={(e) => onInput(e.target.value)}
              onFocus={() => setAuto(false)}
              inputMode="numeric"
              autoComplete="off"
              spellCheck={false}
              placeholder="20-12345678-9"
              aria-describedby="cuit-demo-status"
              aria-invalid={phase === "invalid"}
              className={`w-full h-12 px-4 rounded-md border bg-bg font-mono text-lg tracking-wider tabular-nums outline-none transition-colors placeholder:text-muted/50 focus:border-indigo focus:ring-4 focus:ring-indigo/15 ${
                phase === "invalid" ? "border-coral" : "border-line-strong"
              }`}
            />
          </div>
          <div
            className={`h-12 px-3 rounded-md flex items-center gap-2 label-mono border transition-colors ${
              done
                ? "border-emerald/40 text-emerald bg-emerald/5"
                : phase === "invalid"
                  ? "border-coral/40 text-coral bg-coral/5"
                  : phase === "loading"
                    ? "border-indigo/40 text-indigo"
                    : "border-line text-muted"
            }`}
          >
            {phase === "loading" ? (
              <RotateCw aria-hidden className="w-3.5 h-3.5 animate-spin" />
            ) : done ? (
              <BadgeCheck aria-hidden className="w-4 h-4" />
            ) : phase === "invalid" ? (
              <CircleAlert aria-hidden className="w-4 h-4" />
            ) : null}
            ARCA
          </div>
        </div>

        {/* Sample contribuyentes */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="label-mono text-[10px] text-muted">Ejemplos:</span>
          {CONTRIBUYENTES.map((c) => {
            const active = record === c;
            return (
              <button
                key={c.cuit}
                type="button"
                onClick={() => pick(c)}
                aria-pressed={active}
                className={`${c.tone} inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                  active
                    ? "border-sec bg-sec/10 text-fg"
                    : "border-line text-muted hover:border-sec hover:text-fg"
                }`}
              >
                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-sec" />
                {c.corto}
              </button>
            );
          })}
        </div>

        {/* Autocompleted fields */}
        <dl className="mt-5 border-t border-line">
          {fields.map(([label, val, soft], i) => (
            <div
              key={label}
              className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[8.5rem_1fr] gap-3 items-center py-2.5 border-b border-line text-sm min-h-11"
            >
              <dt className="label-mono text-[10px] sm:text-[11px] text-muted">{label}</dt>
              <dd className="min-w-0">
                {val ? (
                  <span
                    key={`${value}-${label}`}
                    className={`block sm:truncate animate-rise ${soft ? "text-muted italic" : ""}`}
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    {val}
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
        <div className="mt-5 min-h-[5.75rem]">
          <div className="flex items-center justify-between">
            <p className="label-mono text-muted">Próximos vencimientos</p>
            <p className="label-mono text-muted">Fecha</p>
          </div>
          {unknown && check.status === "valid" ? (
            <p className="mt-3 text-sm text-muted animate-rise">
              En la app, Kontari arma el calendario de este cliente según su
              terminación de CUIT <span className="text-fg font-mono">{check.terminacion}</span>.
            </p>
          ) : (
            <ul className="mt-2 space-y-1.5 font-mono text-[13px]">
              {(record ?? CONTRIBUYENTES[0]).vencimientos.map(([name, date, color], i) => (
                <li
                  key={`${value}-${name}`}
                  className={`flex items-baseline gap-2 ${record ? "animate-rise" : "opacity-20"}`}
                  style={record ? { animationDelay: `${280 + i * 70}ms` } : undefined}
                >
                  <span className="truncate">{name}</span>
                  <span
                    aria-hidden
                    className="flex-1 border-b border-dotted border-line-strong translate-y-[-3px]"
                  />
                  <span className={`tabular-nums ${color}`}>{date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-5 sm:px-6 h-12 border-t border-line bg-bg/40">
        <span
          id="cuit-demo-status"
          aria-live="polite"
          className={`font-mono text-[11px] truncate ${
            phase === "invalid" ? "text-coral" : done ? "text-emerald" : "text-muted"
          }`}
        >
          {status}
        </span>
        <span className="shrink-0 label-mono text-[10px] text-muted hidden sm:inline">
          No sale de tu navegador
        </span>
      </div>
    </div>
  );
}
