import Eyebrow from "./Eyebrow";

const WITHOUT = [
  "Planillas de Excel desactualizadas repartidas entre varias personas",
  "Claves fiscales guardadas en post-its, WhatsApp o Word sin protección",
  "Liquidar el IVA y rehacer los asientos contables a mano todos los meses",
  "Documentación de cada cliente desperdigada entre mails, WhatsApp y carpetas",
];

const WITH = [
  "Un solo dashboard con todos tus clientes activos y su estado real",
  "Bóveda de claves fiscales cifrada de extremo a extremo",
  "IVA, contabilidad y facturación electrónica sobre los mismos comprobantes",
  "Vencimientos, tareas y documentos de cada cliente en un mismo lugar",
];

type ColumnProps = {
  side: "Debe" | "Haber";
  title: string;
  items: string[];
  sign: "−" | "+";
};

function Column({ side, title, items, sign }: ColumnProps) {
  const tone = sign === "+" ? "text-pos" : "text-neg";
  return (
    <div className="reveal-up">
      <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-line-strong">
        <h3 className="text-2xl md:text-3xl font-medium tracking-tight">
          {title}
        </h3>
        <span className={`label-mono ${tone}`}>{side}</span>
      </div>
      <ul>
        {items.map((item, i) => (
          <li
            key={item}
            className="grid grid-cols-[2.25rem_1fr_1.5rem] gap-3 items-baseline py-5 border-b border-line"
          >
            <span className="font-mono text-xs text-muted tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[15px] md:text-base leading-relaxed">{item}</span>
            <span aria-hidden className={`font-mono text-lg text-right ${tone}`}>
              {sign}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProblemSolution() {
  return (
    <section className="py-24 md:py-36 border-t border-line">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 reveal-up">
            <Eyebrow n="01">¿Te suena familiar?</Eyebrow>
          </div>
          <h2 className="lg:col-span-8 reveal-up display text-[clamp(2.2rem,4.6vw,4.25rem)]">
            El caos de gestionar decenas de clientes, contra{" "}
            <em>un solo lugar para todo</em>
          </h2>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          <Column side="Debe" title="Sin Kontari" items={WITHOUT} sign="−" />
          <Column side="Haber" title="Con Kontari" items={WITH} sign="+" />
        </div>

        <div className="reveal-up mt-10 flex flex-wrap items-baseline justify-between gap-4 border-y-4 border-double border-line-strong py-5">
          <span className="label-mono text-muted">Saldo</span>
          <span className="font-serif italic text-2xl md:text-3xl">
            Tu estudio, en orden.
          </span>
        </div>
      </div>
    </section>
  );
}
