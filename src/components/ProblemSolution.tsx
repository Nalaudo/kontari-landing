import { useState } from "react";
import Eyebrow from "./Eyebrow";

const WITHOUT = [
  "Planillas de Excel desactualizadas repartidas entre varias personas",
  "Claves fiscales guardadas en post-its, WhatsApp o Word sin protección",
  "Liquidar el IVA y rehacer los asientos contables a mano todos los meses",
  "Documentación de cada cliente desperdigada entre mails, WhatsApp y carpetas",
];

// Same order as WITHOUT: each resolution answers the pain point beside it.
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
  tone: "tone-coral" | "tone-emerald";
  sign: "−" | "+";
  active: number | null;
  onHover: (i: number | null) => void;
};

function Column({ side, title, items, tone, sign, active, onHover }: ColumnProps) {
  return (
    <div className={`${tone} reveal-up`}>
      <div className="flex items-baseline justify-between gap-4 px-3 pb-4 border-b-2 border-sec">
        <h3 className="text-2xl md:text-3xl font-medium tracking-tight">{title}</h3>
        <span className="label-mono text-sec">{side}</span>
      </div>
      <ul onMouseLeave={() => onHover(null)}>
        {items.map((item, i) => {
          const on = active === i;
          return (
            <li
              key={item}
              onMouseEnter={() => onHover(i)}
              className={`grid grid-cols-[1fr_1.5rem] gap-3 items-baseline px-3 py-5 border-b border-line transition-colors duration-300 ${
                on ? "bg-sec/10" : ""
              } ${active !== null && !on ? "opacity-45" : ""}`}
            >
              <span className="text-[15px] md:text-base leading-relaxed">{item}</span>
              <span
                aria-hidden
                className={`font-mono text-lg text-right text-sec transition-transform duration-300 ${
                  on ? "scale-150" : ""
                }`}
              >
                {sign}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function ProblemSolution() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="tone-coral py-24 md:py-36">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 reveal-up">
            <Eyebrow>¿Te suena familiar?</Eyebrow>
            <p className="mt-4 text-sm text-muted max-w-xs hidden lg:block">
              Pasá el mouse por cada fila para ver cómo se resuelve.
            </p>
          </div>
          <h2 className="tone-emerald lg:col-span-8 reveal-up display text-[clamp(2.2rem,4.6vw,4.25rem)]">
            El caos de gestionar decenas de clientes, contra{" "}
            <em>un solo lugar para todo</em>
          </h2>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          <Column
            side="Debe"
            title="Sin Kontari"
            items={WITHOUT}
            tone="tone-coral"
            sign="−"
            active={active}
            onHover={setActive}
          />
          <Column
            side="Haber"
            title="Con Kontari"
            items={WITH}
            tone="tone-emerald"
            sign="+"
            active={active}
            onHover={setActive}
          />
        </div>

        <div className="tone-emerald reveal-up mt-10 flex flex-wrap items-baseline justify-between gap-4 border-y-4 border-double border-line-strong py-5">
          <span className="label-mono text-muted">Saldo</span>
          <span className="font-serif italic text-2xl md:text-3xl text-sec">
            Tu estudio, en orden.
          </span>
        </div>
      </div>
    </section>
  );
}
