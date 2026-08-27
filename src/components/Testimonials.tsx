import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Dejé de perseguir carpetas y post-its. Ahora todo mi estudio vive en Klientfy.",
    name: "Marina L.",
    role: "Contadora Pública, Rosario",
  },
  {
    quote:
      "La búsqueda automática de datos de AFIP/ARCA nos ahorra horas cada semana.",
    name: "Diego F.",
    role: "Estudio contable asociado, CABA",
  },
  {
    quote:
      "La seguridad de las claves fiscales era nuestra mayor preocupación. Klientfy la resolvió.",
    name: "Sofía R.",
    role: "Contadora, Córdoba",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 5500);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center reveal-up">
        <p className="text-sm font-semibold text-brand-600 dark:text-brand-300 uppercase tracking-widest">
          Testimonios
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
          Estudios que ya ordenaron su gestión
        </h2>
      </div>

      <div
        className="reveal-up relative max-w-3xl mx-auto mt-14 px-5 sm:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="overflow-hidden rounded-3xl">
          <div
            className="t-track flex"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="w-full shrink-0 px-2">
                <div className="rounded-2xl border border-brand-950/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-10 text-center">
                  <Quote className="w-8 h-8 mx-auto text-brand-400" />
                  <p className="mt-5 text-lg font-medium">&quot;{t.quote}&quot;</p>
                  <p className="mt-5 font-semibold">{t.name}</p>
                  <p className="text-sm opacity-50">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Ver testimonio ${i + 1}`}
              onClick={() => setIndex(i)}
              className={
                i === index
                  ? "w-6 h-2.5 rounded-full bg-brand-600 transition-all"
                  : "w-2.5 h-2.5 rounded-full bg-brand-950/20 dark:bg-white/20 transition-all"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
