import { CheckCircle2, Frown, Smile, XCircle } from "lucide-react";

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

export default function ProblemSolution() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-brand-900/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto reveal-up">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-300 uppercase tracking-widest">
            ¿Te suena familiar?
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            El caos de gestionar decenas de clientes, contra un solo lugar para
            todo
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <div className="reveal-up rounded-2xl border border-red-500/20 bg-red-50/60 dark:bg-red-500/5 p-8">
            <h3 className="font-bold text-lg flex items-center gap-2 text-red-600 dark:text-red-400">
              <Frown /> Sin Kontari
            </h3>
            <ul className="mt-6 space-y-4 text-sm">
              {WITHOUT.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal-up rounded-2xl border border-emerald-500/20 bg-emerald-50/60 dark:bg-emerald-500/5 p-8">
            <h3 className="font-bold text-lg flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Smile /> Con Kontari
            </h3>
            <ul className="mt-6 space-y-4 text-sm">
              {WITH.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
