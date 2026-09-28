import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Eyebrow from "./Eyebrow";

const TESTIMONIALS = [
  {
    quote:
      "Dejé de perseguir carpetas y post-its. Ahora todo mi estudio vive en Kontari.",
    name: "Marina L.",
    tone: "tone-coral",
    role: "Contadora Pública, Rosario",
  },
  {
    quote:
      "La búsqueda automática de datos de AFIP/ARCA nos ahorra horas cada semana.",
    name: "Diego F.",
    tone: "tone-sky",
    role: "Estudio contable asociado, CABA",
  },
  {
    quote:
      "La seguridad de las claves fiscales era nuestra mayor preocupación. Kontari la resolvió.",
    name: "Sofía R.",
    tone: "tone-emerald",
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
    <section className="tone-coral py-24 md:py-36 border-t border-line overflow-hidden">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 reveal-up">
            <Eyebrow>Testimonios</Eyebrow>
            <h2 className="mt-6 text-2xl font-medium tracking-tight max-w-xs">
              Estudios que ya ordenaron su gestión
            </h2>
          </div>

          <div
            className="lg:col-span-8 reveal-up"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="overflow-hidden">
              <div
                className="t-track flex"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {TESTIMONIALS.map((t, i) => (
                  <figure
                    key={t.name}
                    aria-hidden={i !== index}
                    className={`${t.tone} w-full shrink-0 pr-2`}
                  >
                    <blockquote className="font-serif text-[clamp(2rem,4.4vw,3.9rem)] leading-[1.05] tracking-[-0.01em]">
                      <span className="text-sec">“</span>
                      {t.quote}
                      <span className="text-sec">”</span>
                    </blockquote>
                    <figcaption className="mt-10 flex items-center gap-4">
                      <span className="w-11 h-11 rounded-full bg-sec text-bg flex items-center justify-center font-mono text-xs font-medium">
                        {t.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </span>
                      <span>
                        <span className="block font-medium">{t.name}</span>
                        <span className="block text-sm text-muted">{t.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="mt-12 flex items-center gap-6 border-t border-line pt-6">
              <div className="flex flex-1 gap-2">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    aria-label={`Ver testimonio ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`${t.tone} group flex-1 py-3`}
                  >
                    <span className="block h-[3px] rounded-full bg-line-strong overflow-hidden">
                      <span
                        key={i === index ? `on-${index}-${paused}` : "off"}
                        className={`block h-full bg-sec origin-left ${
                          i < index || (i === index && paused)
                            ? "w-full"
                            : i === index
                              ? "w-full animate-fill"
                              : "w-0 group-hover:w-1/4 transition-all"
                        }`}
                      />
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Testimonio anterior"
                  onClick={() => setIndex((i) => (i - 1 + count) % count)}
                  className="w-10 h-10 rounded-md border border-line-strong flex items-center justify-center hover:border-fg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Testimonio siguiente"
                  onClick={() => setIndex((i) => (i + 1) % count)}
                  className="w-10 h-10 rounded-md border border-line-strong flex items-center justify-center hover:border-fg transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
