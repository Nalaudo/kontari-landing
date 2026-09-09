import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "../lib/faqs";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 bg-white dark:bg-brand-900/30">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center reveal-up">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-300 uppercase tracking-widest">
            Preguntas frecuentes
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Todo lo que necesitás saber
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className={`faq-item reveal-up rounded-2xl border border-brand-950/10 dark:border-white/10 bg-white dark:bg-white/[0.03] px-6 ${
                openIndex === i ? "active" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="faq-btn w-full flex items-center justify-between py-5 text-left font-semibold"
              >
                {faq.q}
                <ChevronDown className="chev w-4 h-4 shrink-0" />
              </button>
              <div className="faq-content">
                <div>
                  <div className="pb-5 text-sm opacity-70">{faq.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
