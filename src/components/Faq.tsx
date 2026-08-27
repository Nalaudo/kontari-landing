import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "¿Qué es Klientfy?",
    a: "Klientfy es una plataforma de gestión pensada para estudios contables y contadores independientes en Argentina: centraliza clientes, datos fiscales, documentación y equipo en un solo lugar.",
  },
  {
    q: "¿Cómo obtienen los datos de mis clientes?",
    a: "Consultamos directamente a los servicios web de AFIP/ARCA usando el CUIT que vos ingresás, para traer razón social, actividad y estado del contribuyente en segundos.",
  },
  {
    q: "¿Qué tan segura es la clave fiscal de mis clientes?",
    a: "Se cifra en tu navegador con AES-256-GCM y una clave derivada mediante PBKDF2 con 600.000 iteraciones antes de enviarse. Ni el equipo de Klientfy puede acceder a las claves en texto plano.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí, no hay permanencia mínima. Podés cancelar tu suscripción en cualquier momento desde tu panel de facturación.",
  },
  {
    q: "¿Cuántos clientes puedo cargar?",
    a: "Los planes actuales no tienen un límite estricto de clientes, sujeto a una política de uso justo. Si tenés un estudio grande, escribinos y armamos un plan a medida.",
  },
  {
    q: "¿Klientfy reemplaza mi sistema de facturación?",
    a: "No. Klientfy se especializa en la gestión de clientes, datos fiscales y documentación de tu estudio, y se integra con tu flujo de trabajo actual.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28">
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
