import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUp, Check, FileSearch, ListTodo, Mail, Sparkles, X } from "lucide-react";

type Scenario = "vencimientos" | "tarea" | "documento" | "mensaje" | "otro";

const SUGGESTIONS: { key: Exclude<Scenario, "otro">; prompt: string; tone: string }[] = [
  { key: "vencimientos", prompt: "¿Qué vencimientos tengo esta semana?", tone: "tone-amber" },
  { key: "tarea", prompt: "Creá una tarea para presentar el IVA de La Espiga", tone: "tone-indigo" },
  { key: "documento", prompt: "Leé la factura que subí de Estudio Norte", tone: "tone-sky" },
  { key: "mensaje", prompt: "Redactá un recordatorio para J. Pérez", tone: "tone-emerald" },
];

/** Very small keyword router so free text also lands on a scripted answer. */
function route(text: string): Scenario {
  const t = text.toLowerCase();
  if (/venc|semana|calend/.test(t)) return "vencimientos";
  if (/tarea|present/.test(t)) return "tarea";
  if (/factura|document|le[eé]|constancia|f931/.test(t)) return "documento";
  if (/record|mensaje|mail|redact|escrib/.test(t)) return "mensaje";
  return "otro";
}

type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; scenario: Scenario; pending: boolean };

function Ledger({ rows }: { rows: [string, string, string][] }) {
  return (
    <ul className="mt-3 space-y-1.5 font-mono text-[13px]">
      {rows.map(([a, b, color]) => (
        <li key={a} className="flex items-baseline gap-2">
          <span>{a}</span>
          <span
            aria-hidden
            className="flex-1 border-b border-dotted border-line-strong translate-y-[-3px]"
          />
          <span className={color}>{b}</span>
        </li>
      ))}
    </ul>
  );
}

/** Action card that waits for the visitor's decision, like the real assistant. */
function ActionCard({
  icon,
  title,
  rows,
  confirmLabel,
  doneLabel,
}: {
  icon: ReactNode;
  title: string;
  rows: [string, string][];
  confirmLabel: string;
  doneLabel: string;
}) {
  const [state, setState] = useState<"pending" | "ok" | "no">("pending");
  return (
    <div
      className={`mt-3 rounded-lg border p-4 transition-colors ${
        state === "ok"
          ? "border-emerald/50 bg-emerald/5"
          : state === "no"
            ? "border-line opacity-60"
            : "border-violet/40 bg-violet/5"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 font-medium">
        {icon}
        {title}
        {state === "pending" && (
          <span className="label-mono text-[10px] text-violet">· requiere tu confirmación</span>
        )}
      </div>
      <dl className="mt-3 grid grid-cols-[4.5rem_1fr] gap-y-1 text-[13px]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-muted">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex items-center gap-2">
        {state === "pending" ? (
          <>
            <button
              type="button"
              onClick={() => setState("ok")}
              className="inline-flex items-center gap-1.5 rounded-md bg-violet text-bg px-3 py-1.5 text-xs font-medium hover:opacity-90"
            >
              <Check aria-hidden className="w-3.5 h-3.5" />
              {confirmLabel}
            </button>
            <button
              type="button"
              onClick={() => setState("no")}
              className="inline-flex items-center gap-1 rounded-md border border-line-strong px-3 py-1.5 text-xs font-medium text-muted hover:text-fg"
            >
              <X aria-hidden className="w-3.5 h-3.5" />
              Descartar
            </button>
          </>
        ) : (
          <span
            className={`text-xs font-mono animate-rise ${state === "ok" ? "text-emerald" : "text-muted"}`}
          >
            {state === "ok" ? `✓ ${doneLabel}` : "Descartado. No se hizo nada."}
          </span>
        )}
      </div>
    </div>
  );
}

function Answer({ scenario }: { scenario: Scenario }) {
  switch (scenario) {
    case "vencimientos":
      return (
        <>
          <p>Tenés 3 vencimientos de IVA antes del viernes:</p>
          <Ledger
            rows={[
              ["Panadería La Espiga", "vie 12", "text-amber"],
              ["J. Pérez", "vie 12", "text-amber"],
              ["Estudio Norte SRL", "jue 11", "text-coral"],
            ]}
          />
        </>
      );
    case "tarea":
      return (
        <>
          <p>Listo, te la dejo armada:</p>
          <ActionCard
            icon={<ListTodo aria-hidden className="w-4 h-4 text-violet" />}
            title="Nueva tarea"
            rows={[
              ["Título", "Presentar IVA — Panadería La Espiga"],
              ["Vence", "viernes"],
            ]}
            confirmLabel="Confirmar"
            doneLabel="Tarea creada"
          />
        </>
      );
    case "documento":
      return (
        <>
          <p className="flex items-center gap-2">
            <FileSearch aria-hidden className="w-4 h-4 text-sky" />
            Leí <span className="font-mono text-xs">factura_0003.pdf</span>:
          </p>
          <Ledger
            rows={[
              ["Tipo", "Factura A", "text-sky"],
              ["CUIT emisor", "30-70123456-8", "text-sky"],
              ["Período", "09/2026", "text-sky"],
              ["Importe", "$ 184.500", "text-emerald"],
            ]}
          />
          <p className="mt-3 text-muted">¿La cargo en sus comprobantes de compra?</p>
        </>
      );
    case "mensaje":
      return (
        <>
          <p>Te propongo este mensaje:</p>
          <ActionCard
            icon={<Mail aria-hidden className="w-4 h-4 text-violet" />}
            title="Recordatorio a J. Pérez"
            rows={[
              ["Canal", "Chat del portal"],
              [
                "Texto",
                "Hola Juan, te recuerdo que el viernes vence tu cuota de Monotributo. ¿Me pasás el comprobante cuando pagues? Gracias!",
              ],
            ]}
            confirmLabel="Enviar"
            doneLabel="Mensaje enviado"
          />
        </>
      );
    default:
      return (
        <p>
          En esta demo respondo con datos de ejemplo: probá una de las
          sugerencias. En la app, el asistente contesta con los datos reales de
          tu estudio.
        </p>
      );
  }
}

/**
 * Scripted assistant for the landing. Suggestions and free text map to a
 * handful of canned answers; action cards wait for Confirmar/Descartar, the
 * same way the real assistant never acts on its own.
 */
export default function AiChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "user", text: SUGGESTIONS[0].prompt },
    { id: 1, role: "assistant", scenario: "vencimientos", pending: false },
  ]);
  const [draft, setDraft] = useState("");
  const nextId = useRef(2);
  const scroller = useRef<HTMLDivElement>(null);
  const busy = messages.some((m) => m.role === "assistant" && m.pending);

  const ask = (text: string, scenario: Scenario = route(text)) => {
    if (busy || !text.trim()) return;
    const u = nextId.current++;
    const a = nextId.current++;
    setMessages((prev) => [
      ...prev.slice(-4),
      { id: u, role: "user", text: text.trim() },
      { id: a, role: "assistant", scenario, pending: true },
    ]);
    setDraft("");
  };

  useEffect(() => {
    if (!busy) return;
    const t = setTimeout(
      () =>
        setMessages((prev) =>
          prev.map((m) => (m.role === "assistant" ? { ...m, pending: false } : m)),
        ),
      900,
    );
    return () => clearTimeout(t);
  }, [busy]);

  useEffect(() => {
    const el = scroller.current;
    if (!el || messages.length <= 2) return;
    if (typeof el.scrollTo === "function") el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    else el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <div className="tone-violet rounded-xl border border-line-strong bg-panel overflow-hidden shadow-[0_40px_120px_-40px_rgb(0_0_0/0.45)]">
      <div className="flex items-center gap-2 px-4 h-11 border-b border-line">
        <Sparkles aria-hidden className="w-4 h-4 text-violet" />
        <span className="font-medium text-sm">Asistente</span>
        <span className="ml-auto label-mono text-[10px] text-violet border border-violet/40 rounded px-1.5">
          Demo
        </span>
      </div>

      <div
        ref={scroller}
        aria-live="polite"
        className="h-[25rem] overflow-y-auto p-5 space-y-4 text-sm scroll-smooth"
      >
        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end animate-rise">
              <span className="inline-block rounded-lg rounded-br-sm bg-violet text-bg px-3.5 py-2 max-w-[85%]">
                {m.text}
              </span>
            </div>
          ) : m.pending ? (
            <div key={m.id} className="flex gap-1.5 py-2">
              <span className="sr-only">El asistente está escribiendo</span>
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="w-1.5 h-1.5 rounded-full bg-violet animate-bounce"
                  style={{ animationDelay: `${d * 120}ms` }}
                />
              ))}
            </div>
          ) : (
            <div key={m.id} className="animate-rise">
              <Answer scenario={m.scenario} />
            </div>
          ),
        )}
      </div>

      <div className="border-t border-line p-3 space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.key}
              type="button"
              disabled={busy}
              onClick={() => ask(s.prompt, s.key)}
              className={`${s.tone} shrink-0 inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-xs text-muted transition-colors hover:border-sec hover:text-fg disabled:opacity-50`}
            >
              <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-sec" />
              {s.prompt}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(draft);
          }}
          className="flex items-center gap-2"
        >
          <label htmlFor="ai-demo-input" className="sr-only">
            Escribí tu consulta al asistente
          </label>
          <input
            id="ai-demo-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Escribí tu consulta…"
            autoComplete="off"
            className="flex-1 h-10 rounded-md border border-line bg-bg px-3 text-sm outline-none placeholder:text-muted focus:border-violet focus:ring-4 focus:ring-violet/15"
          />
          <button
            type="submit"
            aria-label="Enviar consulta"
            disabled={busy || !draft.trim()}
            className="w-10 h-10 rounded-md bg-violet text-bg flex items-center justify-center disabled:opacity-40 transition-opacity"
          >
            <ArrowUp aria-hidden className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
