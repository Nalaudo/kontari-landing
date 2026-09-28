import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "../lib/faqs";
import Eyebrow from "./Eyebrow";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-36 border-t border-line">
      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        <div className="lg:col-span-4 reveal-up">
          <div className="lg:sticky lg:top-28">
            <Eyebrow n="08">Preguntas frecuentes</Eyebrow>
            <h2 className="mt-6 display text-[clamp(2.2rem,4vw,3.5rem)]">
              Todo lo que <em>necesitás saber</em>
            </h2>
            <p className="mt-6 text-muted max-w-xs">
              ¿Otra duda?{" "}
              <a
                href="mailto:contacto@kontari.com"
                className="text-fg underline underline-offset-4 decoration-line-strong hover:decoration-accent"
              >
                Escribinos
              </a>{" "}
              y te respondemos.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 border-t border-line">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className={`faq-item reveal-up border-b border-line ${
                openIndex === i ? "active" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="faq-btn group w-full grid grid-cols-[2.5rem_1fr_1.5rem] items-baseline gap-2 py-6 text-left"
              >
                <span aria-hidden className="font-mono text-xs text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg md:text-xl font-medium tracking-tight group-hover:text-accent transition-colors">
                  {faq.q}
                </span>
                <Plus aria-hidden className="faq-icon w-5 h-5 text-muted self-center" />
              </button>
              <div className="faq-content">
                <div>
                  <p className="pb-7 pl-[3rem] pr-8 text-[15px] leading-relaxed text-muted max-w-2xl">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
