import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { FAQS } from "../lib/faqs";
import Eyebrow from "./Eyebrow";

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  // Every word must appear (as a prefix of a word, so "factura" finds
  // "facturas"), ignoring accents and case.
  // Plurals are trimmed so "claves" also finds "clave".
  const terms = normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => (t.length > 3 ? t.replace(/e?s$/, "") : t));
  const visible = FAQS.map((faq, i) => ({ faq, i })).filter(({ faq }) => {
    const words = normalize(`${faq.q} ${faq.a}`).split(/[^a-z0-9ñ]+/);
    return terms.every((t) => words.some((w) => w.startsWith(t)));
  });

  return (
    <section id="faq" className="tone-coral py-24 md:py-36 border-t border-line">
      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        <div className="lg:col-span-4 reveal-up">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Preguntas frecuentes</Eyebrow>
            <h2 className="mt-6 display text-[clamp(2.2rem,4vw,3.5rem)]">
              Todo lo que <em>necesitás saber</em>
            </h2>

            <label htmlFor="faq-search" className="sr-only">
              Buscar en las preguntas frecuentes
            </label>
            <div className="mt-8 relative max-w-sm">
              <Search
                aria-hidden
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
              />
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpenIndex(null);
                }}
                placeholder="Buscá: IVA, IA, claves, planes…"
                autoComplete="off"
                className="w-full h-11 rounded-md border border-line-strong bg-panel pl-10 pr-3 text-sm outline-none placeholder:text-muted focus:border-coral focus:ring-4 focus:ring-coral/15"
              />
            </div>

            <p className="mt-6 text-muted max-w-xs">
              ¿Otra duda?{" "}
              <a
                href="mailto:contacto@kontari.com"
                className="text-fg underline underline-offset-4 decoration-coral/50 hover:decoration-coral"
              >
                Escribinos
              </a>{" "}
              y te respondemos.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 border-t border-line">
          {visible.length === 0 && (
            <p className="py-10 text-muted">
              No encontramos preguntas con “{query}”.{" "}
              <a
                href="mailto:contacto@kontari.com"
                className="text-fg underline underline-offset-4 decoration-coral/50"
              >
                Preguntanos directamente
              </a>
              .
            </p>
          )}
          {visible.map(({ faq, i }) => {
            const open = openIndex === i;
            return (
              <div
                key={faq.q}
                className={`faq-item relative border-b border-line ${open ? "active" : ""}`}
              >
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 bottom-0 w-[3px] bg-coral origin-top transition-transform duration-300 ${
                    open ? "scale-y-100" : "scale-y-0"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="faq-btn group w-full grid grid-cols-[1fr_2rem] items-center gap-4 py-6 pl-5 text-left"
                >
                  <span
                    className={`text-lg md:text-xl font-medium tracking-tight transition-colors ${
                      open ? "text-coral" : "group-hover:text-coral"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    aria-hidden
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      open ? "bg-coral text-bg" : "bg-coral/10 text-coral"
                    }`}
                  >
                    <Plus className="faq-icon w-4 h-4" />
                  </span>
                </button>
                <div className="faq-content">
                  <div>
                    <p className="pb-7 pl-5 pr-12 text-[15px] leading-relaxed text-muted max-w-2xl">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
